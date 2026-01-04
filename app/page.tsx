import { getLatestAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { TrendingUp, Clock, Star, Tv, Compass } from 'lucide-react';

export default async function HomePage() {
  const animeList = await getLatestAnime();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold">AnimeKu</h1>
            <p className="text-xs text-gray-400">Streaming Anime Sub Indo</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-xs">{new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending Now
          </h2>
          <button className="text-xs text-blue-400">Lihat Semua →</button>
        </div>

        {/* Featured Anime */}
        {animeList[0] && (
          <div className="mb-6">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
              <img
                src={animeList[0].gambar}
                alt={animeList[0].judul}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-transparent p-4">
                <h3 className="text-sm font-bold line-clamp-1">{animeList[0].judul}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {animeList[0].rate[1] || 'N/A'}
                  </div>
                  <span className="text-xs text-gray-300">• EP {animeList[0].eps[0]?.trim() || '?'}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-bold bg-red-500 rounded-full">NEW</span>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 rounded-lg text-sm font-medium">
              ▶ Tonton Sekarang
            </button>
          </div>
        )}

        {/* Latest Anime Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Terbaru</h2>
            <button className="text-xs text-gray-400">Hari Ini</button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {animeList.slice(1, 10).map((anime: any) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a href="/ongoing" className="p-3 bg-gray-800 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded">
              <Tv className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Ongoing</p>
              <p className="text-xs text-gray-400">Sedang tayang</p>
            </div>
          </a>
          <a href="/genre" className="p-3 bg-gray-800 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded">
              <Compass className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Genre</p>
              <p className="text-xs text-gray-400">Kategori anime</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}