import type { FC, PropsWithChildren } from 'react'
import cls from 'classnames'

import type { BaseComponent } from '@common/types'
import { IconClose } from '@common/components'
import { getImageUrl, createTab } from '@common/utils'

import styles from './index.module.less'

interface Props extends BaseComponent {
  title?: string
  visible: boolean
  onClose: () => void
}

const Drawer: FC<PropsWithChildren<Props>> = props => {
  const { title = '', visible, children, className, style, onClose } = props

  return (
    <div
      className={cls(styles.drawer, className, { [styles.show]: visible })}
      style={style}
      onClick={onClose}
    >
      <div className={styles.container}>
        <div
          className={cls(styles.content, { [styles.show]: visible })}
          onClick={e => e.stopPropagation()}
        >
          <header className={styles.title}>
            {title}
            {/* <div className={styles.iconContainer} onClick={onClose}>
              <IconClose />
            </div> */}
            <div className={styles.settingsIcon} >
              <img className={styles.arrowLeftLogo} src={getImageUrl('onchain_arrow_left')} onClick={onClose} alt="OnChain Arrow Left" />
              <img className={styles.cancelLogo} src={getImageUrl('onchain_cancel')} onClick={onClose} alt="OnChain Cancel" />
            </div>
          </header>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
