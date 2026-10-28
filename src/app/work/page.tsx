import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { ProjectExplorer } from '@/components/studio/ProjectExplorer';
import { ContactCta } from '@/components/studio/ContactCta';
import { Asterisk } from '@/components/studio/Marks';
export const metadata: Metadata = {
  title: 'The work',
  description:
    'Explore websites, marketplaces and web applications built by MPDEE Development, including iTrader and Voiceover Studio Finder.',
  alternates: { canonical: '/work' },
};
export default function WorkPage() {
  return (
    <>
      <div className="container">
        <header className="page-intro">
          <div className="eyebrow">The work / A selection of projects</div>
          <h1>
            Selected
            <br />
            <span className="serif-word">work.</span>
            <Asterisk />
          </h1>
          <p>
            A selection of websites and web applications. Open a project to read
            what it does and how it was put together.
          </p>
        </header>
        <section className="work-collection" aria-label="Project collection">
          <ProjectExplorer projects={projects} />
        </section>
      </div>
      <ContactCta />
    </>
  );
}
