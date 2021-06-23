import { createRouter, createWebHistory } from "vue-router";
import Inscribir from "./components/turno/Inscribir.vue";
import ConsultarCancelar from "./components/turno/ConsultarCancelar.vue"
import Inscripciones from "./components/admin/Inscripciones.vue"
import Asistentes from "./components/admin/Asistentes.vue"
import Login from "./components/auth/Login.vue"
import Logout from "./components/auth/Logout.vue"

const routes = [
  {
    path:'/',
    component: Inscribir,
    name: 'Inscribir'
  },
  {
    path:'/consultar',
    component: ConsultarCancelar,
    name: 'Consultar'
  },
  {
    path:'/admin/inscripciones',
    component: Inscripciones,
    name: 'AdminInscripciones'
  },
  {
    path:'/admin/asistentes',
    component: Asistentes,
    name: 'AdminAsistentes'
  },
  {
    path:'/admin',
    component: Login,
    name: 'Login'
  },
  {
    path:'/admin/logout',
    component: Logout,
    name: 'Logout'
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    
  const publicPages = ['/admin','/','/consultar'];
  const authRequired = !publicPages.includes(to.path);
  const isAdmin = to.path == '/admin';
  const api_key = localStorage.getItem('api_key');
  console.log(isAdmin);
  if(api_key && isAdmin){
    next('/admin/inscripciones');
  }
  
  if(!api_key && authRequired){
    next('/admin');
  }
  else
  {
    next();
  }

});

export default router;