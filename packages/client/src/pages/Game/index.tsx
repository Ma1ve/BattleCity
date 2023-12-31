import { useEffect, useRef } from 'react'
import { Scene } from './ui/Scene'
import { scenesConfig } from './shared/config/sceneConfig'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks/reducer'
import { selectUserLevel } from '../../app/store/reducers/UserSlice'

import {
  canvasHeight,
  canvasWidth,
  frameInterval,
} from './shared/config/gameConstants'

import './game.module.css'

const Game = () => {
  const level: number = useAppSelector(selectUserLevel)

  let reqId = 0

  let lastTimestamp = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const scene = new Scene({
      ctx,
      sceneConfig: scenesConfig[level],
    })

    const animate = () => {
      const now = performance.now()

      //60fps animation condition
      if (now - lastTimestamp >= frameInterval) {
        if (scene.gameControllerScene.restartGame) {
          navigate('/')
          navigate(0)
        }

        if (scene.gameControllerScene.gameStart) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          scene.render()
        } else {
          scene.gameControllerScene.drawStartGame()
        }

        reqId = requestAnimationFrame(animate)

        lastTimestamp = now
      } else {
        cancelAnimationFrame(reqId)
        reqId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(reqId)
    }
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}></canvas>
    </div>
  )
}

export default Game
