<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
        <span class="p-float-label">
            <InputText id="Nombre" type="text" v-model="v$.Nombre.$model"></InputText>
            <label for="Nombre" :class="{'p-error':v$.Nombre.$invalid && submitted}">Nombre</label>
        </span>
        <small v-if="(v$.Nombre.$invalid && submitted) || v$.Nombre.$pending.$response" class="p-error">Por favor ingresa tu nombre</small>
      </div>

      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
        <span class="p-float-label">
            <InputText id="Apellidos" type="text" v-model="v$.Apellidos.$model"></InputText>
            <label for="Apellidos" :class="{'p-error':v$.Apellidos.$invalid && submitted}">Apellidos</label>
        </span>
        <small v-if="(v$.Apellidos.$invalid && submitted) || v$.Apellidos.$pending.$response" class="p-error">Por favor ingresa tus apellidos</small>
      </div>
    </div>

    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
        <span class="p-float-label">
            <InputText id="Edad" type="text" v-model="v$.Edad.$model"></InputText>
            <label for="Edad" :class="{'p-error':v$.Edad.$invalid && submitted}">Edad</label>
        </span>
        <small v-if="(v$.Edad.$invalid && submitted) || v$.Edad.$pending.$response" class="p-error">Por favor ingresa tu edad</small>
      </div>

      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
        <span class="p-float-label">
            <InputText id="Celular" type="text" v-model="v$.Celular.$model"></InputText>
            <label for="Celular" :class="{'p-error':v$.Celular.$invalid && submitted}">Celular</label>
        </span>
        <small v-if="(v$.Celular.$invalid && submitted) || v$.Celular.$pending.$response" class="p-error">Por favor ingresa tu número celular</small>
      </div>
    </div>

    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
          <span class="p-float-label">
                <Dropdown v-model="v$.Area.$model" :options="Areas" optionLabel="area"
                optionValue="codigo" id="Area"/>
                <label for="Area" :class="{'p-error':v$.Area.$invalid && submitted}">¿En qué área deseas servir?</label>
          </span>
          <small v-if="(v$.Area.$invalid && submitted) || v$.Area.$pending.$response" class="p-error">Por favor selecciona el área en la que deseas servir</small>
      </div>

      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
          <span class="p-float-label">
                <Textarea v-model="v$.Experiencia.$model" :autoResize="true" rows="2" cols="30" 
                id="Experiencia"/>
                <label for="Experiencia" :class="{'p-error':v$.Experiencia.$invalid && submitted}">¿Tienes alguna experiencia en esa área?</label>
          </span>
          <small v-if="(v$.Experiencia.$invalid && submitted) || v$.Experiencia.$pending.$response" class="p-error">Por favor cuéntanos la experiencia que has tenido en el área que seleccionaste</small>
      </div>
    </div>

    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
          <label for="MiRenuevo">¿Ya hiciste Mi Renuevo? </label>
          <Dropdown v-model="MiRenuevo" :options="optionsSiNo" optionLabel="label"
                optionValue="value" id="MiRenuevo"/>
      </div>

      <div class="p-field p-col-12 p-lg-6 p-md-6 ">
        <label for="Asistiendo" :class="{'p-error':v$.Asistiendo.$invalid && submitted}">¿Cuánto tiempo llevas asistiendo a El Renuevo?</label>
        <InputText id="Asistiendo" type="text" v-model="v$.Asistiendo.$model"></InputText>
        <small v-if="(v$.Asistiendo.$invalid && submitted) || v$.Asistiendo.$pending.$response" class="p-error">Por favor escribe cuánto tiempo llevas asistiendo a El Renuevo</small>
      </div>
    </div>

    <Button type="submit" label="Finalizar inscripción" />
  </form>


  <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
          <h5>¡Registro exitoso!</h5>
          <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
              {{msg}}
          </p>
      </div>
      <template #footer>
          <div class="p-d-flex p-jc-center">
              <Button label="OK" @click="toggleDialog" class="p-button-text" />
          </div>
      </template>
  </Dialog>


    <Dialog v-model:visible="showErrorMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i class="pi pi-times-circle" :style="{fontSize: '5rem', color: 'red' }"></i>
          <h5>Error</h5>
          <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
              {{ ErrorMessage }}
          </p>
      </div>
      <template #footer>
          <div class="p-d-flex p-jc-center">
              <Button label="OK" @click="closeErrorMessage" class="p-button-text" />
          </div>
      </template>
  </Dialog>
</template>

<script>
import { reactive, ref } from 'vue';
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from 'axios';
import {settings} from "@/settings";

export default {
    setup(){
      const state = reactive({
            Nombre: '',
            Apellidos: '',
            Edad: '',
            Celular: '',
            Area: null,
            Experiencia: '',
            Asistiendo: '',
        });

        const MiRenuevo = ref(0);

        const rules = {
            Nombre: {required},
            Apellidos: {required},
            Edad: {required},
            Celular: {required},
            Area: {required},
            Experiencia: {required},
            Asistiendo: {required},
        };

        const resetForm = () => {
            state.Nombre = '';
            state.Apellidos = '';
            state.Edad = '';
            state.Celular = '';
            state.Area = null;
            state.Experiencia = '';
            state.Asistiendo = '';
        };

        const submitted = ref(false);

        const msg = ref('');

        const showMessage = ref(false);

        const toggleDialog = () => {
            showMessage.value = !showMessage.value;
        
            if(!showMessage.value) {
                resetForm();
            }
        }

        const showErrorMessage = ref(false);
        const openErrorMessage = () => {
            showErrorMessage.value = 1;
        };
        const closeErrorMessage = () => {
            showErrorMessage.value = 0;
            resetForm();
        };
        const ErrorMessage = ref('');

        const handleSubmit = (isFormValid) => {
          submitted.value = true;
          if (!isFormValid) {
            return;
          }

          let request = {
            "nombre": state.Nombre,
            "apellidos": state.Apellidos,
            "edad": state.Edad,
            "celular": state.Celular,
            "area": parseInt(state.Area),
            "experiencia": state.Experiencia,
            "mi_renuevo": parseInt(MiRenuevo.value),
            "asistiendo": state.Asistiendo,
          }

          axios.post(settings.API_URL + 'servicio/store', request).then(response => {
                if(response.data.error == 1){
                    ErrorMessage.value = response.data.msg;
                    openErrorMessage();
                }
                else{
                  msg.value = response.data.msg;
                  toggleDialog();
                }
            }).catch(err => {
                err;
                console.log(err);
            });


        }


        const v$ = useVuelidate(rules,state);

        const Areas = ref([
          {'codigo': 1, 'area': 'Comunicaciones'},
          {'codigo': 2, 'area': 'Maquillaje'},
          {'codigo': 3, 'area': 'Grupos de conexión'},
          {'codigo': 4, 'area': 'Consolidación'},
          {'codigo': 5, 'area': 'Renuevo Kids'},
          {'codigo': 6, 'area': 'Música'},
          {'codigo': 7, 'area': 'Danzas'},
          {'codigo': 8, 'area': 'Oración'},
          {'codigo': 9, 'area': 'Staff'},
          {'codigo': 10, 'area': 'Misiones (obra social)'},
          {'codigo': 11, 'area': 'No lo sé'},
        ]);

        const optionsSiNo = ref([
            { label: 'Sí', value: 1},
            { label: 'No', value: 0},
        ]);

        


        return {submitted, handleSubmit, resetForm, v$, Areas, optionsSiNo, MiRenuevo, showErrorMessage,
        openErrorMessage, closeErrorMessage, ErrorMessage, msg, toggleDialog, showMessage}
    }
}
</script>

<style>

</style>