import { getAnimeByGenre, getGenres } from '@/lib/api';
import AnimeCard from '@/components/AnimeCard';
import { ArrowLeft, Filter, Grid3x3, List } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GenreDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const animeList = await getAnimeByGenre(slug);
  const genres = await getGenres();
  
  const currentGenre = genres.find((g: any) => g.slug === slug);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center gap-3 p-4">
          <Link href="/genre" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{currentGenre?.judul || slug}</h1>
            <p className="text-xs text-gray-400">{animeList.length} anime tersedia</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-800 rounded-lg">
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {animeList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Tidak ada anime</h3>
            <p className="text-gray-400">Genre ini belum memiliki konten</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {animeList.map((anime: any) => (
              <div key={anime.slug} className="group">
                <Link href={`/anime/${anime.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 mb-2">
                    <img
                      src={anime.gambar}
                      alt={anime.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-transparent p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium bg-blue-600 px-2 py-1 rounded">
                          EP {anime.eps[0]?.trim() || '?'}
                        </span>
                        {anime.rate[1] && (
                          <span className="text-xs flex items-center gap-1">
                            ⭐ {anime.rate[1]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium line-clamp-2">{anime.judul}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {animeList.length > 0 && (
          <button className="w-full mt-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-colors">
            Muat Lebih Banyak
          </button>
        )}
      </div>
    </div>
  );
}