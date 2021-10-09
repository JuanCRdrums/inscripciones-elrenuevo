import { createRouter, createWebHistory } from "vue-router";
import Inscribir from "./components/turno/Inscribir.vue";
import ConsultarCancelar from "./components/turno/ConsultarCancelar.vue"
import Inscripciones from "./components/admin/Inscripciones.vue"
import DatosFecha from "./components/admin/DatosFecha.vue"
import Asistentes from "./components/admin/Asistentes.vue"
import ActivarDesactivar from "./components/admin/ActivarDesactivar.vue"
import Login from "./components/auth/Login.vue"
import Logout from "./components/auth/Logout.vue"
import Servicio from "./components/servicio/Servicio.vue" 
import Convocatoria from "./components/admin/Convocatoria.vue" 

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
    path:'/admin/datosFecha',
    component: DatosFecha,
    name: 'AdminDatosFecha'
  },
  {
    path:'/admin/activardesactivar',
    component: ActivarDesactivar,
    name: 'AdminActivarDesactivar'
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
  {
    path:'/servicio',
    component: Servicio,
    name: 'Servicio'
  },
  {
    path:'/admin/servicio',
    component: Convocatoria,
    name: 'AdminConvocatoria'
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