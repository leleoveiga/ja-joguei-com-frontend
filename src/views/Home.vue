/* eslint-disable no-console */
<template>
  <v-container fluid>
    <div class="d-flex flex-column mt-16 align-center">
      <span class="headline font-weight-bold"
        >Saiba se você já jogou com alguém!</span
      >
      <v-subheader>
        <span style="text-align: center">
          nas últimas 50 partidas
        </span>
      </v-subheader>
    </div>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px; margin-top: 80px"
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
    minMax: [0, 50],
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
      this.loading = true;
      const count = this.minMax[1] - this.minMax[0];
      const urlTarget = `/api/getMatches/${this.inputNick1}/${this.inputNick2}/${this.minMax[0]}/${count}`;

      axios
        .get(urlTarget)
        .then(response => {
          const { data } = response;
          [this.icon1, this.icon2] = [data.icon1, data.icon2];
          this.matches = data;
          if (this.matches.length === 0) {
            this.errorMsg = "Nenhum resultado encontrado";
            this.alert = true;
            this.alertType = "info";
          }
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          this.loading = false;
        })
        .catch(error => {
          const statusCode =
            error.response.data?.status?.status_code ?? error.response.status;
          const statusMsg =
            error.response.data?.status?.message ?? error.response.statusText;
          this.errorMsg = `${statusCode} ${statusMsg}`;
          this.alert = true;
          this.alertType = "error";

          setTimeout(() => {
            this.alert = false;
          }, 5000);
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
