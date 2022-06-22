import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react'
import millify from 'millify'
import { isEqual } from 'lodash'

import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services'
import { coins } from '../data'
import { Coin } from '../types'
import { Loader } from './Loader'

type Props = {
  simplified?: boolean
}

export const Cryptocurrencies: FC<Props> = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState<Coin[]|[]>([])

  // const [cryptos, setCryptos] = useState(coins)
  // const [cryptos, setCryptos] = useState<Coin[]|[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin:Coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)
  }, [cryptoList, searchTerm])

  if (isFetching) return <Loader />

  const onChange = (e: BaseSyntheticEvent) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={onChange}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        { cryptos?.map((currency, idx) => {
          const f = 1

          return (idx + 1 <= count) && (
            <Col
              key={currency.uuid}
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
            >
              <Link to={`/crypto/${currency.uuid}`}>
                {/* <Link to={`/crypto/${currency.rank}`}> */}
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} alt="crypto-icon" />}
                  hoverable
                >
                  <p>Price: {millify(Number(currency.price))}</p>
                  <p>Market Cap: {millify(Number(currency.marketCap))}</p>
                  <p>Daily Change: {millify(Number(currency.change))}%</p>
                </Card>
              </Link>

            </Col>
          )
        })}
      </Row>
    </>
  )
}
