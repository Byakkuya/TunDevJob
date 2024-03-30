import { ConfigProvider, App } from 'antd'
import React from 'react'

interface Props {
     children : React.ReactNode 
    }
export const Providers = ({children} : Props) => {
  return (
    <ConfigProvider>
        <App/>
        {children}
    </ConfigProvider>
  )
}
