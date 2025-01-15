import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import * as components from 'vuetify/lib/components';
import * as directives from 'vuetify/lib/directives';
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify, {
  components,
  directives,
});

export default new Vuetify({
    lang: {
      locales: { pt },  
      current: 'pt',   
    },
});

