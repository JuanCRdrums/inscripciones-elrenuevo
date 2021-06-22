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
                label: 'Inscripciones',
                to: '/admin/inscripciones'
            },
            {
                label: 'Histórico de asistentes',
                to: '/admin/asistentes'
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