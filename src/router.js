import { createRouter, createWebHistory } from "vue-router";
import Turno from "./components/turno/Turno.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: Turno, name: 'Turno' }]
});