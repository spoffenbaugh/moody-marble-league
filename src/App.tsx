import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import TeamsPage from './pages/TeamsPage'
import HistoryPage from './pages/HistoryPage'

// ─── TYPES ─────────────────────────────────────────────────────────────────────
interface Article {
  slug: string
  title: string
  category: string
  tag: string
  heroTeam: string
  secondaryTeams?: string[]
  summary: string
  pullQuote: string
  content: string[]
}

interface Standing {
  team: string
  logo: string
  tournaments: number
  aggregate: number
  average: string
}

// ─── SLIDE THEME MAP ───────────────────────────────────────────────────────────
const TEAM_THEMES: Record<string, {
  bg: string
  accent: string
  accentLight: string
  stripe1: string
  stripe2: string
  textMuted: string
}> = {
  HemoGoblins: {
    bg: '#0f0505',
    accent: '#C8102E',
    accentLight: '#e84060',
    stripe1: '#1a0808',
    stripe2: '#2a0a0a',
    textMuted: 'rgba(255,255,255,0.55)',
  },
  Sorbetbes: {
    bg: '#0d1b3e',
    accent: '#E87722',
    accentLight: '#f59340',
    stripe1: '#0a1530',
    stripe2: '#1a2a6e',
    textMuted: 'rgba(255,255,255,0.55)',
  },
  Trinitarians: {
    bg: '#12100a',
    accent: '#9B6B3A',
    accentLight: '#c4935a',
    stripe1: '#1a1508',
    stripe2: '#221a0a',
    textMuted: 'rgba(255,255,255,0.55)',
  },
  default: {
    bg: '#1a2a6e',
    accent: '#C8102E',
    accentLight: '#e84060',
    stripe1: '#141f55',
    stripe2: '#0d1540',
    textMuted: 'rgba(255,255,255,0.55)',
  },
  MML: {
    bg: '#1a2a6e',
    accent: '#C8102E',
    accentLight: '#e84060',
    stripe1: '#141f55',
    stripe2: '#0d1540',
    textMuted: 'rgba(255,255,255,0.55)',
  },
}

