import React, { type ReactNode, type FC } from 'react'
import { Checkbox } from 'antd'
import cls from 'classnames'

import { Cell, Drawer } from '@common/components'
import { useStore } from '@common/hooks'
import { type OptWebsite } from '@src/store'
import { EXT_SUPPORT_WEB_LIST, type ExtSupportWebsite } from '@common/constants'
import type {
  SearchResultType,
  SearchResultItem,
  SearchResultItemValue
} from '@common/api/types'
import { getImageUrl, createTab } from '@common/utils'
import * as blockies from 'blockies-ts'

import styles from './index.module.less'

interface Props {
  visible: boolean
  onClose: () => void
  onChange: (opt: OptWebsite, value: boolean) => void
  data: SearchResultItem[]
}

const SearchResultDrawer: FC<Props> = ({ visible, onClose, onChange, data }) => {
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
  const renderSearchResultItem = (
    type: SearchResultType,
    item: SearchResultItemValue
  ): ReactNode => {
    switch (type) {
      case 'Address':
      case 'Transaction':
      case 'ENS': {
        const title = item.address || item.txn
        return (
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            {item.url && <a className={styles.link}>{item.url}</a>}
          </div>
        )
      }
      case 'Selector': {
        const key = item.selector
        const value = item.function
        return (
          <div className={styles.content}>
            <div className={styles.title}>{`${key} ${value}`}</div>
          </div>
        )
      }
      case 'NFT':
      case 'Token':
      case 'ApprovalDiagnosis': {
        const image =
          item.image || blockies.create({ seed: item.name }).toDataURL()
        return (
          <div className={cls(styles.content, 'align-center')}>
            <img className={styles.iconImg} src={image} alt="" loading="lazy" />
            <div className={styles.listItem}>
              <div className={styles.title}>{item.name ?? item.address}</div>
              <div className={styles.rightURL}>
                {item.url && (
                  <a className={cls('text-ellipsis', styles.link)}>{item.url}</a>
                )}
                <img className={styles.linkImg} src={getImageUrl('onchain_link_square')} alt="" />
              </div>
            </div>
          </div>
        )
      }
      default:
        return null
    }
  }

  const onNavigate = (url?: string) => {
    url && createTab(url)
  }

  return (
    <Drawer visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={cls(styles.searchResultList, {
              [styles.show]: !!data.length
            })}
          >
            {data.map(group => (
              <div key={group.type} className={styles.searchResultItem}>
                <div className={styles.type}>{group.type}</div>
                {group.value.map((item, key) => (
                  <div
                    data-id={`${group.type}-${key}`}
                    key={key}
                    onClick={() => onNavigate(item.url)}
                  >
                    {renderSearchResultItem(group.type, item)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default SearchResultDrawer
