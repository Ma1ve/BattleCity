import {
  canvasHeight,
  canvasWidth,
  frameInterval,
} from './shared/config/gameConstants'
import { useEffect, useRef } from 'react'
import { Scene } from './ui/Scene'
import { scenesConfig } from './shared/config/sceneConfig'
import { GameController } from './controllers/GameController'

import './game.module.css'
import { useNavigate } from 'react-router-dom'

const Game = () => {
  let reqId = 0

  let lastTimestamp = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const gameController = new GameController(ctx)

    const scene = new Scene({
      ctx,
      sceneConfig: scenesConfig[1],
    })

    const animate = () => {
      const now = performance.now()

      //60fps animation condition
      if (now - lastTimestamp >= frameInterval) {
        if (scene.gameControllerScene.restartGame) {
          navigate('/')
          navigate(0)
        }

        if (gameController.gameStart) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          scene.render()
        } else {
          gameController.drawStartGame()
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
