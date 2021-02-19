<template>
  <v-app>
    <v-app-bar class="" app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Já Joguei Com...</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/leleoveiga/ja-joguei-com-frontend"
        target="_blank"
        text
      >
        <span class="mr-2"> Github </span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({
    //
  })
};
</script>
