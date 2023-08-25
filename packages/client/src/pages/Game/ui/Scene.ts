import { Stage, SceneBlockPositions } from '../shared/types'
import { gameUI } from './GameUI'
import { blockHeight, blockWidth } from '../shared/config/gameConstants'

export class Scene {
  sceneBlocks
  ctx

  constructor(
    ctx: CanvasRenderingContext2D,
    blockPositions: SceneBlockPositions
  ) {
    this.sceneBlocks = blockPositions
    this.ctx = ctx
  }

  render() {
    Object.entries(this.sceneBlocks).forEach(([key, coords]) => {
      if (!Array.isArray(coords)) {
        this.drawSceneImage({
          ...coords,
          stageItemName: key as keyof Stage,
        })
        return
      }

      coords.forEach(subCoords => {
        this.drawSceneImage({
          ...subCoords,
          stageItemName: key as keyof Stage,
        })
      })
    })
  }

  getItemPosition({
    spritePosition,
    isXPos,
  }: {
    spritePosition: number
    isXPos: boolean
  }) {
    return spritePosition * (isXPos ? blockWidth : blockHeight)
  }

  drawSceneImage({
    x,
    y,
    stageItemName,
  }: {
    x: number
    y: number
    stageItemName: keyof Stage
  }) {
    gameUI.drawImage({
      ctx: this.ctx,
      spritePosition: gameUI.images.stage[stageItemName],
      canvasPosition: {
        x: this.getItemPosition({ spritePosition: x, isXPos: true }),
        y: this.getItemPosition({ spritePosition: y, isXPos: false }),
      },
    })
  }

  getSceneBlocks() {
    return this.sceneBlocks
  }
}