function getTheme(teamName: string) {
  return TEAM_THEMES[teamName] ?? TEAM_THEMES.default
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const articles: Article[] = [
  {
    slug: 'yellow-fever-long-road-back',
    title: 'Yellow Fever, Rock Bottom, and the Long Road Back',
    category: 'MML Deep Dive',
    tag: 'Historical Worst to First?',
    heroTeam: 'Yellow Fever',
    summary: 'From the Honeysuckles era to a 2025 finals berth, Yellow Fever may be the leagues most fascinating rebuild.',
    pullQuote: '99 aggregate across six seasons. The math is unforgiving. The team keeps showing up anyway.',
    content: [
      'They started life as the Honeysuckles. Or the Sucklers, depending on which early bracket you read. They finished last in Season 1 with 50 points. They finished 14th in Season 2 and 16th in Season 3.',
      'The name changed to Yellow Fever sometime before the New Age era. The results, mostly, did not. Across six seasons, Yellow Fever have the worst average placement of any team to compete in all six tournaments: 16.50. An aggregate of 99.',
      'But here is what the numbers do not tell you: Yellow Fever had their best season ever in 2025. A 13th-place finish in the Iowa Open finals round meant competing against 15 of the league\'s best teams and outscoring Sin, GotToGo, and Mowers.',
      'The arc from Honeysuckles dead last in 2016 to a competitive finals berth in 2025 is nine years of stubbornness, reinvention, and refusal to quit.',
    ],
  },
  {
    slug: 'orcas-peoples-team',
    title: 'Everyone Loves the Orcas. The Orcas Do Not Care.',
    category: 'MML Culture',
    tag: 'The People\'s Team',
    heroTeam: 'Orcas',
    summary: 'Beloved, chaotic, and somehow always compelling, the Orcas prove the MML is not just about winning.',
    pullQuote: 'Nobody cheers louder when the Orcas score a point. Nobody is less surprised when they do not.',
    content: [
      'There is a type of team that exists in every sport. They do not win often. Their stats do not hold up. Every season, logic says they should be competitive, and every season, something goes gloriously wrong. The MML has the Orcas.',
      'Six seasons. An average placement of 14.17. An aggregate score of 85 across all tournaments, worse than all but a handful of teams who have competed far fewer times.',
      'And yet, the Orcas have the best nickname energy in the league. They show up every season. They compete hard. In Season 1 they finished 11th, which was legitimately respectable.',
      'The Orcas are proof that the MML is not just about winning. Some teams carry a room. Some teams make people lean forward even when the result is already obvious.',
    ],
  },
  {
    slug: 'trinitarians-curse',
    title: 'The Trinitarians Curse',
    category: 'MML Analysis',
    tag: 'The Perennial Bridesmaid Problem',
    heroTeam: 'Trinitarians',
    summary: 'Six seasons of elite consistency, repeated near-misses, and the most tortured fanbase in the sport.',
    pullQuote: 'They are the most consistent team this league has ever produced. They are also its greatest what-if.',
    content: [
      'The numbers are almost cruel. Trinitarians have competed in all six MML seasons. Their average placement is 5.50, second best in league history behind only HemoGoblins.',
      'Season 1: 8th. Season 2: 9th. Season 3: 3rd. Season 4: 5th. Season 5: 3rd again. Season 6: 5th in the finals, watching Sorbetbes hoist the trophy.',
      'What makes it stranger is how they lose. Not in collapses. Not in shocking eliminations. They simply finish second, third, or fifth in competitions where they were always competitive and never quite first.',
      'The MML\'s most reliable team is still waiting for the one result that would define a dynasty rather than haunt it.',
    ],
  },
  {
    slug: 'angels-deep-sky-hemogoblins-rivalry',
    title: 'Angels, Deep Sky, and HemoGoblins at War',
    category: 'MML Feature',
    tag: 'All-Time Rivalry Series',
    heroTeam: 'HemoGoblins',
    secondaryTeams: ['Angels', 'Deep Sky'],
    summary: 'The league\'s defining rivalry has never needed two teams. It has always needed three.',
    pullQuote: 'Deep Sky has never beaten HemoGoblins when it mattered. Angels finally did in 2023. That changes everything.',
    content: [
      'Most rivalries are between two teams. The MML\'s defining rivalry has always needed three. Angels, Deep Sky, and HemoGoblins have spent six seasons pushing each other, chasing each other, and occasionally breaking each other\'s hearts.',
      'HemoGoblins established dominance first. Angels were the perennial challengers. Deep Sky sat in the shadows, placing consistently until a 4th-place finish in Season 4 signaled they were ready to move up.',
      'The 2023 Mach 3 tournament was the pivot point. HemoGoblins stumbled to 17th overall. Angels seized the moment and claimed the championship that had eluded them for seven years.',
      'Season 6\'s Iowa Open rewrote it again: HemoGoblins 4th, Angels 27th, Deep Sky 10th. Three teams, six seasons, never the same result twice.',
    ],
  },
  {
    slug: 'hemogoblins-legacy',
    title: 'The HemoGoblins Legacy',
    category: 'MML Historical Review',
    tag: 'Seasons 1–4',
    heroTeam: 'HemoGoblins',
    summary: 'Three titles, one shadow, and a dynasty that still defines every future MML contender.',
    pullQuote: 'They were seeded 12th. Nobody saw it coming. Nobody.',
    content: [
      'When the Baldwin Invitational tipped off in 2016, nobody had HemoGoblins penciled in as the team to beat. They were seeded 12th, buried in the West Division, and facing an Angels squad that had looked dominant all week.',
      'They won anyway, posting 92 points, the highest individual score of the season, and walked away with the first championship in MML history.',
      'They came back in 2017 for the Colorado Classic and did it again. Back-to-back. A dynasty was forming.',
      'Three championships across Seasons 1, 2, and 4. An average placement of 5.17 across all six seasons, the best in league history.',
    ],
  },
  {
    slug: 'broncos-to-sorbetbes',
    title: 'From Broncos to Sorbetbes',
    category: 'MML Legacy Series',
    tag: 'Longest Road to a Championship',
    heroTeam: 'Sorbetbes',
    summary: 'Nine years, six seasons, a name change, and finally a championship that rewrote their history.',
    pullQuote: 'The longest road to a championship in MML history ended not with a comeback, but with a statement.',
    content: [
      'They competed in the very first tournament. They finished 4th. They waited nine years. Then they won.',
      'In the summer of 2016, a team called the Broncos showed up to the Baldwin Invitational and immediately made their presence known. They finished 4th overall, the best debut of any team in the inaugural season.',
      'What followed was one of the more quietly painful arcs in league history. The Colorado Classic brought a 12th-place finish. The Michigan Games dropped them to 15th.',
      'The Iowa Open changed everything. Sorbetbes entered 2025 as a team with history but no crown, then posted 55 points in the finals, the highest finals score in the field.',
      'The Broncos who showed up fourth in 2016 became the Sorbetbes who stood first in 2025.',
    ],
  },
]

const standings: Standing[] = [
  { team: 'HemoGoblins', logo: '/images/teams/hemo-goblins.png', tournaments: 6, aggregate: 31, average: '5.17' },
  { team: 'Trinitarians', logo: '/images/teams/trinitarians.png', tournaments: 6, aggregate: 33, average: '5.50' },
  { team: 'Tankers', logo: '/images/teams/tankers.png', tournaments: 1, aggregate: 6, average: '6.00' },
  { team: 'Deep Sky', logo: '/images/teams/deep-sky.png', tournaments: 6, aggregate: 45, average: '7.50' },
  { team: 'Pengys', logo: '/images/teams/pengys.png', tournaments: 6, aggregate: 46, average: '7.67' },
  { team: 'Sauce Boss', logo: '/images/teams/sauce-boss.png', tournaments: 1, aggregate: 8, average: '8.00' },
  { team: 'Sin', logo: '/images/teams/sin.png', tournaments: 6, aggregate: 48, average: '8.00' },
  { team: 'Sorbetbes', logo: '/images/teams/sorbetbes.png', tournaments: 6, aggregate: 52, average: '8.67' },
  { team: 'Accio', logo: '/images/teams/accio.png', tournaments: 1, aggregate: 9, average: '9.00' },
  { team: 'Expressos', logo: '/images/teams/expressos.png', tournaments: 6, aggregate: 54, average: '9.00' },
]

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function getTeamLogo(teamName: string): string {
  const found = standings.find((t) => t.team === teamName)
  if (found) return found.logo
  const fallback: Record<string, string> = {
    Angels: '/images/teams/angels.png',
    'Deep Sky': '/images/teams/deep-sky.png',
    HemoGoblins: '/images/teams/hemo-goblins.png',
    Orcas: '/images/teams/orcas.png',
    Sorbetbes: '/images/teams/sorbetbes.png',
    Trinitarians: '/images/teams/trinitarians.png',
    'Yellow Fever': '/images/teams/yellow-fever.png',
  }
  return fallback[teamName] ?? '/images/mml-logo.png'
}

// ─── HERO SLIDESHOW ────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    teamName: 'MML',
    kicker: 'Est. 2016 · Six Seasons',
    headline: 'The Moody Marble League',
    sub: 'Six seasons. Thirty-six teams. Eight divisions. One championship at a time — this is the full story of the MML.',
    cta: 'View League History',
    slug: '/history',
  },
  {
    teamName: 'HemoGoblins',
    kicker: 'Dynasty · Seasons 1–4',
    headline: 'The HemoGoblins Legacy',
    sub: 'Three titles, one shadow, a dynasty that still defines every future MML contender.',
    cta: 'Read the Story',
    slug: '/articles/hemogoblins-legacy',
  },
  {
    teamName: 'Sorbetbes',
    kicker: 'Season 6 Champions · Iowa Open 2025',
    headline: 'From Broncos to Sorbetbes',
    sub: 'Nine years, a name change, and finally the championship that rewrote their history.',
    cta: 'Read the Story',
    slug: '/articles/broncos-to-sorbetbes',
  },
  {
    teamName: 'Trinitarians',
    kicker: 'Six Seasons · Zero Championships',
    headline: 'The Trinitarians Curse',
    sub: 'Second-best average placement in league history. The most tortured fanbase in the sport.',
    cta: 'Read the Story',
    slug: '/articles/trinitarians-curse',
  },
]

