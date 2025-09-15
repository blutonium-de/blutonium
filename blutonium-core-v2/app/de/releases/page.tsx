export const dynamic = 'force-dynamic' // nicht im Build prerendern

type Track = { id:string; title:string; isRadioEdit:boolean; previewUrl?:string; spotifyUrl:string }
type Release = {
  id:string; year:number; type:string; title:string; label?:string;
  artists:{id:string;name:string;url:string}[]; coverUrl:string; releaseDate:string; tracks:Track[]; spotifyUrl:string
}

function getBaseUrl() {
  // Nutze VERCEL_URL im Build/Runtime, ansonsten SITE_URL, lokal fallback
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.SITE_URL) return process.env.SITE_URL
  return 'http://localhost:3000'
}

async function fetchReleases(): Promise<Release[]> {
  const base = getBaseUrl()
  const r = await fetch(`${base}/api/releases`, { cache: 'no-store' })
  const { releases } = await r.json()
  return (releases || []) as Release[]
}

export default async function Page(){
  const releases = await fetchReleases()
  const byYear = releases.reduce((acc:Record<string,Release[]>,r)=>{ (acc[r.year]=acc[r.year]||[]).push(r); return acc },{})
  const years = Object.keys(byYear).sort((a,b)=>+b-+a)
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Releases</h1>
      {years.length === 0 && (
        <p className="opacity-80">Noch keine Daten – setze später deine Spotify-Keys (SPOTIFY_CLIENT_ID/SECRET) in Vercel.</p>
      )}
      {years.map(y=>(
        <div key={y} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{y}</h2>
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {byYear[y].map(r=>(
              <article key={r.id} className="card overflow-hidden">
                {r.coverUrl ? <img src={r.coverUrl} alt={r.title} className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square" />}
                <div className="p-4">
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-sm opacity-80">{r.artists.map(a=>a.name).join(', ')}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {r.tracks.filter(t=>t.isRadioEdit).map(t=>(
                      <a key={t.id} href={t.spotifyUrl} className="text-xs px-2 py-1 border rounded" target="_blank" rel="noreferrer">
                        {t.title}
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a className="link" href={r.spotifyUrl} target="_blank" rel="noreferrer">Spotify</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
