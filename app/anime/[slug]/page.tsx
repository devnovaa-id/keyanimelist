export const dynamic = 'force-dynamic';

import { getAnimeDetail, getLatestAnime } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Play, 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  Film, 
  Globe, 
  Download,
  ChevronRight,
  Tv,
  CheckCircle,
  AlertCircle,
  Share2,
  Bookmark,
  List
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const animeDetail = await getAnimeDetail(slug);
  const latestAnime = await getLatestAnime();
  
  if (!animeDetail) notFound();

  // Parse data dari string
  const parseInfo = (str: string) => str.includes(':') ? str.split(':')[1]?.trim() : str;
  
  const info = {
    score: parseInfo(animeDetail.skor),
    type: parseInfo(animeDetail.tipe),
    status: parseInfo(animeDetail.status),
    episodes: parseInfo(animeDetail.totalEpisode),
    duration: parseInfo(animeDetail.durasi),
    released: parseInfo(animeDetail.rilis),
    studio: parseInfo(animeDetail.studio),
    producer: parseInfo(animeDetail.produser),
    genres: parseInfo(animeDetail.genre)?.split(',').map(g => g.trim()) || []
  };

  // Rekomendasi anime (ambil dari latest, exclude current)
  const recommendations = latestAnime
    .filter((anime: any) => anime.slug !== slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Hero Section dengan Backdrop */}
      <div className="relative">
        {/* Background Blur */}
        <div className="absolute inset-0 h-64 bg-gradient-to-b from-gray-900 to-transparent">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center blur-lg"
            style={{ backgroundImage: `url(${animeDetail.gambar})` }}
          />
        </div>

        {/* Header dengan Back Button */}
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/"
              className="p-2 bg-black/50 rounded-full backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Link>
            <div className="flex gap-2">
              <button className="p-2 bg-black/50 rounded-full backdrop-blur-md">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 bg-black/50 rounded-full backdrop-blur-md">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Anime Poster dan Info */}
          <div className="flex gap-4">
            <div className="relative w-32 aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
              <Image
                src={animeDetail.gambar}
                alt={animeDetail.judul}
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 rounded px-2 py-1">
                <span className="text-xs font-bold">{info.episodes}</span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-bold leading-tight mb-2">
                {animeDetail.judul.split('(')[0].trim()}
              </h1>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{info.score || 'N/A'}</span>
                </div>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">
                  {info.type}
                </span>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">
                  {info.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {animeDetail.episodes.length > 0 && (
                  <Link
                    href={`/anime/watch/${animeDetail.episodes[0].slug}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-medium">TONTON</span>
                  </Link>
                )}
                
                {animeDetail.batch && (
                  <Link
                    href={`/anime/watch/${animeDetail.batch.slug}`}
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-6">
          <button className="flex-1 py-3 text-center border-b-2 border-blue-500 font-medium">
            INFO
          </button>
          <button className="flex-1 py-3 text-center text-gray-400">
            EPISODE
          </button>
          <button className="flex-1 py-3 text-center text-gray-400">
            REVIEW
          </button>
        </div>

        {/* Synopsis */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Sinopsis</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {animeDetail.namaJapan}. {animeDetail.judul} adalah anime {info.type.toLowerCase()} 
            yang dirilis pada {info.released}. Anime ini diproduksi oleh {info.producer} 
            dengan total {info.episodes} episode.
          </p>
        </div>

        {/* Info Grid */}
        <div className="bg-gray-900 rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold mb-4">Informasi</h2>
          
          <div className="space-y-3">
            <InfoRow icon={<Tv className="w-4 h-4" />} label="Tipe" value={info.type} />
            <InfoRow icon={<CheckCircle className="w-4 h-4" />} label="Status" value={info.status} />
            <InfoRow icon={<Film className="w-4 h-4" />} label="Episode" value={info.episodes} />
            <InfoRow icon={<Clock className="w-4 h-4" />} label="Durasi" value={info.duration} />
            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Rilis" value={info.released} />
            <InfoRow icon={<Users className="w-4 h-4" />} label="Studio" value={info.studio} />
            <InfoRow icon={<Globe className="w-4 h-4" />} label="Produser" value={info.producer} />
          </div>
        </div>

        {/* Genres */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Genre</h2>
          <div className="flex flex-wrap gap-2">
            {info.genres.map((genre, index) => (
              <Link
                key={index}
                href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>

        {/* Episode List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Daftar Episode</h2>
            <span className="text-sm text-gray-400">{animeDetail.episodes.length} episode</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {[...animeDetail.episodes].reverse().map((episode, index) => (
              <Link
                key={episode.slug}
                href={`/anime/watch/${episode.slug}`}
                className="flex items-center justify-between p-3 bg-gray-900 hover:bg-gray-800 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="font-bold">{animeDetail.episodes.length - index}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Episode {animeDetail.episodes.length - index}</div>
                    <div className="text-xs text-gray-400">{episode.tanggal}</div>
                  </div>
                </div>
                <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Batch Download Section */}
        {animeDetail.batch && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Download className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold">Download Batch</h3>
                  <p className="text-sm text-gray-400">Semua episode dalam 1 file</p>
                </div>
              </div>
              <Link
                href={`/anime/watch/${animeDetail.batch.slug}`}
                className="block w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-center font-medium"
              >
                📥 Download {info.episodes} Episode
              </Link>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Rekomendasi</h2>
              <Link href="/" className="text-sm text-blue-400">
                Lihat semua
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {recommendations.map((anime: any) => (
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
                        {anime.rate[1] && (
                          <span className="text-xs flex items-center gap-0.5">
                            ⭐ {anime.rate[1]}
                          </span>
                        )}
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
        )}

        {/* Warning/Info */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Disclaimer</h3>
              <p className="text-sm text-gray-400">
                AnimeKu hanya sebagai media penyedia tautan streaming. Semua konten anime 
                adalah hak cipta dari pemilik masing-masing. Dukung karya original dengan 
                menonton di platform resmi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex gap-3">
          {animeDetail.episodes.length > 0 && (
            <Link
              href={`/anime/watch/${animeDetail.episodes[0].slug}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              <Play className="w-5 h-5" />
              Tonton Episode 1
            </Link>
          )}
          
          <button className="px-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Component untuk baris informasi
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-sm font-medium">{value || 'Tidak diketahui'}</div>
      </div>
    </div>
  );
}

// Generate static paths untuk pre-rendering
export async function generateStaticParams() {
  const latestAnime = await getLatestAnime();
  return latestAnime.map((anime: any) => ({
    slug: anime.slug,
  }));
}

// Metadata untuk SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const animeDetail = await getAnimeDetail(slug);
  
  if (!animeDetail) {
    return {
      title: 'Anime Tidak Ditemukan',
    };
  }

  return {
    title: `${animeDetail.judul.split('(')[0]} - AnimeKu`,
    description: `Nonton ${animeDetail.judul.split('(')[0]} sub indo lengkap di AnimeKu`,
    openGraph: {
      images: [animeDetail.gambar],
      type: 'video.episode',
    },
  };
}