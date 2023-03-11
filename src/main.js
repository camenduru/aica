import { createApp } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.use(MasonryWall)
app.mount('#app')