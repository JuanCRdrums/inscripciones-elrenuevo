<template>
  <div>
      <h2>Convocatoria de servicio - Inscritos</h2>
      <DataTable
      :value="Convocatoria"
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
      :loading="loading" :resizableColumns="true" class="p-datatable-lg"
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

      <column header="Nombre" field="nombre" sortable></column>
      <column header="Apellidos" field="apellidos" sortable></column>
      <column header="Edad" sortable field="edad"></column>
      <column header="Celular" field="celular" sortable></column>
      <column header="Área" field="area" sortable>
        <template #body="slotProps">
          {{areas[parseInt(slotProps.data.area) - 1]}}
        </template>
      </column>
      <column header="Experiencia" field="experiencia" sortable></column>

      <column header="Mi Renuevo" field="mi_renuevo" sortable>
        <template #body="slotProps">
          <div v-if="slotProps.data.mi_renuevo == 1">Sí</div>
          <div v-else>No</div>
        </template>
      </column>

      <column header="Tiempo de asistencia" field="asistiendo" sortable></column>


    </DataTable>
  </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import {settings} from "@/settings";
import { FilterMatchMode } from 'primevue/api';


export default {
    setup(){
        const Convocatoria = ref([]);
        const loading = ref(true);
        const getConvocatoria = () => {
            axios.get(settings.API_URL + 'servicio').then(response => {
                Convocatoria.value = response.data;
                loading.value = false;
            }).catch(err => {
                err;
                console.log(err);
            });
        };

        onMounted(() => {
            getConvocatoria();
        });

        const filters1 = ref({
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
        const clearFilter1 = () => {
            filters1.value = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        };

        const areas = ref([
          "Comunicaciones",
          "Maquillaje",
          "Grupos de conexión",
          "Consolidación",
          "Renuevo Kids",
          "Música",
          "Danzas",
          "Oración",
          "Staff",
          "Misiones (obra social)",
          "No lo sé"
        ])

        return {Convocatoria, getConvocatoria, loading, filters1, clearFilter1, areas};
    }
}
</script>

<style>

</style>