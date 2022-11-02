<script setup lang="ts">
import {useEncounterStore} from "@/stores/encounter";

const store = useEncounterStore();
</script>

<template>
  <v-list class="h-100" v-if="store.characters.length">
    <v-list-item>Total number of Characters: {{ store.getCharactersData.number }}</v-list-item>
    <v-list-item>XP level easy: {{ store.getCharactersData.xp.easy }} XP</v-list-item>
    <v-list-item>XP level medium: {{ store.getCharactersData.xp.medium }} XP</v-list-item>
    <v-list-item>XP level hard: {{ store.getCharactersData.xp.hard }} XP</v-list-item>
    <v-list-item>XP level deadly: {{ store.getCharactersData.xp.deadly }} XP</v-list-item>
  </v-list>
</template>