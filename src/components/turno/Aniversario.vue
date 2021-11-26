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

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Email" type="text" v-model="v$.Email.$model"></InputText>
                    <label for="Email" :class="{'p-error':v$.Email.$invalid && submitted}">Correo electrónico</label>
                </span>
                <small v-if="(v$.Email.$invalid && submitted) || v$.Email.$pending.$response" class="p-error">Por favor ingresa un correo electrónico válido</small>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <Calendar id="Nacimiento" dateFormat="dd/mm/yy" :showIcon="true" v-model="v$.Nacimiento.$model"
                              monthNavigator="true" :yearNavigator="true" yearRange="1900:2021" />
                    <label for="Nacimiento" :class="{'p-error':v$.Nacimiento.$invalid && submitted}">Fecha de nacimiento </label>
                </span>
                <small v-if="(v$.Nacimiento.$invalid && submitted) || v$.Nacimiento.$pending.$response" class="p-error">Por favor ingresa tu fecha de nacimiento. </small>
                <small v-if="(!v$.Nacimiento.$invalid && !submitted) || !v$.Nacimiento.$pending.$response">No olvides verificar el año</small>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                     <Dropdown v-model="v$.Servicio.$model" :options="Servicios" optionLabel="servicio"
                      optionValue="codigo" id="Servicio"/>
                      <label for="Servicio" :class="{'p-error':v$.Servicio.$invalid && submitted}">Día</label>
                </span>
                <small v-if="(v$.Servicio.$invalid && submitted) || v$.Servicio.$pending.$response" class="p-error">Por favor selecciona el horario al que quieres asistir</small>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <label for="Covid3">¿Es la primera vez que asistes a una de nuestras reuniones? </label>
                <Dropdown v-model="Nuevo" :options="optionsSiNo" optionLabel="label"
                      optionValue="value" placeholder="Seleccione" id="Covid3"/>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left"></div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <label for="Covid1">¿Has estado en contacto estrecho (cercano), sin usar elementos de
                protección, por más de 15 minutos con una persona con diagnóstico
                confirmado de COVID-19 o has estado compartiendo el mismo lugar por
                más de 120 minutos con una persona con diagnóstico confirmado de
                COVID-19?</label>
                <Dropdown v-model="Covid1" :options="optionsSiNo" optionLabel="label"
                      optionValue="value" placeholder="Seleccione" id="Covid2"/>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <label>¿Has presentado alguno de estos síntomas en los últimos 14 días?
                    (Marca solo los que hayas presentado)</label><br>
                <Checkbox value="1" v-model="Covid2" /> Fiebre de 38°C o más <br>
                <Checkbox value="2" v-model="Covid2" /> Dificultad para respirar <br>
                <Checkbox value="3" v-model="Covid2" /> Dolor de garganta <br>
                <Checkbox value="4" v-model="Covid2" /> Tos <br>
                <Checkbox value="5" v-model="Covid2" /> Fatiga o decaimiento <br>
                <Checkbox value="6" v-model="Covid2" /> Disminución del sentido del gusto <br>
                <Checkbox value="7" v-model="Covid2" /> Disminución del sentido del Olfato <br>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <label for="Covid3">¿Has estado fuera del País o con personas procedentes del 
                    extranjero en los últimos 14 días? </label>
                <Dropdown v-model="Covid3" :options="optionsSiNo" optionLabel="label"
                      optionValue="value" placeholder="Seleccione" id="Covid3"/>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="text-align:left">
                <label for="Covid4">¿Actualmente te encuentras en aislamiento y/o en espera del resultado de
                    una prueba de diagnóstico para Covid-19 (Diferente a Tamización)?</label>
                <Dropdown v-model="Covid4" :options="optionsSiNo" optionLabel="label"
                      optionValue="value" placeholder="Seleccione" id="Covid3"/>
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
                    Gracias por inscribirte, {{ state.Nombre }}. Has quedado registrado/a para el servicio de las {{ labelServicio(state.Servicio) }}.
                    Recuerda llegar 15 minutos antes de la hora de inicio para realizar el registro y el proceso de desinfección.
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
import { email, required } from "@vuelidate/validators";
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
        const Nuevo = ref(0);
        const Covid1 = ref(0);
        const Covid2 = ref([]);
        const Covid3 = ref(0);
        const Covid4 = ref(0);
        const openPolitica = () => {
            displayPolitica.value = true;
        };
        const closePolitica = () => {
            displayPolitica.value = false;
        };
        provide('displayPolitica', displayPolitica);
        provide('closePolitica', closePolitica);

        const Servicios = ref([
            {servicio: 'Sábado', codigo: 1},
            {servicio: 'Domingo', codigo: 2},
            {servicio: 'Ambos', codigo: 3}
        ]);

        const state = reactive({
            Identificacion: '',
            Nombre: '',
            Telefono: '',
            Email: '',
            Nacimiento: null,
            Servicio: null,
            Politica: null,
        });

        const rules = {
            Identificacion: {required},
            Nombre: {required},
            Telefono: {required},
            Email: {required, email},
            Nacimiento: {required},
            Servicio: {required},
            Politica: {required},
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
                    state.Email = response.data[0].email;
                    state.Nacimiento = new Date(response.data[0].nacimiento);
                    state.Nacimiento.setDate(new Date(response.data[0].nacimiento).getDate()); //no sé por qué se restaba un día, entones toca sumarle 1
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
                'email': state.Email,
                'nacimiento': state.Nacimiento,
                'servicio': state.Servicio,
                'covid1': Covid1.value,
                'covid2': Covid2.value,
                'covid3': Covid3.value,
                'covid4': Covid4.value,
                'nuevo': Nuevo.value
            };
            axios.post(settings.API_URL + 'aniversario/store', body).then(response => {
                console.log(response.data);
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

        const labelServicio = (code) => {
            for(var i = 0; i < Servicios.value.length; i++)
            {
                if(Servicios.value[i].codigo === code){
                    return Servicios.value[i].servicio;
                }
            }
        };

        return {
            Servicios, displayPolitica, openPolitica, closePolitica, Covid1, optionsSiNo, Covid2, Covid3, Covid4, state,
            v$, handleSubmit, submitted, showMessage, toggleDialog, resetForm, labelServicio, showErrorMessage, openErrorMessage,
            closeErrorMessage, ErrorMessage, buscarDatos, Nuevo
        };
    },
}
</script>




