import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: "#060",
          secondary: "#600"
        }
      }
    }
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)

app.mount('#app')
