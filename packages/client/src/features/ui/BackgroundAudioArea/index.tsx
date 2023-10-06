import { useState, useEffect, useRef, useCallback } from 'react'
import { GiSoundOn, GiSoundOff, GiNextButton } from 'react-icons/gi'
import styles from './backgroundAudioArea.module.css'
import bg_sound_1 from '../../../shared/sounds/bg_sound_1.mp3'
import bg_sound_2 from '../../../shared/sounds/bg_sound_2.mp3'
import bg_sound_3 from '../../../shared/sounds/bg_sound_3.mp3'

/** Начальная позиция уровня громкости. */
const DEFAULT_VOLUME = 0.2

/** Список треков. */
const bgSoundsList: HTMLAudioElement[] = [
  new Audio(bg_sound_1),
  new Audio(bg_sound_2),
  new Audio(bg_sound_3),
]

enum EAudioAreaActions {
  PLAY = 'PLAY',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
}

export const BackgroundAudioArea = () => {
  const [isReady, setIsReady] = useState(false)
  // Признак проигрывания трека.
  const [isPlaying, setIsPlaying] = useState(false)
  // Текущий индекс трека в bgSoundsList.
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      // Автозапуск.
      const handleAutoPlay = () => {
        if (audioRef.current) {
          handleAudioActionApply(EAudioAreaActions.PLAY)
        }
        setIsPlaying(true)
      }

      audioRef.current.play().catch(e => {
        // Обход политик автозапуска.
        document.addEventListener('click', handleAutoPlay, { once: true })
      })

      return document.removeEventListener('click', handleAutoPlay)
    }
  }, [])

  /** Play, Stop, Pause. */
  const handleAudioActionApply = useCallback(
    (action: EAudioAreaActions) => {
      if (audioRef.current) {
        if (action === EAudioAreaActions.PLAY) {
          audioRef.current.play()
        } else if (action === EAudioAreaActions.PAUSE) {
          audioRef.current.pause()
        } else if (action === EAudioAreaActions.STOP) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }
    },
    [audioRef]
  )

  /** Смена трека. */
  const changeTrack = useCallback(() => {
    if (audioRef.current && isPlaying) {
      let index = bgSoundsList.indexOf(bgSoundsList[currentSoundIndex])
      index++
      if (index > bgSoundsList.length - 1) {
        index = 0
      }

      setCurrentSoundIndex(index)

      handleAudioActionApply(EAudioAreaActions.PAUSE)
      audioRef.current.src = bgSoundsList[index].src
      handleAudioActionApply(EAudioAreaActions.PLAY)
    }
  }, [currentSoundIndex, audioRef, isPlaying])

  /** Переключатель для кнопки Отключения/Включения фоновой музыки. */
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      handleAudioActionApply(EAudioAreaActions.PAUSE)
      setIsPlaying(false)
    } else {
      handleAudioActionApply(EAudioAreaActions.PLAY)
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleVolumeChange = useCallback(
    (e: any) => {
      const volumeValue = e.currentTarget.valueAsNumber
      if (!audioRef.current) return
      audioRef.current.volume = volumeValue
      setVolume(volumeValue)
    },
    [volume, audioRef]
  )

  const handleCanPlay = () => {
    setIsReady(true)
  }

  return (
    <div className={styles.audioButtonsArea}>
      <audio
        className={styles.audio}
        controls
        ref={audioRef}
        onCanPlay={handleCanPlay}
        loop>
        <source src={bgSoundsList[currentSoundIndex]?.src} type="audio/mpeg" />
      </audio>

      {isReady ? (
        <>
          <div onClick={togglePlayPause} className={styles.togglePlayPause}>
            {isPlaying ? (
              <GiSoundOn size={48} fill="#a23dff" />
            ) : (
              <GiSoundOff size={48} fill="gray" />
            )}
          </div>
        </>
      ) : (
        <div className={styles.loadingTrack}>
          Loading
          <br />
          ...
        </div>
      )}

      {isPlaying && isReady && (
        <>
          <input
            disabled={!isPlaying}
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            className={styles.volumeInput}
            onChange={handleVolumeChange}
          />
          <GiNextButton
            fill="#a23dff"
            fillOpacity={0.8}
            onClick={changeTrack}
          />
        </>
      )}
    </div>
  )
}
