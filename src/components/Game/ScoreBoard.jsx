import { motion } from 'framer-motion'

const ScoreBoard = ({ teams, currentTeamIndex }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {teams.map((team, index) => (
        <motion.div 
          key={team.id}
          className={`
            card text-center
            ${index === currentTeamIndex ? 'ring-2 ring-game-primary bg-blue-50' : ''}
          `}
          animate={index === currentTeamIndex ? {
            scale: [1, 1.02, 1],
            transition: { duration: 2, repeat: Infinity }
          } : {}}
        >
          <h3 className="text-xl font-bold mb-2">{team.name}</h3>
          <motion.div 
            className="text-3xl font-bold text-game-primary"
            key={team.score}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            {team.score || 0}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ScoreBoard 