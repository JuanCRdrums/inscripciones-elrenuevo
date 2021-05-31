import { createApp } from 'vue'
import { router } from "./router";
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';     
import 'primevue/resources/primevue.min.css';     
import 'primeicons/primeicons.css';
import './custom.css';
import Tooltip from 'primevue/tooltip';               

const app = createApp(App, { ripple: true });

app.use(PrimeVue);
app.use(router);
app.component('Card', Card);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Avatar', Avatar);
app.directive('tooltip', Tooltip);

app.mount('#app');