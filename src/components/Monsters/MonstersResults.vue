<script setup lang="ts">
import {useEncounterStore} from "@/stores/encounter";

const store = useEncounterStore();
</script>

<template>
  <v-list class="h-100" v-if="store.monsters.length">
    <v-list-item>Total number of Monsters: {{ store.getMonstersData.monsterCount }}</v-list-item>
    <v-list-item>Difficulty modifier: x{{ store.getMonstersData.difficultyMultiplier }}</v-list-item>
    <v-list-item>XP Reward: {{ store.getMonstersData.xpReward }} XP
      <span
          v-if="store.getCharactersData.number">({{
          store.getMonstersData.xpReward / store.getCharactersData.number
        }} XP each)</span>
    </v-list-item>
    <v-list-item>Adjusted Difficulty Level: {{ store.getMonstersData.adjustedDifficulty }} XP</v-list-item>
  </v-list>
</template>