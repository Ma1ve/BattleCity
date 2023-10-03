import { useState } from 'react'
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from 'react-icons/ai/index.js'

import { toggleFullscreen } from '../../../shared/lib/toggleFullscreen'
import { Button } from '../../../shared/ui'
import { ScreenSize } from '../../models/types'
import styles from './fullscreenButton.module.css'

export const FullscreenButton = () => {
  const [screenSize, setScreenSize] = useState(ScreenSize.SMALL)

  return (
    <Button
      className={styles.fullScreenButton}
      onClick={() => toggleFullscreen(setScreenSize)}
      title={
        screenSize === ScreenSize.SMALL
          ? 'Перейти в полноэкранный режим'
          : 'Выйти из полноэкранного режима'
      }>
      {screenSize === ScreenSize.SMALL && <AiOutlineFullscreen size={80} />}
      {screenSize === ScreenSize.LARGE && <AiOutlineFullscreenExit size={80} />}
    </Button>
  )
}
