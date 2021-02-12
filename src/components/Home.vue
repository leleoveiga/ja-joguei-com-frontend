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
      placeholder="Seu nick"
      autocomplete="nick"
      v-model="nick2"
      solo-inverted
      rows="1"
    >
      <template v-slot:label>
        digite o nick do outro bixo
        <v-icon small style="vertical-align: middle">
          mdi-magnify
        </v-icon>
      </template>
    </v-text-field>

    <v-btn
      class="mx-auto"
      style="width:120px; display: block; margin-bottom: 50px"
      color="deep-purple accent-4"
      :loading="loading"
      @click="getSummonerIDbyNick()"
    >
      procurar
    </v-btn>

    <v-row
      no-gutters
      style="margin-left: 38%; margin-right: 38%"
      class="d-flex"
    >
      <v-col
        class="d-flex align-start justify-space-around "
        cols="4"
        align-self="start"
        v-for="(partida, index) in partidas"
        :key="partida"
      >
        <v-btn :href="partida" target="_blank" class="mt-6 pa-5"
          >PARTIDA {{ index + 1 }}
        </v-btn>
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
    json: "",
    loading: false,
    partidas: []
  }),

  methods: {
    getSummonerIDbyNick() {
      this.loading = true;
      const urlTarget = `http://localhost:5000/api/getMatches/${this.nick1}/${this.nick2}`;

      axios
        .get(urlTarget, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          const { data } = response;
          this.partidas = data;
          this.loading = false;
        });
    }
  }
};
</script>
