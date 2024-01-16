import React, { useState, type FC } from 'react'

import { Cell } from '@common/components'
import { useStore } from '@common/hooks'
import type { OptKeys, OptWebsite } from '@src/store'
import { REFRESH } from '@common/constants'
import { chromeEvent } from '@common/event'

import {
  SupportWebsiteDrawer,
  ConfigNFTDrawer,
  ConfigExploresDrawer
} from './components'
import { getImageUrl, createTab } from '@common/utils'

import styles from './index.module.less'

const Settings: FC = () => {
  const [options, setOptions] = useStore('options')
  const [supportWebList, setSupportWebList] = useStore('supportWebList')
  const [alternativeParsers, setAlternativeParsers] =
    useStore('alternativeParsers')

  const [configSupportWebVisible, setConfigSupportWebVisible] = useState(false)
  const [configExploresVisible, setConfigExploresVisible] = useState(false)
  const [configNFTVisible, setConfigNFTVisible] = useState(false)

  const onWebsiteChange = (opt: OptWebsite, value: boolean) => {
    const newWebOpt = { ...supportWebList }
    for (const key in newWebOpt) {
      if (key === opt.name) {
        newWebOpt[key].enabled = value
      }
    }
    setSupportWebList(newWebOpt)
    onRefresh()
  }

  const onSwitchChange = (key: OptKeys, value: boolean, refresh = true) => {
    setOptions({
      ...options,
      [key]: value
    })
    if (refresh) onRefresh()
  }

  const onAlternativeParsersChange = (parser: string, enabled: boolean) => {
    setAlternativeParsers({
      ...alternativeParsers,
      [parser]: enabled
    })
  }

  const onRefresh = () => {
    chromeEvent.emit(REFRESH, true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.onChainListItem}>
        <img className={styles.onchainListItemImg} src={getImageUrl('onchain_supported_website')} alt="OnChain Supported Website IMG" />
        <div className={styles.onchainListItemSubTitle}>Supported Websites</div>
        <div className={styles.onchainListItemSubContent}>Toggle On/Off any of supported websites</div>
      </div>

      <div className={styles.onChainListItem}>
        <img className={styles.onchainListItemImg} src={getImageUrl('onchain_customize_explorer')} alt="OnChain Customize Explorer IMG" />
        <div className={styles.onchainListItemSubTitle}>Supported Websites</div>
        <div className={styles.onchainListItemSubContent}>Toggle On/Off any of supported websites</div>
      </div>
      
      <div className={styles.onChainListItem}>
        <img className={styles.onchain_nft_marketplace} src={getImageUrl('onchain_nft_marketplace')} alt="OnChain NFT Marketplace IMG" />
        <div className={styles.onchainListItemSubTitle}>Supported Websites</div>
        <div className={styles.onchainListItemSubContent}>Toggle On/Off any of supported websites</div>
      </div>
      
      {/* <div className={styles.content}>
        <div>
          <img className={styles.arrowLeftLogo} src={getImageUrl('onchain_arrow_left')} alt="OnChain Arrow Left" />
          <img className={styles.cancelLogo} src={getImageUrl('onchain_cancel')} alt="OnChain Cancel" />
        </div>
        <Cell.Group>
          <Cell
            title="Supported Websites List"
            onClick={() => setConfigSupportWebVisible(true)}
          />
          <Cell
            title="Customize your blockchain explorer enhancement"
            onClick={() => setConfigExploresVisible(true)}
          />
          <Cell
            border={false}
            title="Personalize your NFT marketplace upgrades"
            onClick={() => setConfigNFTVisible(true)}
          />
        </Cell.Group>
        
      </div>
      <SupportWebsiteDrawer
        visible={configSupportWebVisible}
        onClose={() => setConfigSupportWebVisible(false)}
        onChange={onWebsiteChange}
      />
      <ConfigExploresDrawer
        visible={configExploresVisible}
        onClose={() => setConfigExploresVisible(false)}
        onSwitchChange={onSwitchChange}
        onAlternativeParsersChange={onAlternativeParsersChange}
      />
      <ConfigNFTDrawer
        visible={configNFTVisible}
        onClose={() => setConfigNFTVisible(false)}
        onSwitchChange={onSwitchChange}
      /> */}
    </div>
  )
}

export default Settings
