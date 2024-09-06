// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#fff',
    primary: '#18a8f1',
    secondary: '#fd9f28'

  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'mainTheme',
    themes: {
      mainTheme
    }
  }
})
