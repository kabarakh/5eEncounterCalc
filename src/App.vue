<script setup lang="ts">

import {useEncounterStore} from '@/stores/encounter';
import CharactersForm from "@/components/Characters/CharactersForm.vue";
import MonstersForm from "@/components/Monsters/MonstersForm.vue";
import CharactersList from "@/components/Characters/CharactersList.vue";
import MonstersList from "@/components/Monsters/MonstersList.vue";
import CharactersResults from "@/components/Characters/CharactersResults.vue";
import MonstersResults from "@/components/Monsters/MonstersResults.vue";

const store = useEncounterStore();
</script>

<style scoped lang="scss">
[data-v-app] {
  max-width: 960px;
}

.encounter-rating {
  font-weight: bolder;

  &.easy {
    color: #0B0;
  }

  &.medium {
    color: #FC0;
  }

  &.hard {
    color: #A00;
  }

  &.deadly {
    color: #F00;

    &::after {
      content: "!!";
      height: 100%;
    }
  }
}
</style>

<template>
  <v-container class="my-10">
    <h1 class="mb-10 text-center text-h2">D&D 5e Encounter Calculator</h1>

    <v-row>
      <v-col>
        <CharactersForm/>
      </v-col>
      <v-col>
        <MonstersForm/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <CharactersList/>
      </v-col>
      <v-col>
        <MonstersList/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <CharactersResults/>
      </v-col>
      <v-col>
        <MonstersResults/>
      </v-col>
    </v-row>

    <v-alert class="text-center my-8" v-if="store.characters.length && store.monsters.length">
      Encounter difficulty:
      <span class="encounter-rating" :class="store.getEncounterRating.toLowerCase()">{{
          store.getEncounterRating
        }}</span>
    </v-alert>
  </v-container>
</template>
