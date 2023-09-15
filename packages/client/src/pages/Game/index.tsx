import {
  canvasHeight,
  canvasWidth,
  frameInterval,
} from './shared/config/gameConstants'
import { useEffect, useRef } from 'react'
import { Scene } from './ui/Scene'
import { scenesConfig } from './shared/config/sceneConfig'

const Game = () => {
  let reqId = 0

  let lastTimestamp = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const scene = new Scene({ ctx, blockPositions: scenesConfig[1] })

    const animate = () => {
      const now = performance.now()

      //60fps animation condition
      if (now - lastTimestamp >= frameInterval) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        ctx.fillStyle = '#333'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        ctx.strokeRect(0, 0, canvasWidth, canvasHeight)

        scene.render()

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
