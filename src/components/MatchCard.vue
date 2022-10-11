<template>
  <v-row class="d-flex justify-center">
    <v-col
      v-for="(match, index) in matches"
      :key="match.gameId"
      class="d-flex justify-center"
      style="max-width: 350px;"
    >
      <v-card class="mb-5 pa-4" style="min-width:300px; max-width: 300px;">
        <div class="mt-n2 mb-1" style="text-align: center; font-size: 13px">
          {{ match.description }} <span class="mx-1"> - </span>
          {{ match.date }}
        </div>
        <v-divider class="mb-2"></v-divider>
        <!-- kda -->
        <div class="d-flex flex-column align-start">
          <div class="d-flex align-center mb-5">
            <v-img max-height="50" max-width="50" :src="match.icon1" class="">
            </v-img>
            <div>
              <div class="ml-4">{{ match.nick1 }}</div>
              <div style="font-size: 14px" class="ml-4">
                {{ match.player1KDA }}
              </div>
              <div
                class="ml-4 text-caption"
                :style="[
                  match.player1Win ? { color: '#2DEB90' } : { color: '#ff5859' }
                ]"
              >
                {{ match.player1Win ? "Vitória" : "Derrota" }}
              </div>
            </div>
          </div>

          <div class="d-flex align-center">
            <v-img max-height="50" max-width="50" :src="match.icon2"></v-img>
            <div>
              <div class="ml-4">{{ match.nick2 }}</div>
              <div style="font-size: 14px" class="ml-4">
                {{ match.player2KDA }}
              </div>
              <div
                class="ml-4 text-caption"
                :style="[
                  match.player2Win ? { color: '#2DEB90' } : { color: '#ff5859' }
                ]"
              >
                {{ match.player2Win ? "Vitória" : "Derrota" }}
              </div>
            </div>
          </div>
        </div>
        <v-btn
          rel="noreferrer"
          :href="match.link"
          target="_blank"
          class="d-flex mt-6 pa-5 mx-auto"
          style="width: 150px; display: block; "
          color="secondary"
          ><span class="mr-5">PARTIDA {{ index + 1 }}</span>
          <v-icon x-small>mdi-open-in-new</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MatchCard",

  props: {
    matches: {
      type: Array
    }
  },

  data: () => ({})
};
</script>

<style></style>
