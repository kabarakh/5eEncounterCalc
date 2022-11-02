<script setup lang="ts">
import PartyList from '@/components/PartyList.vue';
import MonsterList from '@/components/MonsterList.vue';
import { useEncounterStore } from '@/stores/encounter';

const store = useEncounterStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <PartyList/>
      </v-col>
      <v-col>
        <MonsterList/>
      </v-col>
    </v-row>
    <span :class="store.getEncounterRating.toLowerCase()"
          v-if="store.characters.length && store.monsters.length">{{ store.getEncounterRating }}</span>
  </v-container>
</template>
