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
        class="d-flex align-center py-2 justify-space-around"
        cols="4"
        align-self="start"
        v-for="(match, index) in matches"
        :key="match.gameId"
      >
        <v-btn :href="match.link" target="_blank" class="mt-6 pa-5"
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
    matches: [
      {
        platformId: "BR1",
        gameId: 2185713116,
        champion: 238,
        queue: 900,
        season: 13,
        timestamp: 1613091032338,
        role: "NONE",
        lane: "JUNGLE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2185713116?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184870184,
        champion: 4,
        queue: 900,
        season: 13,
        timestamp: 1613005879848,
        role: "DUO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184870184?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184856756,
        champion: 64,
        queue: 900,
        season: 13,
        timestamp: 1613004971344,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184856756?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184793704,
        champion: 117,
        queue: 900,
        season: 13,
        timestamp: 1613002920150,
        role: "DUO",
        lane: "TOP",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184793704?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184810151,
        champion: 81,
        queue: 900,
        season: 13,
        timestamp: 1613001757930,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184810151?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184776256,
        champion: 67,
        queue: 900,
        season: 13,
        timestamp: 1613000253290,
        role: "DUO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184776256?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2184773452,
        champion: 412,
        queue: 900,
        season: 13,
        timestamp: 1612998989018,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2184773452?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183956868,
        champion: 90,
        queue: 900,
        season: 13,
        timestamp: 1612919301805,
        role: "SOLO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183956868?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183972514,
        champion: 11,
        queue: 900,
        season: 13,
        timestamp: 1612917720378,
        role: "NONE",
        lane: "JUNGLE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183972514?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183898159,
        champion: 27,
        queue: 900,
        season: 13,
        timestamp: 1612915914533,
        role: "DUO_CARRY",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183898159?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183837265,
        champion: 236,
        queue: 900,
        season: 13,
        timestamp: 1612911374043,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183837265?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183825167,
        champion: 20,
        queue: 900,
        season: 13,
        timestamp: 1612910279900,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183825167?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183811712,
        champion: 236,
        queue: 900,
        season: 13,
        timestamp: 1612908663999,
        role: "SOLO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183811712?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183290529,
        champion: 27,
        queue: 900,
        season: 13,
        timestamp: 1612844053530,
        role: "SOLO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183290529?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183219277,
        champion: 11,
        queue: 900,
        season: 13,
        timestamp: 1612842602993,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183219277?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183207068,
        champion: 133,
        queue: 900,
        season: 13,
        timestamp: 1612840985886,
        role: "DUO_SUPPORT",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183207068?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2183185010,
        champion: 11,
        queue: 900,
        season: 13,
        timestamp: 1612839504817,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2183185010?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182385979,
        champion: 107,
        queue: 900,
        season: 13,
        timestamp: 1612759355550,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182385979?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182384426,
        champion: 104,
        queue: 900,
        season: 13,
        timestamp: 1612757812753,
        role: "NONE",
        lane: "JUNGLE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182384426?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182392658,
        champion: 86,
        queue: 900,
        season: 13,
        timestamp: 1612756564305,
        role: "DUO_SUPPORT",
        lane: "NONE",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182392658?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182400340,
        champion: 202,
        queue: 900,
        season: 13,
        timestamp: 1612754887008,
        role: "DUO",
        lane: "BOTTOM",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182400340?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182288215,
        champion: 55,
        queue: 900,
        season: 13,
        timestamp: 1612753248646,
        role: "DUO_SUPPORT",
        lane: "TOP",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182288215?tab=overview"
      },
      {
        platformId: "BR1",
        gameId: 2182256417,
        champion: 84,
        queue: 900,
        season: 13,
        timestamp: 1612751628195,
        role: "DUO",
        lane: "TOP",
        link:
          "https://matchhistory.br.leagueoflegends.com/pt/#match-details/BR1/2182256417?tab=overview"
      }
    ]
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
          this.matches = data;
          this.loading = false;
        });
    }
  }
};
</script>
