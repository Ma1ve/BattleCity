import { useState } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'

import { toggleFullscreen } from '../../../shared/lib/toggleFullscreen'
import { ScreenSize } from '../../models/types'
import styles from './fullscreenButton.module.css'

export const FullscreenButton = () => {
  const [screenSize, seScreenSize] = useState(ScreenSize.SMALL)

  return (
    <button
      className={styles.fullScreenButton}
      onClick={() => toggleFullscreen(seScreenSize)}
      title={
        screenSize === ScreenSize.SMALL
          ? 'Перейти в полноэкранный режим'
          : 'Выйти из полноэкранного режима'
      }>
      {screenSize === ScreenSize.SMALL && <AiOutlineFullscreen size={80} />}
      {screenSize === ScreenSize.LARGE && <AiOutlineFullscreenExit size={80} />}
    </button>
  )
}
