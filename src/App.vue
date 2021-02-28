<template>
  <v-app>
    <v-app-bar absolute dense class="" app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img class="mr-2" src="./assets/jjc-logo.png" width="75"></v-img>
        <h2>Já Joguei Com...</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/leleoveiga/ja-joguei-com-frontend"
        target="_blank"
        text
      >
        <v-icon class="mr-1">mdi-github</v-icon>
        <span class="mr-2"> Github </span>
        <v-icon small>mdi-open-in-new</v-icon>
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
