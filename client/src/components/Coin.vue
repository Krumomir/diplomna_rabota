<template>
  <div class="max-w-screen-xl mx-auto" v-if="coin">
    <div class="flex flex-col">
      <div class="flex flex-row">
        <div class="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 ">
          <div class="mt-4">
            <h1 class="text-3xl font-semibold pb-2">{{ coin.name }}</h1>
            <div class="flex items-baseline space-x-2">
              <h2 class="text-5xl font-extrabold text-gray-900">${{ formatNumber(coin.market_data.current_price) }}</h2>
              <span class="text-green-500" v-if="coin.market_data.price_change_percentage_24h > 0">
                ▲ {{ coin.market_data.price_change_percentage_24h }}%
              </span>
              <span class="text-red-500" v-else>
                ▼ {{ coin.market_data.price_change_percentage_24h }}%
              </span>
            </div>
            <div class="flex items-center space-x-2 mt-2" v-if="coin">
              <span class="text-gray-500">Last 24 hours</span>
              <span class="text-gray-500">Trading volume: ${{ formatNumber(coin.market_data.total_volume) }}</span>
            </div>
            <div class="mt-2 flex items-center space-x-1">
              <p class="text-sm text-gray-500">1.0000 {{ coin.symbol }}</p>
            </div>
            <div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100"
              class="relative overflow-hidden w-full bg-green-200 h-1.5 rounded-full mt-2">
              <div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100"
                class="absolute bg-green-500 h-1.5 rounded-full"
                :style="{ width: (((coin.market_data.current_price - coin.market_data.low_24h) / (coin.market_data.high_24h - coin.market_data.low_24h)) * 100) + '%' }">
              </div>
            </div>

            <div class="flex justify-between text-sm font-medium text-gray-500 mt-2">
              <p>${{ formatNumber(coin.market_data.low_24h) }}</p>
              <p>24h Range</p>
              <p>${{ formatNumber(coin.market_data.high_24h) }}</p>
            </div>
          </div>

          <div class="mt-4 space-y-2">
            <p class="flex items-center justify-between text-gray-900">
              Market Cap
              <span>${{ formatNumber(coin.market_data.market_cap) }}</span>
            </p>
            <p class="flex items-center justify-between text-gray-900">
              Fully Diluted Valuation
              <span>${{ formatNumber(coin.market_data.fully_diluted_valuation) }}</span>
            </p>
            <p class="flex items-center justify-between text-gray-900">
              Circulating Supply
              <span>{{ formatNumber(coin.market_data.circulating_supply) }}</span>
            </p>
            <p class="flex items-center justify-between text-gray-900">
              Total Supply
              <span>{{ formatNumber(coin.market_data.total_supply) }}</span>
            </p>
            <p class="flex items-center justify-between text-gray-900">
              Max Supply
              <span>{{ formatNumber(coin.market_data.max_supply) }}</span>
            </p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3 mt-4">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-semibold">Info</h3>
            </div>
            <div class="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2">
              <span class="font-medium">Website</span>
              <div class="space-x-2">
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="coin.links.homepage[0]" rel="ugc">
                  {{ coin.web_slug }}
                </a>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="coin.links.whitepaper" rel="ugc">
                  Whitepaper
                </a>
              </div>
            </div>
            <div class="flex items-start justify-between border-b border-gray-200 pb-2">
              <span class="font-medium">Community</span>
              <div class="grid grid-cols-2 gap-2">
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="`https://twitter.com/${coin.links.twitter_screen_name}`" rel="ugc">
                  Twitter
                </a>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="`https://www.facebook.com/${coin.links.facebook_username}`" rel="ugc">
                  Facebook
                </a>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="`https://bitcointalk.org/index.php?topic=${coin.links.bitcointalk_thread_identifier}`"
                  rel="ugc">
                  bitcointalk.org
                </a>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="`https://t.me/${coin.links.telegram_channel_identifier}`" rel="ugc">
                  Telegram
                </a>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="coin.links.subreddit_url" rel="ugc">
                  Reddit
                </a>
              </div>
            </div>
            <div class="flex items-center justify-between border-b border-gray-200 pb-2">
              <span class="font-medium">Source Code</span>
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="w-4 h-4 text-gray-500">
                  <path
                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                  </path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <a class="text-black-600 hover:border-green-900 border-4 border-black-500 rounded bg-gray-200 font bold"
                  :href="coin.links.repos_url.github[0]" rel="ugc">
                  Github
                </a>
              </div>
            </div>
            <div>
              <a class="text-black-600">
                Contract Address
              </a>
              <div class="text-right">
                <button @click="copyAddress"
                  class="ml-2 px-4 py-2 bg-500 text-black rounded border border-700 hover:border-green-900">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-sm rounded-lg shadow-lg p-6 bg-white">
          <h2 class="text-2xl font-bold mb-4">{{ coin.name }} Historical Price</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">Price change percentage</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">24 hours</span>
              <span>{{ coin.market_data.price_change_percentage_24h }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">7 days</span>
              <span>{{ coin.market_data.price_change_percentage_7d }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">14 days</span>
              <span>{{ coin.market_data.price_change_percentage_14d }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">30 days</span>
              <span>{{ coin.market_data.price_change_percentage_30d }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">200 days</span>
              <span>{{ coin.market_data.price_change_percentage_200d }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">1 year</span>
              <span>{{ coin.market_data.price_change_percentage_1y }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">All-Time High</span>
              <div>
                <span class="text-red-600">${{ formatNumber(coin.market_data.ath) }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-red-600 inline ml-1">
                  <path d="M8 18L12 22L16 18"></path>
                  <path d="M12 2V22"></path>
                </svg>
                <span class="text-red-600"> {{ coin.market_data.ath_change_percentage }}%</span>
                <span class="text-sm text-gray-500 ml-2">{{ formatDate(coin.market_data.ath_date) }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">All-Time Low</span>
              <div>
                <span class="text-green-600">${{ formatNumber(coin.market_data.atl) }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-green-600 inline ml-1">
                  <path d="M7 10v12"></path>
                  <path
                    d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z">
                  </path>
                </svg>
                <span class="text-green-600"> {{ coin.market_data.atl_change_percentage }}%</span>
                <span class="text-sm text-gray-500 ml-2">{{ formatDate(coin.market_data.atl_date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="bg-white p-6 rounded-lg shadow-md w-full mt-4">
        <h3 class="text-lg font-semibold">Total Value Locked (TVL)</h3>
        <p class="text-gray-500">Total value locked in the protocol's smart contracts</p>
        <div>
          <canvas id="tvlChart"></canvas>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md w-full  mt-4" v-if="coin.recommendation">
        <h3 class="text-2xl font-semibold">AI's opinnion</h3>
        <p class="text-gray-500">AI's analysis on the market</p>
        <vue-markdown class="text-xl text-black-500">{{ coin.recommendation }}</vue-markdown>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md w-full  mt-4" v-else>
        <h3 class="text-2xl font-semibold">AI's opinnion</h3>
        <p class="text-xl text-black-500">Subscribe for advanced analysis</p>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoService from '@/services/CryptoService.js'
import Chart from 'chart.js'



export default {
  data() {
    return {
      coin: null,
      error: null,
      historyTvl: null
    }
  },
  methods:
  {
    formatNumber(number) {
      return number.toLocaleString()
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    copyAddress() {
      navigator.clipboard.writeText(this.coin.contract_address)
        .then(() => {
          alert('Address copied to clipboard');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }, createChart() {
      const ctx = document.getElementById('tvlChart').getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.historyTvl.historicalValues.map(item => new Date(item.date).toLocaleDateString()),
          datasets: [{
            label: 'Total Value Locked (TVL)',
            data: this.historyTvl.historicalValues.map(item => item.totalLiquidityUSD),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.5
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            },
            yAxes: [{
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return '$' + value.toLocaleString();
                }
              }
            }]
          }
        }
      });
    },
  },
  async created() {
    try {
      const response = await CryptoService.detailedCoinData(this.$route.params.name)
      this.coin = response.data
    } catch (error) {
      if (error.response.status === 403) {
        this.$router.push('/auth/login')
      } else {
        this.error = error.response.data.message
      }
    }
    try {
      const response = await CryptoService.coinHistory(this.$route.params.name)
      this.historyTvl = response.data
      this.createChart()
    } catch (error) {
      this.error = error.response.data.message
    }
  }

}
</script>

<style scoped>
@import '../output.css'
</style>
