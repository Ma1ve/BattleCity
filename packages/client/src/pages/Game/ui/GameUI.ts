import sprite from '../../../shared/images/sprite.png'
import {
  Bullet,
  Images,
  MovementDirection,
  Coords,
  CoordsWithSizeCoords,
  Stage,
  Tank,
  TankColor,
  TankType,
  Animation,
  SceneBlockPositions,
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

const getSpriteItemPosition = ({
  x,
  y,
  h = spriteHeight, //item width on sprite
  w = spriteWidth, //item height on sprite
}: //
{
  x: number
  y: number
  h?: number
  w?: number
}): CoordsWithSizeCoords => {
  return {
    x: x * spriteWidth, // * x position on canvas
    y: y * spriteHeight, // * y position on canvas,
    w: h, // spriteCountInOneFrame,
    h: w, // / spriteCountInOneFrame,
  }
}

const getTankSpritePosition = (
  firstCoords: Coords,
  secondCoords: Coords
): [CoordsWithSizeCoords, CoordsWithSizeCoords] => {
  return [
    getSpriteItemPosition(firstCoords),
    getSpriteItemPosition(secondCoords),
  ]
}

class GameUI {
  public images: Images
  public frame: number
  private readonly spriteImage: HTMLImageElement

  constructor() {
    this.frame = 0

    this.images = this.getSprites()

    const spriteImage = new Image()
    spriteImage.src = sprite
    this.spriteImage = spriteImage
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
    }

    return { tanks, bullet, animations, stage }
  }

  public drawImage({
    ctx,
    spritePosition,
    canvasPosition,
  }: {
    ctx: CanvasRenderingContext2D
    spritePosition: CoordsWithSizeCoords
    canvasPosition: Coords
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
      sw * canvasItemScale,
      sh * canvasItemScale
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
          movedItemCoords.y > blockCoords.y * blockHeight && // intersection by x coord
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight && // intersection by y coord
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // intersection by right y coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // intersection by left y coord
        )
      case MovementDirection.down:
        return (
          movedItemCoords.y < blockCoords.y * blockHeight && // intersection by x coord
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // intersection by y coord
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // intersection by right y coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth // intersection by left y coord
        )
      case MovementDirection.left:
        return (
          movedItemCoords.x > blockCoords.x * blockWidth && // intersection by x coord
          movedItemCoords.x < (blockCoords.x + 1) * blockWidth && // intersection by x coord
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // intersection by bottom y coord
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // intersection by top y coord
        )
      case MovementDirection.right:
        return (
          movedItemCoords.x < blockCoords.x * blockWidth && // top left tank corner < top left block corner
          movedItemCoords.x + movedItemWidth > blockCoords.x * blockWidth && // top right tank corner  > top left block corner
          movedItemCoords.y + movedItemHeight > blockCoords.y * blockHeight && // bottom left tank corner > top block corner
          movedItemCoords.y < (blockCoords.y + 1) * blockHeight // top left tank corner < block top right corner
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
    return Object.values(sceneBlockPositions).some(blockPositionData => {
      if (Array.isArray(blockPositionData)) {
        return blockPositionData.some(blockCoords =>
          this.checkIntersection({
            movedItemCoords,
            blockCoords,
            movementDirection,
            movedItemSize,
          })
        )
      }
      return this.checkIntersection({
        movedItemCoords,
        blockCoords: blockPositionData,
        movementDirection,
        movedItemSize,
      })
    })
  }
}

export const gameUI = new GameUI()
