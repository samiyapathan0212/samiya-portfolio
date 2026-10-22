import { useState } from 'react'
import { About } from '../components/sections/About'
import { CertificateDialog } from '../components/sections/CertificateDialog'
import { Certificates } from '../components/sections/Certificates'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta(
    'Samiya Pathan — Data & Software Engineering',
    'Portfolio of Samiya Pathan: demand forecasting, data analytics and full-stack software projects, with case studies, internships and certificates.',
  )
  const [certificateId, setCertificateId] = useState<string | null>(null)

  return (
    <>
      <Hero />
      <Projects />
      <Experience onOpenCertificate={setCertificateId} />
      <Skills />
      <Certificates onOpen={setCertificateId} />
      <About />
      <Contact />
      <CertificateDialog openId={certificateId} onChange={setCertificateId} />
    </>
  )
}
