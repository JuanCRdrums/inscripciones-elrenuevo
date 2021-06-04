import { createApp } from 'vue'
import { router } from "./router";
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ScrollTop from 'primevue/scrolltop';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';     
import 'primevue/resources/primevue.min.css';     
import 'primeicons/primeicons.css';
import './custom.css';
import Tooltip from 'primevue/tooltip';               

const app = createApp(App, { ripple: true });

app.use(router);

app.use(PrimeVue,{
    zIndex: {
        modal: 1100,        //dialog, sidebar
        overlay: 1000,      //dropdown, overlaypanel
        menu: 1000,         //overlay menus
        tooltip: 1100       //tooltip
    },
    locale: {
        startsWith: 'Empieza en',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina en',
        equals: 'Igual',
        notEquals: 'Diferente',
        noFilter: 'Sin filtro',
        lt: 'Menor que',
        lte: 'Menor o igual que',
        gt: 'Mayor que',
        gte: 'Mayor o igual que',
        dateIs: 'Fecha igual a',
        dateIsNot: 'Fecha diferente a',
        dateBefore: 'Fecha anterior',
        dateAfter: 'Fecha posterior',
        clear: 'Limpiar',
        apply: 'Aplicar',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        accept: 'Sí',
        reject: 'No',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        weekHeader: 'Sem',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yyyy',
        weak: 'Semana',
        medium: 'Medio',
        strong: 'Strong',
        passwordPrompt: 'Ingrese su contraseña',
        emptyFilterMessage: 'Sin resultados',
        emptyMessage: 'Sin opciones disponibles'
    },
});



app.component('Card', Card);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Avatar', Avatar);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('ScrollTop', ScrollTop);
app.component('ScrollPanel', ScrollPanel);
app.component('InputSwitch', InputSwitch);
app.directive('tooltip', Tooltip);

app.mount('#app');