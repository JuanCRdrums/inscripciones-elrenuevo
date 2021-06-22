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
            }
        ]);

        return {items};
    }
}
</script>

<style>

</style>