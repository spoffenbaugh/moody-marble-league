import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'

const TEAM_THEMES: Record<string, {
  bg: string; accent: string; accentLight: string
  stripe1: string; stripe2: string; textMuted: string
}> = {
  HemoGoblins: { bg: '#0f0505', accent: '#C8102E', accentLight: '#e84060', stripe1: '#1a0808', stripe2: '#2a0a0a', textMuted: 'rgba(255,255,255,0.55)' },
  Sorbetbes:   { bg: '#0d1b3e', accent: '#E87722', accentLight: '#f59340', stripe1: '#0a1530', stripe2: '#1a2a6e', textMuted: 'rgba(255,255,255,0.55)' },
  Trinitarians:{ bg: '#12100a', accent: '#9B6B3A', accentLight: '#c4935a', stripe1: '#1a1508', stripe2: '#221a0a', textMuted: 'rgba(255,255,255,0.55)' },
  Angels:      { bg: '#1a0a12', accent: '#DB2777', accentLight: '#f472b6', stripe1: '#220a16', stripe2: '#2e0d1e', textMuted: 'rgba(255,255,255,0.55)' },
  Mowers:      { bg: '#061208', accent: '#15803D', accentLight: '#22c55e', stripe1: '#081a0b', stripe2: '#0d240f', textMuted: 'rgba(255,255,255,0.55)' },
  Sin:         { bg: '#0a0a0a', accent: '#6b21a8', accentLight: '#a855f7', stripe1: '#111', stripe2: '#1a1a1a', textMuted: 'rgba(255,255,255,0.55)' },
  default:     { bg: '#1a2a6e', accent: '#C8102E', accentLight: '#e84060', stripe1: '#141f55', stripe2: '#0d1540', textMuted: 'rgba(255,255,255,0.55)' },
}

function getTheme(teamName: string) {
  return TEAM_THEMES[teamName] ?? TEAM_THEMES.default
}

const TEAM_LOGOS: Record<string, string> = {
  HemoGoblins:             '/images/teams/hemo-goblins.png',
  Trinitarians:            '/images/teams/trinitarians.png',
  Tankers:                 '/images/teams/tankers.png',
  'Deep Sky':              '/images/teams/deep-sky.png',
  Pengys:                  '/images/teams/pengys.png',
  'Sauce Boss':            '/images/teams/sauce-boss.png',
  Sin:                     '/images/teams/sin.png',
  Sorbetbes:               '/images/teams/sorbetbes.png',
  Accio:                   '/images/teams/accio.png',
  Expressos:               '/images/teams/expressos.png',
  Mowers:                  '/images/teams/mowers.png',
  'Yak Attack':            '/images/teams/yak-attack.png',
  Angels:                  '/images/teams/angels.png',
  'Double Truffle':        '/images/teams/double-truffle.png',
  Peregrine:               '/images/teams/peregrine.png',
  "Sam's Senior Sitizens": '/images/teams/sams-senior-sitizens.png',
  Jawbreakers:             '/images/teams/jawbreakers.png',
  Oysterium:               '/images/mml-logo.png',
  'Vanilla Thunder':       '/images/teams/vanilla-thunder.png',
  Orcas:                   '/images/teams/orcas.png',
  Twisters:                '/images/teams/twisters.png',
  Purps:                   '/images/teams/purps.png',
  GotToGo:                 '/images/teams/gottogo.png',
  'Big Cats':              '/images/teams/big-cats.png',
  'Yellow Fever':          '/images/teams/yellow-fever.png',
  Specter:                 '/images/teams/specter.png',
  'Flower Power':          '/images/mml-logo.png',
  'Peppermint Barks':      '/images/teams/peppermint-barks.png',
  'Club Baby Seal':        '/images/teams/club-baby-seal.png',
  Fracture:                '/images/teams/fracture.png',
  'Tinsel Tango':          '/images/teams/tinsel-tango.png',
  Navigators:              '/images/teams/navigators.png',
  Spartans:                '/images/teams/spartans.png',
  'Turquoise Tempest':     '/images/teams/turquoise-tempest.png',
  Zoomies:                 '/images/teams/zoomies.png',
  Cheapskates:             '/images/mml-logo.png',
}

