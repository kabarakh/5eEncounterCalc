<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEncounterStore } from '@/stores/encounter';
import { XP_TO_CR } from '@/interfaces/Monsters';

const store = useEncounterStore();
const monsterData = computed(() => {
  return store.getMonstersData;
});

const numberOfMonsters = ref(0);
const crXp = ref(-1);

const addMonsters = () => {
  if (numberOfMonsters.value > 0 && crXp.value > -1) {
    store.addMonsters(numberOfMonsters.value, crXp.value);
    numberOfMonsters.value = 0;
    crXp.value = -1;
  }
};

const removeMonsters = (xp: number) => {
  store.removeMonsters(xp);
};
</script>

<template>
  <table>
    <tr>
      <th>
        CR
      </th>
      <th>
        XP
      </th>
      <th>
        Monsters
      </th>
      <th></th>
    </tr>
    <tr v-for="monsters in store.monsters" :key="monsters.level">
      <td>{{ monsters.cr }}</td>
      <td>{{ monsters.xp }}</td>
      <td>{{ monsters.number }}</td>
      <td>
        <v-btn variant="elevated" type="button" @click.prevent="removeMonsters(monsters.xp)">Delete</v-btn>
      </td>
    </tr>
  </table>
  <v-form @submit.prevent="addMonsters">
    <v-row>
      <v-col>
        <v-text-field type="number" v-model.number="numberOfMonsters" label="Number" :rules="[
        v => v > 0 || 'Number must be larger than 0'
      ]"></v-text-field>
      </v-col>
      <v-col>
        <label>CR/XP: <select v-model.number="crXp">
          <option value="-1">Please select...</option>
          <option :value="xp" v-for="(cr, xp) in XP_TO_CR" :key="xp">
            {{ cr }} ({{ xp }} XP)
          </option>
        </select></label>
      </v-col>
      <v-col>
        <v-btn type="submit" variant="elevated">Add</v-btn>
      </v-col>
    </v-row>
  </v-form>
  <ul v-if="store.monsters.length">
    <li>Total number of Monsters: {{ monsterData.monsterCount }}</li>
    <li>Difficulty modifier: x{{ monsterData.difficultyMultiplier }}</li>
    <li>XP Reward: {{ monsterData.xpReward }} XP
      <span
          v-if="store.getCharactersData.number">({{ monsterData.xpReward / store.getCharactersData.number }} XP each)</span>
    </li>
    <li>Adjusted Difficulty Level: {{ monsterData.adjustedDifficulty }} XP</li>
  </ul>
</template>
