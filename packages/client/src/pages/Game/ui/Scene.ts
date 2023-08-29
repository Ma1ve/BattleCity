import { Stage, SceneBlockPositions } from '../shared/types'
import { gameUI } from './GameUI'
import { blockHeight, blockWidth } from '../shared/config/gameConstants'

export class Scene {
  public sceneBlocks
  public ctx

  constructor(
    ctx: CanvasRenderingContext2D,
    blockPositions: SceneBlockPositions
  ) {
    this.sceneBlocks = blockPositions
    this.ctx = ctx
  }

  public render() {
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

  private getItemPosition({
    spritePosition,
    isXPos,
  }: {
    spritePosition: number
    isXPos: boolean
  }) {
    return spritePosition * (isXPos ? blockWidth : blockHeight)
  }

  private drawSceneImage({
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

  public getSceneBlocks() {
    return this.sceneBlocks
  }
}
