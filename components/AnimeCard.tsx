import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

interface AnimeCardProps {
  anime: any;
  compact?: boolean;
}

export default function AnimeCard({ anime, compact = false }: AnimeCardProps) {
  if (compact) {
    return (
      <Link href={`/anime/${anime.slug}`} className="group">
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
          <img
            src={anime.gambar}
            alt={anime.judul}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 right-2">
            <p className="text-xs font-medium truncate">{anime.judul}</p>
            <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
              <span>EP {anime.eps[0]?.trim() || '?'}</span>
              {anime.rate[1] && (
                <span className="flex items-center gap-1">
                  ⭐ {anime.rate[1]}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/anime/${anime.slug}`} className="block">
      <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
        <div className="relative w-20 aspect-[3/4] rounded overflow-hidden flex-shrink-0">
          <img
            src={anime.gambar}
            alt={anime.judul}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{anime.judul}</h3>
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <span>EP {anime.eps[0]?.trim() || '?'}</span>
            {anime.rate[1] && (
              <span className="flex items-center gap-1">
                ⭐ {anime.rate[1]}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-gray-700 rounded">HD</span>
            <span className="px-2 py-1 text-xs bg-gray-700 rounded">Sub</span>
          </div>
        </div>
      </div>
    </Link>
  );
}