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
                      optionValue="codigo" placeholder="Seleccione" id="Servicio"/>
                      <label for="Servicio">Horario</label>
                </span>
            </div>
            <div class="p-field-checkbox p-col-12">
                <Checkbox v-model="Politica" :binary="true" id="Politica" />
                <label for="Politica">He leído y acepto la <a @click="openPolitica()" href="#">política de tratamiento de datos personales</a></label>
            </div>
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
            openPolitica, closePolitica
        };
    },
}
</script>




