<template>
  <v-container fluid>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px; margin-top: 100px"
      placeholder="Seu nick"
      autocomplete="nick"
      v-model="nick"
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
      style="width:120px; display: block; margin-bottom: 100px"
      color="deep-purple accent-4"
      @click="getSummonerIDbyNick(nick)"
    >
      procurar
    </v-btn>

    <v-card class="mt-6 pa-4" style="margin-left: 200px; margin-right: 200px"
      >NICK: {{ nick }}</v-card
    >
    <v-card class="mt-6 pa-4" style="margin-left: 200px; margin-right: 200px"
      >PUUID: {{ id }}</v-card
    >
    <v-card class="mt-6 pa-4" style="margin-left: 200px; margin-right: 200px"
      >ACCOUNT ID: {{ accid }}</v-card
    >
    <v-spacer></v-spacer>
    <v-card class="mt-6 pa-4" style="margin-left: 200px; margin-right: 200px"
      >JSON: {{ json }}</v-card
    >
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  data: () => ({
    id: "",
    accid: "",
    nick: "",
    json: ""
    nick1: "",
    nick2: "",
    json: "",
    loading: false,
    partidas: []
  }),

  methods: {
    getSummonerIDbyNick(nick) {
      let urlTarget = `http://localhost:5000/api/get/${nick}`;

      urlTarget = urlTarget.replace("?nick", nick);
      urlTarget = urlTarget.replace("?apiKey", this.apiKey);

      axios
        .get(urlTarget, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          let data = response.data;
          console.log(data);
          this.nick = data.name;
          this.accid = data.accountId;
          this.id = data.puuid;
          this.json = data;
          console.log(response);
        });
    },

    getMatchesByID() {
      this.api
        .get("na1", "match.getMatchlist", 78247, {
          champion: [81, 429],
          season: 8
        })
        .then(data => console.log(data.id));
    }
  }
};
</script>
<style>
/* .alinhar {
  display: flex;
  justify-content: center;
  align-items: center;
} */
</style>
