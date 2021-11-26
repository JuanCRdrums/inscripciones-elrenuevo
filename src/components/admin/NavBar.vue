<template>
  <div>
        <Menubar :model="items">
            <template #start>
                <h4>El Renuevo</h4>
            </template>
        </Menubar>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {

    setup(){
        const items= ref([
            {
                label: 'Aniversario',
                to: '/admin/aniversario'
            },
            {
                label: 'Inscripciones',
                to: '/admin/inscripciones'
            },
            {
                label: 'Histórico de asistentes',
                to: '/admin/asistentes'
            },
            {
                label: 'Datos por fecha',
                to: '/admin/datosFecha'
            },
            {
                label: 'Activar/Desactivar inscripciones',
                to: '/admin/activardesactivar'
            },
            {
                label: 'Convocatoria de servicio',
                to: '/admin/servicio'
            },
            {
                label: 'Salir',
                to: '/admin/logout'
            },

        ]);

        return {items};
    }
}
</script>

<style>

</style>