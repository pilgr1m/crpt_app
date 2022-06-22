import React, { FC } from 'react'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'

import { Loader } from './Loader'
import { useGetExchangesQuery } from '../services'
import { Exchange, statsType } from '../types'
import { uniqueId } from 'lodash'

const { Text } = Typography
const { Panel } = Collapse

type Props = {

}

export const Exchanges:FC<Props> = () => {
  // coinId = 'Qwsogvtv82FCd' is Bitcoin
  const { data, isFetching } = useGetExchangesQuery('Qwsogvtv82FCd')
  const exchangesList: Exchange[] = data?.data?.exchanges
  const stats: statsType = data?.data?.stats

  console.log('exchanges:', exchangesList)
  console.log('stats:', stats)

  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Bitcoin Price</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={uniqueId('exchange_')}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid} className="header-exchange">
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(Number(exchange['24hVolume']))}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>${millify(Number(exchange.price))}</Col>
                  </Row>
                  )}
              >
                <> Description of {exchange.name}  have to be here...</>

                {/* {HTMLReactParser(exchange.description || '')} */}

              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}
