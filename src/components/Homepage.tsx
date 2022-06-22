import React, { FC } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services'
import { Cryptocurrencies, Loader, News } from '../components'

type Props = {

}

const { Title } = Typography

export const Homepage: FC<Props> = () => {
  // const { data, isFetching } = useGetCryptosQuery(10)
  // const globalStats = data?.data?.stats
  // if (isFetching) return <Loader />

  const globalStats = {
    total: 14128,
    total24hVolume: '78308071874',
    totalCoins: 14128,
    totalExchanges: 179,
    totalMarketCap: '1348026118549',
    totalMarkets: 27222,
  }

  // console.log('data: ', data)

  // TODO down
  // footer to other component
  // Col render by map...

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(Number(globalStats.totalMarketCap))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(Number(globalStats.total24hVolume))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={2} className="home-title">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={2} className="home-title">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />

    </>
  )
}
