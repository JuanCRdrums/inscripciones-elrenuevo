<template>
  <div>
      <h2>Activar/desactivar inscripciones</h2>
      <p>En este momento las inscripciones se encuentran {{textInactivo}}.</p>
      <Button label="Desactivar inscripciones" class="p-button-danger" v-if="inactivo == 0" @click="desactivar()"/>
      <Button label="Activar inscripciones" class="p-button-success" v-if="inactivo == 1" @click="activar()" />
      <Toast />
        <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue';
import axios from 'axios';
import {settings} from "@/settings";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
export default {
    setup(){

        const inactivo = ref();
        const textInactivo = computed(() => {
            if(inactivo.value == 1) return 'inactivas';
            else return 'activas';
        });

        onBeforeMount(() => {
            axios.get(settings.API_URL + 'opciones/inactivo').then(response => {
                        inactivo.value = response.data;
                    }).catch(err => {
                        err;
                        console.log(err);
                    });

            });

        const activar = () => {
            confirm.require({
                message: '¿Estás seguro de que deseas activar las inscripciones?',
                header: 'Confirmación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-success',
                accept: () => {
                    let body = {
                        'opcion': 'inactivo',
                        'valor': 0
                    }
                    axios.post(settings.API_URL + 'opciones/set', body).then(() => {
                        toast.add({severity:'info', detail:'Inscripciones activadas correctamente', life: 3000});
                        inactivo.value = 0;
                    }).catch(err => {
                        err;
                        console.log(err);
                    });
                },
                reject: () => {
                    toast.add({severity:'error', detail:'No se han activado las inscripciones', life: 3000});
                }
            });
            
        };
        

         const desactivar = () => {
            confirm.require({
                message: '¿Estás seguro de que deseas desactivar las inscripciones?',
                header: 'Confirmación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    let body = {
                        'opcion': 'inactivo',
                        'valor': 1
                    }
                    axios.post(settings.API_URL + 'opciones/set', body).then(() => {
                        toast.add({severity:'info', detail:'Inscripciones desactivadas correctamente', life: 3000});
                        inactivo.value = 1;
                    }).catch(err => {
                        err;
                        console.log(err);
                    });
                },
                reject: () => {
                    toast.add({severity:'error', detail:'No se han desactivado las inscripciones', life: 3000});
                }
            });
        };

        const confirm = useConfirm();
        const toast = useToast();

        return {inactivo, textInactivo, activar, desactivar};
    }
}
</script>

<style>

</style>