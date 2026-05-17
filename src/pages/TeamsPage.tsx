import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'

// ─── TEAM DATA ─────────────────────────────────────────────────────────────────
const teams = [
  { name: 'Accio',               logo: '/images/teams/accio.png',               color: '#CA8A04', division: 'South West',    owner: 'Joel', seasons: 1, average: '9.00',  championships: 0 },
  { name: 'Angels',              logo: '/images/teams/angels.png',              color: '#DB2777', division: 'Rocky Mountains', owner: 'Joel', seasons: 6, average: '10.00', championships: 1 },
  { name: 'Big Cats',            logo: '/images/teams/big-cats.png',            color: '#C2410C', division: 'Great Plains',   owner: 'Sam',  seasons: 2, average: '16.00', championships: 0 },
  { name: 'Cheapskates',         logo: '/images/mml-logo.png',                  color: '#0F766E', division: 'Relegated',      owner: 'TBD',  seasons: 3, average: '11.33', championships: 0 },
  { name: 'Club Baby Seal',      logo: '/images/teams/club-baby-seal.png',      color: '#0369A1', division: 'South Central',  owner: 'Other',seasons: 1, average: '22.00', championships: 0 },
  { name: 'Deep Sky',            logo: '/images/teams/deep-sky.png',            color: '#0284C7', division: 'Great Plains',   owner: 'Jeff', seasons: 6, average: '7.83',  championships: 0 },
  { name: 'Double Truffle',      logo: '/images/teams/double-truffle.png',      color: '#92400E', division: 'South West',     owner: 'Sam',  seasons: 3, average: '9.33',  championships: 0 },
  { name: 'Expressos',           logo: '/images/teams/expressos.png',           color: '#78350F', division: 'New England',    owner: 'Jeff', seasons: 6, average: '6.67',  championships: 0 },
  { name: 'Flower Power',        logo: '/images/mml-logo.png',                  color: '#BE185D', division: 'Relegated',      owner: 'TBD',  seasons: 1, average: '20.00', championships: 0 },
  { name: 'Fracture',            logo: '/images/teams/fracture.png',            color: '#1E293B', division: 'Relegated',      owner: 'Sam',  seasons: 1, average: '24.00', championships: 0 },
  { name: 'GotToGo',             logo: '/images/teams/gottogo.png',             color: '#991B1B', division: 'South West',     owner: 'Joel', seasons: 2, average: '15.50', championships: 0 },
  { name: 'HemoGoblins',         logo: '/images/teams/hemo-goblins.png',        color: '#B91C1C', division: 'South Central',  owner: 'Sam',  seasons: 6, average: '5.17',  championships: 3 },
  { name: 'Jawbreakers',         logo: '/images/teams/jawbreakers.png',         color: '#EAB308', division: 'Pacific Coast',  owner: 'Joel', seasons: 3, average: '14.00', championships: 0 },
  { name: 'Mowers',              logo: '/images/teams/mowers.png',              color: '#15803D', division: 'Great Lakes',    owner: 'Jeff', seasons: 6, average: '11.17', championships: 1 },
  { name: 'Navigators',          logo: '/images/teams/navigators.png',          color: '#92400E', division: 'South East',     owner: 'Joel', seasons: 1, average: '26.00', championships: 0 },
  { name: 'Orcas',               logo: '/images/teams/orcas.png',               color: '#1E3A8A', division: 'South East',     owner: 'Other',seasons: 6, average: '16.00', championships: 0 },
  { name: 'Oysterium',           logo: '/images/mml-logo.png',                  color: '#4D7C0F', division: 'Relegated',      owner: 'TBD',  seasons: 2, average: '13.00', championships: 0 },
  { name: 'Pengys',              logo: '/images/teams/pengys.png',              color: '#111827', division: 'Great Plains',   owner: 'Sam',  seasons: 6, average: '7.67',  championships: 0 },
  { name: 'Peppermint Barks',    logo: '/images/teams/peppermint-barks.png',    color: '#DC2626', division: 'New England',    owner: 'Jeff', seasons: 1, average: '20.00', championships: 0 },
  { name: 'Peregrine',           logo: '/images/teams/peregrine.png',           color: '#0F766E', division: 'Rocky Mountains',owner: 'Sam',  seasons: 3, average: '10.67', championships: 0 },
  { name: 'Purps',               logo: '/images/teams/purps.png',               color: '#7E22CE', division: 'Great Lakes',    owner: 'Sam',  seasons: 6, average: '15.17', championships: 0 },
  { name: "Sam's Senior Sitizens",logo:'/images/teams/sams-senior-sitizens.png',color: '#475569', division: 'Pacific Coast',  owner: 'Sam',  seasons: 6, average: '10.33', championships: 0 },
  { name: 'Sauce Boss',          logo: '/images/teams/sauce-boss.png',          color: '#DC2626', division: 'Great Lakes',    owner: 'Jeff', seasons: 1, average: '8.00',  championships: 0 },
  { name: 'Sin',                 logo: '/images/teams/sin.png',                 color: '#0f0f0f', division: 'South Central',  owner: 'Joel', seasons: 6, average: '7.33',  championships: 0 },
  { name: 'Sorbetbes',           logo: '/images/teams/sorbetbes.png',           color: '#EA580C', division: 'Rocky Mountains',owner: 'Jeff', seasons: 6, average: '9.67',  championships: 1 },
  { name: 'Spartans',            logo: '/images/teams/spartans.png',            color: '#B45309', division: 'New England',    owner: 'Sam',  seasons: 1, average: '28.00', championships: 0 },
  { name: 'Specter',             logo: '/images/teams/specter.png',             color: '#166534', division: 'Rocky Mountains',owner: 'Sam',  seasons: 1, average: '18.00', championships: 0 },
  { name: 'Tankers',             logo: '/images/teams/tankers.png',             color: '#16A34A', division: 'Pacific Coast',  owner: 'Joel', seasons: 1, average: '6.00',  championships: 0 },
  { name: 'Tinsel Tango',        logo: '/images/teams/tinsel-tango.png',        color: '#1D4ED8', division: 'South West',     owner: 'Jeff', seasons: 1, average: '25.00', championships: 0 },
  { name: 'Trinitarians',        logo: '/images/teams/trinitarians.png',        color: '#D97706', division: 'New England',    owner: 'Joel', seasons: 6, average: '7.50',  championships: 0 },
  { name: 'Turquoise Tempest',   logo: '/images/teams/turquoise-tempest.png',   color: '#0F766E', division: 'South Central',  owner: 'Jeff', seasons: 1, average: '31.00', championships: 0 },
  { name: 'Twisters',            logo: '/images/teams/twisters.png',            color: '#B45309', division: 'Pacific Coast',  owner: 'Jeff', seasons: 2, average: '14.50', championships: 0 },
  { name: 'Vanilla Thunder',     logo: '/images/teams/vanilla-thunder.png',     color: '#CA8A04', division: 'Great Lakes',    owner: 'Joel', seasons: 6, average: '12.33', championships: 0 },
  { name: 'Yak Attack',          logo: '/images/teams/yak-attack.png',          color: '#166534', division: 'South East',     owner: 'Sam',  seasons: 6, average: '9.67',  championships: 0 },
  { name: 'Yellow Fever',        logo: '/images/teams/yellow-fever.png',        color: '#CA8A04', division: 'South East',     owner: 'Jeff', seasons: 6, average: '15.83', championships: 0 },
  { name: 'Zoomies',             logo: '/images/teams/zoomies.png',             color: '#2563EB', division: 'Great Plains',   owner: 'Joel', seasons: 1, average: '32.00', championships: 0 },
]

