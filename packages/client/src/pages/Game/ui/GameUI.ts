import sprite from '../../../shared/images/sprite.png'

import {
  Bullet,
  Images,
  MovementDirection,
  Coords,
  CoordsWithSize,
  Stage,
  Tank,
  TankColor,
  TankType,
  Animation,
  SceneBlockPositions,
  SceneBlockKeys,
  DirectionKey,
  Size,
  Animations,
} from '../shared/types'
import {
  blockHeight,
  blockHeightQuarter,
  blockWidth,
  blockWidthQuarter,
  canvasItemScale,
  spriteHeight,
  spriteWidth,
} from '../shared/config/gameConstants'
import { isCoordsArray } from '../shared/utils/isCoordsArray'

export const getSpriteItemPosition = ({
  x,
  y,
  h = spriteHeight, //item width on sprite
  w = spriteWidth, //item height on sprite
}: //
{
  x: number
  y: number
  w?: number
  h?: number
}): CoordsWithSize => {
  return {
    x: x * spriteWidth, // x position on canvas
    y: y * spriteHeight, // y position on canvas,
    w: w, //item width on sprite
    h: h, //item height on sprite
  }
}

export const getTankSpritePosition = (
  firstCoords: Coords,
  secondCoords: Coords
): [CoordsWithSize, CoordsWithSize] => {
  return [
    getSpriteItemPosition(firstCoords),
    getSpriteItemPosition(secondCoords),
  ]
}

class GameUI {
  public images: Images
  public frame: number
  private readonly spriteImage: HTMLImageElement

  private activeSpriteIndex
  private animationFrameCount

  constructor() {
    if (typeof window === 'undefined') return

    this.frame = 0

    this.images = this.getSprites()

    const spriteImage = new Image()
    spriteImage.src = sprite
    this.spriteImage = spriteImage

    this.activeSpriteIndex = 0
    this.animationFrameCount = 0
  }

