'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { 
  Search, Filter, Calendar, Star, PlayCircle, 
  Tv, Film, Loader2, Home, TrendingUp, Clock,
  ChevronRight, ExternalLink, Eye, Bookmark,
  Menu, X, Heart, Share2, Download
} from 'lucide-react'
import { IconContext } from 'react-icons'
import { 
  FaFire, FaHeart, FaMagic, FaGhost, FaRobot, 
  FaFutbol, FaGamepad, FaMusic, FaRocket, FaDragon,
  FaSwords, FaLaugh, FaDungeon, FaUserNinja, FaMeteor,
  FaRegHeart, FaRegBookmark, FaPlayCircle, FaPauseCircle
} from 'react-icons/fa'
import { GiNinjaHeroicStance, GiMagicSwirl, GiSpellBook } from 'react-icons/gi'

// Import shadcn components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
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

// API Base URL
const API_BASE_URL = 'https://api.ryzumi.vip/api/otakudesu'

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

// API Rate Limiter Class
class RateLimiter {
  private queue: Array<() => Promise<any>> = []
  private processing = false
  private requestsPerSecond = 5
  private requestInterval = 1000 / this.requestsPerSecond
  private lastRequestTime = 0
  private requestCount = 0
  private resetTime = Date.now() + 1000

  async request<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      this.processQueue()
    })
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return
    
    this.processing = true
    
    const now = Date.now()
    if (now > this.resetTime) {
      this.requestCount = 0
      this.resetTime = now + 1000
    }

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
        this.lastRequestTime = Date.now()
        this.requestCount++
        await requestFn()
      }
    }
    
    this.processing = false
    if (this.queue.length > 0) {
      setTimeout(() => this.processQueue(), 1000)
    }
  }

  getQueueLength() {
    return this.queue.length
  }
}

const rateLimiter = new RateLimiter()

