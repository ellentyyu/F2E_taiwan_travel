import { createApp, provide } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
// const axios = inject('axios')  // inject axios
app.use(router)
app.mount('#app')
