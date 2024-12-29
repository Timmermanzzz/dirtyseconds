import { useRef, useEffect } from 'react'
import { Howl } from 'howler'

const Timer = ({ timeLeft, isPlaying }) => {
  const soundRef = useRef({
    sound: new Howl({
      src: ['/sounds/tick.wav'],
      loop: true
    })
  })

  // Beheer het tikgeluid
  useEffect(() => {
    const { sound } = soundRef.current
    
    if (isPlaying) {
      sound.play()
    } else {
      sound.stop()
    }

    return () => sound.stop()
  }, [isPlaying])

  return (
    <div className="text-center my-8">
      <div className="text-6xl font-bold">
        {timeLeft}
      </div>
    </div>
  )
}

export default Timer 