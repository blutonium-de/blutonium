import NavBar from "./components/NavBar"

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <NavBar />

      {/* Hero – Full-bleed, unabhängig vom zentrierten Layout-Container */}
      <section className="relative pt-16 w-screen -ml-[calc(50vw-50%)]">
        <div className="relative w-full" style={{ height: "68vh", minHeight: 480 }}>
          {/* Hintergrundbild */}
          <img
            src="/hero-2025-09-17.jpg"
            alt="Blutonium Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* Inhalt */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="Blutonium Records Logo"
                className="h-32 w-auto mx-auto"
              />
            </div>

            <p className="max-w-2xl text-base sm:text-lg opacity-90 mx-auto">
              Since 1995 — Hardstyle · Trance · Techno. Releases, Merch, Samples & Videos.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="/releases" className="btn">Releases</a>
              <a href="/merchandise" className="btn">Merchandise</a>
              <a href="/samples" className="btn">Hardstyle Samples</a>
              <a href="/videos" className="btn">Videos</a>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm opacity-80">
              <a className="link" href="https://open.spotify.com/artist/2qNYTspRpXKdl4MJ6TGC5T" target="_blank" rel="noreferrer">Spotify</a>
              <a className="link" href="https://music.apple.com" target="_blank" rel="noreferrer">Apple Music</a>
              <a className="link" href="https://www.youtube.com/@BlutoniumRecords" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature-Raster (bleibt zentriert durch das <main> im layout.tsx) */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-6 md:grid-cols-3">
        <article className="card p-6">
          <h3 className="font-semibold mb-2">Aktuelle Veröffentlichungen</h3>
          <p className="opacity-80 text-sm">Alle Radio/Edits mit Cover & direkten Spotify-Links.</p>
          <a href="/releases" className="mt-4 inline-block link">Zu den Releases →</a>
        </article>
        <article className="card p-6">
          <h3 className="font-semibold mb-2">Merch & Classics</h3>
          <p className="opacity-80 text-sm">CDs, Compilations, Hoodies, Caps & Autogramme.</p>
          <a href="/merchandise" className="mt-4 inline-block link">Zum Shop →</a>
        </article>
        <article className="card p-6">
          <h3 className="font-semibold mb-2">Hardstyle Samples</h3>
          <p className="opacity-80 text-sm">Blutonium pres. Hardstyle Samples Vol. 1 & 2 (Download).</p>
          <a href="/samples" className="mt-4 inline-block link">Samples holen →</a>
        </article>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 opacity-70 text-sm text-center">
        © {new Date().getFullYear()} Blutonium Records · Owner/Artist: Blutonium Boy
      </footer>
    </>
  )
}
