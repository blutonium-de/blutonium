// lib/spotify.ts
type TokenResponse = { access_token: string, token_type: string, expires_in: number }

export async function getSpotifyToken(): Promise<string> {
  const id = process.env.SPOTIFY_CLIENT_ID
  const secret = process.env.SPOTIFY_CLIENT_SECRET
  if (!id || !secret) throw new Error('Missing Spotify credentials')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(id + ':' + secret).toString('base64')
    },
    body: 'grant_type=client_credentials'
  })
  if (!res.ok) throw new Error('Spotify token failed')
  const data: TokenResponse = await res.json()
  return data.access_token
}

export const ARTISTS: string[] = [
  '2qNYTspRpXKdl4MJ6TGC5T', // Blutonium Boy
  '5vbmx7Q2CFSipF64kCGC3N', // Blutonium Boys
  '4DUS9SX3NDld2Um49K0Cas', // DJ Neo
  '5XuEu3HhkQqETUbam43a8p'  // Pila & Blutonium Boy
]
