import { getLatestAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { CheckCircle, Star, Award, Trophy } from 'lucide-react';

export default async function CompletePage() {
  const completeAnime = await getLatestAnime();

  const topRated = completeAnime
    .filter((a: any) => a.rate[1])
    .sort((a: any, b: any) => parseFloat(b.rate[1]) - parseFloat(a.rate[1]))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <h1 className="text-xl font-bold">Anime Lengkap</h1>
              <p className="text-xs text-gray-400">Selesai dengan batch</p>
            </div>
          </div>
          <button className="p-2 bg-gray-800 rounded-lg">
            <Award className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Top Rated */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold">Rating Tertinggi</h2>
          </div>
          
          <div className="space-y-2">
            {topRated.map((anime: any, index: number) => (
              <div key={anime.slug} className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
                <div className="relative">
                  <div className="w-12 h-16 rounded overflow-hidden">
                    <img
                      src={anime.gambar}
                      alt={anime.judul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {index < 3 && (
                    <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-1">{anime.judul}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold">{anime.rate[1]}</span>
                    </div>
                    <span className="text-xs text-gray-400">• EP {anime.eps[0]?.trim() || '?'}</span>
                  </div>
                </div>
                <a
                  href={`/anime/${anime.slug}`}
                  className="px-3 py-1.5 bg-blue-600 rounded-lg text-sm font-medium"
                >
                  Tonton
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Completed */}
        <div>
          <h2 className="text-lg font-bold mb-3">Baru Selesai</h2>
          <div className="space-y-2">
            {completeAnime.map((anime: any) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>
        </div>

        {/* Batch Download Banner */}
        <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold">Download Batch</h3>
              <p className="text-sm text-gray-400">Semua episode dalam 1 file</p>
            </div>
          </div>
          <button className="w-full mt-3 py-2.5 bg-blue-600 rounded-lg font-medium">
            Lihat Anime dengan Batch
          </button>
        </div>
      </div>
    </div>
  );
}