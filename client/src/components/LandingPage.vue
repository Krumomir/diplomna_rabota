<template>
   <main class="flex flex-col items-center justify-center w-full">
        <section class="w-full py-12 bg-gray-900 text-white flex justify-center">
            <div class="container px-4 md:px-6">
                <div class="flex flex-col items-center text-center">
                    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                        Welcome to Crypto Investments
                    </h1>
                    <p class="max-w-[600px] text-lg mt-4">
                        Your one-stop solution for investing in the future of finance.
                    </p>
                </div>
            </div>
        </section>
        <section class="w-full py-12 flex justify-center">
            <div class="container px-4 md:px-6">
                <div class="grid gap-6 md:grid-cols-3">
                    <div class="flex flex-col items-center text-center"><svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mb-4">
                            <line x1="12" x2="12" y1="2" y2="22"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <h2 class="text-2xl font-bold">Why Invest in Crypto</h2>
                        <p class="max-w-[200px] mt-4">
                            Cryptocurrencies offer potential high returns and a new way to diversify your investment
                            portfolio.
                        </p>
                    </div>
                    <div class="flex flex-col items-center text-center"><svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mb-4">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <h2 class="text-2xl font-bold">Our Services</h2>
                        <p class="max-w-[200px] mt-4">
                            We provide portfolio management and educational resources to help you navigate the crypto
                            market.
                        </p>
                    </div>
                    <div class="flex flex-col items-center text-center"><svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mb-4">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                        <h2 class="text-2xl font-bold">Get Started</h2>
                        <p class="max-w-[200px] mt-4">
                            Ready to dive in? Sign up today and start investing in the future of finance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full py-12 bg-gray-100 flex justify-center">
            <div class="container px-4 md:px-6 flex flex-col items-center text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p class="max-w-[600px] text-lg mb-8">
                    Join us today and start your journey in crypto investing.
                </p><a
                    class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="http://localhost:8080/auth/login">
                    Sign In
                </a>
            </div>
        </section>
    </main>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../output.css'
</style>