// ─── SEASON RESULTS ────────────────────────────────────────────────────────────
const teamSeasonResults: Record<string, { season: string; year: number; tournament: string; place: number }[]> = {
  HemoGoblins: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 1 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 1 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 7 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 1 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 17 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 4 },
  ],
  Trinitarians: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 8 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 9 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 3 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 16 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 3 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 5 },
  ],
  Tankers: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 6 },
  ],
  'Deep Sky': [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 9 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 7 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 6 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 5 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 9 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 10 },
  ],
  Pengys: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 5 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 5 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 13 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 9 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 2 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 11 },
  ],
  'Sauce Boss': [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 8 },
  ],
  Sin: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 7 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 11 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 2 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 2 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 8 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 14 },
  ],
  Sorbetbes: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 4 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 12 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 15 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 7 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 18 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 1 },
  ],
  Accio: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 9 },
  ],
  Expressos: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 10 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 10 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 9 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 3 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 5 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 3 },
  ],
  Mowers: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 2 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 15 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 1 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 18 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 14 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 16 },
  ],
  'Yak Attack': [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 3 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 3 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 11 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 10 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 23 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 7 },
  ],
  Angels: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 6 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 2 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 8 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 15 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 1 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 27 },
  ],
  'Double Truffle': [
    { season: 'S4', year: 2021, tournament: 'New Age MML', place: 20 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',      place: 4 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',   place: 19 },
  ],
  Peregrine: [
    { season: 'S4', year: 2021, tournament: 'New Age MML', place: 14 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',      place: 15 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',   place: 2 },
  ],
  "Sam's Senior Sitizens": [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 15 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 6 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 10 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 11 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 7 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 12 },
  ],
  Jawbreakers: [
    { season: 'S4', year: 2021, tournament: 'New Age MML', place: 6 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',      place: 6 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',   place: 29 },
  ],
  Oysterium: [
    { season: 'S4', year: 2021, tournament: 'New Age MML', place: 12 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',      place: 13 },
  ],
  'Vanilla Thunder': [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 12 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 8 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 5 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 4 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 21 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 24 },
  ],
  Orcas: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 11 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 13 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 12 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 17 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 19 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 23 },
  ],
  Twisters: [
    { season: 'S5', year: 2023, tournament: 'Mach 3',    place: 12 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 17 },
  ],
  Purps: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 13 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 4 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 14 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 19 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 10 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 30 },
  ],
  GotToGo: [
    { season: 'S5', year: 2023, tournament: 'Mach 3',    place: 16 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 15 },
  ],
  'Big Cats': [
    { season: 'S5', year: 2023, tournament: 'Mach 3',    place: 11 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 21 },
  ],
  'Yellow Fever': [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 16 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 14 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 16 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 13 },
    { season: 'S5', year: 2023, tournament: 'Mach 3',               place: 22 },
    { season: 'S6', year: 2025, tournament: 'Iowa Open',            place: 13 },
  ],
  Specter: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 18 },
  ],
  'Flower Power': [
    { season: 'S5', year: 2023, tournament: 'Mach 3', place: 20 },
  ],
  'Peppermint Barks': [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 20 },
  ],
  'Club Baby Seal': [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 22 },
  ],
  Fracture: [
    { season: 'S5', year: 2023, tournament: 'Mach 3', place: 24 },
  ],
  'Tinsel Tango': [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 25 },
  ],
  Navigators: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 26 },
  ],
  Spartans: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 28 },
  ],
  'Turquoise Tempest': [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 31 },
  ],
  Zoomies: [
    { season: 'S6', year: 2025, tournament: 'Iowa Open', place: 32 },
  ],
  Cheapskates: [
    { season: 'S1', year: 2016, tournament: 'Baldwin Invitational', place: 14 },
    { season: 'S2', year: 2017, tournament: 'Colorado Classic',     place: 16 },
    { season: 'S3', year: 2018, tournament: 'Michigan Games',       place: 4 },
    { season: 'S4', year: 2021, tournament: 'New Age MML',          place: 8 },
  ],
}

