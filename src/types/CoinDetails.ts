import { allTimeHighType, linksType, supplyType } from './allTypes'

export interface CoinDetails {
  '24hVolume': string
  allTimeHigh: allTimeHighType
  btcPrice: string
  change: string
  coinrankingUrl: string
  color: string
  description: string
  iconUrl: string
  links: linksType[]
  listedAt: number
  lowVolume: boolean
  marketCap: string
  name: string
  numberOfExchanges: number
  numberOfMarkets: number
  price: string
  priceAt: number
  rank: number
  sparkline: string[]
  supply: supplyType
  symbol: string
  tier: number
  uuid: string
  websiteUrl: string
}
