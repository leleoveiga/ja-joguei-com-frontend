<template>
  <v-container>
    <v-btn @click="getSummonerIDbyNick()"> olhe o console </v-btn>

    <div>{{ nick }}</div>
    <div>{{ id }}</div>
  </v-container>
</template>

<script>
import TeemoJS from "teemojs";
import axios from "axios";

export default {
  name: "Home",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ],
    id: "id teste",
    nick: "nick teste",
    api: TeemoJS("RGAPI-20b8d485-0567-43eb-b801-5dfa0a2293b5")
  }),

  methods: {
    getSummonerIDbyNick() {
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
      (async () => {
        const response = await axios({
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          url:
            "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/diana%20pelada?api_key=RGAPI-2436b195-f67a-477f-a35c-2b66fc22695f",
          method: "get"
        });
        let data = response.data;
        console.log(data);
        this.nick = data.name;
        this.id = data.puuid;
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
