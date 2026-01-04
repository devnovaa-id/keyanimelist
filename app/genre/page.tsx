import { getGenres } from '@/lib/api';
import Link from 'next/link';
import { Compass, Filter, Hash } from 'lucide-react';

export default async function GenrePage() {
  const genres = await getGenres();

  const popularGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Romance', 'Shounen', 'Isekai', 'Slice of Life', 'Supernatural'
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold">Genre Anime</h1>
          </div>
          <button className="p-2 bg-gray-800 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Popular Genres */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Populer</h2>
          <div className="grid grid-cols-2 gap-3">
            {popularGenres.map((genre) => (
              <Link
                key={genre}
                href={`/genre/${genre.toLowerCase()}`}
                className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-800/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-purple-500/20 rounded">
                    <Hash className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="font-medium">{genre}</h3>
                </div>
                <p className="text-xs text-gray-400">200+ anime</p>
              </Link>
            ))}
          </div>
        </div>

        {/* All Genres */}
        <div>
          <h2 className="text-lg font-bold mb-3">Semua Genre</h2>
          <div className="grid grid-cols-3 gap-3">
            {genres.map((genre: any) => (
              <Link
                key={genre.slug}
                href={`/genre/${genre.slug}`}
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                <span className="text-sm">{genre.judul}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}