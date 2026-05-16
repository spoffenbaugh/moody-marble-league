import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'

// ─── THEME MAP ─────────────────────────────────────────────────────────────────
const TEAM_THEMES: Record<string, {
  bg: string; accent: string; accentLight: string
  stripe1: string; stripe2: string; textMuted: string
}> = {
  HemoGoblins: { bg: '#0f0505', accent: '#C8102E', accentLight: '#e84060', stripe1: '#1a0808', stripe2: '#2a0a0a', textMuted: 'rgba(255,255,255,0.55)' },
  Sorbetbes:   { bg: '#0d1b3e', accent: '#E87722', accentLight: '#f59340', stripe1: '#0a1530', stripe2: '#1a2a6e', textMuted: 'rgba(255,255,255,0.55)' },
  Trinitarians:{ bg: '#12100a', accent: '#9B6B3A', accentLight: '#c4935a', stripe1: '#1a1508', stripe2: '#221a0a', textMuted: 'rgba(255,255,255,0.55)' },
  Angels:      { bg: '#1a0a12', accent: '#DB2777', accentLight: '#f472b6', stripe1: '#220a16', stripe2: '#2e0d1e', textMuted: 'rgba(255,255,255,0.55)' },
  Mowers:      { bg: '#061208', accent: '#15803D', accentLight: '#22c55e', stripe1: '#081a0b', stripe2: '#0d240f', textMuted: 'rgba(255,255,255,0.55)' },
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

// ─── TYPES ─────────────────────────────────────────────────────────────────────
interface NotablePerformance {
  team: string
  description: string
  stat: string
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
  standings: { place: number; team: string }[]
  mvp: { team: string; reason: string }
  storylines: { title: string; body: string }[]
  notablePerformances: NotablePerformance[]
}

// ─── SEASON DATA ───────────────────────────────────────────────────────────────
const SEASONS: SeasonData[] = [
  {
    id: 's1',
    season: 'Season 1',
    year: 2016,
    tournament: 'Baldwin Invitational',
    champion: 'HemoGoblins',
    location: 'Baldwin, MI',
    tagline: 'Where it all began.',
    story: 'The inaugural MML tournament brought together 16 teams in what would become the league\'s founding moment. HemoGoblins entered seeded 12th and left as champions, setting the tone for a dynasty nobody saw coming. The Mowers finished a strong 2nd, and Yak Attack rounded out the podium in 3rd.',
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
    mvp: {
      team: 'HemoGoblins',
      reason: 'Entered as a 12th seed and dismantled every team in their path. Their Baldwin Invitational victory was the most surprising result in MML history and set the tone for everything that followed.',
    },
    storylines: [
      {
        title: 'The League Is Born',
        body: 'Nobody knew what to expect from the first-ever MML tournament. Sixteen teams showed up to Baldwin, Michigan with something to prove and no history to lean on. Every result was a surprise. Every finish was a first. The Baldwin Invitational was raw, competitive, and completely unpredictable — exactly what a founding moment should be.',
      },
      {
        title: 'The Upset That Defined a Dynasty',
        body: 'HemoGoblins were not supposed to win. Seeded 12th, they were projected to exit early and quietly. Instead they ran through the bracket with a ruthlessness that nobody saw coming. Their championship performance posted the highest individual score of the season — 92 points — and announced to the rest of the league that there was a new standard to meet.',
      },
      {
        title: 'Early Contenders Emerge',
        body: 'While HemoGoblins stole the headlines, the tournament also revealed the league\'s early power structure. Mowers finished 2nd and looked dominant in the process. Yak Attack took 3rd in what would prove to be the beginning of a years-long run of consistent performances. Angels finished 6th, quiet but watching. The foundation of six seasons of rivalry was laid in Baldwin.',
      },
    ],
    notablePerformances: [
      { team: 'HemoGoblins', stat: '1st Place — 92 pts', description: 'The highest score of the inaugural season. A seismic debut.' },
      { team: 'Mowers',      stat: '2nd Place',          description: 'Announced themselves as genuine title contenders from day one.' },
      { team: 'Yak Attack',  stat: '3rd Place',          description: 'A podium finish in their first tournament. The first of many strong showings.' },
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
    story: 'HemoGoblins returned and made it look easy, winning the Colorado Classic to claim back-to-back titles. Angels surged to 2nd place, signaling their arrival as genuine contenders. Yak Attack made it back to the podium in 3rd. Sorbetbes, competing under the name Broncos, slipped to 12th after a promising debut.',
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
    mvp: {
      team: 'HemoGoblins',
      reason: 'Back-to-back championships with a dominant performance in Colorado. The league was beginning to realize this was not a one-time result — it was a dynasty taking shape.',
    },
    storylines: [
      {
        title: 'Can Anyone Stop HemoGoblins?',
        body: 'Coming into the Colorado Classic, the question on everyone\'s mind was simple: was the Baldwin Invitational a fluke, or were HemoGoblins the real deal? They answered emphatically. A second consecutive championship removed all doubt. The dynasty was no longer an emerging story — it was the defining story of the MML\'s early years.',
      },
      {
        title: 'Angels Make Their Move',
        body: 'Angels had finished 6th in Season 1 — respectable but unremarkable. Season 2 was different. They surged to 2nd place in Colorado, finishing just behind HemoGoblins and announcing themselves as the league\'s most credible challengers. The Angels vs HemoGoblins rivalry that would define the next several seasons began here.',
      },
      {
        title: 'The Broncos Stumble',
        body: 'After a promising 4th-place debut in Season 1, the team then known as the Broncos — later to become Sorbetbes — fell to 12th in Colorado. It was the beginning of a long middle chapter for a franchise that had started with so much promise. The road back to the top would take years.',
      },
    ],
    notablePerformances: [
      { team: 'HemoGoblins',           stat: '1st Place — Back-to-Back', description: 'Ruthless, dominant, and entirely expected by this point. The rest of the league had no answer.' },
      { team: 'Angels',                stat: '2nd Place',                description: 'Their best finish to date and a clear signal of what was coming.' },
      { team: "Sam's Senior Sitizens", stat: '6th Place',                description: 'A quietly consistent performance that showed SSS were a reliable presence in the upper half.' },
    ],
  },
  {
    id: 's3',
    season: 'Season 3',
    year: 2018,
    tournament: 'Michigan Games',
    champion: 'Mowers',
    location: 'Michigan',
    tagline: 'The dynasty interrupted.',
    story: 'The Mowers ended HemoGoblins\' run at a third consecutive title, winning the Michigan Games in dominant fashion. Sin finished 2nd in their best-ever result, and Trinitarians climbed to 3rd — their first podium finish. HemoGoblins slipped to 7th, the first sign that the dynasty had limits.',
    standings: [
      { place: 1,  team: 'Mowers' },
      { place: 2,  team: 'Sin' },
      { place: 3,  team: 'Trinitarians' },
      { place: 4,  team: 'Cheapskates' },
      { place: 5,  team: 'Vanilla Thunder' },
      { place: 6,  team: 'Deep Sky' },
      { place: 7,  team: 'HemoGoblins' },
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
    mvp: {
      team: 'Mowers',
      reason: 'Became the first team to beat HemoGoblins in a championship setting, winning the Michigan Games convincingly. Their Season 3 title remains one of the most significant results in MML history.',
    },
    storylines: [
      {
        title: 'The Dynasty Has Limits',
        body: 'HemoGoblins had won the first two tournaments. A third would have made them untouchable. Instead, they finished 7th — a result that sent shockwaves through the league and proved that the MML was not a one-team competition. Mowers did not just win the Michigan Games. They changed the power structure of the entire league.',
      },
      {
        title: 'Mowers\' Finest Hour',
        body: 'The Mowers had been knocking on the door since Season 1. A 2nd-place finish in the inaugural tournament had shown they belonged at the top, but the championship had eluded them. In Michigan, everything clicked. They ran through the field cleanly and claimed the title that their Season 1 performance had always suggested was possible.',
      },
      {
        title: 'New Faces on the Podium',
        body: 'Sin\'s 2nd-place finish was the best result in franchise history and remains so. Trinitarians climbed to 3rd for their first podium — the beginning of a long run of near-misses and consistent excellence that would come to define them. Michigan 2018 introduced two franchises who would become permanent fixtures in the league\'s upper tier.',
      },
    ],
    notablePerformances: [
      { team: 'Mowers',       stat: '1st Place',               description: 'The most important win in franchise history. Ended the HemoGoblins back-to-back run.' },
      { team: 'Sin',          stat: '2nd Place — Career Best', description: 'The best finish Sin have ever recorded. A remarkable performance in Michigan.' },
      { team: 'Trinitarians', stat: '3rd Place — First Podium',description: 'Their first podium finish. The start of a long record of elite consistency.' },
    ],
  },
  {
    id: 's4',
    season: 'Season 4',
    year: 2021,
    tournament: 'New Age MML',
    champion: 'HemoGoblins',
    location: 'Iowa',
    tagline: 'Three years away. Still the best.',
    story: 'After a three-year gap, the MML returned with an expanded field of 20 teams. HemoGoblins picked up right where they left off, claiming their third championship. Sorbetbes surged to 2nd in a major statement performance. Jawbreakers debuted with a stunning 3rd place finish in their first tournament.',
    standings: [
      { place: 1,  team: 'HemoGoblins' },
      { place: 2,  team: 'Sorbetbes' },
      { place: 3,  team: 'Jawbreakers' },
      { place: 4,  team: 'Deep Sky' },
      { place: 5,  team: 'Trinitarians' },
      { place: 6,  team: 'Sin' },
      { place: 7,  team: 'Orcas' },
      { place: 8,  team: 'Double Truffle' },
      { place: 9,  team: 'Mowers' },
      { place: 10, team: 'Pengys' },
      { place: 11, team: 'Yak Attack' },
      { place: 12, team: 'Vanilla Thunder' },
      { place: 13, team: 'Oysterium' },
      { place: 14, team: "Sam's Senior Sitizens" },
      { place: 15, team: 'Peregrine' },
      { place: 16, team: 'Angels' },
      { place: 17, team: 'Expressos' },
      { place: 18, team: 'Yellow Fever' },
      { place: 19, team: 'Cheapskates' },
      { place: 20, team: 'Purps' },
    ],
    mvp: {
      team: 'HemoGoblins',
      reason: 'Three years away from competition and they returned like they never left. A third championship sealed their status as the greatest team in MML history.',
    },
    storylines: [
      {
        title: 'The Return',
        body: 'Three years passed between the Michigan Games and the New Age MML. Teams came and went. The field expanded. New rivalries formed. And then HemoGoblins walked back in and won. It was as if the gap had never happened. Their third championship was a statement not just about their own quality, but about the gap between them and everyone else in the league.',
      },
      {
        title: 'Sorbetbes Announces Themselves',
        body: 'After a turbulent few seasons — a name change from the Broncos, inconsistent results, and a 15th-place finish in Season 3 — Sorbetbes arrived at the New Age MML and finished 2nd. It was the kind of performance that resets a franchise\'s trajectory. The road to the championship was long, but Season 4 proved they were capable of running it.',
      },
      {
        title: 'New Teams, New Energy',
        body: 'The expanded 20-team field brought new franchises into the mix. Jawbreakers debuted with a stunning 3rd-place finish — the best debut performance in league history for a new team. Double Truffle entered at 8th. Peregrine arrived at 15th. The New Age MML was exactly what its name suggested: a league that had grown and changed, even if the team at the top had not.',
      },
    ],
    notablePerformances: [
      { team: 'HemoGoblins', stat: '1st Place — 3rd Title',       description: 'Three years off. Zero rust. The greatest dynasty in MML history extended its record.' },
      { team: 'Sorbetbes',   stat: '2nd Place',                   description: 'A franchise-defining result. The name had changed. The ambition had not.' },
      { team: 'Jawbreakers', stat: '3rd Place — Tournament Debut',description: 'The best debut finish in MML history for a new franchise.' },
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
    story: 'Angels finally broke through after years as bridesmaids, winning the Mach 3 in dominant fashion. Pengys finished 2nd in their best-ever result. Trinitarians returned to the podium in 3rd. HemoGoblins suffered their worst-ever finish at 17th, while the field expanded to 24 teams with several new entrants.',
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
    mvp: {
      team: 'Angels',
      reason: 'Seven years after their first MML tournament, Angels finally won the championship they had been chasing since Season 2. The Mach 3 victory was complete, dominant, and long overdue.',
    },
    storylines: [
      {
        title: 'Angels\' Seven-Year Wait Is Over',
        body: 'Since their 2nd-place finish in Season 2, Angels had been the league\'s most frustrating nearly-team. Close enough to contend, never quite able to finish. The Mach 3 changed all of that. They won decisively, without drama, and without any doubt about who the best team on the day was. Seven years of near-misses ended in Iowa with a championship that felt both inevitable and long overdue.',
      },
      {
        title: 'HemoGoblins Hit Rock Bottom',
        body: 'No result in MML history was more shocking than HemoGoblins finishing 17th at the Mach 3. Three-time champions, the league\'s benchmark franchise, the team that had defined competitive excellence since the Baldwin Invitational — finishing 17th in a 24-team field. It raised questions about whether the dynasty was truly over, and whether Season 6 would bring a redemption arc or a final fading.',
      },
      {
        title: 'The Field Keeps Growing',
        body: 'Twenty-four teams competed at the Mach 3 — the largest field the league had seen. Big Cats debuted at 11th, showing immediate promise. Twisters entered at 12th. GotToGo — formerly the Sleep Apps — returned with a 16th-place finish. The league was expanding, deepening, and becoming more competitive than ever.',
      },
    ],
    notablePerformances: [
      { team: 'Angels',       stat: '1st Place — First Championship', description: 'Seven seasons in the making. The most emotional win in MML history.' },
      { team: 'Pengys',       stat: '2nd Place — Career Best',        description: 'Their best finish across six seasons. A remarkable run through a deep field.' },
      { team: 'Trinitarians', stat: '3rd Place — Second Podium',      description: 'Back on the podium. Still no championship. The curse continues.' },
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
    story: 'Sorbetbes — once the Broncos, runners-up in the very first tournament — finally claimed the championship they had chased for nine years. Peregrine finished a remarkable 2nd in just their third tournament. Expressos rounded out the podium. The field expanded to 32 teams, the largest in MML history.',
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
    mvp: {
      team: 'Sorbetbes',
      reason: 'Nine years. A name change. Six seasons of near-misses and middling results. And then the Iowa Open, where they posted the highest finals score in the field and claimed the championship that had defined their franchise since 2016.',
    },
    storylines: [
      {
        title: 'The Longest Road to a Championship',
        body: 'No team in MML history waited longer for their first championship than Sorbetbes. They competed in the very first tournament under the name Broncos, finished 4th, and spent the next nine years chasing what that debut had promised. A name change. A 2nd-place finish in Season 4. A forgettable Season 5. And then Iowa 2025, where everything finally came together.',
      },
      {
        title: 'HemoGoblins Roar Back',
        body: 'After their catastrophic 17th-place finish at the Mach 3, HemoGoblins arrived at the Iowa Open with something to prove. They finished 4th — not a championship, but a return to the top tier that confirmed the dynasty was not dead, only dormant. Whether Season 7 brings a fourth title remains the biggest question in the league.',
      },
      {
        title: 'Peregrine\'s Remarkable Rise',
        body: 'Peregrine entered the Iowa Open having competed in just two previous tournaments. They finished 2nd — behind only the eventual champions. For a franchise that had debuted in Season 4 and shown steady improvement ever since, a runners-up finish in the largest field in MML history was a stunning statement of intent. They are a title contender. The rest of the league has been warned.',
      },
      {
        title: 'A 32-Team Field and a Changing League',
        body: 'The Iowa Open was the biggest tournament in MML history. Thirty-two teams. Eight divisions. New franchises competing alongside founding members. Angels fell to 27th — a stunning reversal from their Season 5 championship. Jawbreakers crashed to 29th. Purps plummeted to 30th. The Iowa Open was chaotic, unpredictable, and everything the MML has always been at its best.',
      },
    ],
    notablePerformances: [
      { team: 'Sorbetbes', stat: '1st Place — First Championship', description: 'The longest-awaited title in MML history. Nine years from debut to champion.' },
      { team: 'Peregrine', stat: '2nd Place — 3rd Tournament',     description: 'Only their third tournament. A runners-up finish in a 32-team field.' },
      { team: 'Expressos', stat: '3rd Place — Career Best',        description: 'Their best-ever finish after six seasons of steady, reliable performances.' },
    ],
  },
]

function placeSuffix(n: number) {
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

// ─── TIMELINE PAGE ─────────────────────────────────────────────────────────────
function TimelinePage() {
  return (
    <main style={{ background: '#fff' }}>
      <style>{`
        .season-body-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2.5rem;
          align-items: start;
        }
        .season-hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
        }
        .podium-bar { display: flex; }
        @media (max-width: 640px) {
          .season-body-grid { grid-template-columns: 1fr !important; }
          .season-hero-grid { grid-template-columns: 1fr !important; }
          .season-hero-logo { display: none !important; }
          .sticky-standings { position: static !important; }
          .podium-bar { flex-direction: column !important; }
          .podium-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
        }
      `}</style>

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
            <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8102E' }}>
              Est. 2016
            </span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 8vw, 76px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.02em', lineHeight: 0.92, marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            League History
          </h1>
          <div style={{ width: 48, height: 3, background: '#C8102E', marginBottom: '1rem' }} />
          <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 3vw, 16px)', color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.6 }}>
            Six seasons. Six tournaments. A complete record of every champion, every result, and every moment that defined the Moody Marble League.
          </p>
        </div>
      </section>

      <div style={{ height: 3, background: '#C8102E' }} />

      {/* ── Timeline ── */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem 5rem', position: 'relative' }}>
        {/* Left-anchored spine */}
        <div style={{ position: 'absolute', left: 'calc(1.5rem + 8px)', top: 0, bottom: 0, width: 2, background: '#e5e7eb' }} />

        {SEASONS.map((season) => {
          const theme = getTheme(season.champion)
          return <TimelineCard key={season.id} season={season} theme={theme} />
        })}
      </div>
    </main>
  )
}

// ─── TIMELINE CARD ─────────────────────────────────────────────────────────────
function TimelineCard({ season, theme }: {
  season: SeasonData
  theme: ReturnType<typeof getTheme>
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'start', marginBottom: '2rem', position: 'relative' }}>
      {/* Node */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, zIndex: 1 }}>
        <div style={{
          width: 16, height: 16,
          borderRadius: '50%',
          background: hovered ? theme.accent : '#fff',
          border: `3px solid ${hovered ? theme.accent : '#C8102E'}`,
          boxShadow: hovered ? `0 0 0 4px ${theme.accent}33` : 'none',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }} />
      </div>

      {/* Card */}
      <div style={{ paddingLeft: 16, paddingTop: 4 }}>
        <Link
          to={`/history/${season.id}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <div style={{
            background: hovered ? theme.bg : '#fff',
            borderTop: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`,
            borderBottom: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`,
            borderRight: `1px solid ${hovered ? theme.accent : '#e5e7eb'}`,
            borderLeft: `4px solid ${hovered ? theme.accent : '#e5e7eb'}`,
            boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
          }}>
            <div style={{ height: 3, background: theme.accent }} />
            <div style={{ padding: '1rem 1.25rem' }}>
              {/* Season + year */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: theme.accent, background: `${theme.accent}18`, padding: '2px 8px' }}>{season.season}</span>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', color: hovered ? 'rgba(255,255,255,0.4)' : '#9ca3af', transition: 'color 0.2s' }}>{season.year} · {season.location}</span>
              </div>

              {/* Tournament name */}
              <h3 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 4vw, 28px)', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1, color: hovered ? '#fff' : '#111827', marginBottom: 6, transition: 'color 0.2s' }}>
                {season.tournament}
              </h3>

              {/* Tagline */}
              <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 13, lineHeight: 1.5, color: hovered ? theme.textMuted : '#6b7280', marginBottom: '0.75rem', transition: 'color 0.2s' }}>
                {season.tagline}
              </p>

              {/* Champion + CTA row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={getTeamLogo(season.champion)} alt={season.champion} style={{ width: 26, height: 26, objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: hovered ? 'rgba(255,255,255,0.4)' : '#9ca3af', transition: 'color 0.2s' }}>Champion</div>
                    <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: hovered ? '#fff' : theme.accent, letterSpacing: '0.04em', transition: 'color 0.2s' }}>{season.champion}</div>
                  </div>
                </div>
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.accent }}>
                  View Season →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

// ─── SEASON DETAIL PAGE ────────────────────────────────────────────────────────
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
      {/* ── Hero ── */}
      <section style={{ background: theme.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '160%', height: '100%', background: theme.stripe1, transform: 'skewX(-18deg) translateX(-20%)', top: 0, left: '30%' }} />
          <div style={{ position: 'absolute', width: '70%', height: '100%', background: theme.stripe2, transform: 'skewX(-18deg) translateX(-10%)', top: 0, left: '50%', opacity: 0.7 }} />
          <div style={{ position: 'absolute', width: 8, height: '130%', background: theme.accent, transform: 'skewX(-18deg)', top: '-15%', left: '48%', opacity: 0.9 }} />
          <div style={{ position: 'absolute', width: 3, height: '130%', background: theme.accentLight, transform: 'skewX(-18deg)', top: '-15%', left: '49.5%', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: theme.accent, opacity: 0.6 }} />
          <img src={getTeamLogo(season.champion)} alt="" aria-hidden="true" style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', height: '110%', opacity: 0.07, filter: 'grayscale(100%) brightness(2)', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>
          <div className="season-hero-grid">
            <div>
              <Link to="/history" style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: 14 }}>← League History</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, background: 'rgba(255,255,255,0.06)', border: `1px solid ${theme.accent}44`, padding: '5px 14px 5px 10px', width: 'fit-content' }}>
                <span style={{ display: 'block', width: 20, height: 2, background: theme.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: theme.accent }}>{season.season} · {season.year} · {season.location}</span>
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 6vw, 68px)', textTransform: 'uppercase', color: '#fff', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: '0.75rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>{season.tournament}</h1>
              <div style={{ width: 48, height: 3, background: theme.accent, marginBottom: '0.75rem' }} />
              <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 2.5vw, 16px)', color: theme.textMuted, maxWidth: 440, lineHeight: 1.6, marginBottom: '1.5rem' }}>{season.story}</p>
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

          {/* Podium bar */}
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

      {/* ── Two-column body ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        <div className="season-body-grid">

          {/* LEFT: Editorial */}
          <div>
            {/* Photo placeholder */}
            <div style={{ width: '100%', aspectRatio: '16/9', background: '#1a2a6e', border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #141f55 0%, #1a2a6e 50%, #0d1540 100%)' }} />
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 18, color: 'rgba(255,255,255,0.2)' }}>📷</div>
                <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{season.tournament} · {season.year}</div>
                <div style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.15)', marginTop: 3 }}>Photo coming soon</div>
              </div>
            </div>

            {/* Key Storylines */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 10, borderBottom: '2px solid #e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: -2, left: 0, width: 36, height: 2, background: '#C8102E' }} />
                <h2 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.04em', margin: 0 }}>Key Storylines</h2>
              </div>
              {season.storylines.map((s, i) => (
                <div key={i} style={{ marginBottom: '1.75rem', paddingLeft: 14, borderLeft: '3px solid #e5e7eb' }}>
                  <h3 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 800, fontSize: 17, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.03em', marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: 1.8, color: '#374151', margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>

            {/* Notable Performances */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 10, borderBottom: '2px solid #e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: -2, left: 0, width: 36, height: 2, background: '#C8102E' }} />
                <h2 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.04em', margin: 0 }}>Notable Performances</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {season.notablePerformances.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#f4f6fb', border: '1px solid #e5e7eb', borderLeft: '4px solid #C8102E', padding: '12px 14px' }}>
                    <img src={getTeamLogo(p.team)} alt={p.team} style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 16, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.03em' }}>{p.team}</span>
                        <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 11, color: '#C8102E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.stat}</span>
                      </div>
                      <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standout Team */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 10, borderBottom: '2px solid #e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: -2, left: 0, width: 36, height: 2, background: '#C8102E' }} />
                <h2 style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 20, textTransform: 'uppercase', color: '#1a2a6e', letterSpacing: '0.04em', margin: 0 }}>Standout Team</h2>
              </div>
              <div style={{ background: '#1a2a6e', padding: '1.25rem', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <img src={getTeamLogo(season.mvp.team)} alt={season.mvp.team} style={{ width: 60, height: 60, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }} />
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8102E', marginBottom: 4 }}>Tournament Standout</div>
                  <div style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 4vw, 28px)', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 8 }}>{season.mvp.team}</div>
                  <p style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: 'clamp(13px, 2.5vw, 15px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{season.mvp.reason}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky standings */}
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

// ─── STANDING ROW ──────────────────────────────────────────────────────────────
function StandingRow({ row, i, total, theme }: {
  row: { place: number; team: string }
  i: number
  total: number
  theme: ReturnType<typeof getTheme>
}) {
  const [hovered, setHovered] = useState(false)
  const isChamp = row.place === 1
  const isPodium = row.place <= 3

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'grid', gridTemplateColumns: '44px 1fr', padding: '8px 12px', borderBottom: i < total - 1 ? '1px solid #f3f4f6' : 'none', background: isChamp ? `${theme.accent}10` : hovered ? '#f4f6fb' : '#fff', borderLeft: isChamp ? `3px solid ${theme.accent}` : hovered ? '3px solid #C8102E' : '3px solid transparent', alignItems: 'center', transition: 'all 0.15s ease' }}
    >
      <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 900, fontSize: 15, color: isPodium ? theme.accent : '#9ca3af' }}>
        {placeSuffix(row.place)}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <img src={getTeamLogo(row.team)} alt={row.team} style={{ width: 24, height: 24, objectFit: 'contain', background: '#f4f6fb', padding: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Barlow Condensed', Arial Narrow, Arial, sans-serif", fontWeight: 700, fontSize: 13, color: '#111827', letterSpacing: '0.02em' }}>{row.team}</span>
        {isChamp && <span style={{ fontSize: 11 }}>🏆</span>}
      </div>
    </div>
  )
}

// ─── ROUTER ────────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  return (
    <Routes>
      <Route path="/"    element={<TimelinePage />} />
      <Route path="/:id" element={<SeasonPage />} />
    </Routes>
  )
}