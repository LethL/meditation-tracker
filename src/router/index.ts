import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import StatsPage from '@/pages/StatsPage.vue';
import MeditationTimerPage from '@/pages/MeditationTimerPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import { useAuthStore } from '@/store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/stats', name: 'stats', component: StatsPage },
    { path: '/timer/:id', name: 'timer', component: MeditationTimerPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/register', name: 'register', component: RegisterPage },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.name !== 'login' && to.name !== 'register' && !authStore.getToken) {
    return { name: 'login' };
  }
});

export default router;
