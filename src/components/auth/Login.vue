<template>
    <br />
    <div class="p-fluid">

        <h2 class="p-mt-4">El Renuevo</h2>
        <h5>Inscripciones</h5>


        <h5 class="p-mt-6">
            Iniciar Sesión
        </h5>

        <form v-on:submit.prevent="handleLogin">

            <div class="p-grid p-jc-center p-mt-4">
                <div class="p-field p-col-12 p-sm-6 p-md-6 p-lg-4">
                    <label for="userName">Usuario</label>
                    <InputText id="userName" name="userName" v-model="model.userName" type="text" />
                </div>
            </div>
            <div class="p-grid p-jc-center">
                <div class="p-field p-col-12 p-sm-6 p-md-6 p-lg-4">
                    <label for="password">Contraseña</label>
                    <InputText id="password" name="password" v-model="model.password" type="password" />
                </div>
            </div>

            <div class="p-grid p-jc-center">
                <div class="p-col-12 p-sm-6 p-md-6 p-lg-4">
                    <Button type="submit" label="Entrar" class="box" />
                </div>
            </div>

        </form>

    </div>

    
</template>

<script>
import { reactive } from "vue";
import authService from '@/hooks/auth/authService.js';
export default {
        name: 'Login',
        
        setup() {
            const AuthService = new authService();
            const model = reactive({ userName: "", password: "" });
            function handleLogin() {
                AuthService.login(model.userName,model.password);
            }
            return {
                model, handleLogin
            }
        },
        data() {
            return {
                userName: null,
                password: null
            };
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>