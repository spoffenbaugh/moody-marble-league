import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import TeamsPage from './pages/TeamsPage'

function App() {
  const articles = [
    {
      slug: 'yellow-fever-long-road-back',
      title: 'Yellow Fever, Rock Bottom, and the Long Road Back',
      category: 'MML Deep Dive',
      tag: 'Historical Worst to First?',
      heroTeam: 'Yellow Fever',
      summary:
        'From the Honeysuckles era to a 2025 finals berth, Yellow Fever may be the league’s most fascinating rebuild.',
      pullQuote:
        '99 aggregate across six seasons. The math is unforgiving. The team keeps showing up anyway.',
      content: [
        'They started life as the Honeysuckles. Or the Sucklers, depending on which early bracket you read. They finished last in Season 1 with 50 points. They finished 14th in Season 2 and 16th in Season 3.',
        'The name changed to Yellow Fever sometime before the New Age era. The results, mostly, did not. Across six seasons, Yellow Fever have the worst average placement of any team to compete in all six tournaments: 16.50. An aggregate of 99.',
        'But here is what the numbers do not tell you: Yellow Fever had their best season ever in 2025. A 13th-place finish in the Iowa Open finals round meant competing against 15 of the league’s best teams and outscoring Sin, GotToGo, and Mowers.',
        'The arc from Honeysuckles dead last in 2016 to a competitive finals berth in 2025 is nine years of stubbornness, reinvention, and refusal to quit.',
      ],
    },
    {
      slug: 'orcas-peoples-team',
      title: 'Everyone Loves the Orcas. The Orcas Do Not Care.',
      category: 'MML Culture',
      tag: 'The People’s Team',
      heroTeam: 'Orcas',
      summary:
        'Beloved, chaotic, and somehow always compelling, the Orcas prove the MML is not just about winning.',
      pullQuote:
        'Nobody cheers louder when the Orcas score a point. Nobody is less surprised when they do not.',
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
      summary:
        'Six seasons of elite consistency, repeated near-misses, and the most tortured fanbase in the sport.',
      pullQuote:
        'They are the most consistent team this league has ever produced. They are also its greatest what-if.',
      content: [
        'The numbers are almost cruel. Trinitarians have competed in all six MML seasons. Their average placement is 5.50, second best in league history behind only HemoGoblins.',
        'Season 1: 8th. Season 2: 9th. Season 3: 3rd. Season 4: 5th. Season 5: 3rd again. Season 6: 5th in the finals, watching Sorbetbes hoist the trophy.',
        'What makes it stranger is how they lose. Not in collapses. Not in shocking eliminations. They simply finish second, third, or fifth in competitions where they were always competitive and never quite first.',
        'The MML’s most reliable team is still waiting for the one result that would define a dynasty rather than haunt it.',
      ],
    },
    {
      slug: 'angels-deep-sky-hemogoblins-rivalry',
      title: 'Angels, Deep Sky, and HemoGoblins at War',
      category: 'MML Feature',
      tag: 'All-Time Rivalry Series',
      heroTeam: 'HemoGoblins',
      secondaryTeams: ['Angels', 'Deep Sky'],
      summary:
        'The league’s defining rivalry has never needed two teams. It has always needed three.',
      pullQuote:
        'Deep Sky has never beaten HemoGoblins when it mattered. Angels finally did in 2023. That changes everything.',
      content: [
        'Most rivalries are between two teams. The MML’s defining rivalry has always needed three. Angels, Deep Sky, and HemoGoblins have spent six seasons pushing each other, chasing each other, and occasionally breaking each other’s hearts.',
        'HemoGoblins established dominance first. Angels were the perennial challengers. Deep Sky sat in the shadows, placing consistently until a 4th-place finish in Season 4 signaled they were ready to move up.',
        'The 2023 Mach 3 tournament was the pivot point. HemoGoblins stumbled to 17th overall. Angels seized the moment and claimed the championship that had eluded them for seven years.',
        'Season 6’s Iowa Open rewrote it again: HemoGoblins 4th, Angels 27th, Deep Sky 10th. Three teams, six seasons, never the same result twice.',
      ],
    },
    {
      slug: 'hemogoblins-legacy',
      title: 'The HemoGoblins Legacy',
      category: 'MML Historical Review',
      tag: 'Seasons 1–4',
      heroTeam: 'HemoGoblins',
      summary:
        'Three titles, one shadow, and a dynasty that still defines every future MML contender.',
      pullQuote:
        'They were seeded 12th. Nobody saw it coming. Nobody.',
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
      summary:
        'Nine years, six seasons, a name change, and finally a championship that rewrote their history.',
      pullQuote:
        'The longest road to a championship in MML history ended not with a comeback, but with a statement.',
      content: [
        'They competed in the very first tournament. They finished 4th. They waited nine years. Then they won.',
        'In the summer of 2016, a team called the Broncos showed up to the Baldwin Invitational and immediately made their presence known. They finished 4th overall, the best debut of any team in the inaugural season.',
        'What followed was one of the more quietly painful arcs in league history. The Colorado Classic brought a 12th-place finish. The Michigan Games dropped them to 15th.',
        'The Iowa Open changed everything. Sorbetbes entered 2025 as a team with history but no crown, then posted 55 points in the finals, the highest finals score in the field.',
        'The Broncos who showed up fourth in 2016 became the Sorbetbes who stood first in 2025.',
      ],
    },
  ]

  const standings = [
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

  const getTeamLogo = (teamName: string) => {
    const found = standings.find((team) => team.team === teamName)
    if (found) return found.logo

    const fallbackLogos: Record<string, string> = {
      Angels: '/images/teams/angels.png',
      'Deep Sky': '/images/teams/deep-sky.png',
      HemoGoblins: '/images/teams/hemo-goblins.png',
      Orcas: '/images/teams/orcas.png',
      Sorbetbes: '/images/teams/sorbetbes.png',
      Trinitarians: '/images/teams/trinitarians.png',
      'Yellow Fever': '/images/teams/yellow-fever.png',
    }

    return fallbackLogos[teamName] || '/images/mml-logo.png'
  }

  function Header() {
    return (
      <>
        <div className="bg-red-600 text-white text-center py-2 text-sm font-black tracking-wide">
          ● SEASON 7 COMING 2027
        </div>

        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img src="/images/mml-logo.png" alt="Moody Marble League logo" className="h-11 sm:h-14 w-auto" />

              <div>
                <div className="text-lg sm:text-2xl font-black tracking-tight leading-none">
                  <span className="text-red-600">MOODY</span>{' '}
                  <span className="text-blue-900">MARBLE LEAGUE</span>
                </div>
                <div className="hidden sm:block text-xs uppercase tracking-[0.25em] font-bold text-slate-500 mt-1">
                  MML Historical Archive
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-black uppercase tracking-wide text-sm">
              <Link className="hover:text-red-600 transition" to="/">Home</Link>
              <Link className="hover:text-red-600 transition" to="/teams">Teams</Link>
              <Link className="hover:text-red-600 transition" to="/articles">Articles</Link>
              <a className="hover:text-red-600 transition" href="/#history">History</a>
            </nav>

            <Link to="/teams" className="hidden sm:inline-flex bg-blue-900 hover:bg-blue-800 text-white font-black px-6 py-3 rounded-full shadow-lg transition">
              View Teams
            </Link>
          </div>
        </header>
      </>
    )
  }

  function Footer() {
    return (
      <footer id="history" className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <div className="text-2xl font-black">
              <span className="text-red-600">MOODY</span>{' '}
              <span className="text-blue-900">MARBLE LEAGUE</span>
            </div>
            <div className="text-slate-500 mt-1">Competitive marble racing since Season 1.</div>
          </div>
          <div className="flex gap-6 text-slate-500 font-bold">
            <Link className="hover:text-red-600 transition" to="/teams">Teams</Link>
            <Link className="hover:text-red-600 transition" to="/articles">Articles</Link>
            <Link className="hover:text-red-600 transition" to="/">Home</Link>
          </div>
        </div>
      </footer>
    )
  }

  function ArticleCard({ article }: { article: (typeof articles)[number] }) {
    return (
      <article className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-red-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-red-600 via-white to-blue-900" />
        <div className="p-7">
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-900">
              {article.category}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase">Feature</span>
          </div>

          <h3 className="text-2xl font-black leading-tight group-hover:text-red-600 transition">
            {article.title}
          </h3>
          <div className="mt-3 text-sm font-black text-blue-900">{article.tag}</div>
          <p className="mt-4 text-slate-600 leading-relaxed">{article.summary}</p>
          <Link to={`/articles/${article.slug}`} className="mt-6 inline-block font-black text-red-600 hover:text-blue-900 transition">
            Read Article →
          </Link>
        </div>
      </article>
    )
  }

  function HomePage() {
    return (
      <main id="home">
        <section className="relative overflow-hidden bg-blue-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.16),transparent_35%),linear-gradient(135deg,rgba(220,38,38,0.55),transparent_38%)]" />
          <div className="absolute -right-24 -bottom-28 text-[28rem] opacity-10 leading-none">●</div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide mb-8">
                Welcome to the offseason
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
                The Roll
                <span className="block text-yellow-300">Never Stops</span>
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-blue-100 max-w-2xl leading-relaxed font-medium">
                Explore six seasons of Moody Marble League history, intense rivalries, wild rebuilds, unforgettable teams, and the road to Season 7.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/articles" className="bg-yellow-300 hover:bg-yellow-200 text-slate-950 font-black px-8 py-4 rounded-full transition">
                  Read Stories →
                </Link>
                <Link to="/teams" className="border-2 border-white/40 bg-white/10 hover:bg-white hover:text-blue-900 text-white font-black px-8 py-4 rounded-full transition">
                  Explore Teams
                </Link>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl backdrop-blur">
              <div className="bg-white rounded-[1.5rem] p-8 text-slate-950 min-h-[360px] flex flex-col justify-center">
                <div className="text-sm font-black text-red-600 uppercase tracking-widest">Featured Legacy Matchup</div>
                <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">HemoGoblins vs Trinitarians</h2>
                <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                  The dynasty against the league’s most consistent contender. Six seasons of history, near-misses, titles, and one rivalry that still defines the MML.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 items-center text-center">
                  <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
                    <img src={getTeamLogo('HemoGoblins')} alt="HemoGoblins" className="h-20 w-20 mx-auto object-contain mb-3" />
                    <div className="text-xs text-red-600 font-black uppercase">Dynasty</div>
                    <div className="font-black mt-1">HemoGoblins</div>
                  </div>

                  <div className="text-3xl font-black text-blue-900">VS</div>

                  <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                    <img src={getTeamLogo('Trinitarians')} alt="Trinitarians" className="h-20 w-20 mx-auto object-contain mb-3" />
                    <div className="text-xs text-blue-900 font-black uppercase">Challenger</div>
                    <div className="font-black mt-1">Trinitarians</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-red-600 text-white border-y border-red-700">
          <div className="max-w-7xl mx-auto px-6 py-4 font-black uppercase tracking-wide flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <span>League News</span>
            <span className="text-yellow-200">Season 7 Coming 2027</span>
          </div>
        </section>

        <section id="articles" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-red-600 font-black uppercase tracking-[0.25em] text-sm">MML Media</div>
              <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mt-3">Featured Articles</h2>
            </div>
            <Link to="/articles" className="self-start md:self-auto border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-black px-6 py-3 rounded-full transition">
              View Article Archive
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section id="rankings" className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
                <h2 className="text-4xl font-black text-blue-900">All-Time Power Rankings</h2>
                <div className="font-bold text-slate-500">Sorted by average placement</div>
              </div>

              <div className="space-y-3">
                {standings.map((row, index) => (
                  <div key={row.team} className="grid grid-cols-[42px_1fr] md:grid-cols-[48px_1fr_70px_70px_80px] gap-3 md:gap-5 items-center rounded-2xl border border-slate-200 bg-white px-4 py-4 hover:border-red-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="h-10 w-10 rounded-xl bg-blue-900 text-white font-black flex items-center justify-center">{index + 1}</div>

                    <div className="flex items-center gap-4 min-w-0">
                      <img src={row.logo} alt={`${row.team} logo`} className="w-14 h-14 object-contain rounded-xl bg-white border border-slate-200 p-1 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-black text-lg truncate">{row.team}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase md:hidden">Avg. {row.average} · {row.tournaments} Tours</div>
                        <div className="hidden md:block text-xs font-bold text-slate-400 uppercase">All-time rank</div>
                      </div>
                    </div>

                    <div className="hidden md:block text-center">
                      <div className="text-xs text-slate-400 font-black uppercase">Tours</div>
                      <div className="font-black">{row.tournaments}</div>
                    </div>
                    <div className="hidden md:block text-center">
                      <div className="text-xs text-slate-400 font-black uppercase">Agg.</div>
                      <div className="font-black">{row.aggregate}</div>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-xs text-slate-400 font-black uppercase">Avg.</div>
                      <div className="text-xl font-black text-red-600">{row.average}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-blue-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="text-yellow-300 font-black uppercase tracking-widest text-sm">Historical Snapshot</div>
              <h3 className="text-4xl font-black mt-4 leading-tight">Six Seasons. One Archive.</h3>
              <p className="mt-5 text-blue-100 leading-relaxed">
                The MML archive tracks tournament placements, team averages, legacy rivalries, championship runs, and the weird stories that make the league feel alive.
              </p>
            </aside>
          </div>
        </section>
      </main>
    )
  }

  function ArticlesPage() {
    return (
      <main className="bg-white">
        <section className="bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide mb-6">MML Journalism</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase">Featured Articles</h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl leading-relaxed">
              Deep dives, rivalries, franchise histories, power rankings, and the stories that shaped the Moody Marble League.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
    )
  }

  function ArticlePage() {
    const { slug } = useParams()
    const article = articles.find((item) => item.slug === slug)

    if (!article) {
      return (
        <main className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-black text-blue-900">Article Not Found</h1>
          <Link to="/articles" className="mt-8 inline-block font-black text-red-600 hover:text-blue-900">← Back to Articles</Link>
        </main>
      )
    }

    const relatedTeams = [article.heroTeam, ...(article.secondaryTeams || [])].filter(Boolean) as string[]

    return (
      <main className="bg-white">
        <section className="bg-blue-900 text-white">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <Link to="/articles" className="inline-block text-blue-100 hover:text-yellow-300 font-black mb-8">← Back to Articles</Link>

            <div className="flex flex-wrap gap-4 items-center mb-8">
              {relatedTeams.map((teamName) => (
                <img key={teamName} src={getTeamLogo(teamName)} alt={`${teamName} logo`} className="h-20 w-20 object-contain rounded-2xl bg-white p-2 shadow-lg" />
              ))}
            </div>

            <div className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide mb-6">{article.category}</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">{article.title}</h1>
            <p className="mt-6 text-2xl text-blue-100 font-bold">{article.tag}</p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-2xl leading-10 text-slate-700 font-semibold border-l-8 border-red-600 pl-6 mb-10">{article.summary}</p>

          <blockquote className="my-10 rounded-3xl bg-blue-900 text-white p-8 shadow-xl">
            <div className="text-sm uppercase tracking-[0.25em] font-black text-yellow-300 mb-4">Pull Quote</div>
            <p className="text-2xl md:text-3xl font-black leading-tight">“{article.pullQuote}”</p>
          </blockquote>

          {article.content.map((paragraph) => (
            <p key={paragraph} className="text-xl leading-9 text-slate-700 mb-7">{paragraph}</p>
          ))}
        </article>
      </main>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-950 font-sans scroll-smooth">
        <style>{`
          html { scroll-behavior: smooth; }
        `}</style>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
