import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import GameView from '../components/Game.vue'; // 确保大小写一致

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, userType: 'admin' },
  },
  {
    path: '/game',
    name: 'Game', // 这里可以保留为 Game
    component: GameView, // 使用更新后的名称
    meta: { requiresAuth: true, userType: 'user' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userType'); // 根据实际情况判断用户是否已登录
  const userType = localStorage.getItem('userType');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else if (to.meta.userType && to.meta.userType !== userType) {
    next('/'); // 根据用户类型重定向
  } else {
    next();
  }
});

export default router;
