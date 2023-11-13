import React, { useState, useEffect } from 'react'

import styles from './Footer.module.css'

const Footer = () => {
  const [coords, setCoords] = useState<{ latitude: string; longitude: string }>(
    { latitude: '', longitude: '' }
  )

  useEffect(() => {
    const success = ({ coords }: any) => {
      const { latitude, longitude } = coords

      setCoords({ latitude, longitude })
    }

    const error = () => {
      console.error('Geolocation не поддерживается браузером.')
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      })
    } else {
      error()
    }
  }, [])

  return (
    <footer className={styles.footerLayout}>
      <span className={styles.companyName}>V.E.I.S.A development &#169;</span>
      <span className={styles.coords}>
        Your coordinates: (lat: {coords.latitude} lon: {coords.longitude})
      </span>
    </footer>
  )
}

export default Footer
