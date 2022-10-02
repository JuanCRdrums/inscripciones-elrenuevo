<template>
<form @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-grid">
            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Identificacion" type="text" v-model="v$.Identificacion.$model" @change="buscarDatos(v$.Identificacion.$model)"></InputText>
                    <label for="Identificacion" :class="{'p-error':v$.Identificacion.$invalid && submitted}">Número de identificación</label>
                </span>
                <small v-if="(v$.Identificacion.$invalid && submitted) || v$.Identificacion.$pending.$response" class="p-error">Por favor ingresa tu número de identificación</small>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Nombre" type="text" v-model="v$.Nombre.$model"></InputText>
                    <label for="Nombre" :class="{'p-error':v$.Nombre.$invalid && submitted}">Nombre completo</label>
                </span>
                <small v-if="(v$.Nombre.$invalid && submitted) || v$.Nombre.$pending.$response" class="p-error">Por favor ingresa tu nombre</small>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Telefono" type="text" v-model="v$.Telefono.$model"></InputText>
                    <label for="Telefono" :class="{'p-error':v$.Telefono.$invalid && submitted}">Teléfono de contacto</label>
                </span>
                <small v-if="(v$.Telefono.$invalid && submitted) || v$.Telefono.$pending.$response" class="p-error">Por favor ingresa tu número de teléfono</small>
            </div>


            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <span class="p-float-label">
                    
                    <Dropdown v-model="Nino" :options="optionsNino" optionLabel="label"
                      optionValue="value" id="Nino"/>
                    <label for="Nino">Te consideras: </label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <span class="p-float-label">
                    <Textarea id="Observaciones" type="text" v-model="Observaciones"></Textarea>
                    <label for="Observaciones">¿Tienes alguna observación extra que debamos saber?</label>
                </span>
            </div>

            

            <div class="p-field-checkbox p-col-12">
                <Checkbox v-model="v$.Politica.$model" :binary="true" id="Politica" />
                <label for="Politica" :class="{'p-error':v$.Politica.$invalid && submitted}">He leído y acepto la <a @click="openPolitica()" href="#">política de tratamiento de datos personales</a></label>
            </div>
            <Button type="submit" label="Finalizar inscripción" />
    </div>
</form>
    <PoliticaDatos></PoliticaDatos>



    <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
            <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>¡Registro exitoso!</h5>
                <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                    Gracias por inscribirte, {{ state.Nombre }}.
                    Te pedimos que, en caso de no poder asistir, canceles tu inscripción como mínimo con 2 horas de anticipación.
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
import { provide, reactive, ref } from 'vue';
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import PoliticaDatos from './PoliticaDatos';
import axios from "axios";
import {settings} from "@/settings";

export default {

    components: {
        PoliticaDatos
    },
    setup(){



        const displayPolitica = ref(false);
        const optionsSiNo = ref([
            { label: 'Sí', value: 1},
            { label: 'No', value: 0},
        ]);
        const optionsNino = ref([
            { label: 'Adulto', value: 2},
            { label: 'Niño', value: 1},
        ]);
        const Nino = ref(2);
        const Observaciones = ref("");
        const openPolitica = () => {
            displayPolitica.value = true;
        };
        const closePolitica = () => {
            displayPolitica.value = false;
        };
        provide('displayPolitica', displayPolitica);
        provide('closePolitica', closePolitica);


        const state = reactive({
            Identificacion: '',
            Nombre: '',
            Telefono: '',
            Politica: null,
        });

        const rules = {
            Identificacion: {required},
            Nombre: {required},
            Telefono: {required},
            Politica: {required}
        };

        const submitted = ref(false);
        const showMessage = ref(false);
        const showErrorMessage = ref(false);
        const openErrorMessage = () => {
            showErrorMessage.value = 1;
        };
        const closeErrorMessage = () => {
            showErrorMessage.value = 0;
            resetForm();
        };
        const ErrorMessage = ref('');

        const buscarDatos = (cedula) => {
            let body = {
                'cedula': cedula,
            }
            axios.post(settings.API_URL + 'inscripciones/datosAsistente', body).then(response => {
                if(response.data.length != 0){
                    resetForm();
                    state.Identificacion = response.data[0].cedula;
                    state.Nombre = response.data[0].nombre;
                    state.Telefono = response.data[0].telefono;
                    console.log(response.data);
                }
            }).catch(err => {
                err;
                console.log(err);
            });
        };




        const handleSubmit = (isFormValid) => {
            submitted.value = true;
            
            if (!isFormValid) {
                return;
            }

            let body = {
                'cedula': state.Identificacion,
                'nombre': state.Nombre,
                'telefono': state.Telefono,
                'nino': Nino.value == 2 ? 0 : Nino.value,
                'observaciones': Observaciones.value
            };
            axios.post(settings.API_URL + 'inscripciones/store', body).then(response => {
                if(response.data.error == 1){
                    ErrorMessage.value = response.data.msg;
                    openErrorMessage();
                }
                else{
                    toggleDialog();
                }
            }).catch(err => {
                err;
                console.log(err);
            });
        }

        const toggleDialog = () => {
            showMessage.value = !showMessage.value;
        
            if(!showMessage.value) {
                resetForm();
            }
        }

        const resetForm = () => {
            state.Identificacion = '';
            state.Nombre = '';
            state.Telefono = '';
            state.Email = '';
            state.Nacimiento = '';
            state.Servicio = null;
            state.Politica = null;
        };

        const v$ = useVuelidate(rules,state);


        return {
            displayPolitica, openPolitica, closePolitica, optionsSiNo, state,
            v$, handleSubmit, submitted, showMessage, toggleDialog, resetForm, showErrorMessage, openErrorMessage,
            closeErrorMessage, ErrorMessage, buscarDatos, optionsNino, Nino, Observaciones
        };
    },
}
</script>




