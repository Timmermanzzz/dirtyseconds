import { useState } from 'react'
import { FiPlus, FiTrash } from 'react-icons/fi'

function Setup({ onStart }) {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', players: '' },
    { id: 2, name: 'Team 2', players: '' }
  ])
  const [targetScore, setTargetScore] = useState(30)

  const addTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: `Team ${teams.length + 1}`,
      players: ''
    }
    setTeams([...teams, newTeam])
  }

  const removeTeam = (teamId) => {
    if (teams.length > 2) {
      setTeams(teams.filter(team => team.id !== teamId))
    }
  }

  const updateTeam = (id, field, value) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, [field]: value } : team
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onStart({ teams, targetScore })
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Teams */}
        <div className="space-y-4">
          <h2 className="text-xl text-white font-semibold">Teams</h2>
          {teams.map(team => (
            <div key={team.id} className="flex gap-2">
              <input
                type="text"
                value={team.name}
                onChange={(e) => updateTeam(team.id, 'name', e.target.value)}
                placeholder="Team naam"
                className="flex-1 p-2 rounded bg-white/10 text-white"
                required
              />
              <input
                type="text"
                value={team.players}
                onChange={(e) => updateTeam(team.id, 'players', e.target.value)}
                placeholder="Spelers (optioneel)"
                className="flex-1 p-2 rounded bg-white/10 text-white"
              />
              {teams.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeTeam(team.id)}
                  className="p-2 text-dirty-accent hover:text-red-500"
                >
                  <FiTrash />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addTeam}
            className="flex items-center gap-2 text-dirty-accent hover:text-dirty-accent/80"
          >
            <FiPlus /> Team toevoegen
          </button>
        </div>

        {/* Target Score */}
        <div>
          <h2 className="text-xl text-white font-semibold mb-2">Doelscore</h2>
          <input
            type="number"
            value={targetScore}
            onChange={(e) => setTargetScore(parseInt(e.target.value))}
            min="1"
            className="w-full p-2 rounded bg-white/10 text-white"
            required
          />
        </div>

        {/* Start Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-dirty-accent hover:bg-dirty-accent/90 
                     text-dirty-dark font-bold rounded-lg shadow-lg 
                     transform transition hover:scale-105"
        >
          Start Spel
        </button>
      </form>
    </div>
  )
}

export default Setup 