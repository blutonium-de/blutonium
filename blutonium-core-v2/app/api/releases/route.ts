import { NextResponse } from 'next/server'
import { getSpotifyToken, ARTISTS } from '@/lib/spotify'

const RADIO_RE = /(radio|short|edit|single edit|video edit|cut|mix)/i

export async function GET() {
  // Wenn keine ENV-Keys gesetzt sind, gib einfach eine leere Liste zurück
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return NextResponse.json({ releases: [] })
  }

  let token: string
  try {
    token = await getSpotifyToken()
  } catch {
    // Falls Token nicht geholt werden kann → leere Liste statt Build-Fehler
    return NextResponse.json({ releases: [] })
  }

  const headers = { Authorization: `Bearer ${token}` }
  const albums:any[] = []
  for (const id of ARTISTS){
    const r = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=single,album,compilation&limit=50`,
      { headers }
    )
    const data = await r.json()
    if (data.items) albums.push(...data.items)
  }

  const unique = new Map(albums.map((a:any)=>[a.id,a]))
  const detailed = await Promise.all(
    Array.from(unique.values()).map(async (a:any) => {
      const r = await fetch(`https://api.spotify.com/v1/albums/${a.id}`, { headers })
      return await r.json()
    })
  )

  const releases = detailed.map((a:any)=>({
    id:a.id,
    year: Number((a.release_date||'').slice(0,4)),
    type:a.album_type,
    title:a.name,
    label:a.label,
    artists: a.artists.map((ar:any)=>({id:ar.id,name:ar.name,url:ar.external_urls?.spotify})),
    coverUrl: a.images?.[0]?.url,
    releaseDate: a.release_date,
    tracks: (a.tracks?.items||[]).map((t:any)=>({
      id:t.id, title:t.name,
      isRadioEdit: RADIO_RE.test(t.name),
      previewUrl:t.preview_url,
      spotifyUrl:`https://open.spotify.com/track/${t.id}`
    })),
    spotifyUrl:`https://open.spotify.com/album/${a.id}`
  }))

  return NextResponse.json({ releases })
}
