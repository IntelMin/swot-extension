import React, { type FC, useState } from 'react'
import { ConfigProvider } from 'antd'

import styles from './App.module.less'
import { Tabs, Shortcuts, Brand, Settings } from './components'
import { TabKeys } from './constants'
import { getImageUrl, createTab } from '@common/utils'

const App: FC = () => {
  const [activeTab, setActiveTab] = useState(TabKeys.Shortcuts)
  const [selectedSettings, setSelectedSettings] = useState(false);

  const handleSettings = () => {
    setSelectedSettings(!selectedSettings);
  }

  const onClose = () => {
    setSelectedSettings(false);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#171717',
          borderRadius: 8
        }
      }}
    >
      {
        !selectedSettings ? 
          <div className={styles.container}>
            <div className={styles.settings } onClick={()=>handleSettings()}>
                <img className={styles.settingsLogo} src={getImageUrl('onchain_settings')} alt="OnChain Settings IMG" />
            </div>
            {/* <Tabs active={activeTab} onChange={key => setActiveTab(key)} />
            {activeTab === TabKeys.Shortcuts ? <Shortcuts /> : <Settings />} */}
            {/* <Brand /> */}
            <Shortcuts  /> 
          </div>
          :
          <div className={styles.settingsContainer}>
            <div className={styles.settingsContent}>
              <div className={styles.settingsIcon} >
                <img className={styles.arrowLeftLogo} src={getImageUrl('onchain_arrow_left')} onClick={onClose} alt="OnChain Arrow Left" />
                <img className={styles.cancelLogo} src={getImageUrl('onchain_cancel')} onClick={onClose} alt="OnChain Cancel" />
              </div>
              <div className={styles.divider}></div>
              <Settings />
            </div>
          </div>
      }
    </ConfigProvider>
  )
}

export default App
