export interface Genre {
  judul: string;
  slug: string;
}

export interface Anime {
  gambar: string;
  judul: string;
  slug: string;
  eps: string[];
  rate: string[];
}

export interface AnimeDetail {
  gambar: string;
  judul: string;
  nama: string;
  namaJapan: string;
  skor: string;
  produser: string;
  tipe: string;
  status: string;
  totalEpisode: string;
  durasi: string;
  rilis: string;
  studio: string;
  genre: string;
  episodes: Episode[];
  batch?: {
    judul: string;
    slug: string;
    tanggal: string;
  };
  lengkap?: {
    judul: string;
    slug: string;
    tanggal: string;
  };
}

export interface Episode {
  judul: string;
  slug: string;
  tanggal: string;
}

export interface EpisodeDetail {
  judul: string;
  iframe: string;
  mirror: {
    m360p: MirrorItem[];
    m480p: MirrorItem[];
    m720p: MirrorItem[];
  };
  download: {
    d360pmp4: DownloadItem[];
    d480pmp4: DownloadItem[];
    d720pmp4: DownloadItem[];
    d1080pmp4: DownloadItem[];
  };
}

export interface MirrorItem {
  nama: string;
  content: string;
}

export interface DownloadItem {
  nama: string;
  href: string;
}

export interface Schedule {
  hari: string;
  anime: {
    judul: string;
    slug: string;
  }[];
}

export interface AnimeDetail {
  gambar: string;
  judul: string;
  nama: string;
  namaJapan: string;
  skor: string;
  produser: string;
  tipe: string;
  status: string;
  totalEpisode: string;
  durasi: string;
  rilis: string;
  studio: string;
  genre: string;
  episodes: Episode[];
  batch?: {
    judul: string;
    slug: string;
    tanggal: string;
  };
  lengkap?: {
    judul: string;
    slug: string;
    tanggal: string;
  };
}

export interface Episode {
  judul: string;
  slug: string;
  tanggal: string;
}