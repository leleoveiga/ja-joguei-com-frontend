<template>
  <v-container fluid>
    <v-textarea autocomplete="nick" v-model="nick" rows="1"></v-textarea>

    <v-btn @click="getSummonerIDbyNick(nick)"> procurar </v-btn>

    <div>NICK: {{ nick }}</div>
    <div>PUUID: {{ id }}</div>
    <v-spacer></v-spacer>
    <div>JSON: {{ json }}</div>
  </v-container>
</template>

<script>
import TeemoJS from "teemojs";
import axios from "axios";

export default {
  name: "Home",

  data: () => ({
    id: "id teste",
    nick: "nick teste",
    api: TeemoJS("RGAPI-20b8d485-0567-43eb-b801-5dfa0a2293b5"),
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

      // axios
      //   .get(
      //     "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/diana%20pelada?api_key=RGAPI-2436b195-f67a-477f-a35c-2b66fc22695f"
      //   )
      //   .then(response => {
      //     console.log(response);
      //   });
      let urlTarget =
        "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/?nick?api_key=RGAPI-2436b195-f67a-477f-a35c-2b66fc22695f";
      urlTarget = urlTarget.replace("?nick", nick);

      (async () => {
        const response = await axios({
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          url: urlTarget,
          method: "get"
        });
        let data = response.data;
        console.log(data);
        this.nick = data.name;
        this.id = data.puuid;
        this.json = data;
      })();
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
