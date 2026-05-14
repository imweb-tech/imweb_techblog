const CONFIG = require("../../../site.config")

export default function Footer() {
  const year = new Date().getFullYear()
  const { company } = CONFIG
  const companyRows: { label: string; value: string }[] = [
    { label: "상호명", value: company.name },
    { label: "대표이사", value: company.ceo },
    { label: "개인정보책임자", value: company.privacyOfficer },
    { label: "사업자등록번호", value: company.businessNumber },
    { label: "통신판매업신고번호", value: company.ecommerceNumber },
    { label: "본사", value: company.address },
  ]

  return (
    <footer className="border-t border-line mt-24 pt-10 pb-12 text-sm text-ink-500">
      <div className="container mx-auto flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <div className="font-semibold text-ink-900 text-base">
            {CONFIG.blog.title}
          </div>
          <div className="mt-1 text-ink-700">{CONFIG.blog.description}</div>
        </div>
        <nav className="flex flex-wrap items-center gap-4">
          <a
            href={CONFIG.social.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900"
          >
            아임웹
          </a>
          <a
            href={CONFIG.social.careers}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-900"
          >
            채용
          </a>
          <a
            href={`mailto:${CONFIG.social.contactEmail}`}
            className="hover:text-ink-900"
          >
            Contact
          </a>
        </nav>
      </div>

      <div className="container mx-auto mt-10 border-t border-line pt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs leading-relaxed text-ink-500">
          {companyRows.map((row) => (
            <div key={row.label} className="flex gap-2">
              <dt className="shrink-0 text-ink-700">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          <div className="flex gap-2">
            <dt className="shrink-0 text-ink-700">Contact</dt>
            <dd>
              <a
                href={`mailto:${CONFIG.social.contactEmail}`}
                className="hover:text-ink-900"
              >
                {CONFIG.social.contactEmail}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-6 text-xs text-ink-500">© {year} Imweb</div>
      </div>
    </footer>
  )
}