// API Service
const apiService = {
  async getGenres(): Promise<Genre[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/genre`, {
        headers: { 'accept': 'application/json' }
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

      const url = `${API_BASE_URL}/anime${queryParams.toString() ? '?' + queryParams.toString() : ''}`
      const response = await fetch(url, {
        headers: { 'accept': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch anime list')
      return response.json()
    })
  },

  async getAnimeInfo(slug: string): Promise<AnimeDetail> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/anime-info?slug=${slug}`, {
        headers: { 'accept': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch anime info')
      return response.json()
    })
  },

  async getSchedule(): Promise<Schedule[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/jadwal`, {
        headers: { 'accept': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch schedule')
      return response.json()
    })
  },

  async getEpisode(slug: string): Promise<any> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/anime/episode?slug=${slug}`, {
        headers: { 'accept': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch episode')
      return response.json()
    })
  },

  async getBatch(slug: string): Promise<any[]> {
    return rateLimiter.request(async () => {
      const response = await fetch(`${API_BASE_URL}/download/batch?slug=${slug}`, {
        headers: { 'accept': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch batch')
      return response.json()
    })
  }
}

// Genre Icons Mapping
const genreIcons: Record<string, React.ReactNode> = {
  'action': <FaSwords className="text-red-500" />,
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
  
  // Refs
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const itemsPerPage = 12

  // Initialize data
  useEffect(() => {
    loadInitialData()
    // Load watchlist from localStorage
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
    } catch (error) {
      console.error('Failed to load initial data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = useCallback(async (query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      const animeData = await apiService.getAnimeList({ page: 1 })
      setAnimeList(animeData)
      setFilteredAnime(animeData)
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
      } catch (error) {
        console.error('Search failed:', error)
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
          // For schedule tab, we'll show today's anime
          const today = new Date().toLocaleString('id-ID', { weekday: 'long' })
          const todaySchedule = schedule.find(s => s.hari === today)
          if (todaySchedule) {
            // Convert schedule to anime format for display
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
    } catch (error) {
      console.error('Failed to load tab data:', error)
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
    } catch (error) {
      console.error('Failed to filter by genre:', error)
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
    } catch (error) {
      console.error('Failed to load anime details:', error)
    } finally {
      setLoadingDetail(false)
    }
  }

  const toggleWatchlist = (slug: string) => {
    setWatchlist(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    )
  }

  const getCurrentAnime = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAnime.slice(startIndex, endIndex)
  }

  const getGenreIcon = (slug: string) => {
    return genreIcons[slug] || genreIcons.default
  }

  const formatDate = (dateString: string) => {
    return dateString.split(',')[0]
  }

  return (
    <TooltipProvider>
      <IconContext.Provider value={{ size: '1.2em', className: 'inline-block' }}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
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
                      <Tv className="h-6 w-6" />
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
                  <Button variant="ghost" className="gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Watchlist
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
                        <span>Watchlist ({userData.watchlist})</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Check className="mr-2 h-4 w-4" />
                        <span>Completed ({userData.completed})</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="bg-gray-900 border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white">KeyAnime Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Clock className="h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Bookmark className="h-4 w-4" />
                  Watchlist
                </Button>
                
                {/* Mobile Search */}
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 bg-gray-800 border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                        <span className="text-purple-400">{userData.watchlist}</span>
                      </div>
                      <Progress value={userData.watchlist} className="h-2" />
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
                                  // Navigate to anime
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

                    {/* Type Filter */}
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
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
                            <Card 
                              key={anime.slug} 
                              className="group bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                            >
                              {/* Anime Image with Overlay */}
                              <div className="relative overflow-hidden">
                                <img
                                  src={anime.gambar || `https://via.placeholder.com/300x400/1f2937/6d7280?text=${encodeURIComponent(anime.judul.substring(0, 20))}`}
                                  alt={anime.judul}
                                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                
                                {/* Rating Badge */}
                                {anime.rate[1] && anime.rate[1] !== '' && (
                                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500">
                                    <Star className="h-3 w-3 mr-1" />
                                    {anime.rate[1]}
                                  </Badge>
                                )}

                                {/* Watchlist Button */}
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="absolute top-3 left-3 bg-gray-900/80 hover:bg-gray-900"
                                  onClick={() => toggleWatchlist(anime.slug)}
                                >
                                  {watchlist.includes(anime.slug) ? (
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                  ) : (
                                    <Heart className="h-4 w-4" />
                                  )}
                                </Button>

                                {/* Quick Actions Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                  <div className="flex justify-between items-center">
                                    <Button 
                                      size="sm"
                                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                      onClick={() => handleAnimeClick(anime)}
                                    >
                                      <PlayCircle className="h-4 w-4 mr-2" />
                                      Watch
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="text-white hover:text-purple-400"
                                      onClick={() => handleAnimeClick(anime)}
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Anime Info */}
                              <CardContent className="p-4">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <h3 
                                      className="font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-purple-400 transition-colors"
                                      onClick={() => handleAnimeClick(anime)}
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
                                    onClick={() => handleAnimeClick(anime)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Details
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="border-gray-600 hover:bg-gray-700"
                                    size="sm"
                                    onClick={() => toggleWatchlist(anime.slug)}
                                  >
                                    {watchlist.includes(anime.slug) ? (
                                      <Bookmark className="h-4 w-4 fill-current" />
                                    ) : (
                                      <Bookmark className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="mt-12">
                            <Pagination>
                              <PaginationContent>
                                <PaginationItem>
                                  <PaginationPrevious 
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                  />
                                </PaginationItem>
                                
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                  let pageNum
                                  if (totalPages <= 5) {
                                    pageNum = i + 1
                                  } else if (currentPage <= 3) {
                                    pageNum = i + 1
                                  } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i
                                  } else {
                                    pageNum = currentPage - 2 + i
                                  }
                                  
                                  return (
                                    <PaginationItem key={pageNum}>
                                      <PaginationLink
                                        onClick={() => setCurrentPage(pageNum)}
                                        isActive={currentPage === pageNum}
                                        className="cursor-pointer hover:bg-gray-800"
                                      >
                                        {pageNum}
                                      </PaginationLink>
                                    </PaginationItem>
                                  )
                                })}
                                
                                <PaginationItem>
                                  <PaginationNext 
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                  />
                                </PaginationItem>
                              </PaginationContent>
                            </Pagination>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Featured Anime Section */}
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
                            <Button 
                              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              onClick={() => handleAnimeClick(anime)}
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
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
                      <Tv className="h-6 w-6" />
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
                  © 2024 KeyAnimeList • Powered by Otakudesu API • Built with Next.js & Shadcn/ui
                </p>
                <p className="text-xs">
                  API Rate Limited to 5 Requests Per Second • All anime content belongs to their respective owners
                </p>
              </div>
            </div>
          </footer>

          {/* Anime Detail Modal */}
          <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
              {loadingDetail ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              ) : selectedAnime ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {selectedAnime.judul}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      {selectedAnime.namaJapan}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                    {/* Left Column - Image & Basic Info */}
                    <div className="space-y-4">
                      <img
                        src={selectedAnime.gambar}
                        alt={selectedAnime.judul}
                        className="w-full rounded-lg"
                      />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Star className="h-3 w-3 mr-1" />
                            {selectedAnime.skor.split(': ')[1] || 'N/A'}
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {selectedAnime.status}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Watch Now
                          </Button>
                          <Button variant="outline" className="border-gray-600">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle Column - Details */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Type</p>
                            <p>{selectedAnime.tipe}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Episodes</p>
                            <p>{selectedAnime.totalEpisode}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Duration</p>
                            <p>{selectedAnime.durasi}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Aired</p>
                            <p>{selectedAnime.rilis}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Studio</p>
                            <p>{selectedAnime.studio}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Producer</p>
                            <p className="line-clamp-1">{selectedAnime.produser}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Genres</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAnime.genre.split(', ').map((genre, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-800">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-lg">Latest Episodes</h4>
                        <ScrollArea className="h-48">
                          <div className="space-y-2">
                            {selectedAnime.episodes.slice(0, 5).map((episode, index) => (
                              <div 
                                key={index}
                                className="p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{episode.judul}</span>
                                  <span className="text-sm text-gray-400">{formatDate(episode.tanggal)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 border-gray-600">
                        <Download className="h-4 w-4 mr-2" />
                        Download Batch
                      </Button>
                      <Button variant="outline" className="flex-1 border-gray-600">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Failed to load anime details</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

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
                <DropdownMenuItem className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Trending</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Schedule</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </IconContext.Provider>
    </TooltipProvider>
  )
}

// Helper components
function Check(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg> }
function LogOut(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg> }
function Settings(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg> }