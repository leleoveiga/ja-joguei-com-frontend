<template>
  <v-container fluid>
    <v-textarea autocomplete="nick" v-model="nick" rows="1"></v-textarea>

    <v-btn @click="getSummonerIDbyNick(nick)"> procurar </v-btn>

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
    nick: "diana pelada",
    api: TeemoJS("RGAPI-20b8d485-0567-43eb-b801-5dfa0a2293b5"),
    apiKey: "RGAPI-a6022795-cc30-4618-ab6d-1df1e3b47db8",
    json: "json vazio"
  }),

  methods: {
    getSummonerIDbyNick(nick) {
      // async () => {
      //   await this.api
      //     .get("br1", "summoner.getBySummonerName", "diana pelada")
      //     .then(data => console.log(data));
      //   console.log(this.api);
      // };

      let urlTarget =
        "https://cors-anywhere.herokuapp.com/https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=?apiKey";

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

      // (async () => {
      //   const response = await axios({
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json"
      //     },
      //     url: urlTarget,
      //     method: "get"
      //   });
      //   let data = response.data;
      //   console.log(data);
      //   this.nick = data.name;
      //   this.id = data.puuid;
      //   this.json = data;
      // })();
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
