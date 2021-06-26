<template>
<div >
    <div v-if="!isAdminRoute && !isLoginRoute && inactivo == 0" class="p-fluid">
      <br/>
      <Avatar image="https://scontent.fpei1-1.fna.fbcdn.net/v/t31.18172-8/16836107_328292424233549_1527868727196000006_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=8wbATdjq-7EAX8GwaCw&_nc_ht=scontent.fpei1-1.fna&oh=e785be459f4d472c13d46581a85c822e&oe=60DB7B5F
      " shape="circle" size="xlarge" />
      <h5>¡Hola!</h5>

      <p>Bienvenido a la inscripción a nuestros servicios presenciales del <strong>{{Fecha}}</strong>. Selecciona lo que deseas hacer:</p>
      <div id="nav">
          <router-link to="/">Inscribirme</router-link> | 
          <router-link to="/consultar">Consultar o cancelar mi inscripción</router-link>
      </div>
      <router-view/>
    </div>

    <div v-if="!isAdminRoute && !isLoginRoute && inactivo == 1" class="p-fluid">
      <Avatar image="https://scontent.fpei1-1.fna.fbcdn.net/v/t31.18172-8/16836107_328292424233549_1527868727196000006_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=8wbATdjq-7EAX8GwaCw&_nc_ht=scontent.fpei1-1.fna&oh=e785be459f4d472c13d46581a85c822e&oe=60DB7B5F
      " shape="circle" size="xlarge" />
      <h5>¡Hola!</h5>

      <p>Bienvenido a la inscripción a nuestros servicios presenciales del <strong>{{Fecha}}</strong>. En este momento se encuentran desactivadas las inscripciones.</p>
    </div>


    <div v-if="isAdminRoute && !isLoginRoute" class="p-fluid-admin">
      <NavBar/>
      <router-view/>
    </div>

    <div v-if="isLoginRoute" class="p-fluid-admin">
      <router-view/>
    </div>

    
</div>
</template>

<script>
import {  onBeforeMount, onMounted, provide, ref, watch } from 'vue';
import axios from "axios";
import {settings} from "@/settings";
import { useRoute, useRouter } from 'vue-router';
import NavBar from '../components/admin/NavBar.vue';
export default {

  components:{
    NavBar
  },

  setup(){
    const Fecha = ref('');
    provide('Fecha', Fecha);

    const Route = useRoute();

    const Router = useRouter()

    const isAdminRoute = ref(false);

    const isLoginRoute = ref(false);

    onMounted(() => {
      axios.get(settings.API_URL + 'inscripciones/fechaActiva').then(response => {
                Fecha.value = response.data;
            }).catch(err => {
                err;
                console.log(err);
            });
    });


    const inactivo = ref(0);


    onBeforeMount(() => {
      axios.get(settings.API_URL + 'opciones/inactivo').then(response => {
                inactivo.value = response.data;
            }).catch(err => {
                err;
                console.log(err);
            });

    });

    watch(
      () => Route.name,
      async () => {
        isAdminRoute.value = Route.name.includes("Admin");
        isLoginRoute.value = Route.name.includes("Login");
      }
    )
    return {Fecha, Route, Router, isAdminRoute, isLoginRoute, inactivo};
  }
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #15B58F;
}
</style>