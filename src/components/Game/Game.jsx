import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timer from './Timer'
import WordCard from './WordCard'
import ScoreBoard from './ScoreBoard'
import { getRandomWords } from '../../data/words'
import { Howl } from 'howler'

const initializeSound = (src) => {
  try {
    return new Howl({ src: [src] })
  } catch (error) {
    console.error('Error loading sound:', error)
    return null
  }
}

const Game = ({ teams, settings }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentWords, setCurrentWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [timeLeft, setTimeLeft] = useState(settings.timePerRound)
  const [gameTeams, setGameTeams] = useState(
    teams.map(team => ({
      ...team,
      score: 0
    }))
  )
  const [winner, setWinner] = useState(null)
  const endSoundRef = useRef(initializeSound('/sounds/timeup.wav'))
  const [roundEnded, setRoundEnded] = useState(false)
  const [nextPlayer, setNextPlayer] = useState(null)
  
  const getCurrentPlayer = () => {
    const currentTeam = gameTeams[currentTeamIndex]
    return currentTeam.players[currentPlayerIndex]
  }

  const getNextPlayer = () => {
    const currentTeam = gameTeams[currentTeamIndex]
    if (currentPlayerIndex >= currentTeam.players.length - 1) {
      const nextTeamIndex = currentTeamIndex === gameTeams.length - 1 ? 0 : currentTeamIndex + 1
      return {
        player: gameTeams[nextTeamIndex].players[0],
        team: gameTeams[nextTeamIndex].name
      }
    } else {
      return {
        player: currentTeam.players[currentPlayerIndex + 1],
        team: currentTeam.name
      }
    }
  }

  const moveToNextPlayer = () => {
    const currentTeam = gameTeams[currentTeamIndex]
    
    if (currentPlayerIndex >= currentTeam.players.length - 1) {
      setCurrentPlayerIndex(0)
      setCurrentTeamIndex(prev => 
        prev === gameTeams.length - 1 ? 0 : prev + 1
      )
    } else {
      setCurrentPlayerIndex(prev => prev + 1)
    }
  }

  const checkWinner = (updatedTeams) => {
    const winningTeam = updatedTeams.find(team => team.score >= settings.winningScore)
    if (winningTeam) {
      setWinner(winningTeam)
      setIsPlaying(false)
    }
    return !!winningTeam
  }

  const resetGame = () => {
    setGameTeams(teams.map(team => ({ ...team, score: 0 })))
    setCurrentTeamIndex(0)
    setCurrentPlayerIndex(0)
    setIsPlaying(false)
    setCurrentWords([])
    setSelectedWords([])
    setTimeLeft(settings.timePerRound)
    setWinner(null)
  }

  const handleRoundEnd = () => {
    setGameTeams(prevTeams => {
      const updatedTeams = prevTeams.map((team, index) => {
        if (index === currentTeamIndex) {
          return {
            ...team,
            score: team.score + selectedWords.length
          }
        }
        return team
      })
      
      checkWinner(updatedTeams)
      return updatedTeams
    })
  }
  
  const handleNextRound = () => {
    handleRoundEnd()
    moveToNextPlayer()
    setCurrentWords([])
    setSelectedWords([])
    setRoundEnded(false)
    setIsPlaying(false)
    setNextPlayer(null)
  }

  // Timer logica
  useEffect(() => {
    let timer
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsPlaying(false)
            setRoundEnded(true)
            setNextPlayer(getNextPlayer())
            endSoundRef.current.play()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isPlaying, timeLeft])
  
  const handleStartRound = () => {
    setCurrentWords(getRandomWords(settings.wordsPerRound))
    setSelectedWords([])
    setIsPlaying(true)
    setTimeLeft(settings.timePerRound)
    setRoundEnded(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTeamIndex + currentPlayerIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ScoreBoard 
            teams={gameTeams}
            currentTeamIndex={currentTeamIndex} 
          />
        </motion.div>
      </AnimatePresence>

      {winner ? (
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold mb-4">
            🎉 {winner.name} heeft gewonnen! 🎉
          </h2>
          <button 
            onClick={resetGame}
            className="btn btn-primary"
          >
            Nieuw Spel
          </button>
        </div>
      ) : roundEnded ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <h2 className="text-2xl mb-4">
            Ronde voorbij!
          </h2>
          <p className="text-lg mb-4">
            Selecteer de correct geraden woorden
          </p>
          <WordCard
            words={currentWords}
            selectedWords={selectedWords}
            onWordToggle={(word) => {
              setSelectedWords(prev => 
                prev.includes(word) 
                  ? prev.filter(w => w !== word)
                  : [...prev, word]
              )
            }}
          />
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg mb-2">Volgende speler:</p>
            <motion.p 
              className="font-bold text-xl mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {nextPlayer?.player} ({nextPlayer?.team})
            </motion.p>
            <button 
              onClick={handleNextRound}
              className="btn btn-primary"
            >
              Volgende Speler
            </button>
          </div>
        </motion.div>
      ) : !isPlaying ? (
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl mb-4">
            Team {gameTeams[currentTeamIndex].name}
          </h2>
          <motion.p 
            className="text-xl mb-6 bg-blue-50 p-4 rounded-lg shadow-sm"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Speler aan de beurt: <span className="font-bold">{getCurrentPlayer()}</span>
          </motion.p>
          <p className="text-lg mb-4 text-gray-600">
            Geef de telefoon aan {getCurrentPlayer()} en klik op Start Ronde
          </p>
          <button 
            onClick={handleStartRound}
            className="btn btn-success"
          >
            Start Ronde
          </button>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="text-center mb-4 bg-blue-50 p-3 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">
              <span className="font-bold">{getCurrentPlayer()}</span> is aan het raden
            </p>
          </motion.div>
          <Timer 
            timeLeft={timeLeft}
            isPlaying={isPlaying}
          />
          <WordCard
            words={currentWords}
            selectedWords={selectedWords}
            onWordToggle={(word) => {
              setSelectedWords(prev => 
                prev.includes(word) 
                  ? prev.filter(w => w !== word)
                  : [...prev, word]
              )
            }}
          />
        </>
      )}
      
      {/* Toon huidige score voor het actieve team */}
      {isPlaying && (
        <div className="text-center mt-4">
          <p className="text-xl">
            Huidige score: {selectedWords.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default Game 