// ─── DIVISION ORDER ─────────────────────────────────────────────────────────────
const DIVISION_ORDER = [
  'Pacific Coast',
  'Rocky Mountains',
  'South Central',
  'South East',
  'South West',
  'Great Plains',
  'Great Lakes',
  'New England',
  'Relegated',
]

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function placeSuffix(n: number) {
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

// ─── TEAM BANNER ───────────────────────────────────────────────────────────────
function TeamBanner({ team }: { team: typeof teams[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/teams/${slugify(team.name)}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        height: 72,
        marginBottom: 6,
        textDecoration: 'none',
        background: team.color,
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        boxShadow: hovered ? `0 4px 20px ${team.color}55` : 'none',
        transition: 'all 0.18s ease',
      }}
    >
      <img src={team.logo} alt="" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: '90%', width: 'auto', objectFit: 'contain', opacity: 0.12, pointerEvents: 'none', filter: 'grayscale(30%)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, paddingLeft: 20, flex: 1 }}>
        <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff', letterSpacing: '0.04em', lineHeight: 1, display: 'block', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          {team.name}
        </span>
        {team.championships > 0 && (
          <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: 2 }}>
            {team.championships}× Champion
          </span>
        )}
      </div>

      {/* Stats — hidden on mobile */}
      <div className="banner-stats" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 20, paddingRight: 16, alignItems: 'center' }}>
        {[
          { label: 'Owner', val: team.owner },
          { label: 'Seasons', val: String(team.seasons) },
          { label: 'Avg. Place', val: team.average },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block' }}>{item.label}</span>
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 18, color: '#fff', display: 'block', lineHeight: 1.1 }}>{item.val}</span>
          </div>
        ))}
        <img src={team.logo} alt={team.name} style={{ height: 56, width: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))', flexShrink: 0, transition: 'transform 0.18s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
      </div>

      {/* Arrow — hidden on mobile */}
      <div className="banner-arrow" style={{ position: 'relative', zIndex: 1, width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', alignSelf: 'stretch', color: 'rgba(255,255,255,0.6)', fontSize: 16, flexShrink: 0 }}>
        →
      </div>
    </Link>
  )
}

