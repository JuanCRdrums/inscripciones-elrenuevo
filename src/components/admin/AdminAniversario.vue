<template>
  <div>
    <h2>Lista de inscritos - Aniversario</h2>
    <div class="p-grid">
      <div class="p-field p-col-12 p-lg-6">
          <label for="Servicio">Servicio: </label>
          <Dropdown v-model="Servicio" :options="Servicios" optionLabel="servicio"
                    optionValue="codigo" id="Servicio" @change="getInscripciones()"/>
      </div>
    </div>
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

      <column header="Servicio" sortable field="servicio">
        <template #body="slotProps">
          <div v-if="slotProps.data.servicio == 1">Sábado</div>
          <div v-if="slotProps.data.servicio == 2">Domingo</div>
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
      loading.value = true;
      let body = {
        'servicio': Servicio.value,
      }
      axios.post(settings.API_URL + 'aniversario/inscritos', body).then(response => {
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

    const Servicio = ref(1);
    const Servicios = ref([
            {servicio: 'Sábado', codigo: 1},
            {servicio: 'Domingo', codigo: 2},
        ]);

    return {Inscripciones, loading, Fecha, filters1, clearFilter1, getInscripciones, updateAsistencia, getStyle, Servicio, Servicios};

  }

};
</script>

<style>
</style>