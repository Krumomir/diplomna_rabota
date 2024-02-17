<template>
  <div class="mx-auto max-w-6xl space-y-8 px-4">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cryptocurrency Details</h1>
    </div>
    <div class="space-y-2" v-if="coin">
      <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <strong>Symbol</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.symbol ? coin.symbol : 'N/A'}}</dd>
        </div>
        <div class="space-y-2">
          <strong>Name</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.name ? coin.name: 'N/A'}}</dd>
        </div>
        <div class="space-y-2">
          <strong>Web_slug</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.web_slug ? coin.web_slug: 'N/A' }}</dd>
        </div>
        <div class="space-y-2">
          <strong>Asset_platform_id</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.asset_platform_id ? coin.asset_platform_id: 'N/A'}}</dd>
        </div>
        <div class="space-y-2">
          <strong>Platforms</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.platforms.join(', ') }}</dd>
        </div>
        <div class="space-y-2">
          <strong>Description</strong>
          <dd class="text-black md:text-lg lg:text-base xl:text-xl">{{ coin.description.en ? coin.description.en : 'N/A' }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Links</h2>
      <div class="space-y-2">
        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <li>
            <strong>Homepage</strong>: {{ coin.links.homepage[0] ? coin.links.homepage[0] : 'N/A' }}
          </li>
          <li>
            <strong>Whitepaper</strong>: {{ coin.links.whitepaper ? coin.links.whitepaper : 'N/A' }}
          </li>
          <li>
            <strong>Twitter</strong>: {{ coin.links.twitter_screen_name ? coin.links.twitter_screen_name : 'N/A' }}
          </li>
          <li>
            <strong>Facebook</strong>: {{ coin.links.facebook_username ? coin.links.facebook_username : 'N/A' }}
          </li>
          <li>
            <strong>Bitcointalk Thread Identifier</strong>: {{ coin.links.bitcointalk_thread_identifier ?
              coin.links.bitcointalk_thread_identifier : 'N/A' }}
          </li>
          <li>
            <strong>Telegram Channel Identifier</strong>: {{ coin.links.telegram_channel_identifier ?
              coin.links.telegram_channel_identifier : 'N/A' }}
          </li>
          <li>
            <strong>Subreddit URL</strong>: {{ coin.links.subreddit_url ? coin.links.subreddit_url : 'N/A' }}
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Repositories</h2>
      <div class="space-y-2">
        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <li>
            <strong>GitHub</strong>: {{ coin.links.repos_url.github[0] ? coin.links.repos_url.github[0] : 'N/A' }}
          </li>
          <li>
            <strong>Bitbucket</strong>: {{ coin.links.repos_url.bitbucket[0] ? coin.links.repos_url.bitbucket[0] : 'N/A'
            }}
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Other Information</h2>
      <div class="space-y-2">
        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <li>
            <strong>Country of Origin</strong>: {{ coin.country_origin ? coin.country_origin : 'N/A' }}
          </li>
          <li>
            <strong>Genesis Date</strong>: {{ coin.genesis_date ? coin.genesis_date : 'N/A' }}
          </li>
          <li>
            <strong>Contract Address</strong>: {{ coin.contract_address ? coin.contract_address : 'N/A' }}
          </li>
          <li>
            <strong>Sentiment Votes Up Percentage</strong>: {{ coin.sentiment_votes_up_percentage ?
              coin.sentiment_votes_up_percentage : 'N/A' }}
          </li>
          <li>
            <strong>Sentiment Votes Down Percentage</strong>: {{ coin.sentiment_votes_down_percentage ?
              coin.sentiment_votes_down_percentage : 'N/A' }}
          </li>
          <li>
            <strong>Watchlist Portfolio Users</strong>:  {{ coin.watchlist_portfolio_users ?
              coin.watchlist_portfolio_users : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap Rank</strong>: {{ coin.market_cap_rank ? coin.market_cap_rank : 'N/A' }}
          </li>
        </ul>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Market Data</h2>
      <div class="space-y-2">
        <ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <li>
            <strong>Current Price</strong>: {{ coin.market_data.current_price ? coin.market_data.current_price : 'N/A' }}
          </li>
          <li>
            <strong>Total Value Locked (BTC)</strong>: {{ coin.market_data.total_value_locked.btc ?
              coin.market_data.total_value_locked.btc : 'N/A' }}
          </li>
          <li>
            <strong>Total Value Locked (USD)</strong>: {{ coin.market_data.total_value_locked.usd ?
              coin.market_data.total_value_locked.usd : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap to TVL Ratio</strong>: {{ coin.market_data.mcap_to_tvl_ratio ?
              coin.market_data.mcap_to_tvl_ratio : 'N/A' }}
          </li>
          <li>
            <strong>FDV to TVL Ratio</strong>: {{ coin.market_data.fdv_to_tvl_ratio ? coin.market_data.fdv_to_tvl_ratio : 'N/A' }}
          </li>
          <li>
            <strong>All-Time High</strong>: {{ coin.market_data.ath ? coin.market_data.ath : 'N/A' }}
          </li>
          <li>
            <strong>ATH Change Percentage</strong>: {{ coin.market_data.ath_change_percentage ?
              coin.market_data.ath_change_percentage : 'N/A' }}
          </li>
          <li>
            <strong>ATH Date</strong>: {{ coin.market_data.ath_date ? coin.market_data.ath_date : 'N/A' }}
          </li>
          <li>
            <strong>All-Time Low</strong>: {{ coin.market_data.atl ? coin.market_data.atl : 'N/A' }}
          </li>
          <li>
            <strong>ATL Change Percentage</strong>: {{ coin.market_data.atl_change_percentage ?
              coin.market_data.atl_change_percentage : 'N/A' }}
          </li>
          <li>
            <strong>ATL Date</strong>: {{ coin.market_data.atl_date ? coin.market_data.atl_date : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap</strong>: {{ coin.market_data.market_cap ? coin.market_data.market_cap : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap Rank</strong>: {{ coin.market_data.market_cap_rank ? coin.market_data.market_cap_rank : 'N/A' }}
          </li>
          <li>
            <strong>Fully Diluted Valuation</strong>: {{ coin.market_data.fully_diluted_valuation ?
              coin.market_data.fully_diluted_valuation : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap to FDV Ratio</strong>: {{ coin.market_data.market_cap_to_fully_diluted_valuation ?
              coin.market_data.market_cap_to_fully_diluted_valuation : 'N/A' }}
          </li>
          <li>
            <strong>Total Volume</strong>: {{ coin.market_data.total_volume ? coin.market_data.total_volume : 'N/A' }}
          </li>
          <li>
            <strong>High in Last 24h</strong>: {{ coin.market_data.high_24h ? coin.market_data.high_24h : 'N/A' }}
          </li>
          <li>
            <strong>Low in Last 24h</strong>: {{ coin.market_data.low_24h ? coin.market_data.low_24h : 'N/A' }}
          </li>
          <li>
            <strong>Price Change in Last 24h</strong>: {{ coin.market_data.price_change_24h ?
              coin.market_data.price_change_24h : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 24h</strong>: {{ coin.market_data.price_change_percentage_24h ?
              coin.market_data.price_change_percentage_24h : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 7d</strong>: {{ coin.market_data.price_change_percentage_7d ?
              coin.market_data.price_change_percentage_7d : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 14d</strong>: {{ coin.market_data.price_change_percentage_14d ?
              coin.market_data.price_change_percentage_14d : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 30d</strong>: {{ coin.market_data.price_change_percentage_30d ?
              coin.market_data.price_change_percentage_30d : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 60d</strong>: {{ coin.market_data.price_change_percentage_60d ?
              coin.market_data.price_change_percentage_60d : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 200d</strong>:  {{ coin.market_data.price_change_percentage_200d ?
              coin.market_data.price_change_percentage_200d : 'N/A' }}
          </li>
          <li>
            <strong>Price Change Percentage in Last 1y</strong>: {{ coin.market_data.price_change_percentage_1y ?
              coin.market_data.price_change_percentage_1y : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap Change in Last 24h</strong>: {{ coin.market_data.market_cap_change_24h ?
              coin.market_data.market_cap_change_24h : 'N/A' }}
          </li>
          <li>
            <strong>Market Cap Change Percentage in Last 24h</strong>: {{ coin.market_data.market_cap_change_percentage_24h ?
              coin.market_data.market_cap_change_percentage_24h : 'N/A' }}
          </li>
          <li>
            <strong>Total Supply</strong>: {{ coin.market_data.total_supply ? coin.market_data.total_supply : 'N/A' }}
          </li>
          <li>
            <strong>Max Supply</strong>: {{ coin.market_data.max_supply ? coin.market_data.max_supply : 'N/A' }}
          </li>
          <li>
            <strong>Circulating Supply</strong>: {{ coin.market_data.circulating_supply ? coin.market_data.circulating_supply : 'N/A' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoService from '@/services/CryptoService.js'

export default {
  data () {
    return {
      coin: null
    }
  },
  async created () {
    try {
      const response = await CryptoService.detailedCoinData(this.$route.params.name)
      this.coin = response.data
    } catch (error) {
      console.error('Failed to fetch coin data:', error)
    }
  }
}
</script>

<style scoped>@import '../output.css'</style>
