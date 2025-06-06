import '@/assets/main.css'
import fixtures from '@/fixtures.json'
import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from '@/App.vue'
import router from '@/router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import Sidebar from 'primevue/sidebar';
import 'primevue/resources/themes/aura-light-amber/theme.css'

const app = createApp(App)
app.use(router)
app.use(createBootstrap({components: true, directives: true}))
app.use(PrimeVue);
app.component('Button', Button);
app.component('Carousel', Carousel);
app.component('Tag', Tag);
app.component('Editor', Editor);
app.component('FileUpload', FileUpload);
app.component('Sidebar', Sidebar);
app.config.globalProperties.fixtures = fixtures;
app.config.globalProperties.baseDir = import.meta.env.BASE_URL;
app.provide('authenticated', false);
app.mount('#app')
