/* import { Tank } from '../ui/Tank'
import {
  MovementDirection,
  TankType,
  SceneBlockPositions,
  TankColor,
} from '../shared/types'
import { tankSpeed } from '../shared/config/gameConstants'

describe('Tank Class', () => {
  it('should create an instance of Tank with correct initial values', () => {
    const initialPosition = { x: 100, y: 100 }
    const initialDirection = MovementDirection.up
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const controlKeys = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      controlKeys,
      sceneBlockPositions,
    })

    // Проверяем, что свойства и методы инициализированы корректно
    expect(tank.initialPosition).toEqual(initialPosition)
    expect(tank.position).toEqual(initialPosition)
    expect(tank.activeSpriteIndex).toBe(0)
    expect(tank.tankColor).toBe(tankColor)
    expect(tank.controlKeys).toEqual(controlKeys)
    expect(tank.tankType).toBe(tankType)
    expect(tank.direction).toBe(initialDirection)
    expect(tank.sceneBlockPositions).toBe(sceneBlockPositions)
  })
})

describe('Tank Move', () => {
  it('should change the tank direction correctly', () => {
    const initialPosition = { x: 100, y: 100 }
    const initialDirection = MovementDirection.up
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const controlKeys = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      controlKeys,
      sceneBlockPositions,
    })

    // Проверяем начальное направление
    expect(tank.direction).toBe(initialDirection)

    // Изменяем направление танка на влево
    tank.setDirection(MovementDirection.left)
    expect(tank.direction).toBe(MovementDirection.left)

    // Изменяем направление танка на вверх
    tank.setDirection(MovementDirection.up)
    expect(tank.direction).toBe(MovementDirection.up)

    // Изменяем направление танка на вправо
    tank.setDirection(MovementDirection.right)
    expect(tank.direction).toBe(MovementDirection.right)

    // Изменяем направление танка на вниз
    tank.setDirection(MovementDirection.down)
    expect(tank.direction).toBe(MovementDirection.down)
  })
})

describe('Tank Type', () => {
  it('should change the tank type correctly', () => {
    const initialPosition = { x: 100, y: 100 }
    const initialDirection = MovementDirection.up
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const controlKeys = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      controlKeys,
      sceneBlockPositions,
    })

    // Проверяем начальный тип танка
    expect(tank.tankType).toBe(tankType)

    // Изменяем тип танка на TankType.fast
    tank.setType(TankType.fast)
    expect(tank.tankType).toBe(TankType.fast)

    // Изменяем тип танка на TankType.powerful
    tank.setType(TankType.powerful)
    expect(tank.tankType).toBe(TankType.powerful)

    // Изменяем тип танка на TankType.armored
    tank.setType(TankType.armored)
    expect(tank.tankType).toBe(TankType.armored)
  })
})

describe('Tank Intersection', () => {
  it('should not move through scene blocks', () => {
    const initialPosition = { x: 50, y: 50 } // Starting position inside a block
    const initialDirection = MovementDirection.down
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      sceneBlockPositions,
    })

    const moveSpy = jest.spyOn(tank as any, 'move')

    // Вызываем метод
    tank['move'](MovementDirection.right)

    // Проверяем вызовы и результат
    expect(moveSpy).toHaveBeenCalled()
    expect(tank.position).toEqual(initialPosition)

    // Восстанавливаем оригинальный метод
    moveSpy.mockRestore()
  })

  it('should move freely when there are no scene blocks in the way', () => {
    const initialPosition = { x: 50, y: 50 }
    const initialDirection = MovementDirection.down
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      sceneBlockPositions,
    })

    // Move down, tank should change position

    const moveSpy = jest.spyOn(tank as any, 'move')

    // Вызываем метод
    tank['move'](MovementDirection.down)

    const expectedPosition = {
      x: initialPosition.x,
      y: initialPosition.y + tankSpeed[tankType],
    }

    // Проверяем вызовы и результат
    expect(moveSpy).toHaveBeenCalled()
    expect(tank.position).toEqual(expectedPosition)

    // Восстанавливаем оригинальный метод
    moveSpy.mockRestore()
  })
})

describe('Tank Un/subscribe', () => {
  it('should subscribe from keyboard events', () => {
    const initialPosition = { x: 100, y: 100 }
    const initialDirection = MovementDirection.up
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const controlKeys = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      controlKeys,
      sceneBlockPositions,
    })

    const subSpy = jest.spyOn(tank as any, 'keyPressSubscription')

    expect(tank['keyPressSubscription']).not.toBeNull()

    subSpy.mockRestore()
  })
  it('should unsubscribe from keyboard events', () => {
    const initialPosition = { x: 100, y: 100 }
    const initialDirection = MovementDirection.up
    const tankColor = TankColor.green
    const tankType = TankType.basic
    const controlKeys = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    }
    const sceneBlockPositions: SceneBlockPositions = {
      brick: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
      ],
      eagle: { x: 6, y: 12 },
    }

    const tank = new Tank({
      initialPosition,
      initialDirection,
      tankColor,
      tankType,
      controlKeys,
      sceneBlockPositions,
    })

    const subSpy = jest.spyOn(tank as any, 'keyPressSubscription')

    // Вызываем метод отписки
    tank.unsubscribe()

    // Проверяем, что отписка от событий клавиатуры прошла успешно
    expect(subSpy).not.toHaveBeenCalled()

    subSpy.mockRestore()
  })
})
 */
export const lla = 1
