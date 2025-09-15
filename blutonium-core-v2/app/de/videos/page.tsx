type Video = { id:string; title:string; thumb?:string; publishedAt?:string }
async function getVideos(): Promise<Video[]> {
  const r = await fetch(`${process.env.SITE_URL || ''}/api/youtube`, { next:{ revalidate: 21600 } })
  const { videos } = await r.json()
  return videos as Video[]
}
export default async function Page(){
  const videos = await getVideos()
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">YouTube</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {videos.map(v=>(
          <article key={v.id} className="card overflow-hidden">
            <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            <div className="p-4"><h3 className="font-semibold">{v.title}</h3></div>
          </article>
        ))}
      </div>
    </section>
  )
}
