<template>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="p-grid">
            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="margin: auto">
                <label for="Identificacion">Ingresa tu número de identificación para consultar tu inscripción:</label>
                <InputText id="Identificacion" type="text" v-model="Identificacion" placeholder="Número de identificación"></InputText>
            </div>
            
        </div>
        <div class="p-grid">
            <div class="p-field p-col-12 p-lg-6 p-md-6 " style="margin: auto">
                <Button label="Consultar" @click="consultar()" />
            </div>
        </div>
        <br>
        <div v-if="displayInfo">
            <p>
                Persona, tu turno está registrado para el servicio de las 8:30 am. Recuerda llegar 15 minutos antes de la hora de 
                inicio para realizar el registro y el proceso de desinfección.
                Te pedimos que, en caso de no poder asistir, canceles tu inscripción como mínimo con 2 horas de anticipación. 
            </p>
            <div class="p-grid">
                <div class="p-field p-col-12 p-lg-6 p-md-6 " style="margin: auto">
                    <Button label="Cancelar inscripcion" class="p-button-danger" @click="confirmar()"/>
                </div>
            </div>
        </div>

        
    </div>
</template>


<script>
import { defineComponent, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default defineComponent( {

    setup(){

        const displayInfo = ref(false);
        const consultar = () => {
            displayInfo.value = true;
        }

        const Identificacion = ref('');

        const confirm = useConfirm();
        const toast = useToast();

        const confirmar = () => {
            confirm.require({
                message: '¿Estás seguro de que deseas cancelar la inscripción?',
                header: 'Cancelación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    toast.add({severity:'info', detail:'Inscripción cancelada', life: 3000});
                    displayInfo.value = false;
                },
                reject: () => {
                    toast.add({severity:'error', detail:'No se ha cancelado la inscripción', life: 3000});
                }
            });
        }

        return {displayInfo, consultar, confirmar, Identificacion};
    }
});
</script>





