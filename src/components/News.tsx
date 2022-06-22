import React, { FC, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery, useGetCryptosQuery } from '../services'
import { uniqueId } from 'lodash'
import demoImage from '../images/news.png'
import { Coin } from '../types'
import { Loader } from './Loader'

type Props = {
  simplified?: boolean
}

const { Text, Title } = Typography
const { Option } = Select

export const News: FC<Props> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 18 })
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews?.value) return <Loader />

  // id={uniqueId(`${column.id}_`)}
  const onChange = (value:string) => {
    console.log(value)
    setNewsCategory(value)
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={onChange}
            // TODO fix any
            filterOption={(input, option: any) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

            <Option value="Cryptocurrency"> Cryptocurrency</Option>
            {data?.data?.coins.map((coin: Coin) => {
              const f = 1

              return (
                <Option value={coin.name} key={uniqueId('coinName_')}> {coin.name} </Option>
              )
            })}
          </Select>
        </Col>
      )}
      {
        // TODO fix any
        cryptoNews.value.map((news:any, idx:number) => {
          const f = 1

          return (
            <Col xs={24} sm={12} lg={8} key={uniqueId(`key_${idx}`)}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="icon news"
                      style={{ maxWidth: 180, maxHeight: 90 }}
                    />
                    {/* <img src={iconNews} alt="icon news" /> */}
                  </div>
                  <p>
                    {news.description > 100
                      ? `${news.description.substring(100)}...`
                      : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                        alt="icon-news-provider"

                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('minute').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
}
