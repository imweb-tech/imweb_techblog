const CONFIG = require("../../../site.config")

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line mt-24 py-10 text-sm text-ink-500">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-semibold text-ink-700">{CONFIG.blog.title}</div>
          <div>{CONFIG.blog.description}</div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href={CONFIG.social.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-ink-900">
            아임웹
          </a>
          <a href={CONFIG.social.careers} target="_blank" rel="noopener noreferrer" className="hover:text-ink-900">
            채용
          </a>
          <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink-900">
            GitHub
          </a>
          <span>© {year} Imweb</span>
        </div>
      </div>
    </footer>
  )
}
