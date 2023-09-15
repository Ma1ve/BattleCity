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

const Game = () => {
  let reqId = 0

  let lastTimestamp = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const scene = new Scene({ ctx, blockPositions: scenesConfig[1] })

    const gameController = new GameController(ctx)

    const animate = () => {
      const now = performance.now()

      //60fps animation condition
      if (now - lastTimestamp >= frameInterval) {
        if (gameController.gameStart) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          scene.render()

          //! Пока всегда getGameOver() будет true, нужно потом как то соединить это с уничтожением флага
          gameController.drawGameOverMenu()
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
      gameController.getKeyPressHandler.unsubscribe()
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
