import { FiCheck, FiX } from 'react-icons/fi'

const WordCard = ({ words, selectedWords, onWordToggle }) => {
  return (
    <div className="space-y-4 mt-8">
      {words.map((word, index) => (
        <div 
          key={index}
          className={`
            card flex justify-between items-center p-4
            ${selectedWords.includes(word) ? 'bg-green-100' : ''}
          `}
          onClick={() => onWordToggle(word)}
        >
          <span className="text-xl">{word}</span>
          {selectedWords.includes(word) ? (
            <FiCheck className="text-green-500 text-2xl" />
          ) : (
            <FiX className="text-gray-300 text-2xl" />
          )}
        </div>
      ))}
    </div>
  )
}

export default WordCard 