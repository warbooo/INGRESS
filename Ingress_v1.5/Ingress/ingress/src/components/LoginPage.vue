<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名:</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required
        >
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
        >
      </div>
      <div class="form-group">
        <label for="userType">用户类型:</label>
        <select id="userType" v-model="userType">
          <option value="admin">管理员</option>
          <option value="user">普通用户</option>
          <option value="guest">访客</option>
        </select>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      userType: 'user' // 默认选择普通用户
    }
  },
  methods: {
    handleLogin() {
      // 模拟登录验证
      localStorage.setItem('userType', this.userType);
      localStorage.setItem('username', this.username);

      // 根据用户类型跳转到不同的页面
      switch (this.userType) {
        case 'admin':
          this.$router.push('/admin-dashboard');
          break;
        case 'user':
          this.$router.push('/game'); // 跳转到 game.vue
          break;
        case 'guest':
          this.$router.push('/guest-dashboard');
          break;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
