export type TankOwner = 'player' | 'enemy'
export type Coords = { x: number; y: number }
export type Size = { h: number; w: number }
export type CoordsWithSize = Coords & Size

export enum Animations {
  explosionSmall = 'explosionSmall',
  reborn = 'reborn',
}

export type Animation = Record<Animations, CoordsWithSize[]>

export type Bullet = Record<keyof typeof MovementDirection, CoordsWithSize>

enum StageKeys {
  brick,
  steel,
  forest,
  river,
  eagle,
  eagleDamaged,
  gameOver,
  arrowAmountDestroyTanks,
  battleCity,
}

export type Stage = Record<keyof typeof StageKeys, CoordsWithSize>

export type Tank = Record<
  TankColor,
  Record<TankType, Record<MovementDirection, [CoordsWithSize, CoordsWithSize]>>
>

export type Images = {
  tanks: Tank
  bullet: Bullet
  animations: Animation
  stage: Stage
}

export enum TankColor {
  yellow = 'yellow',
  green = 'green',
  silver = 'silver',
  red = 'red',
}

export type PlayerTankColor = TankColor.yellow | TankColor.green
export type EnemyTankColor = TankColor.silver | TankColor.red

export enum TankType {
  basic = 'basic',
  fast = 'fast',
  powerful = 'powerful',
  armored = 'armored',
}

export enum MovementDirection {
  up = 'up',
  left = 'left',
  down = 'down',
  right = 'right',
}

export type DirectionKey = keyof typeof MovementDirection

export type SceneTankBlocks = Record<string, Coords>

export type SceneConfig = {
  blocks: {
    brick: Coords[]
    eagle: Coords
    tanks: Coords[]
  }
  enemyTankMaxCount: number
}

export type SceneBlocks = SceneConfig['blocks']

export type SceneBlockKeys = keyof SceneConfig['blocks']

export type ControlKeys = Record<MovementDirection, string>