function getTeamLogo(name: string) {
  return TEAM_LOGOS[name] ?? '/images/mml-logo.png'
}

interface SeasonData {
  id: string
  season: string
  year: number
  tournament: string
  champion: string
  location: string
  tagline: string
  story: string
  articleFile: string
  standings: { place: number; team: string }[]
}

const SEASONS: SeasonData[] = [
  {
    id: 's1',
    season: 'Season 1',
    year: 2016,
    tournament: 'Baldwin Invitational',
    champion: 'HemoGoblins',
    location: 'Baldwin, MI',
    tagline: 'Where it all began.',
    story: 'The inaugural MML tournament brought together 16 teams in what would become the league\'s founding moment. HemoGoblins entered seeded 12th and left as champions, setting the tone for a dynasty nobody saw coming.',
    articleFile: '/article/baldwin_invitational_article.html',
    standings: [
      { place: 1,  team: 'HemoGoblins' },
      { place: 2,  team: 'Mowers' },
      { place: 3,  team: 'Yak Attack' },
      { place: 4,  team: 'Sorbetbes' },
      { place: 5,  team: 'Pengys' },
      { place: 6,  team: 'Angels' },
      { place: 7,  team: 'Sin' },
      { place: 8,  team: 'Trinitarians' },
      { place: 9,  team: 'Deep Sky' },
      { place: 10, team: 'Expressos' },
      { place: 11, team: 'Orcas' },
      { place: 12, team: 'Vanilla Thunder' },
      { place: 13, team: 'Purps' },
      { place: 14, team: 'Cheapskates' },
      { place: 15, team: "Sam's Senior Sitizens" },
      { place: 16, team: 'Yellow Fever' },
    ],
  },
  {
    id: 's2',
    season: 'Season 2',
    year: 2017,
    tournament: 'Colorado Classic',
    champion: 'HemoGoblins',
    location: 'Colorado',
    tagline: 'Back-to-back. The dynasty declares itself.',
    story: 'HemoGoblins returned and made it look easy, winning the Colorado Classic to claim back-to-back titles with a nine-point margin of victory.',
    articleFile: '/article/colorado_classic_article.html',
    standings: [
      { place: 1,  team: 'HemoGoblins' },
      { place: 2,  team: 'Angels' },
      { place: 3,  team: 'Yak Attack' },
      { place: 4,  team: 'Purps' },
      { place: 5,  team: 'Pengys' },
      { place: 6,  team: "Sam's Senior Sitizens" },
      { place: 7,  team: 'Deep Sky' },
      { place: 8,  team: 'Vanilla Thunder' },
      { place: 9,  team: 'Trinitarians' },
      { place: 10, team: 'Expressos' },
      { place: 11, team: 'Sin' },
      { place: 12, team: 'Sorbetbes' },
      { place: 13, team: 'Orcas' },
      { place: 14, team: 'Yellow Fever' },
      { place: 15, team: 'Mowers' },
      { place: 16, team: 'Cheapskates' },
    ],
  },
  {
    id: 's3',
    season: 'Season 3',
    year: 2018,
    tournament: 'Michigan Games',
    champion: 'Sin',
    location: 'Michigan',
    tagline: 'The dynasty falls. Sin claims the crown.',
    story: 'Sin claimed their first and only championship at the Michigan Games, edging out the Mowers in second. The HemoGoblins dynasty was interrupted, finishing 6th. Cheapskates made a surprising podium appearance in 3rd.',
    articleFile: '/article/michigan_games_article.html',
    standings: [
      { place: 1,  team: 'Sin' },
      { place: 2,  team: 'Mowers' },
      { place: 3,  team: 'Cheapskates' },
      { place: 4,  team: 'Trinitarians' },
      { place: 5,  team: 'Deep Sky' },
      { place: 6,  team: 'HemoGoblins' },
      { place: 7,  team: 'Vanilla Thunder' },
      { place: 8,  team: 'Angels' },
      { place: 9,  team: 'Expressos' },
      { place: 10, team: "Sam's Senior Sitizens" },
      { place: 11, team: 'Yak Attack' },
      { place: 12, team: 'Orcas' },
      { place: 13, team: 'Pengys' },
      { place: 14, team: 'Purps' },
      { place: 15, team: 'Sorbetbes' },
      { place: 16, team: 'Yellow Fever' },
    ],
  },
  {
    id: 's4',
    season: 'Season 4',
    year: 2021,
    tournament: 'New Age MML',
    champion: 'HemoGoblins',
    location: 'Michigan',
    tagline: 'Three years away. Still the best.',
    story: 'After a three-year gap, the MML returned with an expanded field of 20 teams. HemoGoblins picked up right where they left off, claiming their third championship via the Super Roll.',
    articleFile: '/article/new_age_mml_article.html',
    standings: [
      { place: 1,  team: 'HemoGoblins' },
      { place: 2,  team: 'Sin' },
      { place: 3,  team: 'Expressos' },
      { place: 4,  team: 'Vanilla Thunder' },
      { place: 5,  team: 'Double Truffle' },
      { place: 6,  team: 'Deep Sky' },
      { place: 7,  team: 'Jawbreakers' },
      { place: 8,  team: 'Sorbetbes' },
      { place: 9,  team: 'Cheapskates' },
      { place: 10, team: 'Pengys' },
      { place: 11, team: 'Yak Attack' },
      { place: 12, team: "Sam's Senior Sitizens" },
      { place: 13, team: 'Oysterium' },
      { place: 14, team: 'Yellow Fever' },
      { place: 15, team: 'Peregrine' },
      { place: 16, team: 'Angels' },
      { place: 17, team: 'Trinitarians' },
      { place: 18, team: 'Orcas' },
      { place: 19, team: 'Mowers' },
      { place: 20, team: 'Purps' },
    ],
  },
  {
    id: 's5',
    season: 'Season 5',
    year: 2023,
    tournament: 'Mach 3',
    champion: 'Angels',
    location: 'Iowa',
    tagline: 'Seven years of waiting. One perfect run.',
    story: 'Angels finally broke through after years as bridesmaids, winning the Mach 3 in dominant fashion. HemoGoblins suffered their worst-ever finish at 17th.',
    articleFile: '/article/mach3_article.html',
    standings: [
      { place: 1,  team: 'Angels' },
      { place: 2,  team: 'Pengys' },
      { place: 3,  team: 'Trinitarians' },
      { place: 4,  team: 'Double Truffle' },
      { place: 5,  team: 'Expressos' },
      { place: 6,  team: 'Jawbreakers' },
      { place: 7,  team: "Sam's Senior Sitizens" },
      { place: 8,  team: 'Sin' },
      { place: 9,  team: 'Deep Sky' },
      { place: 10, team: 'Purps' },
      { place: 11, team: 'Big Cats' },
      { place: 12, team: 'Twisters' },
      { place: 13, team: 'Oysterium' },
      { place: 14, team: 'Mowers' },
      { place: 15, team: 'Peregrine' },
      { place: 16, team: 'GotToGo' },
      { place: 17, team: 'HemoGoblins' },
      { place: 18, team: 'Sorbetbes' },
      { place: 19, team: 'Orcas' },
      { place: 20, team: 'Flower Power' },
      { place: 21, team: 'Vanilla Thunder' },
      { place: 22, team: 'Yellow Fever' },
      { place: 23, team: 'Yak Attack' },
      { place: 24, team: 'Fracture' },
    ],
  },
  {
    id: 's6',
    season: 'Season 6',
    year: 2025,
    tournament: 'Iowa Open',
    champion: 'Sorbetbes',
    location: 'Iowa',
    tagline: 'Nine years. One name change. One trophy.',
    story: 'Sorbetbes — once the Broncos — finally claimed the championship they had chased for nine years. The field expanded to 32 teams, the largest in MML history.',
    articleFile: '/article/iowa_open_article.html',
    standings: [
      { place: 1,  team: 'Sorbetbes' },
      { place: 2,  team: 'Peregrine' },
      { place: 3,  team: 'Expressos' },
      { place: 4,  team: 'HemoGoblins' },
      { place: 5,  team: 'Trinitarians' },
      { place: 6,  team: 'Tankers' },
      { place: 7,  team: 'Yak Attack' },
      { place: 8,  team: 'Sauce Boss' },
      { place: 9,  team: 'Accio' },
      { place: 10, team: 'Deep Sky' },
      { place: 11, team: 'Pengys' },
      { place: 12, team: "Sam's Senior Sitizens" },
      { place: 13, team: 'Yellow Fever' },
      { place: 14, team: 'Sin' },
      { place: 15, team: 'GotToGo' },
      { place: 16, team: 'Mowers' },
      { place: 17, team: 'Twisters' },
      { place: 18, team: 'Specter' },
      { place: 19, team: 'Double Truffle' },
      { place: 20, team: 'Peppermint Barks' },
      { place: 21, team: 'Big Cats' },
      { place: 22, team: 'Club Baby Seal' },
      { place: 23, team: 'Orcas' },
      { place: 24, team: 'Vanilla Thunder' },
      { place: 25, team: 'Tinsel Tango' },
      { place: 26, team: 'Navigators' },
      { place: 27, team: 'Angels' },
      { place: 28, team: 'Spartans' },
      { place: 29, team: 'Jawbreakers' },
      { place: 30, team: 'Purps' },
      { place: 31, team: 'Turquoise Tempest' },
      { place: 32, team: 'Zoomies' },
    ],
  },
]

