import {
  canvasHeight,
  canvasWidth,
  frameInterval,
} from './shared/config/gameConstants'
import { useEffect, useRef } from 'react'
import { Scene } from './ui/Scene'
import { scenesConfig } from './shared/config/sceneConfig'
import { StartGameMenu } from './ui/StartGameMenu'
import { GameOverMenu } from './ui/GameOverMenu'

import './game.module.css'

const Game = () => {
  let reqId = 0

  let lastTimestamp = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const scene = new Scene({ ctx, sceneConfig: scenesConfig[1] })

    const menuStartGame = new StartGameMenu(ctx)
    const menuGameOver = new GameOverMenu(ctx)

    const animate = () => {
      const now = performance.now()

      //60fps animation condition
      if (now - lastTimestamp >= frameInterval) {
        if (menuStartGame.isGameLoaded()) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, canvasWidth, canvasHeight)

          scene.render()

          //! Пока всегда getGameOver() будет true, нужно потом как то соединить это с уничтожением флага
          if (menuGameOver.getGameOver()) {
            menuGameOver.draw()
          }
        } else {
          menuStartGame.draw()
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
      menuStartGame.unsubscribe()
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
