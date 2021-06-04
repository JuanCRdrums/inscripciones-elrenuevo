<template>
    <div class="p-grid">
            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Identificacion" type="text" v-model="Identificacion"></InputText>
                    <label for="Identificacion">Número de identificación</label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Nombre" type="text" v-model="Nombre"></InputText>
                    <label for="Nombre">Nombre completo</label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Telefono" type="text" v-model="Telefono"></InputText>
                    <label for="Telefono">Teléfono de contacto</label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <InputText id="Email" type="text" v-model="Email"></InputText>
                    <label for="Email">Correo electrónico</label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <Calendar id="Nacimiento" dateFormat="dd/mm/yy" :showIcon="true" v-model="Nacimiento"
                              monthNavigator="true" :yearNavigator="true" yearRange="1900:2021" />
                    <label for="Nacimiento">Fecha de nacimiento</label>
                </span>
            </div>

            <div class="p-field p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                     <Dropdown v-model="Servicio" :options="Servicios" optionLabel="servicio"
                      optionValue="codigo" id="Servicio"/>
                      <label for="Servicio">Horario</label>
                </span>
            </div>

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
                <Checkbox v-model="Politica" :binary="true" id="Politica" />
                <label for="Politica">He leído y acepto la <a @click="openPolitica()" href="#">política de tratamiento de datos personales</a></label>
            </div>
            <Button label="Finalizar inscripción" />
    </div>

    <PoliticaDatos></PoliticaDatos>
</template>




<script>
import { provide, ref } from 'vue';
import PoliticaDatos from './PoliticaDatos';

export default {

    components: {
        PoliticaDatos
    },
    setup(){
        const Identificacion = ref('');
        const Nombre = ref('');
        const Telefono = ref('');
        const Email = ref('');
        const Nacimiento = ref('');
        const Servicio = ref(0);
        const Politica = ref(false);
        const displayPolitica = ref(false);
        const optionsSiNo = ref([
            { label: 'Sí', value: 1},
            { label: 'No', value: 0},
        ]);
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
            {servicio: '8:15 am', codigo: 1},
            {servicio: '10:30 am', codigo: 2},
        ])

        return {
            Identificacion, Nombre, Telefono, Email, Nacimiento, Servicio, Servicios, Politica, displayPolitica, 
            openPolitica, closePolitica, Covid1, optionsSiNo, Covid2, Covid3, Covid4
        };
    },
}
</script>




