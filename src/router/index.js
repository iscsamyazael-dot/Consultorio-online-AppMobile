import { createRouter, createWebHistory } from '@ionic/vue-router';
import AppTabs from '../components/AppTabs.vue';
const routes = [
  { path: '/', redirect: '/splash' },
  { path: '/splash', component: () => import('../views/SplashView.vue')},
  { path: '/sin-internet', component: () => import('../views/SinInternetView.vue')},
  { path: '/login', component: () => import('../views/LoginView.vue')},
  {
    path: '/',
    component: AppTabs, // El layout envolvente
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: () => import('../views/DashboardAgenda.vue'),meta: { requiresAuth: true } },
      { path: 'agenda', component: () => import('../views/AgendaView.vue'),meta: { requiresAuth: true } },
      { path: 'detalle-cita', name:'DetalleCita', component: () => import('../views/DetalleCitaView.vue'),meta: { requiresAuth: true } },
      { path: 'historial-citas',name:'HistorialCitas',component: () => import('../views/HistorialCitasView.vue'),meta: { requiresAuth: true } },
      { path: 'notificaciones', component: () => import('../views/NotificacionesView.vue'),meta: { requiresAuth: true } },
      { path: 'perfil', component: () => import('../views/PerfilMedicoView.vue'),meta: { requiresAuth: true }},
      { path: 'configuracion', component: () => import('../views/ConfiguracionView.vue'),meta: { requiresAuth: true }},
      { path: 'cambiar-password', component: () => import('../views/CambiarPasswordView.vue'),meta: { requiresAuth: true }},
      
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // Si la ruta requiere auth y NO hay token, redirige al login
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } 
  // Si el usuario ya está logueado y quiere ir al login, envíalo al dashboard
  else if (to.path === '/login' && token) {
    next('/dashboard');
  } 
  // En cualquier otro caso, déjalo pasar
  else {
    next();
  }
});

export default router;