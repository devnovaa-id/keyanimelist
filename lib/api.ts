const BASE_URL = 'https://api.ryzumi.vip/api/otakudesu';

export async function getLatestAnime(page = 1) {
  const res = await fetch(`${BASE_URL}/anime?page=${page}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre`, {
    next: { revalidate: 86400 }
  });
  return res.json();
}

export async function getAnimeByGenre(genre: string, page = 1, type = 'complete') {
  const res = await fetch(`${BASE_URL}/anime?type=${type}&genre=${genre}&page=${page}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getAnimeDetail(slug: string) {
  const res = await fetch(`${BASE_URL}/anime-info?slug=${slug}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getEpisodeDetail(slug: string) {
  const res = await fetch(`${BASE_URL}/anime/episode?slug=${slug}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getNonce() {
  const res = await fetch(`${BASE_URL}/nonce`, {
    next: { revalidate: 300 }
  });
  return res.json();
}

export async function getIframe(content: string) {
  const nonce = await getNonce();
  const res = await fetch(`${BASE_URL}/get-iframe?content=${content}&nonce=${nonce.data}`, {
    next: { revalidate: 300 }
  });
  return res.json();
}

export async function searchAnime(query: string, type = 'complete') {
  const res = await fetch(`${BASE_URL}/anime?type=${type}&search=${encodeURIComponent(query)}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getOngoingAnime(page = 1) {
  const res = await fetch(`${BASE_URL}/anime?type=ongoing&page=${page}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getSchedule() {
  const res = await fetch(`${BASE_URL}/jadwal`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

export async function getBatchDownloads(slug: string) {
  const res = await fetch(`${BASE_URL}/download/batch?slug=${slug}`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

// Tambah fungsi belum ada:

export async function getAnimeRecommendations(slug: string) {
  const latest = await getLatestAnime();
  return latest
    .filter((anime: any) => anime.slug !== slug)
    .slice(0, 6);
}

export async function getEpisodeList(slug: string) {
  const detail = await getAnimeDetail(slug);
  return detail?.episodes || [];
}