function placeSuffix(n: number) {
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

function TimelinePage() {
  return (
    <main style={{ background: '#fff' }}>
      <section style={{ background: '#1a2a6e', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '160%', height: '100%', background: '#141f55', transform: 'skewX(-18deg) translateX(-20%)', top: 0, left: '30%' }} />
          <div style={{ position: 'absolute', width: '70%', height: '100%', background: '#0d1540', transform: 'skewX(-18deg) translateX(-10%)', top: 0, left: '50%', opacity: 0.7 }} />
          <div style={{ position: 'absolute', width: 8, height: '130%', background: '#C8102E', transform: 'skewX(-18deg)', top: '-15%', left: '48%', opacity: 0.9 }} />
          <div style={{ position: 'absolute', width: 3, height: '130%', background: '#e84060', transform: 'skewX(-18deg)', top: '-15%', left: '49.5%', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#C8102E', opacity: 0.6 }} />
          <img src="/images/mml-logo.png" alt="" aria-hidden="true" style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', height: '130%', opacity: 0.05, filter: 'grayscale(100%) brightness(2)', pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,16,46,0.4)', padding: '5px 14px 5px 10px' }}>
            <span style={{ display: 'block', width: 20, height: 2, background: '#C8102E', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8102E' }}>Est. 2016</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 8vw, 76px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.02em', lineHeight: 0.92, marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>League History</h1>
          <div style={{ width: 48, height: 3, background: '#C8102E', marginBottom: '1rem' }} />
          <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.6 }}>
            Six seasons. Six tournaments. A complete record of every champion, every result, and every moment that defined the Moody Marble League.
          </p>
        </div>
      </section>

      <div style={{ height: 3, background: '#C8102E' }} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem 5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 'calc(1.5rem + 8px)', top: 0, bottom: 0, width: 2, background: '#e5e7eb' }} />
        {SEASONS.map((season) => {
          const theme = getTheme(season.champion)
          return <TimelineCard key={season.id} season={season} theme={theme} />
        })}
      </div>
    </main>
  )
}

