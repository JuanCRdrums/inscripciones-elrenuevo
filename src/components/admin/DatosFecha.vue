<template>
  <div>
    <h2>Datos por fecha</h2>
    <form>
      <div class="p-grid">
          <div class="p-field p-col-12 p-lg-6">
            <label for="Fecha">Fecha</label>
            <Calendar id="Fecha" dateFormat="dd/mm/yy" :showIcon="true" v-model="Fecha"
                        :monthNavigator="true" />
          </div>
          <div class="p-field p-col-12 p-lg-6">
            <label for="Servicio">Servicio</label>
            <Dropdown v-model="Servicio" :options="Servicios" optionLabel="servicio"
                      optionValue="codigo" id="Servicio"/>
          </div>
          <div class="p-field p-col-12">
              <Button label="Buscar" @click="getInscripciones()" />
          </div>
      </div>
    </form>
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

      <column header="Edad" sortable field="infoasistente.edad">
        <template #body="slotProps">
          {{ slotProps.data.infoasistente.edad }} años
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
          <div v-if="slotProps.data.asistencia == 0">No</div>
          <div v-if="slotProps.data.asistencia == 1">Sí</div>
        </template>
      </column>

    </DataTable>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import {settings} from "@/settings";
import { FilterMatchMode } from 'primevue/api';
export default {

  setup(){

    const Inscripciones = ref([]);
    const loading = ref(false);
    const Fecha = ref(null);
    const Servicio = ref(0);
    const Servicios = ref([
            {servicio: '8:15 am', codigo: 1},
            {servicio: '10:30 am', codigo: 2},
        ]);
    
  
    const filters1 = ref({
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
    const clearFilter1 = () => {
        filters1.value = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
    };

    const getInscripciones = () => {
        loading.value = true;
        let body = {
            'fecha' : Fecha.value,
            'servicio': Servicio.value,
        }
      axios.post(settings.API_URL + 'inscripciones/asistenciaFecha', body).then(response => {
                Inscripciones.value = response.data;
                loading.value = false;
            }).catch(err => {
                err;
                console.log(err);
            });
    };



    return {Inscripciones, loading, Fecha, filters1, clearFilter1, getInscripciones, Servicio, Servicios,
    };

  }

};
</script>

<style>
</style>