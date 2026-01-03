'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  Search, Filter, Calendar, Star, PlayCircle, 
  Tv, Film, Loader2, Home, TrendingUp, Clock,
  ChevronRight, ExternalLink, Eye, Bookmark,
  Menu, X, Heart, Share2, Download, LogOut,
  Settings, Check, AlertCircle, RefreshCw, ChevronLeft
} from 'lucide-react'
import { IconContext } from 'react-icons'
import { 
  FaFire, FaHeart, FaMagic, FaGhost, FaRobot, 
  FaFutbol, FaGamepad, FaMusic, FaRocket, FaDragon,
  FaLaugh, FaDungeon, FaUserNinja, FaMeteor,
  FaRegHeart, FaRegBookmark, FaPlayCircle, FaPauseCircle,
  FaDownload, FaExclamationTriangle
} from 'react-icons/fa'
import { LuSwords } from "react-icons/lu"
import { GiNinjaHeroicStance, GiMagicSwirl, GiSpellBook } from 'react-icons/gi'
import { SiMyanimelist } from 'react-icons/si'

// Import shadcn components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Toaster, toast } from 'sonner'

// Types
interface Genre {
  judul: string
  slug: string
}

interface Anime {
  gambar: string
  judul: string
  slug: string
  eps: string[]
  rate: string[]
  type?: string
}

interface AnimeDetail {
  gambar: string
  judul: string
  nama: string
  namaJapan: string
  skor: string
  produser: string
  tipe: string
  status: string
  totalEpisode: string
  durasi: string
  rilis: string
  studio: string
  genre: string
  episodes: Episode[]
  batch: {
    judul: string
    slug: string
    tanggal: string
  }
  lengkap: {
    judul: string
    slug: string
    tanggal: string
  }
}

interface Episode {
  judul: string
  slug: string
  tanggal: string
}

interface Schedule {
  hari: string
  anime: {
    judul: string
    slug: string
  }[]
}

interface EpisodeDetail {
  judul: string
  iframe: string
  mirror: {
    m360p: { nama: string; content: string }[]
    m480p: { nama: string; content: string }[]
    m720p: { nama: string; content: string }[]
  }
  download: {
    [key: string]: { nama: string; href: string }[]
  }
}

interface BatchDownload {
  judul: string
  download: {
    [key: string]: { nama: string; href: string }[]
  }
}

// API Base URL
const API_BASE_URL = 'https://api.ryzumi.vip/api/otakudesu'

// Enhanced Rate Limiter
class RateLimiter {
  private queue: Array<() => Promise<any>> = []
  private processing = false
  private requestsPerSecond = 5
  private requestInterval = 1000 / this.requestsPerSecond
  private lastRequestTime = 0
  private requestCount = 0
  private resetTime = Date.now() + 1000
  private retryAttempts = 3

  async request<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
          try {
            const now = Date.now()
            if (now > this.resetTime) {
              this.requestCount = 0
              this.resetTime = now + 1000
            }

            const timeSinceLastRequest = now - this.lastRequestTime
            if (timeSinceLastRequest < this.requestInterval) {
              await new Promise(resolve => 
                setTimeout(resolve, this.requestInterval - timeSinceLastRequest)
              )
            }

            this.lastRequestTime = Date.now()
            this.requestCount++
            
            const result = await fn()
            resolve(result)
            return
          } catch (error) {
            if (attempt === this.retryAttempts) {
              reject(error)
              return
            }
            
            // Exponential backoff
            await new Promise(resolve => 
              setTimeout(resolve, Math.pow(2, attempt) * 100)
            )
          }
        }
      })
      this.processQueue()
    })
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return
    
    this.processing = true
    
    while (this.queue.length > 0 && this.requestCount < this.requestsPerSecond) {
      const now = Date.now()
      const timeSinceLastRequest = now - this.lastRequestTime
      
      if (timeSinceLastRequest < this.requestInterval) {
        await new Promise(resolve => 
          setTimeout(resolve, this.requestInterval - timeSinceLastRequest)
        )
      }
      
      const requestFn = this.queue.shift()
      if (requestFn) {
        await requestFn()
      }
    }
    
    this.processing = false
    if (this.queue.length > 0) {
      setTimeout(() => this.processQueue(), 1000)
    }
  }
}

const rateLimiter = new RateLimiter()