function TimelineCard({ season, theme }: { season: SeasonData; theme: ReturnType<typeof getTheme> }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'start', marginBottom: '2rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, zIndex: 1 }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: hovered ? theme.accent : '#fff', border: `3px solid ${hovered ? theme.accent : '#C8102E'}`, boxShadow: hovered ? `0 0 0 4px ${theme.accent}33` : 'none', transition: 'all 0.2s ease', flexShrink: 0 }} />
      </div>
      <div style={{ paddingLeft: 16, paddingTop: 4 }}>
        <Link to={`/history/${season.id}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ background: hovered ? theme.bg : '#fff', borderTop: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`, borderBottom: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`, borderRight: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`, borderLeft: `4px solid ${hovered ? theme.accent : '#e5e7eb'}`, boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)', transform: hovered ? 'translateY(-2px)' : 'translateY(0)', transition: 'all 0.2s ease', overflow: 'hidden' }}>
            <div style={{ height: 3, background: theme.accent }} />
            <div style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: theme.accent, background: `${theme.accent}18`, padding: '2px 8px' }}>{season.season}</span>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', color: hovered ? 'rgba(255,255,255,0.4)' : '#9ca3af', transition: 'color 0.2s' }}>{season.year} · {season.location}</span>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 4vw, 28px)', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1, color: hovered ? '#fff' : '#111827', marginBottom: 6, transition: 'color 0.2s' }}>{season.tournament}</h3>
              <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 13, lineHeight: 1.5, color: hovered ? theme.textMuted : '#6b7280', marginBottom: '0.75rem', transition: 'color 0.2s' }}>{season.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={getTeamLogo(season.champion)} alt={season.champion} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: hovered ? 'rgba(255,255,255,0.4)' : '#9ca3af', transition: 'color 0.2s' }}>Champion</div>
                    <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: hovered ? '#fff' : theme.accent, letterSpacing: '0.04em', transition: 'color 0.2s' }}>{season.champion}</div>
                  </div>
                </div>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.accent }}>View Season →</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

