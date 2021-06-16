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
                {{Nombre}}, tu inscripción está registrada para el servicio de las {{ Servicio }}. Recuerda llegar 15 minutos antes de la hora de 
                inicio para realizar el registro y el proceso de desinfección.
                Te pedimos que, en caso de no poder asistir, canceles tu inscripción como mínimo con 2 horas de anticipación. 
            </p>
            <div class="p-grid">
                <div class="p-field p-col-12 p-lg-6 p-md-6 " style="margin: auto">
                    <Button label="Cancelar inscripcion" class="p-button-danger" @click="confirmar()"/>
                </div>
            </div>
        </div>

        <div v-if="displayNoInfo">
            <p>
                No tienes una inscripción registrada para este domingo. Nos encantaría verte, así que te invitamos a que te inscribas.
            </p>
        </div>

        
    </div>
</template>


<script>
import { defineComponent, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import {settings} from "@/settings";

export default defineComponent( {

    setup(){

        const displayInfo = ref(false);
        const displayNoInfo = ref(false);
        const consultar = () => {
            let body = {
                'cedula': Identificacion.value
            }
            axios.post(settings.API_URL + 'inscripciones/consultar', body).then(response => {
                if(response.data[0]){
                    Nombre.value = response.data[0].infoasistente.nombre;
                    Servicio.value = Servicios.value[response.data[0].servicio - 1];
                    IdInscripcion.value = response.data[0].id;
                    displayInfo.value = true;
                    displayNoInfo.value = false;
                }
                else
                {
                    displayNoInfo.value = true;
                    displayInfo.value = false;
                }
            }).catch(err => {
                err;
                console.log(err);
            });
            
        }

        const Identificacion = ref('');
        const Nombre = ref('');
        const IdInscripcion = ref(0);
        

        const confirm = useConfirm();
        const toast = useToast();

        const Servicios = ref([
            '8:15 am', '10:30 am'
        ]);
        const Servicio = ref('');


        const confirmar = () => {
            confirm.require({
                message: '¿Estás seguro de que deseas cancelar la inscripción?',
                header: 'Cancelación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    let body = {
                        'id': IdInscripcion.value
                    }
                    axios.post(settings.API_URL + 'inscripciones/cancelar', body).then(() => {
                        toast.add({severity:'info', detail:'Tu inscripción se ha cancelado correctamente', life: 3000});
                        displayInfo.value = false;
                    }).catch(err => {
                        err;
                        console.log(err);
                    });
                },
                reject: () => {
                    toast.add({severity:'error', detail:'No se ha cancelado tu inscripción', life: 3000});
                }
            });
        }

        return {displayInfo, consultar, confirmar, Identificacion, Nombre, Servicios, Servicio, displayNoInfo, IdInscripcion};
    }
});
</script>