// Complete API Service
const apiService = {
  async getGenres(): Promise<Genre[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/genre`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch genres')
      return response.json()
    })
  },

  async getAnimeList(params: {
    type?: 'complete' | 'ongoing'
    genre?: string
    page?: number
    search?: string
  } = {}): Promise<Anime[]> {
    return rateLimiter.request(async () => {
      const queryParams = new URLSearchParams()
      if (params.type) queryParams.append('type', params.type)
      if (params.genre) queryParams.append('genre', params.genre)
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.search) queryParams.append('search', params.search)

      const url = params.type || params.genre || params.page || params.search 
        ? `${API_BASE_URL}/anime?${queryParams.toString()}`
        : `${API_BASE_URL}/anime`

      const response = await fetch(url, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch anime list')
      return response.json()
    })
  },

  async getAnimeInfo(slug: string): Promise<AnimeDetail> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/anime-info?slug=${encodeURIComponent(slug)}`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch anime info')
      return response.json()
    })
  },

  async getSchedule(): Promise<Schedule[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/jadwal`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch schedule')
      return response.json()
    })
  },

  async getEpisode(slug: string): Promise<EpisodeDetail> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/anime/episode?slug=${encodeURIComponent(slug)}`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch episode')
      return response.json()
    })
  },

  async getBatch(slug: string): Promise<BatchDownload[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/download/batch?slug=${encodeURIComponent(slug)}`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch batch')
      return response.json()
    })
  },

  async getNonce(): Promise<string> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/nonce`, {
        headers: { 'accept': 'application/json' },
        cache: 'no-cache'
      })
      if (!response.ok) throw new Error('Failed to fetch nonce')
      const data = await response.json()
      return data.data
    })
  },

  async getIframeUrl(content: string, nonce: string): Promise<string> {
    return rateLimiter.request(async () => {
      const response = await fetch(
        `${API_BASE_URL}/get-iframe?content=${encodeURIComponent(content)}&nonce=${encodeURIComponent(nonce)}`,
        {
          headers: { 'accept': 'application/json' },
          cache: 'no-cache'
        }
      )
      if (!response.ok) throw new Error('Failed to fetch iframe URL')
      const data = await response.json()
      return data.iframe
    })
  }
}

// Genre Icons Mapping
const genreIcons: Record<string, React.ReactNode> = {
  'action': <LuSwords className="text-red-500" />,
  'adventure': <FaDragon className="text-green-500" />,
  'fantasy': <GiMagicSwirl className="text-purple-500" />,
  'comedy': <FaLaugh className="text-yellow-500" />,
  'horror': <FaGhost className="text-gray-500" />,
  'mecha': <FaRobot className="text-blue-500" />,
  'sports': <FaFutbol className="text-orange-500" />,
  'game': <FaGamepad className="text-indigo-500" />,
  'music': <FaMusic className="text-pink-500" />,
  'sci-fi': <FaRocket className="text-cyan-500" />,
  'demons': <FaMeteor className="text-red-600" />,
  'drama': <FaHeart className="text-rose-500" />,
  'magic': <GiSpellBook className="text-violet-500" />,
  'supernatural': <FaMagic className="text-blue-400" />,
  'shounen': <GiNinjaHeroicStance className="text-orange-400" />,
  'shoujo': <FaRegHeart className="text-pink-400" />,
  'seinen': <FaUserNinja className="text-gray-700" />,
  'josei': <FaRegBookmark className="text-rose-400" />,
  'slice-of-life': <FaPlayCircle className="text-emerald-500" />,
  'psychological': <FaPauseCircle className="text-purple-600" />,
  'default': <FaFire className="text-gray-400" />
}

// Sample user data for demo
const userData = {
  name: "Anime Lover",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anime",
  watchlist: 42,
  watching: 8,
  completed: 156
}

// Pagination Component
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = []
  const maxVisiblePages = 5
  
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="w-10 h-10"
          >
            {page}
          </Button>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Anime Card Component
interface AnimeCardProps {
  anime: Anime
  onAnimeClick: (anime: Anime) => void
  onWatchlistToggle: (slug: string) => void
  isInWatchlist: boolean
}

