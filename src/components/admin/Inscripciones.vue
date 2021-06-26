<template>
  <div>
    <h2>Lista de inscritos {{Fecha}}</h2>
    <DataTable
      :value="Inscripciones"
      responsiveLayout="stack"
      breakpoint="960px"
      v-model:filters="filters1"
      filterDisplay="menu"
      :paginator="true"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rows="10"
      stripedRows
      :loading="loading" :resizableColumns="true"
    >


      <template #header>
        <div class="p-d-flex p-jc-between">
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters1['global'].value" placeholder="Buscar" />
            </span>
            <Button type="button" icon="pi pi-filter-slash" label="Limpiar filtro" class="p-button-outlined" @click="clearFilter1()" />
        </div>
      </template>

      <template #loading></template>

      <column header="Número de identificacion" field="cedula" sortable></column>
      <column header="Nombre" field="infoasistente.nombre" sortable></column>
      <column header="Correo electrónico" field="infoasistente.email" sortable></column>
      <column header="Teléfono de contacto" field="infoasistente.telefono" sortable></column>
      <column header="¿Nuevo?" field="nuevo" sortable>
        <template #body="slotProps">
          <div v-if="slotProps.data.nuevo == 1">Sí</div>
          <div v-else>No</div>
        </template>
      </column>
      <column header="Tipo de inscripción" sortable field="nino">
        <template #body="slotProps">
          <div v-if="slotProps.data.nino == 1">Niño</div>
          <div v-else>Adulto</div>
        </template>
      </column>
      <column header="Horario" sortable field="servicio">
        <template #body="slotProps">
          <div v-if="slotProps.data.servicio == 1">8:15 am</div>
          <div v-if="slotProps.data.servicio == 2">10:30 am</div>
        </template>
      </column>

      <column header="Asistencia" sortable field="asistencia">
        <template #body="slotProps">
          <ToggleButton v-model="slotProps.data.asistencia" onIcon="pi pi-check" offIcon="pi pi-times" @change="updateAsistencia(slotProps.data.id, slotProps.data.asistencia)"
          :style="getStyle(slotProps.data.asistencia)" v-tooltip.top="'Modificar asistencia'"/>
        </template>
      </column>

    </DataTable>
    <Toast />
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import axios from 'axios';
import {settings} from "@/settings";
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
export default {

  setup(){

    const Inscripciones = ref([]);
    const loading = ref(true);
    const Fecha = inject('Fecha');
    const filters1 = ref({
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
    const clearFilter1 = () => {
        filters1.value = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
    };

    const getInscripciones = () => {
      axios.get(settings.API_URL + 'inscripciones').then(response => {
                Inscripciones.value = response.data;
                loading.value = false;
            }).catch(err => {
                err;
                console.log(err);
            });
    };

    const toast = useToast();


    const updateAsistencia = (id,asistencia) => {
      let body = {
                'id': id,
                'asistencia': asistencia,
            };
            axios.post(settings.API_URL + 'inscripciones/asistencia', body).then(() => {
                toast.add({severity:'info', detail:'Asistencia modificada con éxito', life: 3000});
            }).catch(err => {
                err;
                console.log(err);
            });
    };

    const getStyle = (asistencia) => {

      if(asistencia){
        return "background-color: #4CAF50;";
      }
      else {
        return "background-color: #f44336;"
      }
    }

    onMounted(() => {
       getInscripciones()
    });

    return {Inscripciones, loading, Fecha, filters1, clearFilter1, getInscripciones, updateAsistencia, getStyle};

  }

};
</script>

<style>
</style>