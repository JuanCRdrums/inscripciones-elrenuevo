<template>
  <div>
      <h2>Histórico de asistentes</h2>
      <DataTable
      :value="Asistentes"
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
      :loading="loading"
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
      <column header="Nombre" field="nombre" sortable></column>
      <column header="Fecha de nacimiento" field="nacimiento" sortable></column>
      <column header="Correo electrónico" field="email" sortable></column>
      <column header="Teléfono de contacto" field="telefono" sortable></column>


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
        const Asistentes = ref([]);
        const loading = ref(true);
        const getAsistentes = () => {
            axios.get(settings.API_URL + 'inscripciones/asistentes').then(response => {
                Asistentes.value = response.data;
                loading.value = false;
            }).catch(err => {
                err;
                console.log(err);
            });
        };

        onMounted(() => {
            getAsistentes();
        });

        const filters1 = ref({
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
        const clearFilter1 = () => {
            filters1.value = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        };

        return {Asistentes, getAsistentes, loading, filters1, clearFilter1};
    }
}
</script>

<style>

</style>