import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': 'd666dcb4d9mshd2e455705ebd132p1f3204jsnaf2a3775fa09',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoApiNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => (
    {
      // 'query' - is GET request here and 'mutation' - POST, PUT...
      getCryptoNews: build.query(
        {
          query: ({ newsCategory, count }) => createRequest(
            `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
          ),
        },
      ),
    }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