function HeroSlideshow() {
  const [cur, setCur] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (idx: number) => {
    if (animating || idx === cur) return
    setAnimating(true)
    setTimeout(() => {
      setCur(idx)
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCur((c) => (c + 1) % HERO_SLIDES.length)
    }, 8000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCur((c) => (c + 1) % HERO_SLIDES.length)
    }, 8000)
  }

  const slide = HERO_SLIDES[cur]
  const theme = getTheme(slide.teamName)

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{ background: theme.bg, minHeight: 480, transition: 'background 0.6s ease', position: 'relative' }}
    >
      {/* ── Background stripes ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: 'absolute', width: '160%', height: '100%', background: theme.stripe1, transform: 'skewX(-18deg) translateX(-20%)', top: 0, left: '30%', transition: 'background 0.6s ease' }} />
        <div style={{ position: 'absolute', width: '70%', height: '100%', background: theme.stripe2, transform: 'skewX(-18deg) translateX(-10%)', top: 0, left: '50%', opacity: 0.7, transition: 'background 0.6s ease' }} />
        <div style={{ position: 'absolute', width: 8, height: '130%', background: theme.accent, transform: 'skewX(-18deg)', top: '-15%', left: '48%', opacity: 0.9, transition: 'background 0.6s ease' }} />
        <div style={{ position: 'absolute', width: 3, height: '130%', background: theme.accentLight, transform: 'skewX(-18deg)', top: '-15%', left: '49.5%', opacity: 0.5, transition: 'background 0.6s ease' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: theme.accent, opacity: 0.6, transition: 'background 0.6s ease' }} />
        <img
          src={slide.teamName === 'MML' ? '/images/mml-logo.png' : getTeamLogo(slide.teamName)}
          alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', height: '100%', width: 'auto', objectFit: 'contain', opacity: animating ? 0 : 0.07, filter: 'grayscale(100%) brightness(2)', pointerEvents: 'none', transition: 'opacity 0.4s ease' }}
        />
      </div>

      {/* ── Slide content ── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', minHeight: 480 }}>
        {/* Text */}
        <div style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(16px)' : 'translateY(0)', transition: 'opacity 0.3s ease, transform 0.3s ease', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,0.06)', border: `1px solid ${theme.accent}44`, padding: '5px 14px 5px 10px' }}>
            <span style={{ display: 'block', width: 20, height: 2, background: theme.accent, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.accent }}>
              {slide.kicker}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 7vw, 76px)', lineHeight: 0.92, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            {slide.headline}
          </h1>
          <div style={{ width: 48, height: 3, background: theme.accent, marginBottom: '1rem' }} />
          <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontWeight: 400, fontSize: 'clamp(14px, 2.5vw, 17px)', lineHeight: 1.6, color: theme.textMuted, marginBottom: '1.5rem', maxWidth: 420 }}>
            {slide.sub}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link
              to={slide.slug}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.accent, color: '#fff', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '11px 24px', textDecoration: 'none', transition: 'opacity 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {slide.cta}
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </Link>
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
              {String(cur + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Logo */}
        <div style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.35s ease', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 'clamp(120px, 20vw, 260px)', height: 'clamp(120px, 20vw, 260px)', borderRadius: '50%', background: theme.accent, opacity: 0.08, filter: 'blur(30px)', transition: 'background 0.6s ease' }} />
          <img
            src={slide.teamName === 'MML' ? '/images/mml-logo.png' : getTeamLogo(slide.teamName)}
            alt={slide.teamName}
            style={{ width: 'clamp(100px, 18vw, 240px)', height: 'clamp(100px, 18vw, 240px)', objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))', position: 'relative', zIndex: 1 }}
          />
        </div>
      </div>

      {/* ── Bubble indicators ── */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 20 }}>
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.teamName}
            onClick={() => { goTo(i); resetTimer() }}
            aria-label={`Go to slide ${i + 1}`}
            style={{ width: i === cur ? 24 : 8, height: 8, borderRadius: 4, background: i === cur ? theme.accent : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
            onMouseEnter={e => { if (i !== cur) e.currentTarget.style.background = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { if (i !== cur) e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
          />
        ))}
      </div>
    </section>
  )
}

// ─── STAT BAR ──────────────────────────────────────────────────────────────────
function StatBar() {
  const stats = [
    { num: '6', label: 'Seasons Played' },
    { num: '36', label: 'Total Teams' },
    { num: '8', label: 'Active Divisions' },
  ]
  return (
    <div style={{ background: '#fff', borderBottom: '3px solid #C8102E', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ textAlign: 'center', padding: '0.75rem 0.5rem', borderRight: i < stats.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
          <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 6vw, 40px)', color: '#1a2a6e', lineHeight: 1 }}>
            {s.num}
          </span>
          <span style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', marginTop: 3 }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── HEADER ────────────────────────────────────────────────────────────────────
function Header() {
  const [historyOpen, setHistoryOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

  const seasons = [
    { label: 'S1 · Baldwin Invitational', to: '/history/s1', year: '2016' },
    { label: 'S2 · Colorado Classic',     to: '/history/s2', year: '2017' },
    { label: 'S3 · Michigan Games',       to: '/history/s3', year: '2018' },
    { label: 'S4 · New Age MML',          to: '/history/s4', year: '2021' },
    { label: 'S5 · Mach 3',              to: '/history/s5', year: '2023' },
    { label: 'S6 · Iowa Open',            to: '/history/s6', year: '2025' },
  ]

  const navLinks = [
    { label: 'Home',     to: '/' },
    { label: 'Teams',    to: '/teams' },
    { label: 'Articles', to: '/articles' },
    { label: 'History',  to: '/history' },
  ]

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; }
        .hamburger-btn { display: none; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
            <img src="/images/mml-logo.png" alt="Moody Marble League" style={{ height: 38, width: 'auto' }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(14px, 3.5vw, 20px)', lineHeight: 1, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <span style={{ color: '#C8102E' }}>Moody </span>
                <span style={{ color: '#1a2a6e' }}>Marble League</span>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 600, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginTop: 1 }}>
                MML Historical Archive
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: 0 }}>
            {[
              { label: 'Home',     to: '/' },
              { label: 'Teams',    to: '/teams' },
              { label: 'Articles', to: '/articles' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1a2a6e', textDecoration: 'none', padding: '6px 14px', borderBottom: '3px solid transparent', transition: 'color 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C8102E'; e.currentTarget.style.borderBottomColor = '#C8102E' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#1a2a6e'; e.currentTarget.style.borderBottomColor = 'transparent' }}
              >
                {item.label}
              </Link>
            ))}

            {/* History dropdown */}
            <div
              ref={historyRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHistoryOpen(true)}
              onMouseLeave={() => setHistoryOpen(false)}
            >
              <Link
                to="/history"
                style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: historyOpen ? '#C8102E' : '#1a2a6e', textDecoration: 'none', padding: '6px 14px', borderBottom: historyOpen ? '3px solid #C8102E' : '3px solid transparent', transition: 'color 0.15s, border-color 0.15s', display: 'flex', alignItems: 'center', gap: 5, height: 64, boxSizing: 'border-box' }}
              >
                History
                <span style={{ fontSize: 9, opacity: 0.6, transform: historyOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
              </Link>
              {historyOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid #e5e7eb', borderTop: '3px solid #C8102E', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', minWidth: 240, zIndex: 100 }}>
                  {seasons.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', textDecoration: 'none', borderBottom: '1px solid #f3f4f6', transition: 'background 0.12s' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#f4f6fb'
                        const label = e.currentTarget.querySelector('.dd-label') as HTMLElement
                        if (label) label.style.color = '#C8102E'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#fff'
                        const label = e.currentTarget.querySelector('.dd-label') as HTMLElement
                        if (label) label.style.color = '#1a2a6e'
                      }}
                    >
                      <span className="dd-label" style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a2a6e', transition: 'color 0.12s' }}>
                        {s.label}
                      </span>
                      <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, color: '#9ca3af', letterSpacing: '0.1em' }}>
                        {s.year}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#C8102E' : '#1a2a6e', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#C8102E' : '#1a2a6e', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#C8102E' : '#1a2a6e', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #e5e7eb', borderBottom: '3px solid #C8102E' }}>
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1a2a6e', textDecoration: 'none', padding: '14px 1.5rem', borderBottom: '1px solid #f3f4f6' }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ padding: '10px 1.5rem 4px', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>
              Seasons
            </div>
            {seasons.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a2a6e', textDecoration: 'none', padding: '10px 1.5rem', borderBottom: '1px solid #f3f4f6' }}
              >
                <span>{s.label}</span>
                <span style={{ color: '#9ca3af' }}>{s.year}</span>
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#1a2a6e', borderTop: '3px solid #C8102E', marginTop: 0 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/images/mml-logo.png" alt="MML" style={{ height: 32, width: 'auto' }} />
          <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <span style={{ color: '#C8102E' }}>Moody </span>
            <span style={{ color: '#fff' }}>Marble League</span>
          </div>
        </div>
        <div style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          Competitive marble racing since Season 1 · 2016–2025
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Teams',    to: '/teams' },
            { label: 'Articles', to: '/articles' },
            { label: 'History',  to: '/history' },
            { label: 'Home',     to: '/' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C8102E')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── ARTICLE CARD ──────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: Article }) {
  const theme = getTheme(article.heroTeam)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', border: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`, borderLeft: `4px solid ${hovered ? theme.accent : '#e5e7eb'}`, transform: hovered ? 'translateY(-3px)' : 'translateY(0)', boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ height: 4, background: theme.accent }} />
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ background: '#f4f6fb', border: '1px solid #e5e7eb', padding: '3px 10px', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1a2a6e' }}>
            {article.category}
          </span>
          <img src={getTeamLogo(article.heroTeam)} alt={article.heroTeam} style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
        </div>
        <h3 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.15, textTransform: 'uppercase', color: hovered ? theme.accent : '#111827', letterSpacing: '0.02em', marginBottom: 6, transition: 'color 0.2s' }}>
          {article.title}
        </h3>
        <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: theme.accent, marginBottom: 10 }}>
          {article.tag}
        </div>
        <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 14, lineHeight: 1.65, color: '#6b7280', flex: 1, marginBottom: '1rem' }}>
          {article.summary}
        </p>
        <Link to={`/articles/${article.slug}`} style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.accent, textDecoration: 'none' }}>
          Read Article →
        </Link>
      </div>
    </article>
  )
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main id="home">
      <HeroSlideshow />
      <StatBar />
    </main>
  )
}