function SeasonPage() {
  const { id } = useParams()
  const season = SEASONS.find((s) => s.id === id)

  if (!season) {
    return (
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', color: '#1a2a6e' }}>Season Not Found</h1>
        <Link to="/history" style={{ display: 'inline-block', marginTop: 20, fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8102E', textDecoration: 'none' }}>← Back to History</Link>
      </main>
    )
  }

  const theme = getTheme(season.champion)
  const podium = season.standings.filter((s) => s.place <= 3)

  return (
    <main style={{ background: '#fff' }}>
      <style>{`
        .season-hero-grid { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 2rem; }
        .podium-bar { display: flex; }
        .season-body-grid { display: grid; grid-template-columns: 1fr 300px; gap: 2.5rem; align-items: start; }
        @media (max-width: 768px) {
          .season-hero-grid { grid-template-columns: 1fr !important; }
          .season-hero-logo { display: none !important; }
          .podium-bar { flex-direction: column !important; }
          .podium-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .season-body-grid { grid-template-columns: 1fr !important; }
          .sticky-standings { position: static !important; }
        }
      `}</style>

      <section style={{ background: theme.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '160%', height: '100%', background: theme.stripe1, transform: 'skewX(-18deg) translateX(-20%)', top: 0, left: '30%' }} />
          <div style={{ position: 'absolute', width: '70%', height: '100%', background: theme.stripe2, transform: 'skewX(-18deg) translateX(-10%)', top: 0, left: '50%', opacity: 0.7 }} />
          <div style={{ position: 'absolute', width: 8, height: '130%', background: theme.accent, transform: 'skewX(-18deg)', top: '-15%', left: '48%', opacity: 0.9 }} />
          <div style={{ position: 'absolute', width: 3, height: '130%', background: theme.accentLight, transform: 'skewX(-18deg)', top: '-15%', left: '49.5%', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: theme.accent, opacity: 0.6 }} />
          <img src={getTeamLogo(season.champion)} alt="" aria-hidden="true" style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', height: '110%', opacity: 0.07, filter: 'grayscale(100%) brightness(2)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>
          <div className="season-hero-grid">
            <div>
              <Link to="/history" style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: 14 }}>← League History</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${theme.accent}44`, padding: '5px 14px 5px 10px', width: 'fit-content' }}>
                <span style={{ display: 'block', width: 20, height: 2, background: theme.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.accent }}>{season.season} · {season.year} · {season.location}</span>
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 6vw, 68px)', textTransform: 'uppercase', color: '#fff', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: '0.75rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>{season.tournament}</h1>
              <div style={{ width: 48, height: 3, background: theme.accent, marginBottom: '0.75rem' }} />
              <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 2.5vw, 16px)', color: theme.textMuted, maxWidth: 500, lineHeight: 1.6, marginBottom: '1.5rem' }}>{season.story}</p>
            </div>
            <div className="season-hero-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingBottom: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: theme.accent, opacity: 0.08, filter: 'blur(24px)' }} />
                <img src={getTeamLogo(season.champion)} alt={season.champion} style={{ width: 150, height: 150, objectFit: 'contain', filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.5))', position: 'relative', zIndex: 1 }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Champion</div>
                <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', color: '#fff', letterSpacing: '0.04em' }}>{season.champion}</div>
              </div>
            </div>
          </div>

          <div className="podium-bar" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '1rem' }}>
            {podium.map((p) => (
              <div key={p.place} className="podium-item" style={{ flex: 1, padding: '12px 14px', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(18px, 4vw, 28px)', color: p.place === 1 ? theme.accent : 'rgba(255,255,255,0.25)', lineHeight: 1, flexShrink: 0 }}>{placeSuffix(p.place)}</span>
                <img src={getTeamLogo(p.team)} alt={p.team} style={{ width: 24, height: 24, objectFit: 'contain', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 'clamp(12px, 2.5vw, 14px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.05em' }}>{p.team}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 3, background: '#C8102E' }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        <div className="season-body-grid">
          <div>
            <iframe
              src={season.articleFile}
              title={`${season.tournament} Article`}
              scrolling="no"
              style={{ width: '100%', border: 'none', display: 'block', minHeight: 800 }}
              onLoad={(e) => {
                const iframe = e.currentTarget
                try {
                  const doc = iframe.contentDocument
                  if (doc && doc.body) {
                    const style = doc.createElement('style')
                    style.textContent = `.masthead, .hero, .standings-section, .article-footer, .rule-ornamental { display: none !important; } body { margin: 0; padding: 0; }`
                    doc.head.appendChild(style)
                    setTimeout(() => {
                      iframe.style.height = doc.body.scrollHeight + 40 + 'px'
                    }, 100)
                  }
                } catch {
                  iframe.style.height = '2400px'
                }
              }}
            />
          </div>

          <div className="sticky-standings" style={{ position: 'sticky', top: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ width: 16, height: 2, background: '#C8102E', display: 'block' }} />
              <h2 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.05em', margin: 0 }}>Final Standings</h2>
            </div>
            <div style={{ border: '1px solid #e5e7eb', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', padding: '6px 12px', background: '#f4f6fb', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0 }}>
                {['#', 'Team'].map((h) => (
                  <span key={h} style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>{h}</span>
                ))}
              </div>
              {season.standings.map((row, i) => (
                <StandingRow key={row.place} row={row} i={i} total={season.standings.length} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function StandingRow({ row, i, total, theme }: { row: { place: number; team: string }; i: number; total: number; theme: ReturnType<typeof getTheme> }) {
  const [hovered, setHovered] = useState(false)
  const isChamp = row.place === 1
  const isPodium = row.place <= 3
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'grid', gridTemplateColumns: '44px 1fr', padding: '8px 12px', borderBottom: i < total - 1 ? '1px solid #f3f4f6' : 'none', background: isChamp ? `${theme.accent}10` : hovered ? '#f4f6fb' : '#fff', borderLeft: isChamp ? `3px solid ${theme.accent}` : hovered ? '3px solid #C8102E' : '3px solid transparent', alignItems: 'center', transition: 'all 0.15s ease' }}>
      <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 15, color: isPodium ? theme.accent : '#9ca3af' }}>{placeSuffix(row.place)}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <img src={getTeamLogo(row.team)} alt={row.team} style={{ width: 24, height: 24, objectFit: 'contain', background: '#f4f6fb', padding: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, color: '#111827', letterSpacing: '0.02em' }}>{row.team}</span>
        {isChamp && <span style={{ fontSize: 11 }}>🏆</span>}
      </div>
    </div>
  )
}

export default function HistoryPage() {
  return (
    <Routes>
      <Route index element={<TimelinePage />} />
      <Route path=":id" element={<SeasonPage />} />
    </Routes>
  )
}