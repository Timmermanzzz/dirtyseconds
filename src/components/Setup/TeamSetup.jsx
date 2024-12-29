import { useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';

const TeamSetup = ({ onComplete }) => {
  const [teams, setTeams] = useState([
    { id: '1', name: 'Team 1', players: [''] }
  ]);
  const [gameSettings, setGameSettings] = useState({
    winningScore: 30,
    timePerRound: 30,
    wordsPerRound: 5
  });

  const addTeam = () => {
    const newTeam = {
      id: (teams.length + 1).toString(),
      name: `Team ${teams.length + 1}`,
      players: [''],
      score: 0
    };
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (teamId) => {
    if (teams.length > 1) {
      setTeams(teams.filter(team => team.id !== teamId));
    }
  };

  const updateTeamName = (teamId, newName) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name: newName } : team
    ));
  };

  const addPlayer = (teamId) => {
    setTeams(teams.map(team =>
      team.id === teamId 
        ? { ...team, players: [...team.players, ''] }
        : team
    ));
  };

  const updatePlayer = (teamId, playerIndex, name) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? {
            ...team,
            players: team.players.map((player, idx) =>
              idx === playerIndex ? name : player
            )
          }
        : team
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ teams, gameSettings });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Spel Setup</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Game Settings */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Spelinstellingen</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Punten om te winnen
              </label>
              <input
                type="number"
                value={gameSettings.winningScore}
                onChange={(e) => setGameSettings({
                  ...gameSettings,
                  winningScore: parseInt(e.target.value)
                })}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Seconden per ronde
              </label>
              <input
                type="number"
                value={gameSettings.timePerRound}
                onChange={(e) => setGameSettings({
                  ...gameSettings,
                  timePerRound: parseInt(e.target.value)
                })}
                className="w-full p-2 border rounded"
                min="10"
              />
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="space-y-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => updateTeamName(team.id, e.target.value)}
                  className="text-xl font-semibold p-2 border rounded"
                  placeholder="Team naam"
                />
                <button
                  type="button"
                  onClick={() => removeTeam(team.id)}
                  disabled={teams.length === 1}
                  className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <FiTrash size={20} />
                </button>
              </div>

              {/* Players */}
              <div className="space-y-2">
                {team.players.map((player, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayer(team.id, idx, e.target.value)}
                    className="input-base"
                    placeholder={`Speler ${idx + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addPlayer(team.id)}
                  className="w-full p-2 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-gray-400"
                >
                  <FiPlus className="mr-2" /> Voeg speler toe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Team Button */}
        <button
          type="button"
          onClick={addTeam}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <FiPlus className="mr-2" /> Voeg team toe
        </button>

        {/* Start Game Button */}
        <button
          type="submit"
          className="btn btn-success w-full mt-6"
        >
          Start Spel
        </button>
      </form>
    </div>
  );
};

export default TeamSetup; 