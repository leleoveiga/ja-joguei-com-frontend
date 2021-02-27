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
        Você pode escolher onde começa e termina o scan das partidas. Max: 50
        partidas
      </span>
    </v-subheader>
    <v-range-slider
      max="100"
      min="0"
      class="mx-auto my-10"
      style="max-width: 400px;"
      v-model="minMax"
      thumb-label="always"
    ></v-range-slider>

    <span
      style="font-size: 10px; width: 200px; display: block;text-align: center"
      class="mx-auto mt-n14 mb-10"
    >
      ( &lt; 0,5 segundo pra cada partida analisada )</span
    >
    <v-btn
      class="mx-auto mb-4"
      style="width:120px; display: block;"
      color="deep-purple accent-4"
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
        type="warning"
      >
        Coloque um range menor ou igual à 50 !
      </v-alert>
    </div>

    <v-row class="d-flex justify-center">
      <v-col
        v-for="(match, index) in matches"
        :key="match.gameId"
        class="d-flex justify-center"
        style="max-width: 350px;"
      >
        <v-card class="mb-5 pa-4" style="min-width:300px; max-width: 300px;">
          <div class="d-flex flex-column align-start">
            <div class="d-flex align-center mb-5">
              <v-img max-height="50" max-width="50" :src="match.icon1" class="">
              </v-img>
              <div class="ml-4">{{ nick1 }}</div>
            </div>

            <div class="d-flex align-center">
              <v-img max-height="50" max-width="50" :src="match.icon2"></v-img>
              <div class="ml-4">{{ nick2 }}</div>
            </div>
          </div>
          <v-btn :href="match.link" target="_blank" class="d-flex mt-6 pa-5"
            >PARTIDA {{ index + 1 }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  data: () => ({
    inputNick1: "",
    inputNick2: "",
    loading: false,
    alert: false,
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
        const urlTarget = `/api/getMatches/${this.inputNick1}/${this.inputNick2}/${this.minMax[0]}/${this.minMax[1]}`;

        axios
          .get(urlTarget)
          .then(response => {
            const { data } = response;
            [this.inputNick1, this.inputNick2] = ["", ""]; // limpar os nicks do input
            [this.icon1, this.icon2] = [data.icon1, data.icon2];
            this.matches = data;
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    }
  }
};
</script>

<style></style>
