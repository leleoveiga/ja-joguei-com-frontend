<template>
  <v-app>
    <v-app-bar absolute dense class="" app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img class="mr-2" src="./assets/jjc-logo.png" width="50"></v-img>
        <span
          class="font-weight-bold"
          v-bind:style="{ fontSize: this.fontSize }"
          >Já Joguei Com...</span
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn
        rel="noreferrer"
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
      <div class="image-background">
        <Home />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({}),

  computed: {
    fontSize() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return "20px";
      }
      return "26px";
    }
  }
};
</script>

<style scoped>
.image-background {
  height: 100%;
  background-image: linear-gradient(
      180deg,
      rgba(39, 27, 36, 0.9) 0%,
      rgba(34, 27, 36, 0.9) 86%,
      rgba(28, 27, 36, 1) 100%
    ),
    url("./assets/diana.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
