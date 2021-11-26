<template>
<div >
    <div v-if="!isAdminRoute && !isLoginRoute && !isServicioRoute && !isAniversarioRoute && inactivo == 0" class="p-fluid">
      <br/>
      <Avatar image="logo.png" shape="circle" size="xlarge" />
      <h5>¡Hola!</h5>

      <p>Bienvenido a la inscripción a nuestros servicios presenciales del <strong>{{Fecha}}</strong>. Selecciona lo que deseas hacer:</p>
      <div id="nav">
          <router-link to="/">Inscribirme</router-link> | 
          <router-link to="/consultar">Consultar o cancelar mi inscripción</router-link>
      </div>
      <router-view/>
    </div>

    <div v-if="isAniversarioRoute" class="p-fluid">
      <br/>
      <Avatar image="logo.png" shape="circle" size="xlarge" />
      <h5>¡Hola!</h5>

      <p>Bienvenido a la inscripción para los servicios de nuestro aniversario. Por favor proporciona los siguientes datos.</p>
      <router-view/>
    </div>

    <div v-if="!isAdminRoute && !isLoginRoute && !isServicioRoute && inactivo == 1" class="p-fluid">
      <Avatar image="logo.png" shape="circle" size="xlarge" />
      <h5>¡Hola!</h5>

      <p>Bienvenido a la inscripción a nuestros servicios presenciales del <strong>{{Fecha}}</strong>. En este momento se encuentran desactivadas las inscripciones.</p>
    </div>


    <div v-if="isAdminRoute && !isLoginRoute && !isServicioRoute" class="p-fluid-admin">
      <NavBar/>
      <router-view/>
    </div>

    <div v-if="isLoginRoute" class="p-fluid-admin">
      <router-view/>
    </div>

    <div v-if="isServicioRoute" class="p-fluid">
      <div class="p-fluid">
        <Avatar image="logo.png" shape="circle" size="xlarge" />
      </div>
      
      <br><br><br><br>
      <div class="p-grid">
        <div class="p-col-12 p-md-6 p-lg-6">
          <img src="foto-servicio.jpg" alt="" width="259.8">
        </div>
        <div class="p-col-12 p-md-6 p-lg-6">
          <br><br><br><h4>¡Hola!</h4><br><br>
          <p>
            Gracias por disponer tu corazón y tu tiempo para servir a Dios y a quienes él puso a tu alrededor. 
          </p><br><br>
          <p>
            Somos la iglesia y estamos felices de seguir construyendo juntos el plan de Dios para que su amor se siga anunciando en cada rincón del mundo y por todas las generaciones.
          </p>
        </div>
      </div>
      <br><br>
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

    const isServicioRoute = ref(false);

    const isAniversarioRoute = ref(false);

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
        isServicioRoute.value = Route.name.includes("Servicio");
        isAniversarioRoute.value = Route.name.includes("Aniversario");
      }
    )
    return {Fecha, Route, Router, isAdminRoute, isLoginRoute, inactivo, isServicioRoute, isAniversarioRoute};
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