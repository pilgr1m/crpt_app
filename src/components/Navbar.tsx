import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd'
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import icon from '../images/cryptocurrencies.png'

export const Navbar = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState<null | number>(null)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize && screenSize < 768) {
      setIsActiveMenu(false)
    } else {
      setIsActiveMenu(true)
    }
  }, [screenSize])

  const onClick = () => setIsActiveMenu(!isActiveMenu)

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/"> Crypto_Dich </Link>
        </Typography.Title>
      </div>
      <Button
        className="menu-control-container"
        onClick={onClick}
      >
        <MenuOutlined />
      </Button>

      {isActiveMenu && (
        <Menu theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/"> Home </Link>
          </Menu.Item>
          <Menu.Item key="cryptocurrencies" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies"> Cryptocurrencies </Link>
          </Menu.Item>
          <Menu.Item key="exchanges" icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges"> Exchanges </Link>
          </Menu.Item>
          <Menu.Item key="news" icon={<BulbOutlined />}>
            <Link to="/news"> News </Link>
          </Menu.Item>

        </Menu>
      )}

    </div>
  )
}
