import React, {
  type ChangeEvent,
  type FC,
  useState,
  type ReactNode,
  type KeyboardEvent,
  useEffect,
  useCallback,
  useRef
} from 'react'
import { Input } from 'antd'
import * as blockies from 'blockies-ts'
import { debounce } from 'lodash-es'
import cls from 'classnames'

import { getImageUrl, createTab } from '@common/utils'
import { EXT_SUPPORT_WEB_LIST } from '@common/constants'
import { LoadingOutlined, IconClose } from '@common/components'
import type {
  SearchResultType,
  SearchResultItem,
  SearchResultItemValue
} from '@common/api/types'
import commonApi from '@common/api'
import { PHALCON_EXPLORER_DOMAIN } from '@common/config/uri'
import { Brand } from '../../components'
import { SupportChainDrawer, SearchResultDrawer } from './components';

import styles from './index.module.less'

const Shortcuts: FC = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([])
  const valueRef = useRef(value)
  const [configSupportChainVisible, setConfigSupportChainVisible] = useState(false)
  const [configSearchResultVisible, setConfigSearchResultVisible] = useState(false)

  const onSupportChainChange = () => {
    // const newWebOpt = { ...supportWebList }
    // for (const key in newWebOpt) {
    //   if (key === opt.name) {
    //     newWebOpt[key].enabled = value
    //   }
    // }
    // setSupportWebList(newWebOpt)
    // onRefresh()
  }

  const onSearchResultChange = () => {

  }

  const onValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
    if (!value) {
      onClear()
      return
    }
    if (value.trim()) {
      onSearch()
    }
  }

  const onSearch = useCallback(
    debounce(async () => {
      setLoading(true)
      const { data, success } = await commonApi.getComprehensiveSearchResults({
        type: -1,
        keyword: valueRef.current
      })
      setActiveIdx(0)
      setLoading(false)
      if (success) {
        setSearchResults(data ?? [])
        setConfigSearchResultVisible(true);
      } else {
        setSearchResults([])
      }
    }, 500),
    []
  )

  const onClear = () => {
    setSearchResults([])
    setValue('')
  }

  const onNavigate = (url?: string) => {
    url && createTab(url)
  }

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
            <div className={cls('flex1')} style={{ overflow: 'hidden' }}>
              <div className={styles.title}>{item.name ?? item.address}</div>
              {item.url && (
                <a className={cls('text-ellipsis', styles.link)}>{item.url}</a>
              )}
            </div>
          </div>
        )
      }
      default:
        return null
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown') {
      setActiveIdx(idx => idx + 1)
    } else if (event.code === 'ArrowUp') {
      setActiveIdx(idx => (idx > 0 ? idx - 1 : idx))
    } else if (event.code === 'Enter') {
      const item = document.querySelectorAll<HTMLElement>('.item')?.[activeIdx]
      if (item) {
        const dataId = item.getAttribute('data-id')
        if (dataId) {
          const [type, index] = dataId.split('-')
          const origin = searchResults.find(item => item.type === type)
            ?.value?.[Number(index)]
          onNavigate(origin?.url)
        }
      }
    }
  }

  useEffect(() => {
    if (activeIdx) {
      const items = document.querySelectorAll<HTMLElement>('.item')
      Array.from(items).forEach((item, index) => {
        item.style.opacity = index === activeIdx - 1 ? '0.3' : '1'
        if (index === activeIdx - 1) {
          item.scrollIntoView()
        }
      })
    }
  }, [activeIdx])

  useEffect(() => {
    valueRef.current = value
  })

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={getImageUrl('onchain_logo')} alt="" />
      <div className={styles.txtSwot}>SWOT</div>
      <div className={styles.txtSwotDesc}>Uniting 30+ Web3/AI tools, 300M+ labels, and Fund Flow Map in one extension.</div>
      <div className={styles.chainSection}>
        <div className={styles.searchBarContainer}>
          <Input
            type="text"
            name="text"
            value={value}
            className={styles.searchInput}
            placeholder="Explore within Web3"
            onChange={onValueChange}
            onKeyUp={onKeyUp}
            suffix={
              loading && (
                <LoadingOutlined />
              )
            }
          />
          <img className={styles.searchLogo} src={getImageUrl('onchain_search_logo')} alt="" />
          {/* <Input
            value={value}
            className={styles.input}
            placeholder="Explore within Web3"
            onChange={onValueChange}
            suffix={
              loading ? (
                <LoadingOutlined />
              ) : (
                <IconClose
                  style={{
                    display: value ? 'inline' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={onClear}
                />
              )
            }
            onKeyUp={onKeyUp}
          /> */}

        </div>
        <div className={styles.supportedChains} onClick={() => setConfigSupportChainVisible(true)}>
          <div className={styles.supportedChainsTxt}>
            Supported Chains
          </div>
          <img className={styles.onchain_arrow_expand} src={getImageUrl('onchain_arrow_expand')} alt="" />
        </div>
        {/* <div className={styles.navbar}>
          <a
            href={PHALCON_EXPLORER_DOMAIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={getImageUrl('Phalcon')} alt="" />
          </a>
          {EXT_SUPPORT_WEB_LIST.filter(item => !!item.chain).map(item => (
            <a
              key={item.name}
              href={`${item.href ? item.href : 'https://' + item.domains[0]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.logo} alt="" />
            </a>
          ))}
        </div> */}
        <Brand />
      </div>
      <SupportChainDrawer
        visible={configSupportChainVisible}
        onClose={() => setConfigSupportChainVisible(false)}
        onChange={onSupportChainChange}
      />
      <SearchResultDrawer
        visible={configSearchResultVisible}
        onClose={() => {
          setConfigSearchResultVisible(false)
          setSearchResults([])
          setValue('')
          }
        }
        onChange={onSearchResultChange}
        data={searchResults}
      />
    </div>
  )
}

export default Shortcuts
