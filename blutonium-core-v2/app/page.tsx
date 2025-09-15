export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Blutonium Records</h1>
      <p className="text-lg mb-6">Since 1995 – Hardstyle, Trance & Techno</p>
      <nav className="space-x-4">
        <a href="/releases" className="text-blutonium-500 hover:underline">Releases</a>
        <a href="/merchandise" className="text-blutonium-500 hover:underline">Merchandise</a>
        <a href="/samples" className="text-blutonium-500 hover:underline">Samples</a>
        <a href="/videos" className="text-blutonium-500 hover:underline">Videos</a>
      </nav>
    </main>
  )
}