  private getSprites(): Images {
    const tanks: Tank = {
      [TankColor.yellow]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 0 },
            { x: 1, y: 0 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 0 },
            { x: 5, y: 0 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 0 },
            { x: 7, y: 0 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 1 },
            { x: 3, y: 1 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 1 },
            { x: 5, y: 1 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 1 },
            { x: 7, y: 1 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 2 },
            { x: 1, y: 2 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 2 },
            { x: 3, y: 2 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 2 },
            { x: 5, y: 2 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 2 },
            { x: 7, y: 2 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 3 },
            { x: 1, y: 3 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 3 },
            { x: 3, y: 3 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 3 },
            { x: 5, y: 3 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 3 },
            { x: 7, y: 3 }
          ),
        },
      },

      [TankColor.green]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 8 },
            { x: 1, y: 8 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 8 },
            { x: 3, y: 8 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 8 },
            { x: 5, y: 8 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 8 },
            { x: 7, y: 8 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 9 },
            { x: 1, y: 9 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 9 },
            { x: 3, y: 9 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 9 },
            { x: 5, y: 9 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 9 },
            { x: 7, y: 9 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 10 },
            { x: 1, y: 10 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 10 },
            { x: 3, y: 10 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 10 },
            { x: 5, y: 10 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 10 },
            { x: 7, y: 10 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 11 },
            { x: 1, y: 11 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 2, y: 11 },
            { x: 3, y: 11 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 11 },
            { x: 5, y: 11 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 6, y: 11 },
            { x: 7, y: 11 }
          ),
        },
      },
      //enemy
      [TankColor.silver]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 4 },
            { x: 1, y: 4 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 4 },
            { x: 3, y: 4 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 4 },
            { x: 5, y: 4 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 4 },
            { x: 7, y: 4 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 6 },
            { x: 1, y: 6 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 6 },
            { x: 3, y: 6 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 6 },
            { x: 5, y: 6 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 6 },
            { x: 7, y: 6 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 8 },
            { x: 1, y: 8 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 8 },
            { x: 3, y: 8 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 8 },
            { x: 5, y: 8 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 8 },
            { x: 7, y: 8 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 10 },
            { x: 1, y: 10 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 10 },
            { x: 3, y: 10 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 10 },
            { x: 5, y: 10 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 10 },
            { x: 7, y: 10 }
          ),
        },
      },
      [TankColor.red]: {
        [TankType.basic]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 5 },
            { x: 1, y: 5 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 5 },
            { x: 3, y: 5 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 5 },
            { x: 5, y: 5 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 5 },
            { x: 7, y: 5 }
          ),
        },
        [TankType.fast]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 7 },
            { x: 1, y: 7 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 7 },
            { x: 3, y: 7 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 7 },
            { x: 5, y: 7 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 7 },
            { x: 7, y: 7 }
          ),
        },
        [TankType.powerful]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 9 },
            { x: 1, y: 9 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 9 },
            { x: 3, y: 9 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 9 },
            { x: 5, y: 9 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 9 },
            { x: 7, y: 9 }
          ),
        },
        [TankType.armored]: {
          [MovementDirection.up]: getTankSpritePosition(
            { x: 0, y: 11 },
            { x: 1, y: 11 }
          ),
          [MovementDirection.right]: getTankSpritePosition(
            { x: 2, y: 11 },
            { x: 3, y: 11 }
          ),
          [MovementDirection.down]: getTankSpritePosition(
            { x: 4, y: 11 },
            { x: 5, y: 11 }
          ),
          [MovementDirection.left]: getTankSpritePosition(
            { x: 6, y: 11 },
            { x: 7, y: 11 }
          ),
        },
      },
    }

    const animations: Animation = {
      [Animations.explosionSmall]: [
        getSpriteItemPosition({ x: 16, y: 8 }), //start
        getSpriteItemPosition({ x: 17, y: 8 }),
        getSpriteItemPosition({ x: 18, y: 8 }), //end
      ],
      [Animations.reborn]: [
        getSpriteItemPosition({ x: 16, y: 6 }), //start
        getSpriteItemPosition({ x: 17, y: 6 }),
        getSpriteItemPosition({ x: 18, y: 6 }),
        getSpriteItemPosition({ x: 19, y: 6 }), //end
      ],
    }

    const bullet: Bullet = {
      up: getSpriteItemPosition({
        x: 16,
        y: 0,
        h: blockHeightQuarter,
        w: blockWidthQuarter,
      }),
      right: getSpriteItemPosition({
        x: 16.5,
        y: 0,
        h: blockHeightQuarter,
        w: blockWidthQuarter,
      }),
      down: getSpriteItemPosition({
        x: 17,
        y: 0,
        h: blockHeightQuarter,
        w: blockWidthQuarter,
      }),
      left: getSpriteItemPosition({
        x: 17.5,
        y: 0,
        h: blockHeightQuarter,
        w: blockWidthQuarter,
      }),
    }

    const stage: Stage = {
      brick: getSpriteItemPosition({ x: 8, y: 5.5 }),
      steel: getSpriteItemPosition({ x: 6, y: 6.5 }),
      forest: getSpriteItemPosition({ x: 9, y: 7.5 }),
      river: getSpriteItemPosition({ x: 8, y: 7.5 }),
      eagle: getSpriteItemPosition({ x: 11, y: 7.5 }),
      eagleDamaged: getSpriteItemPosition({ x: 12, y: 7.5 }),
      gameOver: { x: 16 * 32, y: 5.2 * 32, w: 62, h: 62 },
      arrowAmountDestroyTanks: getSpriteItemPosition({
        x: 17,
        y: 14.5,
      }),
      battleCity: { x: 8.5 * 32, y: 9.5 * 32, w: 420, h: 144 },
    }

    return { tanks, bullet, animations, stage }
  }

  public drawImage({
    ctx,
    spritePosition,
    canvasPosition,
    sW,
    sH,
  }: {
    ctx: CanvasRenderingContext2D
    spritePosition: CoordsWithSize
    canvasPosition: Coords
    sW?: number
    sH?: number
  }) {
    const { x: sx, y: sy, w: sw, h: sh } = spritePosition
    const { x: cx, y: cy } = canvasPosition

    ctx.drawImage(
      this.spriteImage,
      sx,
      sy,
      sw,
      sh,
      cx,
      cy,
      sW ? sW : sw * canvasItemScale,
      sH ? sH : sh * canvasItemScale
    )
  }

  public checkIntersection = ({
    movedItemCoords,
    blockCoords,
    movementDirection,
    movedItemSize,
  }: {
    movedItemCoords: Coords
    blockCoords: Coords
    movementDirection: keyof typeof MovementDirection
    movedItemSize: Size
  }) => {
    const { h: movedItemHeight, w: movedItemWidth } = movedItemSize
    switch (movementDirection) {
      case MovementDirection.up:
        return (
          movedItemCoords.y > blockCoords.y * blockHeight && // top left moved item corner > top left block corner
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight && // top left moved item corner < bottom left block corner
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // top right moved item corner > top right block corner
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // top left moved item corner < top right block corner
        )
      case MovementDirection.down:
        return (
          movedItemCoords.y < blockCoords.y * blockHeight && // top left moved item corner < bottom left block corner
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // bottom left moved item corner > bottom left block corner
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // top right moved item corner > top left block corner
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // top left moved item corner > top right block corner
        )
      case MovementDirection.left:
        return (
          movedItemCoords.x > blockCoords.x * blockWidth && // top left moved item corner < top left block corner
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth && // top left moved item corner < top right block corner
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // bottom left moved item corner < top left block corner
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // top left moved item corner < bottom left block corner
        )
      case MovementDirection.right:
        return (
          movedItemCoords.x < blockCoords.x * blockWidth && // top moved item (tank) corner < top left block corner
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // top right moved item (tank) corner  > top left block corner
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // bottom left moved item (tank) corner > top block corner
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // top left moved item (tank) corner < block top right corner
        )
    }
  }

  checkSceneBlockIntersection = ({
    movedItemCoords,
    movementDirection,
    sceneBlockPositions,
    movedItemSize = { h: blockHeight, w: blockWidth },
  }: {
    movedItemCoords: Coords
    movementDirection: DirectionKey
    sceneBlockPositions: SceneBlockPositions
    movedItemSize?: Size
  }) => {
    const sceneBlockValues = Object.entries(sceneBlockPositions)

    let intersectedBlockCoords: Coords | undefined
    let sceneBlockKey: SceneBlockKeys | undefined

    for (const [blockKey, blockPositionData] of sceneBlockValues) {
      if (intersectedBlockCoords) {
        break
      }

      sceneBlockKey = blockKey as SceneBlockKeys

      if (isCoordsArray(blockPositionData)) {
        intersectedBlockCoords = blockPositionData.find(blockCoords =>
          this.checkIntersection({
            movedItemCoords,
            blockCoords,
            movementDirection,
            movedItemSize,
          })
        )
        continue
      }

      if (
        this.checkIntersection({
          movedItemCoords,
          blockCoords: blockPositionData,
          movementDirection,
          movedItemSize,
        })
      ) {
        intersectedBlockCoords = blockPositionData
      }
    }

    return {
      sceneBlockKey,
      intersectedBlockCoords,
      hasIntersection: !!intersectedBlockCoords,
    }
  }

  // Устанавливаем границу (frameCount) через сколько animationFrameCount будет обновление activeSpriteIndex
  public animateSprite({ frameCount }: { frameCount: number }) {
    this.animationFrameCount++
    if (this.animationFrameCount > frameCount) {
      this.animationFrameCount = 0
      this.activeSpriteIndex = this.activeSpriteIndex === 0 ? 1 : 0
    }
    return this.activeSpriteIndex
  }
}

export const gameUI = new GameUI()
