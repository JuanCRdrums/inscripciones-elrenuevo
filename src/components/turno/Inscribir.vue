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
            <div class="p-col-12 p-lg-6 p-md-6 ">
                <span class="p-float-label">
                    <Calendar id="Nacimiento" dateFormat="dd/mm/yy" :showIcon="true" v-model="Nacimiento"
                              monthNavigator="true" :yearNavigator="true" yearRange="1900:2021" />
                    <label for="Naciemiento">Fecha de nacimiento</label>
                </span>
            </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {

    setup(){
        const Identificacion = ref('');
        const Nombre = ref('');
        const Telefono = ref('');
        const Email = ref('');
        const Nacimiento = ref('');

        return {Identificacion, Nombre, Telefono, Email, Nacimiento};
    },
}
</script>




