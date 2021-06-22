import { createRouter, createWebHistory } from "vue-router";
import Inscribir from "./components/turno/Inscribir.vue";
import ConsultarCancelar from "./components/turno/ConsultarCancelar.vue"
import Inscripciones from "./components/admin/Inscripciones.vue"
import Asistentes from "./components/admin/Asistentes.vue"

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});