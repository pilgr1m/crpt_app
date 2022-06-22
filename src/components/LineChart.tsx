import React, { FC } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Col, Row, Typography } from 'antd'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type Props = {
  coinHistory?: any
  currentPrice: string
  coinName: string
}

// const { Title } = Typography

export const LineChart: FC<Props> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  // console.log('coinHistory+_+:', coinHistory)
  const coinPrice = []
  const coinTimeStamp = []

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.push(coinHistory?.history[i]?.price)
    coinTimeStamp.push(new Date(coinHistory?.history[i]?.timestamp * 1000).toLocaleDateString())
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  // const options = { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
  const options = { }

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
        <Col className="price-container">
          <Typography.Title
            level={5}
            className="price-change"
            style={{ color: `${coinHistory?.change > 0 ? '#16C784' : '#EA3943'}` }}
          > { coinHistory?.change && `${coinHistory?.change} %`}
          </Typography.Title>
          <Typography.Title level={5} className="current-change"> Current {coinName} Price: $ {currentPrice}</Typography.Title>
        </Col>
      </Row>

      <Line
        options={options}
        data={data}
      />

    </>
  )
}
