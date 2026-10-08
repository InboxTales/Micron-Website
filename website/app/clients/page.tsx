import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Eyebrow, PageHero } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";
import { type Client, clients, projectPhotos, quotePath } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Clients & Projects | Micron Wires",
  description:
    "Micron Wires has supplied and installed fencing for Raghava Constructions, S R Group, One Developers, SGD Developers and Government of Telangana and Andhra Pradesh projects.",
  path: "/clients/",
});

function ClientTile({ client, dark }: { client: Client; dark?: boolean }) {
  return (
    <li className={`logo-tile${dark ? " logo-tile--dark" : ""}`} data-reveal>
      <div className="logo-tile__plate">
        {client.logo ? (
          <Image src={client.logo.src} alt={`${client.name} logo`} width={client.logo.width} height={client.logo.height} />
        ) : (
          <span className="logo-tile__mark" aria-hidden="true">
            {client.mark}
          </span>
        )}
      </div>
      <h3 className="logo-tile__name">{client.name}</h3>
      {client.detail && <p className="logo-tile__detail">{client.detail}</p>}
    </li>
  );
}

export default function ClientsPage() {
  return (
    <>
      <PageHero
        image="projectSolar"
        path="/clients/"
        crumb="Clients"
        eyebrow="Clients & Projects"
        title="Trusted on Private and Government Projects"
        intro="Since 2008, Micron Wires has supplied fencing materials and installed fencing for developers, companies and government projects in Telangana and Andhra Pradesh."
      />

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow>Private Sector</Eyebrow>
              <h2 className="h2">Developers and Companies We&apos;ve Worked With</h2>
            </div>
            <p className="section-head__aside">
              Fencing materials, installation and servicing for real estate developers and private companies.
            </p>
          </div>
          <ul className="client-grid">
            {clients.private.map((c) => (
              <ClientTile key={c.name} client={c} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow light>Government &amp; Public Sector</Eyebrow>
              <h2 className="h2">Government and Public Sector Projects</h2>
            </div>
            <p className="section-head__aside section-head__aside--light">
              Fencing supply and installation for state government works, public utilities and solar projects.
            </p>
          </div>
          <ul className="client-grid">
            {clients.government.map((c) => (
              <ClientTile key={c.name} client={c} dark />
            ))}
          </ul>
          <p className="client-note">
            Logos and emblems belong to their respective owners and are shown only to identify past projects. They
            do not imply endorsement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow>From Our Sites</Eyebrow>
              <h2 className="h2">Previous Projects in Pictures</h2>
            </div>
            <Link href={quotePath} className="link-arrow section-head__aside">
              Discuss Your Project
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="project-gallery">
            {projectPhotos.map((p) => (
              <figure key={p.src} className="project-photo" data-reveal>
                <Image
                  src={p.src}
                  alt={p.caption}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
