import { useState } from 'react'
import TeamSetup from './components/Setup/TeamSetup'
import Game from './components/Game/Game'

function App() {
  const [gameState, setGameState] = useState({
    isSetup: false,
    teams: [],
    settings: null
  })

  const handleSetupComplete = ({ teams, gameSettings }) => {
    setGameState({
      isSetup: true,
      teams,
      settings: gameSettings
    })
  }

  return (
    <div className="min-h-screen bg-game-background">
      {!gameState.isSetup ? (
        <TeamSetup onComplete={handleSetupComplete} />
      ) : (
        <Game 
          teams={gameState.teams}
          settings={gameState.settings}
        />
      )}
    </div>
  )
}

export default App 