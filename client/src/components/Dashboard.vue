<template>
  <div class="flex min-h-screen w-full">
    <div class="grid w-full max-w-screen-xl gap-4 min-h-screen px-4 mx-auto md:px-6">
      <div class="flex flex-col gap-4">
        <header class="flex items-center justify-between h-16">
          <a class="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="http://localhost:8080/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span class="sr-only">Acme Inc</span>
            <span class="ml-2" v-if="user">
              {{ user.username }}
            </span>
          </a>
          <div class="flex gap-4" v-if="user">
            <button @click="signOut"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Sign Out
            </button>
            <stripe-buy-button v-if="!user.subscription.subscribed" buy-button-id="buy_btn_1OhSnaFGqGGHwrYIe8gQovPm"
              publishable-key="pk_test_51OazktFGqGGHwrYINdK1byvCH1BSFHmwjeudGEG1j4dITPruv70Ouwk94AR5ao8dbapmPp2hXLjrVcQh8hYWHBsl00tZT8yjSL">
            </stripe-buy-button>
            <button @click="unsubscribe"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-purple-200 text-purple-700 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              v-else>
              Unsubscribe
              <span
                class="bg-yellow-300 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 ml-3">
                TEST MODE
              </span>
            </button>
          </div>
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div class="grid gap-4">
            <div class="rounded-lg bg-card text-card-foreground shadow-sm border" data-v0-t="card" v-for="coin in coins"
              :key="coin._id" @click="goToCoinDetails(coin)">
              <div class="p-6 flex items-center gap-4">
                <div class="grid gap-1">
                  <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">{{ coin.name }}</h3>
                  <p class="text-sm text-muted-foreground">{{ coin.symbol }}</p>
                </div>
                <div class="ml-auto flex flex-col items-end">
                  <p class="text-sm font-medium">Price</p>
                  <p class="text-xl font-semibold">{{ coin.market_data.current_price }} $</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
import CryptoService from '@/services/CryptoService.js'
import StripeService from '@/services/StripeService.js'

export default {
  data () {
    return {
      coins: [],
      selectedCoin: null,
      user: null
    }
  },
  async created () {
    try {
      const userId = localStorage.getItem('userId')
      this.response = await AuthenticationService.getUser(userId)
      this.user = this.response.data
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
    try {
      const response = await CryptoService.coinData()
      this.coins = response.data
    } catch (error) {
      console.error('Failed to fetch coin data:', error)
    }
  },
  methods: {
    async signOut () {
      try {
        localStorage.removeItem('user')
        await AuthenticationService.logout()
        this.$router.push('/auth/login')
      } catch (error) {
        console.error('Failed to sign out:', error)
      }
    },
    async unsubscribe () {
      try {
        const response = await StripeService.cancelSubscription(this.user._id)
        if (response && response.status === 200) {
          this.$router.push('/dashboard')
        } else {
          console.log('response:', response.message)
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message
        } else {
          this.error = 'An error occurred while trying to unsubscribe.'
        }
      }
    },
    goToCoinDetails (coin) {
      this.$router.push({ name: 'coin', params: { name: coin.name } })
    }
  }
}
</script>

<style scoped>
@import '../output.css'
</style>
