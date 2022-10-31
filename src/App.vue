<script setup lang="ts">
import PartyList from '@/components/PartyList.vue';
import MonsterList from '@/components/MonsterList.vue';
import { useEncounterStore } from '@/stores/encounter';

const store = useEncounterStore();
</script>

<template>
  <PartyList/>
  <MonsterList/>
  <span :class="store.getEncounterRating.toLowerCase()"
        v-if="store.characters.length && store.monsters.length">{{ store.getEncounterRating }}</span>
</template>
