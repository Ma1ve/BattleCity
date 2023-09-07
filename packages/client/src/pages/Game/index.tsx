import {
  canvasHeight,
  canvasWidth,
  frameInterval,
} from './shared/config/gameConstants'
import { useEffect, useRef } from 'react'
import { gameUI } from './ui/GameUI'
import { Tank } from './ui/Tank'
import { Scene } from './ui/Scene'
import { TankColor, MovementDirection, TankType } from './shared/types'
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

    const scene = new Scene(ctx, scenesConfig[1])

    const player = new Tank<'player'>({
      tankType: TankType.basic,
      tankColor: TankColor.yellow,
      initialDirection: MovementDirection.up,
      initialPosition: { x: 4 * 32 * 1.5, y: 12 * 32 * 1.5 },
      controlKeys: {
        //TODO: values (e.g. KeyW) should be replaced with keys from redux (user tank control settings)
        [MovementDirection.up]: 'KeyW',
        [MovementDirection.down]: 'KeyS',
        [MovementDirection.left]: 'KeyA',
        [MovementDirection.right]: 'KeyD',
      },
      sceneBlockPositions: scene.getSceneBlocks(),
    })

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

          gameUI.drawImage({ ctx, ...player.getSpriteForRender() })

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
      player.unsubscribe()
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
