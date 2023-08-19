import { useState } from 'react'
import H1 from '../../shared/ui/H1'
import styles from './leaderboard.module.css'

interface ILoadrboard {
  id: number
  name: string
  score: number
}

const Leaderboard = () => {
  const [InfoLoadrboard, setInfoLoadrboard] = useState<ILoadrboard[]>([
    { id: 1, name: 'Qwerty', score: 1000 },
    { id: 2, name: 'Lorem', score: 920 },
    { id: 3, name: 'TestT', score: 870 },
    { id: 4, name: 'TestT', score: 770 },
    { id: 5, name: 'TestT', score: 630 },
    { id: 6, name: 'TestT', score: 570 },
    { id: 7, name: 'TestT', score: 480 },
    { id: 8, name: 'TestT', score: 340 },
    { id: 9, name: 'TestT', score: 320 },
    { id: 10, name: 'TestT', score: 310 },
    { id: 11, name: 'TestT', score: 80 },
    { id: 12, name: 'TestT', score: 70 },
    { id: 13, name: 'TestT', score: 70 },
    { id: 14, name: 'TestT', score: 70 },
    { id: 15, name: 'TestT', score: 70 },
    { id: 16, name: 'TestT', score: 70 },
    { id: 17, name: 'TestT', score: 70 },
    { id: 18, name: 'TestT', score: 70 },
  ])

  return (
    <div className={styles.leaderboardPage}>
      <H1>Leaderboard</H1>
      <div className={styles.leaderboardTable}>
        <table>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Player</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {InfoLoadrboard.map((el: ILoadrboard, index: number) => (
              <tr key={el.id}>
                <td> {index + 1}</td>
                <td>{el.name}</td>
                <td>{el.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