// ─── ARTICLES PAGE ─────────────────────────────────────────────────────────────
function ArticlesPage() {
  return (
    <main style={{ background: '#fff' }}>
      <section style={{ background: '#1a2a6e', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#C8102E', color: '#fff', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 16 }}>
            MML Journalism
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 7vw, 80px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: '1rem' }}>
            Featured Articles
          </h1>
          <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 3vw, 18px)', color: 'rgba(255,255,255,0.6)', maxWidth: 560 }}>
            Deep dives, rivalries, franchise histories, and the stories that shaped the Moody Marble League.
          </p>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  )
}

// ─── ARTICLE PAGE ──────────────────────────────────────────────────────────────
function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', color: '#1a2a6e' }}>
          Article Not Found
        </h1>
        <Link to="/articles" style={{ display: 'inline-block', marginTop: 24, fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8102E', textDecoration: 'none' }}>
          ← Back to Articles
        </Link>
      </main>
    )
  }

  const theme = getTheme(article.heroTeam)
  const relatedTeams = [article.heroTeam, ...(article.secondaryTeams ?? [])].filter(Boolean)

  return (
    <main style={{ background: '#fff' }}>
      <section style={{ background: theme.bg, padding: '3.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '50%', height: '100%', background: theme.stripe1, transform: 'skewX(-18deg)', right: '-10%' }} />
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/articles" style={{ display: 'inline-block', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: 20 }}>
            ← Back to Articles
          </Link>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {relatedTeams.map((name) => (
              <img key={name} src={getTeamLogo(name)} alt={name} style={{ width: 52, height: 52, objectFit: 'contain', background: 'rgba(255,255,255,0.08)', padding: 6 }} />
            ))}
          </div>
          <div style={{ display: 'inline-block', background: theme.accent, color: '#fff', fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 14 }}>
            {article.category}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 6vw, 72px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 10 }}>
            {article.title}
          </h1>
          <p style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 3vw, 20px)', color: theme.textMuted, letterSpacing: '0.05em' }}>
            {article.tag}
          </p>
        </div>
      </section>
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: 1.7, color: '#374151', fontWeight: 600, borderLeft: `6px solid ${theme.accent}`, paddingLeft: 18, marginBottom: '2rem' }}>
          {article.summary}
        </p>
        <blockquote style={{ background: theme.bg, padding: '1.5rem', marginBottom: '2rem', borderLeft: `6px solid ${theme.accent}` }}>
          <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: theme.accent, marginBottom: 8 }}>
            Pull Quote
          </div>
          <p style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 4vw, 26px)', color: '#fff', lineHeight: 1.2, letterSpacing: '0.01em' }}>
            "{article.pullQuote}"
          </p>
        </blockquote>
        {article.content.map((para, i) => (
          <p key={i} style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(15px, 3vw, 18px)', lineHeight: 1.8, color: '#374151', marginBottom: '1.25rem' }}>
            {para}
          </p>
        ))}
      </article>
    </main>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-slate-950" style={{ background: '#fff' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
          html { scroll-behavior: smooth; }
          * { box-sizing: border-box; }
          a { color: inherit; }
        `}</style>
        <Header />
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/teams/*"        element={<TeamsPage />} />
          <Route path="/articles"       element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/history/*"      element={<HistoryPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}