import { createRouter, createWebHistory } from "vue-router";
import Inicio from "./components/turno/Inicio.vue"

const routes = [
  {
    path:'/',
    component: Inicio,
    name: 'Inicio'
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});