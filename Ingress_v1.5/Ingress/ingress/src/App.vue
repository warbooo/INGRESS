<template>
  <div id="app">
    <nav v-if="isLoggedIn">
      <span>欢迎, {{ username }} ({{ userType }})</span>
      <button @click="logout">退出登录</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      username: '',
      userType: ''
    }
  },
  created() {
    // 检查登录状态
    const username = localStorage.getItem('username')
    const userType = localStorage.getItem('userType')
    if (username && userType) {
      this.isLoggedIn = true
      this.username = username
      this.userType = userType
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('username')
      localStorage.removeItem('userType')
      this.isLoggedIn = false
      this.username = ''
      this.userType = ''
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}

nav {
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

nav button:hover {
  background-color: #c82333;
}
</style>
