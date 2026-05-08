const teams = [
  { name: 'Accio', logo: '/images/teams/accio.png', color: 'bg-blue-700', division: 'South West', owner: 'Joel', seasons: 1, average: '9.00' },
  { name: 'Angels', logo: '/images/teams/angels.png', color: 'bg-red-600', division: 'Rocky Mountains', owner: 'Joel', seasons: 6, average: '10.00' },
  { name: 'Big Cats', logo: '/images/teams/big-cats.png', color: 'bg-orange-500', division: 'Great Plains', owner: 'Sam', seasons: 2, average: '16.00' },
  { name: 'Cheapskates', logo: '/images/mml-logo.png', color: 'bg-emerald-700', division: 'Regulated', owner: 'TBD', seasons: 3, average: '11.33' },
  { name: 'Club Baby Seal', logo: '/images/teams/club-baby-seal.png', color: 'bg-sky-500', division: 'South Central', owner: 'Other', seasons: 1, average: '22.00' },
  { name: 'Deep Sky', logo: '/images/teams/deep-sky.png', color: 'bg-blue-900', division: 'Great Plains', owner: 'Jeff', seasons: 6, average: '7.50' },
  { name: 'Double Truffle', logo: '/images/teams/double-truffle.png', color: 'bg-amber-800', division: 'South West', owner: 'Sam', seasons: 3, average: '10.33' },
  { name: 'Expressos', logo: '/images/teams/expressos.png', color: 'bg-amber-700', division: 'New England', owner: 'Jeff', seasons: 6, average: '9.00' },
  { name: 'Flower Power', logo: '/images/mml-logo.png', color: 'bg-pink-600', division: 'Regulated', owner: 'TBD', seasons: 1, average: '20.00' },
  { name: 'Fracture', logo: '/images/teams/fracture.png', color: 'bg-slate-800', division: 'Regulated', owner: 'Sam', seasons: 1, average: '24.00' },
  { name: 'GotToGo', logo: '/images/teams/gottogo.png', color: 'bg-red-700', division: 'South West', owner: 'Joel', seasons: 2, average: '15.50' },
  { name: 'HemoGoblins', logo: '/images/teams/hemo-goblins.png', color: 'bg-red-800', division: 'South Central', owner: 'Sam', seasons: 6, average: '5.17' },
  { name: 'Jawbreakers', logo: '/images/teams/jawbreakers.png', color: 'bg-pink-600', division: 'Pacific Coast', owner: 'Joel', seasons: 3, average: '12.67' },
  { name: 'Mowers', logo: '/images/teams/mowers.png', color: 'bg-green-700', division: 'Great Lakes', owner: 'Jeff', seasons: 6, average: '9.50' },
  { name: 'Navigators', logo: '/images/teams/navigators.png', color: 'bg-blue-800', division: 'South East', owner: 'Joel', seasons: 1, average: '26.00' },
  { name: 'Orcas', logo: '/images/teams/orcas.png', color: 'bg-cyan-700', division: 'South East', owner: 'Other', seasons: 6, average: '14.17' },
  { name: 'Oysterium', logo: '/images/mml-logo.png', color: 'bg-lime-700', division: 'Regulated', owner: 'TBD', seasons: 2, average: '13.00' },
  { name: 'Pengys', logo: '/images/teams/pengys.png', color: 'bg-sky-600', division: 'Great Plains', owner: 'Sam', seasons: 6, average: '7.67' },
  { name: 'Peppermint Barks', logo: '/images/teams/peppermint-barks.png', color: 'bg-red-600', division: 'New England', owner: 'Jeff', seasons: 1, average: '20.00' },
  { name: 'Peregrine', logo: '/images/teams/peregrine.png', color: 'bg-slate-700', division: 'Rocky Mountains', owner: 'Sam', seasons: 3, average: '10.67' },
  { name: 'Purps', logo: '/images/teams/purps.png', color: 'bg-purple-700', division: 'Great Lakes', owner: 'Sam', seasons: 6, average: '15.17' },
  { name: 'Sam\'s Senior Sitizens', logo: '/images/teams/sams-senior-sitizens.png', color: 'bg-slate-700', division: 'Pacific Coast', owner: 'Sam', seasons: 6, average: '10.67' },
  { name: 'Sauce Boss', logo: '/images/teams/sauce-boss.png', color: 'bg-red-700', division: 'Great Lakes', owner: 'Jeff', seasons: 1, average: '8.00' },
  { name: 'Sin', logo: '/images/teams/sin.png', color: 'bg-red-900', division: 'South Central', owner: 'Joel', seasons: 6, average: '8.00' },
  { name: 'Sorbetbes', logo: '/images/teams/sorbetbes.png', color: 'bg-orange-500', division: 'Rocky Mountains', owner: 'Jeff', seasons: 6, average: '8.67' },
  { name: 'Spartans', logo: '/images/teams/spartans.png', color: 'bg-red-700', division: 'New England', owner: 'Sam', seasons: 1, average: '28.00' },
  { name: 'Specter', logo: '/images/teams/specter.png', color: 'bg-green-900', division: 'Rocky Mountains', owner: 'Sam', seasons: 1, average: '18.00' },
  { name: 'Tankers', logo: '/images/teams/tankers.png', color: 'bg-green-800', division: 'Pacific Coast', owner: 'Joel', seasons: 1, average: '6.00' },
  { name: 'Tinsel Tango', logo: '/images/teams/tinsel-tango.png', color: 'bg-red-500', division: 'South West', owner: 'Jeff', seasons: 1, average: '25.00' },
  { name: 'Trinitarians', logo: '/images/teams/trinitarians.png', color: 'bg-yellow-600', division: 'New England', owner: 'Joel', seasons: 6, average: '5.50' },
  { name: 'Turquoise Tempest', logo: '/images/teams/turquoise-tempest.png', color: 'bg-cyan-700', division: 'South Central', owner: 'Jeff', seasons: 1, average: '31.00' },
  { name: 'Twisters', logo: '/images/teams/twisters.png', color: 'bg-red-600', division: 'Pacific Coast', owner: 'Jeff', seasons: 2, average: '14.50' },
  { name: 'Vanilla Thunder', logo: '/images/teams/vanilla-thunder.png', color: 'bg-yellow-500', division: 'Great Lakes', owner: 'Joel', seasons: 6, average: '13.67' },
  { name: 'Yak Attack', logo: '/images/teams/yak-attack.png', color: 'bg-green-700', division: 'South East', owner: 'Sam', seasons: 6, average: '9.67' },
  { name: 'Yellow Fever', logo: '/images/teams/yellow-fever.png', color: 'bg-yellow-500', division: 'South East', owner: 'Jeff', seasons: 6, average: '16.50' },
  { name: 'Zoomies', logo: '/images/teams/zoomies.png', color: 'bg-blue-700', division: 'Great Plains', owner: 'Joel', seasons: 1, average: '32.00' },
]

