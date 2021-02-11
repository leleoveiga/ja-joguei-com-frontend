import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.grey.darken3, // #E53935
        secondary: colors.yellow.base, // #FFCDD2
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    }
  }
});
