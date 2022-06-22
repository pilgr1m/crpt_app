import React, { FC, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  NumberOutlined, CheckOutlined,
} from '@ant-design/icons'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services'
import { CoinDetails } from '../types/CoinDetails'
import { uniqueId } from 'lodash'
import { LineChart } from './LineChart'
import { Loader } from './Loader'

type Props = {

}

const { Title, Text } = Typography
const { Option } = Select
// 3h 24h 7d 30d 3m 1y 3y 5y
const times = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

export const CryptoDetails: FC<Props> = () => {
  const { coinId } = useParams()

  const [timePeriod, setTimePeriod] = useState('1h')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const cryptoDetails: CoinDetails = data?.data?.coin

  // console.log('coinId: ', coinId)
  // console.log('cryptoDetails: ', cryptoDetails)

  const { data: coinHistoryData } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const coinHistory = coinHistoryData?.data

  // console.log('coinHistory: ', coinHistory)

  if (isFetching) return <Loader />

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.price && millify(Number(cryptoDetails?.price))}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetails.rank,
      icon: <NumberOutlined />,
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails['24hVolume'] && millify(Number(cryptoDetails['24hVolume']))}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.marketCap && millify(Number(cryptoDetails.marketCap))}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(Number(cryptoDetails.allTimeHigh.price))}`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(Number(cryptoDetails.supply.total))}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(Number(cryptoDetails.supply.circulating))}`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  // console.log('data detail: ', data)

  // TODO fix price
  // if price > 1$ , > 100, > 1k, add new const for it

  const onChange = (value: string) => {
    setTimePeriod(value)
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">

          {cryptoDetails.name}({Number(cryptoDetails.price)}) Price
        </Title>
        <p>
          { cryptoDetails.name} live price in USD.
          View values statistics, market cap and supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={onChange}
        value={timePeriod}
      >
        {times.map(time => <Option key={time}>{time}</Option>)}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(Number(cryptoDetails.price))}
        coinName={cryptoDetails.name}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => {
            const f = 1

            return (
              <Col className="coin-stats" key={uniqueId()}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            )
          })}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => {
            const a = 1

            return (
              <Col className="coin-stats" key={uniqueId()}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            )
          })}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map(link => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}

        </Col>
      </Col>

    </Col>
  )
}
