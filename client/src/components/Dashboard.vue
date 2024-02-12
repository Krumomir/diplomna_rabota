<template>
    <div class="flex min-h-screen w-full">
        <div class="grid w-full max-w-screen-xl gap-4 min-h-screen px-4 mx-auto md:px-6">
            <div class="flex flex-col gap-4">
                <header class="flex items-center h-16">
                    <a class="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="w-6 h-6"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        <span class="sr-only">Acme Inc</span>
                    </a>
                    <nav class="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
                        <a class="text-gray-500 dark:text-gray-400" href="#">
                            All Projects
                        </a>
                        <a class="text-gray-500 dark:text-gray-400" href="#">
                            Top Gainers
                        </a>
                        <a class="text-gray-500 dark:text-gray-400" href="#">
                            Top Losers
                        </a>
                        <a class="text-gray-500 dark:text-gray-400" href="#">
                            Favorites
                        </a>
                    </nav>
                </header>
                <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                    <div class="grid gap-4">
                        <div class="rounded-lg bg-card text-card-foreground shadow-sm border" data-v0-t="card"
                            v-for="coin in coins" :key="coin._id">
                            <div class="p-6 flex items-center gap-4">
                                <div class="grid gap-1">
                                    <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">{{
                                        coin.name }}</h3>
                                    <p class="text-sm text-muted-foreground">{{ coin.symbol }}</p>
                                </div>
                                <div class="ml-auto flex flex-col items-end">
                                    <p class="text-sm font-medium">Price</p>
                                    <p class="text-xl font-semibold">{{ coin.market_data.current_price }}</p>
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
export default {
  data () {
    return {
      coins: []
    }
  },
  async created () {
    const response = await fetch('http://localhost:8081/coingecko/coins')
    const data = await response.json()
    this.coins = data
  }
}
</script>

<style scoped>
@import '../output.css'
</style>
