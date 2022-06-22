import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': 'd666dcb4d9mshd2e455705ebd132p1f3204jsnaf2a3775fa09',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => (
    {
      // 'query' - is GET request here and 'mutation' - POST, PUT...
      getCryptos: build.query(
        { query: (count) => createRequest(`/coins?limit=${count}`) },
      ),
      getCryptoDetails: build.query(
        { query: (coinId) => createRequest(`/coin/${coinId}`) },
      ),
      getCryptoHistory: build.query(
        {
          query:
            ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
        },
      ),
      getExchanges: build.query({ query: (coinID) => createRequest(`/coin/${coinID}/exchanges`) }),
    }),
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi
