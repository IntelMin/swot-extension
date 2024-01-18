import React, { type FC } from 'react'
import { Checkbox } from 'antd'

import { Cell, Drawer } from '@common/components'
import { useStore } from '@common/hooks'
import { type OptWebsite } from '@src/store'
import { EXT_SUPPORT_WEB_LIST, type ExtSupportWebsite } from '@common/constants'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (opt: OptWebsite, value: boolean) => void
}

const SupportChainDrawer: FC<Props> = ({ visible, onClose, onChange }) => {
  // const [supportWebList] = useStore('supportWebList')

  // const extractSecondLevelDomain = (item: ExtSupportWebsite) => {
  //   if (!item.testNets?.length) {
  //     return item.domains[0]
  //   }
  //   const regex = /[a-z0-9-]+\.[a-z]{2,}$/i
  //   const match = item.domains[0].match(regex)
  //   if (match) {
  //     return `*.${match[0]}`
  //   } else {
  //     return `*.${item.domains[0]}`
  //   }
  // }

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          {
            EXT_SUPPORT_WEB_LIST.filter(item => !!item.chain).map(item => (
              <div className={styles.searchResultItem} key={item.name}>
                <div className={styles.searchResultItemLeft}>
                  <img className={styles.searchResultItemImg} src={item.logo} alt="" />
                  <div className={styles.searchResultItemName}>{item.name}</div>
                </div>
                <a
                  className={styles.searchResultItemRight}
                  key={item.name}
                  href={`${item.href ? item.href : 'https://' + item.domains[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                    {item.domains[0]}
                </a>
              </div>
            ))
          }

          {/* <Cell.Group>
            {EXT_SUPPORT_WEB_LIST.map(item => {
              const opt = Object.values(supportWebList).find(
                opt => opt.name === item.name
              )!
              return (
                <Cell
                  pointer
                  icon={item.logo}
                  key={item.name}
                  border={false}
                  title={item.name}
                  desc={extractSecondLevelDomain(item)}
                  onClick={() => onChange(opt, !opt.enabled)}
                />
              )
            })}
          </Cell.Group> */}
        </div>
      </div>
    </Drawer>
  )
}

export default SupportChainDrawer
