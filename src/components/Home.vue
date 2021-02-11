<template>
  <v-container fluid>
    <v-text-field
      background-color=""
      class="mx-auto"
      style="max-width: 300px;"
      placeholder="Seu nick"
      autocomplete="nick"
      v-model="nick"
      solo-inverted
      rows="1"
    >
    </v-text-field>

    <v-btn
      class="mx-auto"
      style="width:100px;"
      color="deep-purple accent-4"
      @click="getSummonerIDbyNick(nick)"
    >
      procurar
    </v-btn>

    <v-card class="mt-6 pa-4">NICK: {{ nick }}</v-card>
    <v-card class="mt-6 pa-4">PUUID: {{ id }}</v-card>
    <v-spacer></v-spacer>
    <v-card class="mt-6 pa-4">JSON: {{ json }}</v-card>
  </v-container>
</template>

<script>
import TeemoJS from "teemojs";
import axios from "axios";

export default {
  name: "Home",

  data: () => ({
    id: "id teste",
    nick: "",
    api: TeemoJS("RGAPI-20b8d485-0567-43eb-b801-5dfa0a2293b5"),
    apiKey: "RGAPI-a6022795-cc30-4618-ab6d-1df1e3b47db8",
    json: "json vazio"
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
