import { getOngoingAnime } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { Tv, Clock, Calendar, Flame } from 'lucide-react';

export default async function OngoingPage() {
  const ongoingAnime = await getOngoingAnime();

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const schedule = {
    'Senin': ['Naruto', 'One Piece', 'Demon Slayer'],
    'Selasa': ['Attack on Titan', 'Jujutsu Kaisen'],
    'Rabu': ['My Hero Academia', 'Chainsaw Man'],
    'Kamis': ['Spy x Family', 'Bleach'],
    'Jumat': ['Dr. Stone', 'Tokyo Revengers'],
    'Sabtu': ['One Punch Man', 'Mob Psycho'],
    'Minggu': ['Dragon Ball', 'Hunter x Hunter']
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">Sedang Tayang</h1>
              <p className="text-xs text-gray-400">Update episode terbaru</p>
            </div>
          </div>
          <button className="p-2 bg-gray-800 rounded-lg">
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Today's Schedule */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-bold">Hari Ini ({today})</h2>
            </div>
            <button className="text-sm text-blue-400">Lihat Jadwal</button>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-3">
            <div className="flex overflow-x-auto gap-3 pb-2">
              {Object.entries(schedule).map(([day, anime]) => (
                <div
                  key={day}
                  className={`flex-shrink-0 w-24 p-3 rounded-lg ${
                    day === today ? 'bg-blue-900/30 border border-blue-800' : 'bg-gray-900'
                  }`}
                >
                  <p className={`text-xs font-medium ${day === today ? 'text-blue-400' : 'text-gray-400'}`}>
                    {day}
                  </p>
                  <p className="text-sm mt-1">{anime.length} anime</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hot This Week */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold">Trending Minggu Ini</h2>
          </div>
          
          <div className="space-y-2">
            {ongoingAnime.slice(0, 5).map((anime: any, index: number) => (
              <div key={anime.slug} className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-400 w-6">{index + 1}</div>
                <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={anime.gambar}
                    alt={anime.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-1">{anime.judul}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>EP {anime.eps[1]?.trim() || '?'}</span>
                    <span>• {anime.rate[1] || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-900 rounded">
                  <Tv className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Ongoing */}
        <div>
          <h2 className="text-lg font-bold mb-3">Semua Ongoing</h2>
          <div className="space-y-2">
            {ongoingAnime.map((anime: any) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}