// ─── DIVISION SLUG HELPER ──────────────────────────────────────────────────────
function divSlug(division: string) {
  return division.toLowerCase().replace(/\s+/g, '-')
}

function scrollToDiv(division: string) {
  const el = document.getElementById(`div-${divSlug(division)}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── TEAMS LIST PAGE ───────────────────────────────────────────────────────────
function TeamsListPage() {
  const [activeDiv, setActiveDiv] = useState<string | null>(null)

  const activeDivisions = DIVISION_ORDER.filter(
    (d) => d !== 'Relegated' && teams.some((t) => t.division === d)
  )

  return (
    <main style={{ background: '#fff' }}>
      <style>{`
        @media (max-width: 640px) {
          .banner-stats { display: none !important; }
          .banner-arrow { display: none !important; }
        }
      `}</style>

      <section style={{ background: '#1a2a6e', position: 'relative', overflow: 'hidden', paddingBottom: 0 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '160%', height: '100%', background: '#141f55', transform: 'skewX(-18deg) translateX(-20%)', top: 0, left: '30%' }} />
          <div style={{ position: 'absolute', width: '70%', height: '100%', background: '#0d1540', transform: 'skewX(-18deg) translateX(-10%)', top: 0, left: '50%', opacity: 0.7 }} />
          <div style={{ position: 'absolute', width: 8, height: '130%', background: '#C8102E', transform: 'skewX(-18deg)', top: '-15%', left: '48%', opacity: 0.9 }} />
          <div style={{ position: 'absolute', width: 3, height: '130%', background: '#e84060', transform: 'skewX(-18deg)', top: '-15%', left: '49.5%', opacity: 0.5 }} />
          <div style={{ position: 'absolute', width: 4, height: '130%', background: '#C8102E', transform: 'skewX(-18deg)', top: '-15%', left: '75%', opacity: 0.3 }} />
          <div style={{ position: 'absolute', width: 2, height: '130%', background: '#e84060', transform: 'skewX(-18deg)', top: '-15%', left: '76%', opacity: 0.2 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#C8102E', opacity: 0.6 }} />
          <img src="/images/mml-logo.png" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', height: '130%', width: 'auto', objectFit: 'contain', opacity: 0.05, filter: 'grayscale(100%) brightness(2)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '3.5rem 1.5rem 0', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,16,46,0.4)', padding: '5px 14px 5px 10px' }}>
              <span style={{ display: 'block', width: 20, height: 2, background: '#C8102E', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8102E' }}>Franchise Directory</span>
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 6vw, 76px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.02em', lineHeight: 0.92, marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>MML Teams</h1>
            <div style={{ width: 48, height: 3, background: '#C8102E', marginBottom: '1rem' }} />
            <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(13px, 2.5vw, 16px)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em', marginBottom: '2rem', maxWidth: 400, lineHeight: 1.6 }}>
              {teams.length} franchises across {activeDivisions.length} active divisions — sorted by average placement within each division.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignSelf: 'center', paddingBottom: '2rem' }}>
            {[
              { num: String(teams.length), label: 'Total Franchises' },
              { num: String(activeDivisions.length), label: 'Active Divisions' },
              { num: '6', label: 'Seasons Played' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid #C8102E', padding: '10px 20px', minWidth: 140 }}>
                <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 36, color: '#fff', lineHeight: 1 }}>{s.num}</span>
                <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginTop: '1rem' }}>
            {activeDivisions.map((division) => (
              <button
                key={division}
                onClick={() => { scrollToDiv(division); setActiveDiv(division) }}
                style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: activeDiv === division ? '#fff' : 'rgba(255,255,255,0.45)', background: 'transparent', border: 'none', borderTop: activeDiv === division ? '3px solid #C8102E' : '3px solid transparent', padding: '12px 14px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (activeDiv !== division) e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { if (activeDiv !== division) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
              >
                {division}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 3, background: '#C8102E' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {DIVISION_ORDER.map((division) => {
          const divTeams = teams
            .filter((t) => t.division === division)
            .sort((a, b) => parseFloat(a.average) - parseFloat(b.average))
          if (divTeams.length === 0) return null
          return (
            <div key={division} id={`div-${divSlug(division)}`} style={{ marginBottom: '2.5rem', scrollMarginTop: 80 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, paddingBottom: 8, borderBottom: '2px solid #e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: -2, left: 0, width: 36, height: 2, background: '#C8102E' }} />
                <h2 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 26, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.03em' }}>{division}</h2>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>{divTeams.length} {divTeams.length === 1 ? 'team' : 'teams'}</span>
              </div>
              <div>{divTeams.map((team) => <TeamBanner key={team.name} team={team} />)}</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

// ─── TEAM DETAIL PAGE ──────────────────────────────────────────────────────────
function TeamDetailPage() {
  const { slug } = useParams()
  const team = teams.find((t) => slugify(t.name) === slug)

  if (!team) {
    return (
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', color: '#1a2a6e' }}>Team Not Found</h1>
        <Link to="/teams" style={{ display: 'inline-block', marginTop: 20, fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8102E', textDecoration: 'none' }}>← Back to Teams</Link>
      </main>
    )
  }

  const results = teamSeasonResults[team.name] ?? []

  return (
    <main style={{ background: '#fff' }}>
      <section style={{ position: 'relative', overflow: 'hidden', background: team.color, minHeight: 200, display: 'flex', alignItems: 'center', borderBottom: '3px solid rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '70%', height: '100%', background: 'rgba(0,0,0,0.2)', transform: 'skewX(-18deg)', right: '-10%', top: 0 }} />
        </div>
        <img src={team.logo} alt="" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: '140%', width: 'auto', objectFit: 'contain', opacity: 0.1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1.5rem' }}>
          <div>
            <Link to="/teams" style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>← All Teams</Link>
            <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ width: 16, height: 2, background: 'rgba(255,255,255,0.4)', display: 'block' }} />
              {team.division} Division · {team.owner}
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 6vw, 72px)', textTransform: 'uppercase', color: '#fff', lineHeight: 0.95, letterSpacing: '0.02em', marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{team.name}</h1>
            {team.championships > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
                🏆 {team.championships}× League Champion
              </div>
            )}
          </div>
          <img src={team.logo} alt={team.name} style={{ height: 'clamp(80px, 14vw, 140px)', width: 'clamp(80px, 14vw, 140px)', objectFit: 'contain', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))', flexShrink: 0 }} />
        </div>
      </section>

      <div style={{ background: '#fff', borderBottom: '3px solid #C8102E', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { num: String(team.seasons), label: 'Seasons Played' },
          { num: team.average,         label: 'Avg. Placement' },
          { num: String(team.championships), label: 'Championships' },
        ].map((s, i) => (
          <div key={s.label} style={{ textAlign: 'center', padding: '1rem 0.5rem', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
            <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 5vw, 36px)', color: '#1a2a6e', lineHeight: 1 }}>{s.num}</span>
            <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 'clamp(8px, 2vw, 10px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginTop: 3 }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {results.length > 0 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.05em', marginBottom: 12 }}>
              <span style={{ width: 16, height: 2, background: '#C8102E', display: 'block' }} />
              Season Results
            </div>
            <div style={{ border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr 80px', padding: '7px 16px', background: '#f4f6fb', borderBottom: '1px solid #e5e7eb' }}>
                {['Season', 'Year', 'Tournament', 'Place'].map((h) => (
                  <span key={h} style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', textAlign: h === 'Place' ? 'right' : 'left' }}>{h}</span>
                ))}
              </div>
              {results.map((r, i) => (
                <div key={r.season} style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr 80px', padding: '10px 16px', borderBottom: i < results.length - 1 ? '1px solid #f3f4f6' : 'none', background: r.place === 1 ? '#fff7ed' : '#fff', borderLeft: r.place === 1 ? `3px solid ${team.color}` : '3px solid transparent', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, color: '#9ca3af', letterSpacing: '0.1em' }}>{r.season}</span>
                  <span style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 13, color: '#6b7280' }}>{r.year}</span>
                  <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 15, color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {r.tournament}
                    {r.place === 1 && <span style={{ fontSize: 14 }}>🏆</span>}
                  </span>
                  <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 20, color: r.place <= 3 ? team.color : '#6b7280', textAlign: 'right' }}>{placeSuffix(r.place)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed #e5e7eb' }}>
            <p style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.1em' }}>Season results coming soon</p>
          </div>
        )}
      </div>
    </main>
  )
}

// ─── TEAMS PAGE ROUTER ─────────────────────────────────────────────────────────
export default function TeamsPage() {
  return (
    <Routes>
      <Route path="/" element={<TeamsListPage />} />
      <Route path="/:slug" element={<TeamDetailPage />} />
    </Routes>
  )
}