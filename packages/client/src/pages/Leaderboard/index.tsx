import { useEffect, useState } from 'react'
import { Title } from '../../shared/ui'
import styles from './leaderboard.module.css'
import {
  LeaderboardAPI,
  LeaderboardData,
} from '../../shared/api/LeaderboardApi'
import { toast } from 'react-toastify'

const Leaderboard = () => {
  const [leaderboardInfo, setLeaderboardInfo] = useState<LeaderboardData[]>([])

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const res = await LeaderboardAPI.getLeaderboard()

        const leaderboardData = res.map(el => el.data)

        setLeaderboardInfo(leaderboardData)
      } catch (e: any) {
        toast.error(e?.response?.data?.reason)
      }
    }

    getLeaderboard()
  }, [])

  return (
    <div className={styles.leaderboardPage}>
      <Title>Leaderboard</Title>
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
            {leaderboardInfo.map((el: LeaderboardData, index: number) => (
              <tr key={el.id}>
                <td> {index + 1}</td>
                <td>{el.name}</td>
                <td>{el.veisaScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
