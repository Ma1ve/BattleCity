import { useEffect, useState } from 'react'
import { Title } from '../../shared/ui'
import styles from './leaderboard.module.css'
import {
  LeaderboardAPI,
  LeaderboardData,
} from '../../shared/api/LeaderboardApi'
import { toast } from 'react-toastify'
import Spinner from '../../shared/ui/Spinner/Spinner'

const Leaderboard = () => {
  const [leaderboardInfo, setLeaderboardInfo] = useState<LeaderboardData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getLeaderboard = async () => {
    try {
      setIsLoading(true)
      const res = await LeaderboardAPI.getLeaderboard()

      const leaderboardData = res.map(el => el.data)

      setLeaderboardInfo(leaderboardData)
    } catch (e: any) {
      toast.error(e?.response?.data?.reason)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getLeaderboard()
  }, [])

  return (
    <div className={styles.leaderboardPage}>
      <Title>Leaderboard</Title>
      <div className={styles.leaderboardTable}>
        {!isLoading ? (
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
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Leaderboard
