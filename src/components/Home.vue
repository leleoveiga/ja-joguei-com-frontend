<template>
  <v-container fluid>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px; margin-top: 100px"
      placeholder="Seu nick"
      autocomplete="nick"
      v-model="nick1"
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
      placeholder="nick do outro cara"
      autocomplete="nick"
      v-model="nick2"
      solo-inverted
      rows="1"
    >
      <template v-slot:label>
        digite o nick do outro cara
        <v-icon small style="vertical-align: middle">
          mdi-magnify
        </v-icon>
      </template>
    </v-text-field>
    <!-- SLIDE DE PARTIDAS -->
    <!-- RETORNAR A DATA DA PARTIDA TAMBÉM -->
    <v-range-slider
      max="100"
      min="0"
      style="max-width: 500px;"
      v-model="minMax"
      thumb-label="always"
    ></v-range-slider>

    <v-btn
      class="mx-auto"
      style="width:120px; display: block; margin-bottom: 50px"
      color="deep-purple accent-4"
      :loading="loading"
      @click="getSummonerIDbyNick()"
    >
      procurar
    </v-btn>

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
    id: "",
    accid: "",
    nick1: "",
    nick2: "",
    loading: false,
    minMax: [0, 30],
    matches: []
  }),

  methods: {
    getSummonerIDbyNick() {
      this.loading = true;
      const urlTarget = `http://localhost:5000/api/getMatches/${this.nick1}/${this.nick2}`;

      axios
        .get(urlTarget)
        .then(response => {
          const { data } = response;
          this.icon1 = data.icon1;
          this.icon2 = data.icon2;
          this.matches = data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  },
  watch: {
    minMax(newValue, oldValue) {
      console.log(`o min max é ${this.minMax}`);
      console.log(newValue, oldValue);
      console.log(Math.abs(newValue[0] - newValue[1]));
      if (Math.abs(newValue[0] - newValue[1]) > 50) {
        return oldValue;
      }
      return newValue;
    }
  }
};
</script>

<style></style>
