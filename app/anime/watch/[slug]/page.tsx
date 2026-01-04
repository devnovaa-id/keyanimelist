import { getEpisodeDetail, getAnimeDetail, getLatestAnime } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer';
import DownloadLinks from '@/components/DownloadLinks';
import { notFound } from 'next/navigation';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  List, 
  Share2, 
  Download, 
  ExternalLink,
  Clock,
  Calendar,
  Eye,
  AlertCircle,
  Maximize,
  Volume2,
  Settings,
  CheckCircle,
  Tv
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    // Fetch data episode
    const episodeData = await getEpisodeDetail(slug);
    if (!episodeData) notFound();

    // Extract anime slug from episode slug
    const animeSlug = extractAnimeSlug(slug);
    let animeDetail = null;
    try {
      animeDetail = await getAnimeDetail(animeSlug);
    } catch (error) {
      console.error('Failed to fetch anime detail:', error);
    }

    // Get recommendations
    const recommendations = await getLatestAnime();

    // Extract episode number
    const episodeNumber = extractEpisodeNumber(episodeData.judul);
    
    // Get episode list for navigation
    const episodeList = animeDetail?.episodes || [];
    const currentEpisodeIndex = episodeList.findIndex((ep: any) => ep.slug === slug);
    
    // Previous and next episodes
    const prevEpisode = currentEpisodeIndex > 0 ? episodeList[currentEpisodeIndex - 1] : null;
    const nextEpisode = currentEpisodeIndex < episodeList.length - 1 ? episodeList[currentEpisodeIndex + 1] : null;

    return (
      <div className="min-h-screen bg-gray-950">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Link
                href={animeDetail ? `/anime/${animeSlug}` : '/'}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div className="max-w-[70%]">
                <h1 className="text-sm font-bold truncate">
                  {episodeData.judul.split('Episode')[0].trim()}
                </h1>
                <p className="text-xs text-gray-400 truncate">
                  Episode {episodeNumber} • {animeDetail?.status?.split(':')[1]?.trim() || 'Sub Indo'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {/* Video Player Section */}
          <div className="mb-6">
            <VideoPlayer
              iframeUrl={episodeData.iframe}
              mirrorData={episodeData.mirror}
              title={episodeData.judul}
            />
            
            {/* Episode Info */}
            <div className="mt-4 p-4 bg-gray-900 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg">{episodeData.judul}</h2>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  EP {episodeNumber}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>24 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>1.2M views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Today</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {animeDetail?.namaJapan || 'Anime Episode'} - Tonton episode {episodeNumber} dengan subtitle Indonesia. 
                Kualitas HD tersedia di beberapa server.
              </p>
            </div>
          </div>

          {/* Episode Navigation */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {prevEpisode && (
              <Link
                href={`/anime/watch/${prevEpisode.slug}`}
                className="p-4 bg-gray-900 rounded-xl flex items-center gap-3 hover:bg-gray-800"
              >
                <div className="p-2 bg-gray-800 rounded-lg">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Sebelumnya</p>
                  <p className="font-medium text-sm">Episode {episodeNumber - 1}</p>
                </div>
              </Link>
            )}
            
            {nextEpisode && (
              <Link
                href={`/anime/watch/${nextEpisode.slug}`}
                className="p-4 bg-gray-900 rounded-xl flex items-center gap-3 hover:bg-gray-800"
              >
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-400">Selanjutnya</p>
                  <p className="font-medium text-sm">Episode {episodeNumber + 1}</p>
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>

          {/* Episode List */}
          {episodeList.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Daftar Episode</h2>
                <span className="text-sm text-gray-400">{episodeList.length} episode</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto p-2">
                {episodeList.map((episode: any, index: number) => {
                  const epNum = episodeList.length - index;
                  const isCurrent = episode.slug === slug;
                  
                  return (
                    <Link
                      key={episode.slug}
                      href={`/anime/watch/${episode.slug}`}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                        isCurrent 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg font-bold">{epNum}</span>
                      <span className="text-xs mt-1">EP</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Download Links */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Download Episode</h2>
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            
            <DownloadLinks downloadData={episodeData.download} />
          </div>

          {/* Anime Info Card */}
          {animeDetail && (
            <div className="mb-6">
              <Link href={`/anime/${animeSlug}`}>
                <div className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src={animeDetail.gambar}
                        alt={animeDetail.judul}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {animeDetail.judul.split('(')[0]}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {animeDetail.genre.split(':')[1]?.split(',').slice(0, 3).map((genre: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-xs">
                            {genre.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Tv className="w-4 h-4" />
                          <span>{animeDetail.totalEpisode.split(':')[1]?.trim()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{animeDetail.status.split(':')[1]?.trim()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Recommendations */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Rekomendasi Lainnya</h2>
            <div className="grid grid-cols-3 gap-3">
              {recommendations.slice(0, 6).map((anime: any) => (
                <Link 
                  key={anime.slug} 
                  href={`/anime/${anime.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={anime.gambar}
                      alt={anime.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 33vw, 128px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-transparent p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium bg-blue-600 px-1.5 py-0.5 rounded">
                          EP {anime.eps[0]?.trim() || '?'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xs font-medium line-clamp-2 leading-tight">
                    {anime.judul}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Report Issue */}
          <div className="p-4 bg-gray-900 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Ada masalah dengan video?</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Jika video tidak dapat diputar, coba ganti server atau kualitas video. 
                  Semua konten disediakan oleh pihak ketiga.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">
                    Laporkan Masalah
                  </button>
                  <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700">
                    Coba Server Lain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading watch page:', error);
    notFound();
  }
}

// Helper function to extract anime slug from episode slug
function extractAnimeSlug(episodeSlug: string): string {
  // Remove episode number pattern (e.g., -episode-12-sub-indo)
  const withoutEpisode = episodeSlug.replace(/-\d+-sub-indo$/, '').replace(/-episode-\d+$/, '');
  
  // Check if it ends with -sub-indo, if not add it
  if (!withoutEpisode.endsWith('-sub-indo')) {
    return `${withoutEpisode}-sub-indo`;
  }
  
  return withoutEpisode;
}

// Helper function to extract episode number from title
function extractEpisodeNumber(title: string): number {
  const match = title.match(/Episode\s+(\d+)/i) || title.match(/\b(\d+)\b/);
  return match ? parseInt(match[1]) : 1;
}

// Generate static params
export async function generateStaticParams() {
  try {
    const latestAnime = await getLatestAnime();
    const params: { slug: string }[] = [];

    for (const anime of latestAnime.slice(0, 50)) {
      try {
        const detail = await getAnimeDetail(anime.slug);
        if (detail?.episodes) {
          detail.episodes.slice(0, 5).forEach((episode: any) => {
            params.push({ slug: episode.slug });
          });
        }
      } catch {
        continue;
      }
    }

    return params;
  } catch {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const episodeData = await getEpisodeDetail(slug);
    const animeSlug = extractAnimeSlug(slug);
    const animeDetail = await getAnimeDetail(animeSlug);
    
    return {
      title: `${episodeData?.judul} - AnimeKu`,
      description: `Nonton ${animeDetail?.judul?.split('(')[0]} Episode ${extractEpisodeNumber(episodeData?.judul)} sub indo gratis di AnimeKu`,
      openGraph: {
        images: [animeDetail?.gambar],
        type: 'video.episode',
      },
    };
  } catch (error) {
    return {
      title: 'Nonton Anime Sub Indo - AnimeKu',
      description: 'Nonton anime sub indo gratis dengan kualitas HD',
    };
  }
}