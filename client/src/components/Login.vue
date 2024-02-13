<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
    <header class="p-4 bg-white dark:bg-gray-900">
      <a class="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="http://localhost:8080/">
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
          class="w-6 h-6 text-black dark:text-white"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        <span class="sr-only">Acme Inc</span>
      </a>
  </header>
    <main class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md space-y-6">
        <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white">Sign in to your account</h1>
        <form id="loginForm" class="space-y-4">
          <div class="space-y-1"><label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800 dark:text-gray-200"
              for="email">Email</label><input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email" required="" type="email" v-model="email" placeholder="Email"></div>
          <div class="space-y-1"><label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800 dark:text-gray-200"
              for="password">Password</label><input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password" required="" type="password" v-model="password" placeholder="Password"></div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2"><button type="button" role="checkbox" aria-checked="false"
                data-state="unchecked" value="on"
                class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="remember"></button><input aria-hidden="true" tabindex="-1" type="checkbox" value="on"
                style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0px; width: 16px; height: 16px;"><label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800 dark:text-gray-200"
                for="remember">Remember me</label></div><a class="text-sm underline text-gray-800 dark:text-gray-200"
              href="#">
              Forgot password?
            </a>
          </div>
          <button id="signInButton"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full border-2 border-gray-300 dark:border-gray-600 dark:text-white"
            type="button" @click="login">
            Sign in
          </button>
        </form>
        <p class="text-sm text-center text-gray-800 dark:text-gray-200">
          Don't have an account? <a class="underline text-gray-800 dark:text-gray-200"
            href="http://localhost:8080/auth/register">
            Sign up
          </a>
        </p>
      </div>
    </main>
    <footer class="p-4 bg-white dark:bg-gray-900">
      <nav class="flex items-center justify-center space-x-4"><a
          class="text-sm underline text-gray-800 dark:text-gray-200" href="#">
          Terms of Service
        </a><a class="text-sm underline text-gray-800 dark:text-gray-200" href="#">
          Privacy Policy
        </a><a class="text-sm underline text-gray-800 dark:text-gray-200" href="#">
          Contact
        </a></nav>
    </footer>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  data () {
    return {
      email: '',
      password: '',
      user_id: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        if (response.status === 200) {
          this.$router.push(`/dashboard`)
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
@import '../output.css'
</style>
