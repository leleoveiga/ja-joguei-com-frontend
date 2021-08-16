/* eslint-disable no-console */
<template>
  <v-container fluid>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px; margin-top: 100px"
      placeholder="Seu nick"
      autocomplete="nick"
      v-model="inputNick1"
      solo-inverted
      rows="1"
    >
      <template v-slot:label>
        digite seu nick
        <v-icon small style="vertical-align: middle">
          mdi-magnify
        </v-icon>
      </template>
    </v-text-field>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px; margin-top: 0px"
      placeholder="Nick do outro invocador"
      autocomplete="nick"
      v-model="inputNick2"
      solo-inverted
      rows="1"
    >
      <template v-slot:label>
        digite o nick do outro invocador
        <v-icon small style="vertical-align: middle">
          mdi-magnify
        </v-icon>
      </template>
    </v-text-field>
    <v-subheader class="mx-auto" style="max-width: 335px;">
      <span style="text-align: center">
        Você pode escolher onde começa e termina o scan das partidas. Max.: 50
        partidas
      </span>
    </v-subheader>
    <v-range-slider
      color="deep-purple darken-3"
      thumb-color="secondary"
      track-color="#202020"
      max="100"
      min="0"
      class="mx-auto my-10"
      style="max-width: 400px;"
      v-model="minMax"
      thumb-label="always"
    ></v-range-slider>

    <!-- <span
      style="font-size: 10px; width: 200px; display: block;text-align: center"
      class="mx-auto mt-n14 mb-10"
    >
      ( &lt; 0,5 segundo pra cada partida analisada )</span
    > -->
    <v-btn
      class="mx-auto mb-12"
      style="width:120px; display: block;"
      color="secondary"
      :loading="loading"
      @click="getMatches()"
    >
      procurar
    </v-btn>

    <div class="mx-auto" style="max-width: 370px;">
      <v-alert
        :value="alert"
        dark
        transition="scroll-x-transition"
        :type="alertType"
      >
        <!-- {{ alertMessage }} -->
        {{ errorMsg }}
      </v-alert>
    </div>

    <MatchCard :matches="matches" />

    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import axios from "axios";
import MatchCard from "components/MatchCard.vue";

export default {
  name: "Home",

  components: {
    MatchCard
  },

  data: () => ({
    inputNick1: "",
    inputNick2: "",
    loading: false,
    errorMsg: "",
    alert: false,
    alertType: "info",
    minMax: [0, 30],
    matches: []
  }),

  methods: {
    isValidRange() {
      if (Math.abs(this.minMax[0] - this.minMax[1]) > 50) {
        return false;
      }
      return true;
    },
    async getMatches() {
      if (this.isValidRange()) {
        this.loading = true;
        const count = this.minMax[1] - this.minMax[0];
        const urlTarget = `/api/getMatches/${this.inputNick1}/${this.inputNick2}/${this.minMax[0]}/${count}`;

        axios
          .get(urlTarget)
          .then(response => {
            const { data } = response;
            // [this.inputNick1, this.inputNick2] = ["", ""]; // limpar os nicks do input
            [this.icon1, this.icon2] = [data.icon1, data.icon2];
            this.matches = data;
            this.loading = false;
          })
          .catch(error => {
            this.errorMsg = `${error.response.status} ${error.response.statusText}`;
            this.alert = true;
            this.alertType = "error";

            setTimeout(() => {
              this.alert = false;
            }, 5000);
            this.loading = false;
          });
      } else {
        this.alert = true;
        this.alertType = "warning";
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    }
  },
  computed: {
    alertMessage() {
      if (this.alertType === "warning") {
        return "Coloque um range menor ou igual à 50 !";
      }
      if (this.alertType === "error") {
        return "Algo deu errado :( Atualize e tente novamente!";
      }
      return "Um erro desconhecido!";
    }
  }
};
</script>

<style></style>
