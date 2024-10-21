import { Menu, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CryptocurrencyCard from './components/CryptocurrencyCard'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = [
  getItem(
    'Список криптовалют',
    'g1',
    null,
    [getItem('Option 1', '1'), getItem('Option 2', '2')],
    'group'
  ),
  ,
]
const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8000/cryptocurrencies').then((resp) => {
      const currenciesResponse = resp.data
      const menuItems = [
        getItem(
          'Список криптовалют',
          'g1',
          null,
          currenciesResponse.map((c) => {
            return { label: c.name, key: c.id }
          }),
          'group'
        ),
      ]
      setCurrencies(menuItems)
    })
  }

  const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`).then((resp) => {
      setCurrencyData(resp.data)
    })
  }

  useEffect(() => {
    fetchCurrencies()
  }, [])

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency()
  }, [currencyId])

  const onClick = (e) => {
    setCurrencyId(e.key)
  }

  return (
    <div className="flex">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size="large" />}
      </div>
    </div>
  )
}
export default App