function TeamsPage() {
  const divisionOrder = [
    'Pacific Coast',
    'Rocky Mountains',
    'South Central',
    'South East',
    'South West',
    'Great Plains',
    'Great Lakes',
    'New England',
    'Regulated',
  ]

  return (
    <main className="bg-white">
      <section className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide mb-6">
            Franchise Directory
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase">
            MML Teams
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl leading-relaxed">
            Browse every Moody Marble League franchise, organized by division.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {divisionOrder.map((division) => {
          const divisionTeams = teams.filter((team) => team.division === division)

          if (divisionTeams.length === 0) return null

          return (
            <div key={division} className="mb-16 last:mb-0">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-1 w-14 rounded-full bg-red-600" />
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-blue-900">
                    {division}
                  </h2>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    {divisionTeams.length} teams
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {divisionTeams.map((team) => (
                  <div
                    key={team.name}
                    className={`group relative min-h-[320px] overflow-hidden rounded-3xl border-2 border-slate-200 ${team.color} p-6 shadow-sm hover:shadow-xl hover:border-red-500 hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30" />

                    <div className="relative z-10 flex min-h-[260px] flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-8">
                      <img
                        src={team.logo}
                        alt={`${team.name} logo`}
                        className="max-h-40 max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <h3 className="mt-5 text-2xl font-black text-white drop-shadow-lg">
                        {team.name}
                      </h3>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 z-20 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-xs font-black uppercase text-slate-400">Division</div>
                            <div className="font-black text-blue-900">{team.division}</div>
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase text-slate-400">Owner</div>
                            <div className="font-black text-blue-900">{team.owner}</div>
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase text-slate-400">Seasons</div>
                            <div className="font-black text-red-600">{team.seasons}</div>
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase text-slate-400">Avg. Place</div>
                            <div className="font-black text-red-600">{team.average}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default TeamsPage