function AnimeCard({ anime, onAnimeClick, onWatchlistToggle, isInWatchlist }: AnimeCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://via.placeholder.com/300x400/1f2937/6d7280?text=${encodeURIComponent(anime.judul.substring(0, 20))}`
  }

  return (
    <Card className="group bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02] overflow-hidden h-full">
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={anime.gambar}
          alt={anime.judul}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {anime.rate[1] && anime.rate[1] !== '' && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500">
            <Star className="h-3 w-3 mr-1" />
            {anime.rate[1]}
          </Badge>
        )}

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 left-3 bg-gray-900/80 hover:bg-gray-900"
          onClick={(e) => {
            e.stopPropagation()
            onWatchlistToggle(anime.slug)
          }}
        >
          {isInWatchlist ? (
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          ) : (
            <Heart className="h-4 w-4" />
          )}
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex justify-between items-center">
            <Button 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={(e) => {
                e.stopPropagation()
                onAnimeClick(anime)
              }}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Watch
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-purple-400"
              onClick={(e) => {
                e.stopPropagation()
                onAnimeClick(anime)
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 
              className="font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-purple-400 transition-colors"
              onClick={() => onAnimeClick(anime)}
            >
              {anime.judul}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>{anime.judul}</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <PlayCircle className="h-4 w-4" />
            <span>EP {anime.eps[0] || '?'}</span>
          </div>
          {anime.eps[1] && anime.eps[1] !== '' && (
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Total: {anime.eps[1]}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="sm"
            onClick={() => onAnimeClick(anime)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 hover:bg-gray-700"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onWatchlistToggle(anime.slug)
            }}
          >
            {isInWatchlist ? (
              <Bookmark className="h-4 w-4 fill-current" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Anime Detail Component
interface AnimeDetailProps {
  anime: AnimeDetail | null
  loading: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onWatchlistToggle: (slug: string) => void
  isInWatchlist: boolean
  onPlayEpisode: (episodeSlug: string, episodeTitle: string) => void
  onDownloadBatch: (batchSlug: string, batchTitle: string) => void
}

function AnimeDetailComponent({ 
  anime, 
  loading, 
  isOpen, 
  onOpenChange,
  onWatchlistToggle,
  isInWatchlist,
  onPlayEpisode,
  onDownloadBatch
}: AnimeDetailProps) {
  const [episodesPage, setEpisodesPage] = useState(1)
  const episodesPerPage = 5

  const formatDate = (dateString: string) => {
    return dateString.split(',')[0]
  }

  const paginatedEpisodes = anime?.episodes.slice(
    (episodesPage - 1) * episodesPerPage,
    episodesPage * episodesPerPage
  ) || []

  const totalEpisodesPages = anime ? Math.ceil(anime.episodes.length / episodesPerPage) : 1

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : anime ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {anime.judul}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {anime.namaJapan}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              <div className="space-y-4">
                <img
                  src={anime.gambar}
                  alt={anime.judul}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/400x600/1f2937/6d7280?text=${encodeURIComponent(anime.judul.substring(0, 20))}`
                  }}
                />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Star className="h-3 w-3 mr-1" />
                      {anime.skor.split(': ')[1] || 'N/A'}
                    </Badge>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {anime.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    {anime.episodes.length > 0 && (
                      <Button 
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                        onClick={() => onPlayEpisode(anime.episodes[0].slug, anime.episodes[0].judul)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Watch Now
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="border-gray-600"
                      onClick={() => onWatchlistToggle(anime.lengkap.slug)}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isInWatchlist ? 'fill-current' : ''}`} />
                      {isInWatchlist ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Type</p>
                      <p>{anime.tipe}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Episodes</p>
                      <p>{anime.totalEpisode}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p>{anime.durasi}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Aired</p>
                      <p>{anime.rilis}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Studio</p>
                      <p>{anime.studio}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Producer</p>
                      <p className="line-clamp-1">{anime.produser}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.genre.split(', ').map((genre, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">Episodes ({anime.episodes.length})</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDownloadBatch(anime.batch.slug, anime.batch.judul)}
                    >
                      <FaDownload className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {paginatedEpisodes.map((episode, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors flex justify-between items-center"
                          onClick={() => onPlayEpisode(episode.slug, episode.judul)}
                        >
                          <span className="font-medium truncate">{episode.judul}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">{formatDate(episode.tanggal)}</span>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                onPlayEpisode(episode.slug, episode.judul)
                              }}
                            >
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {totalEpisodesPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEpisodesPage(prev => Math.max(1, prev - 1))}
                        disabled={episodesPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-400 flex items-center">
                        Page {episodesPage} of {totalEpisodesPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEpisodesPage(prev => Math.min(totalEpisodesPages, prev + 1))}
                        disabled={episodesPage === totalEpisodesPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load anime details. Please try again.
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Video Player Component
interface VideoPlayerProps {
  episodeSlug: string
  episodeTitle: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function VideoPlayer({ episodeSlug, episodeTitle, isOpen, onOpenChange }: VideoPlayerProps) {
  const [iframeUrl, setIframeUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [quality, setQuality] = useState<'480p' | '720p'>('480p')
  const [playerReady, setPlayerReady] = useState(false)

  const loadEpisode = async () => {
    if (!episodeSlug) return
    
    setIsLoading(true)
    setError('')
    setIframeUrl('')
    
    try {
      // Get episode data
      const episodeData = await apiService.getEpisode(episodeSlug)
      
      // Choose quality
      const mirrorList = quality === '480p' 
        ? episodeData.mirror.m480p 
        : episodeData.mirror.m720p
      
      if (!mirrorList || mirrorList.length === 0) {
        throw new Error(`No ${quality} mirror available`)
      }
      
      // Get first mirror content
      const content = mirrorList[0].content
      if (!content) {
        throw new Error('No video content available')
      }
      
      // Get nonce and iframe URL
      const nonce = await apiService.getNonce()
      const iframe = await apiService.getIframeUrl(content, nonce)
      
      setIframeUrl(iframe)
      setPlayerReady(true)
      toast.success(`Playing in ${quality}`)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load video'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Video loading error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIframeUrl('')
      setError('')
      setPlayerReady(false)
    }
    onOpenChange(open)
  }

  useEffect(() => {
    if (isOpen && episodeSlug && !playerReady) {
      loadEpisode()
    }
  }, [isOpen, episodeSlug, quality])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="truncate pr-4">{episodeTitle}</DialogTitle>
            <div className="flex items-center gap-2">
              <Select value={quality} onValueChange={(value: '480p' | '720p') => setQuality(value)}>
                <SelectTrigger className="w-24 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
              <span className="text-gray-400">Loading video player...</span>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <FaExclamationTriangle className="h-16 w-16 text-red-500 mb-4" />
              <div className="text-red-400 mb-4 text-center">
                <div className="font-semibold mb-2">Error: {error}</div>
                <div className="text-sm text-gray-400">Please try another quality or reload</div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={loadEpisode}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setQuality(quality === '480p' ? '720p' : '480p')}
                >
                  Switch to {quality === '480p' ? '720p' : '480p'}
                </Button>
              </div>
            </div>
          ) : iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0"
              title="Anime Video Player"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Button 
                onClick={loadEpisode}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
                size="lg"
              >
                <FaPlayCircle className="mr-2 h-5 w-5" />
                Load Video Player
              </Button>
              <p className="text-gray-400 mt-2 text-sm">
                Click to load the video player
              </p>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <p>• Use fullscreen button in player for better viewing</p>
          <p>• Switch quality if video doesn't load properly</p>
          <p>• Player may show ads before video starts</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Batch Download Component
interface BatchDownloadProps {
  batchSlug: string
  batchTitle: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function BatchDownloadComponent({ batchSlug, batchTitle, isOpen, onOpenChange }: BatchDownloadProps) {
  const [batchData, setBatchData] = useState<BatchDownload[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const loadBatchData = async () => {
    if (!batchSlug) return
    
    setIsLoading(true)
    setError('')
    setBatchData([])
    
    try {
      const data = await apiService.getBatch(batchSlug)
      setBatchData(data)
      toast.success(`Loaded ${data.length} episodes`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load batch data'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && batchSlug) {
      loadBatchData()
    }
  }, [isOpen, batchSlug])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setBatchData([])
      setError('')
    }
    onOpenChange(open)
  }

  const qualityOptions = [
    { key: 'd360pmp4', label: '360p MP4' },
    { key: 'd480pmp4', label: '480p MP4' },
    { key: 'd720pmp4', label: '720p MP4' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{batchTitle}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Download all episodes in batch
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <span className="ml-2">Loading download links...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
            <Button 
              onClick={loadBatchData} 
              className="mt-2"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </Alert>
        ) : batchData.length > 0 ? (
          <div className="space-y-6">
            {batchData.slice(0, 5).map((episode, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-lg truncate">{episode.judul}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {qualityOptions.map((quality) => (
                    episode.download[quality.key] && episode.download[quality.key].length > 0 && (
                      <Card key={quality.key} className="bg-gray-800/50 border-gray-700">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            {quality.label}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {episode.download[quality.key].slice(0, 3).map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 bg-gray-900 rounded hover:bg-gray-800 transition-colors text-sm truncate"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{link.nama}</span>
                                  <FaDownload className="h-3 w-3" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  ))}
                </div>
              </div>
            ))}
            
            {batchData.length > 5 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>More Episodes Available</AlertTitle>
                <AlertDescription>
                  Showing first 5 episodes. Total episodes: {batchData.length}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={loadBatchData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Links
              </Button>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No batch data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Main App Component
export default function KeyAnimeListApp() {
  // States
  const [genres, setGenres] = useState<Genre[]>([])
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetail | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('trending')
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string>('')
  
  // Player states
  const [currentEpisode, setCurrentEpisode] = useState<{
    slug: string
    title: string
  } | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  
  // Batch download states
  const [currentBatch, setCurrentBatch] = useState<{
    slug: string
    title: string
  } | null>(null)
  const [isBatchOpen, setIsBatchOpen] = useState(false)
  
  // Refs
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const itemsPerPage = 12

  // Initialize data
  useEffect(() => {
    loadInitialData()
    const savedWatchlist = localStorage.getItem('anime-watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('anime-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setApiError('')
      
      const [genresData, animeData, scheduleData] = await Promise.all([
        apiService.getGenres(),
        apiService.getAnimeList({ page: 1 }),
        apiService.getSchedule()
      ])
      
      setGenres(genresData)
      setAnimeList(animeData)
      setFilteredAnime(animeData)
      setSchedule(scheduleData)
      setTotalPages(Math.ceil(animeData.length / itemsPerPage))
      
      toast.success('Data loaded successfully')
    } catch (error) {
      console.error('Failed to load initial data:', error)
      setApiError('Failed to load data. Please check your connection.')
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = useCallback(async (query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
  
    if (!query.trim()) {
      try {
        setLoading(true)
        const animeData = await apiService.getAnimeList({ page: 1 })
        setAnimeList(animeData)
        setFilteredAnime(animeData)
        setCurrentPage(1)
      } catch (error) {
        console.error('Search failed:', error)
        toast.error('Search failed')
      } finally {
        setLoading(false)
      }
      return
    }
  
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true)
        const searchResults = await apiService.getAnimeList({
          search: query,
          type: selectedType !== 'all' ? selectedType as 'complete' | 'ongoing' : undefined
        })
        setAnimeList(searchResults)
        setFilteredAnime(searchResults)
        setCurrentPage(1)
        setTotalPages(Math.ceil(searchResults.length / itemsPerPage))
        toast.success(`Found ${searchResults.length} results`)
      } catch (error) {
        console.error('Search failed:', error)
        toast.error('Search failed')
      } finally {
        setLoading(false)
      }
    }, 500)
  }, [selectedType])

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    setLoading(true)
    
    try {
      let data: Anime[] = []
      switch(tab) {
        case 'trending':
          data = await apiService.getAnimeList({ page: 1 })
          break
        case 'ongoing':
          data = await apiService.getAnimeList({ type: 'ongoing', page: 1 })
          break
        case 'complete':
          data = await apiService.getAnimeList({ type: 'complete', page: 1 })
          break
        case 'schedule':
          const today = new Date().toLocaleString('id-ID', { weekday: 'long' })
          const todaySchedule = schedule.find(s => s.hari === today)
          if (todaySchedule) {
            data = todaySchedule.anime.map(a => ({
              gambar: `https://via.placeholder.com/300x400/1f2937/6d7280?text=${encodeURIComponent(a.judul)}`,
              judul: a.judul,
              slug: a.slug,
              eps: ['', ''],
              rate: ['', ''],
              type: 'ongoing'
            }))
          }
          break
      }
      
      setAnimeList(data)
      setFilteredAnime(data)
      setCurrentPage(1)
      setTotalPages(Math.ceil(data.length / itemsPerPage))
      toast.success(`Loaded ${data.length} anime`)
    } catch (error) {
      console.error('Failed to load tab data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleGenreFilter = async (genreSlug: string) => {
    setSelectedGenre(genreSlug)
    setLoading(true)
    
    try {
      let data: Anime[] = []
      if (genreSlug === 'all') {
        data = await apiService.getAnimeList({ page: 1 })
      } else {
        data = await apiService.getAnimeList({ 
          genre: genreSlug,
          type: selectedType !== 'all' ? selectedType as 'complete' | 'ongoing' : undefined
        })
      }
      
      setAnimeList(data)
      setFilteredAnime(data)
      setCurrentPage(1)
      setTotalPages(Math.ceil(data.length / itemsPerPage))
      toast.success(`Filtered: ${genreSlug === 'all' ? 'All Genres' : genreSlug}`)
    } catch (error) {
      console.error('Failed to filter by genre:', error)
      toast.error('Filter failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAnimeClick = async (anime: Anime) => {
    setLoadingDetail(true)
    setIsDetailOpen(true)
    
    try {
      const detail = await apiService.getAnimeInfo(anime.slug)
      setSelectedAnime(detail)
      toast.success('Anime details loaded')
    } catch (error) {
      console.error('Failed to load anime details:', error)
      toast.error('Failed to load details')
    } finally {
      setLoadingDetail(false)
    }
  }

  const handlePlayEpisode = (episodeSlug: string, episodeTitle: string) => {
    setCurrentEpisode({ slug: episodeSlug, title: episodeTitle })
    setIsPlayerOpen(true)
    toast.success('Loading video player...')
  }

  const handleDownloadBatch = (batchSlug: string, batchTitle: string) => {
    setCurrentBatch({ slug: batchSlug, title: batchTitle })
    setIsBatchOpen(true)
    toast.success('Loading download links...')
  }

  const toggleWatchlist = (slug: string) => {
    setWatchlist(prev => {
      const newWatchlist = prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
      
      toast.success(
        prev.includes(slug) 
          ? 'Removed from watchlist' 
          : 'Added to watchlist'
      )
      
      return newWatchlist
    })
  }

  const getCurrentAnime = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAnime.slice(startIndex, endIndex)
  }

  const getGenreIcon = (slug: string) => {
    return genreIcons[slug] || genreIcons.default
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const refreshData = async () => {
    await loadInitialData()
  }

  return (
    <TooltipProvider>
      <IconContext.Provider value={{ size: '1.2em', className: 'inline-block' }}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'bg-gray-800 text-white border border-gray-700',
            }}
          />
          
          {/* API Error Alert */}
          {apiError && (
            <Alert variant="destructive" className="sticky top-0 z-50 mx-4 mt-4 max-w-7xl">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{apiError}</span>
                <Button size="sm" onClick={refreshData} className="ml-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation Header */}
          <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-800 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X /> : <Menu />}
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg">
                      <SiMyanimelist className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        KeyAnime
                      </h1>
                      <p className="text-xs text-gray-400">Your Anime Collection</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  <Button 
                    variant={activeTab === 'trending' ? "default" : "ghost"} 
                    className="gap-2"
                    onClick={() => handleTabChange('trending')}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                  <Button 
                    variant={activeTab === 'trending' ? "default" : "ghost"} 
                    className="gap-2"
                    onClick={() => handleTabChange('trending')}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </Button>
                  <Button 
                    variant={activeTab === 'schedule' ? "default" : "ghost"} 
                    className="gap-2"
                    onClick={() => handleTabChange('schedule')}
                  >
                    <Clock className="h-4 w-4" />
                    Schedule
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="gap-2"
                    onClick={() => {
                      if (watchlist.length > 0) {
                        const watchlistAnime = animeList.filter(a => watchlist.includes(a.slug))
                        setAnimeList(watchlistAnime)
                        setFilteredAnime(watchlistAnime)
                        setActiveTab('watchlist')
                        toast.success(`Showing ${watchlist.length} saved anime`)
                      } else {
                        toast.info('Your watchlist is empty')
                      }
                    }}
                  >
                    <Bookmark className="h-4 w-4" />
                    Watchlist ({watchlist.length})
                  </Button>
                </nav>

                {/* User Menu */}
                <div className="flex items-center gap-4">
                  {/* Search Input */}
                  <div className="hidden md:block relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search anime..."
                      className="pl-10 w-64 bg-gray-800 border-gray-700"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch(e.target.value)
                      }}
                    />
                  </div>

                  {/* Refresh Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={refreshData}
                    title="Refresh data"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>

                  {/* User Avatar */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarImage src={userData.avatar} />
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Watching ({userData.watching})</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Watchlist ({watchlist.length})</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Check className="mr-2 h-4 w-4" />
                        <span>Completed ({userData.completed})</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-400"
                        onClick={() => {
                          setWatchlist([])
                          localStorage.removeItem('anime-watchlist')
                          toast.success('Watchlist cleared')
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Clear Watchlist</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="bg-gray-900 border-gray-800 w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-2">
                  <SiMyanimelist className="h-5 w-5" />
                  KeyAnime Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button 
                  variant={activeTab === 'trending' ? "default" : "ghost"} 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleTabChange('trending')
                    setMobileMenuOpen(false)
                  }}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
                <Button 
                  variant={activeTab === 'trending' ? "default" : "ghost"} 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleTabChange('trending')
                    setMobileMenuOpen(false)
                  }}
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </Button>
                <Button 
                  variant={activeTab === 'schedule' ? "default" : "ghost"} 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleTabChange('schedule')
                    setMobileMenuOpen(false)
                  }}
                >
                  <Clock className="h-4 w-4" />
                  Schedule
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    if (watchlist.length > 0) {
                      const watchlistAnime = animeList.filter(a => watchlist.includes(a.slug))
                      setAnimeList(watchlistAnime)
                      setFilteredAnime(watchlistAnime)
                      setActiveTab('watchlist')
                      setMobileMenuOpen(false)
                      toast.success(`Showing ${watchlist.length} saved anime`)
                    } else {
                      toast.info('Your watchlist is empty')
                    }
                  }}
                >
                  <Bookmark className="h-4 w-4" />
                  Watchlist ({watchlist.length})
                </Button>
                
                {/* Mobile Search */}
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search anime..."
                      className="pl-10 bg-gray-800 border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(searchQuery)
                          setMobileMenuOpen(false)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-1/4 space-y-6">
                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">My Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Watching</span>
                        <span className="text-green-400">{userData.watching}</span>
                      </div>
                      <Progress value={userData.watching} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Completed</span>
                        <span className="text-blue-400">{userData.completed}</span>
                      </div>
                      <Progress value={userData.completed / 2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Watchlist</span>
                        <span className="text-purple-400">{watchlist.length}</span>
                      </div>
                      <Progress value={watchlist.length} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Genre Filter */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Genres
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2">
                        <Button
                          variant={selectedGenre === 'all' ? 'default' : 'ghost'}
                          className="w-full justify-start gap-2"
                          onClick={() => handleGenreFilter('all')}
                        >
                          <FaFire className="text-orange-500" />
                          All Genres
                        </Button>
                        
                        {genres.slice(0, 20).map((genre) => (
                          <Button
                            key={genre.slug}
                            variant={selectedGenre === genre.slug ? 'default' : 'ghost'}
                            className="w-full justify-start gap-2"
                            onClick={() => handleGenreFilter(genre.slug)}
                          >
                            {getGenreIcon(genre.slug)}
                            {genre.judul}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      {schedule.map((day, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold text-purple-300 mb-2">{day.hari}</h4>
                          <div className="space-y-2">
                            {day.anime.slice(0, 3).map((anime, idx) => (
                              <div 
                                key={idx}
                                className="p-2 bg-gray-900/50 rounded hover:bg-gray-900 cursor-pointer transition-colors"
                                onClick={() => {
                                  handleAnimeClick({
                                    gambar: `https://via.placeholder.com/300x400/1f2937/6d7280?text=${encodeURIComponent(anime.judul)}`,
                                    judul: anime.judul,
                                    slug: anime.slug,
                                    eps: ['', ''],
                                    rate: ['', ''],
                                    type: 'ongoing'
                                  })
                                }}
                              >
                                <p className="text-sm truncate">{anime.judul}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <div className="lg:w-3/4">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <TabsList className="bg-gray-800 border-gray-700">
                      <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Trending
                      </TabsTrigger>
                      <TabsTrigger value="ongoing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Ongoing
                      </TabsTrigger>
                      <TabsTrigger value="complete" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600">
                        <Film className="h-4 w-4 mr-2" />
                        Complete
                      </TabsTrigger>
                      <TabsTrigger value="schedule" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-yellow-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex gap-2">
                      {/* Type Filter */}
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Filter type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Sort Options */}
                      <Select defaultValue="popular">
                        <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="popular">Popular</SelectItem>
                          <SelectItem value="latest">Latest</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="title">Title A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <TabsContent value={activeTab} className="mt-6">
                    {/* Anime Grid */}
                    {loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                            <Skeleton className="h-48 w-full rounded-t-lg" />
                            <CardContent className="p-4">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : filteredAnime.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-6">
                          <Search className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No anime found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                        <Button 
                          onClick={() => {
                            setSearchQuery('')
                            setSelectedGenre('all')
                            setSelectedType('all')
                            loadInitialData()
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {getCurrentAnime().map((anime) => (
                            <AnimeCard
                              key={anime.slug}
                              anime={anime}
                              onAnimeClick={handleAnimeClick}
                              onWatchlistToggle={toggleWatchlist}
                              isInWatchlist={watchlist.includes(anime.slug)}
                            />
                          ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
                        )}
                      </>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Featured Anime Section */}
                {animeList.length > 0 && activeTab === 'trending' && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <FaFire className="text-orange-500" />
                      Featured This Week
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {animeList.slice(0, 2).map((anime) => (
                        <Card key={anime.slug} className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <img
                                src={anime.gambar}
                                alt={anime.judul}
                                className="w-full h-48 md:h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://via.placeholder.com/400x600/1f2937/6d7280?text=${encodeURIComponent(anime.judul.substring(0, 20))}`
                                }}
                              />
                            </div>
                            <div className="md:w-2/3 p-6">
                              <h3 className="text-xl font-bold mb-2">{anime.judul}</h3>
                              <p className="text-gray-400 mb-4 line-clamp-2">
                                Popular anime with high ratings and great reviews
                              </p>
                              <div className="flex items-center gap-4">
                                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                                  <Star className="h-3 w-3 mr-1" />
                                  {anime.rate[1] || '8.5'}
                                </Badge>
                                <span className="text-sm text-gray-400">
                                  EP {anime.eps[0] || '12'} • {anime.type || 'TV'}
                                </span>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button 
                                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  onClick={() => handleAnimeClick(anime)}
                                >
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                  Watch Now
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => toggleWatchlist(anime.slug)}
                                >
                                  {watchlist.includes(anime.slug) ? (
                                    <Heart className="h-4 w-4 fill-current" />
                                  ) : (
                                    <Heart className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 border-t border-gray-800 mt-12">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                      <SiMyanimelist className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">KeyAnime</h3>
                      <p className="text-sm text-gray-400">Your anime companion</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Discover, watch, and track your favorite anime series all in one place.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Browse Anime</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Top Rated</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Seasonal</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Schedule</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Community</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Forums</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Reviews</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Recommendations</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">DMCA</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-8 bg-gray-800" />
              
              <div className="text-center text-gray-400 text-sm">
                <p className="mb-2">
                  © 2026 KeyAnimeList • Powered by Otakudesu API • Built with Next.js & Shadcn/ui
                </p>
                <p className="text-xs">
                  API Rate Limited to 5 Requests Per Second • All anime content belongs to their respective owners
                </p>
              </div>
            </div>
          </footer>

          {/* Anime Detail Modal */}
          <AnimeDetailComponent
            anime={selectedAnime}
            loading={loadingDetail}
            isOpen={isDetailOpen}
            onOpenChange={setIsDetailOpen}
            onWatchlistToggle={toggleWatchlist}
            isInWatchlist={selectedAnime ? watchlist.includes(selectedAnime.lengkap.slug) : false}
            onPlayEpisode={handlePlayEpisode}
            onDownloadBatch={handleDownloadBatch}
          />

          {/* Video Player */}
          {currentEpisode && (
            <VideoPlayer
              episodeSlug={currentEpisode.slug}
              episodeTitle={currentEpisode.title}
              isOpen={isPlayerOpen}
              onOpenChange={setIsPlayerOpen}
            />
          )}

          {/* Batch Download Modal */}
          {currentBatch && (
            <BatchDownloadComponent
              batchSlug={currentBatch.slug}
              batchTitle={currentBatch.title}
              isOpen={isBatchOpen}
              onOpenChange={setIsBatchOpen}
            />
          )}

          {/* Quick Actions Floating Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:shadow-xl"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 w-48">
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={refreshData}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Refresh Data</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ChevronRight className="mr-2 h-4 w-4 rotate-90" />
                  <span>Scroll to Top</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => {
                    if (watchlist.length > 0) {
                      const watchlistAnime = animeList.filter(a => watchlist.includes(a.slug))
                      setAnimeList(watchlistAnime)
                      setFilteredAnime(watchlistAnime)
                      setActiveTab('watchlist')
                      toast.success(`Showing ${watchlist.length} saved anime`)
                    }
                  }}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>View Watchlist</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </IconContext.Provider>
    </TooltipProvider>
  )
}