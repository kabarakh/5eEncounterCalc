<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEncounterStore } from '@/stores/encounter';
import { XP_TO_CR } from '@/interfaces/Monsters';

const store = useEncounterStore();
const monsterData = computed(() => {
  return store.getMonstersData;
})

const numberOfMonsters = ref(0);
const crXp = ref(-1);

const addMonsters = () => {
  if (numberOfMonsters.value > 0 && crXp.value > -1) {
    store.addMonsters(numberOfMonsters.value, crXp.value);
    numberOfMonsters.value = 0;
    crXp.value = -1;
  }
}

const removeMonsters = (xp: number) => {
  store.removeMonsters(xp);
}
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
        <button type="button" @click.prevent="removeMonsters(monsters.xp)">Delete</button>
      </td>
    </tr>
  </table>
  <form @submit.prevent="addMonsters">
    <label>Number: <input min="0" type="number" v-model="numberOfMonsters"/></label>
    <label>CR/XP: <select v-model.number="crXp">
      <option value="-1">Please select...</option>
      <option :value="xp" v-for="(cr, xp) in XP_TO_CR" :key="xp">
        {{cr}} ({{xp}} XP)
      </option>
    </select></label>
    <button>Add</button>
  </form>
  <ul v-if="store.monsters.length">
    <li>Total number of Monsters: {{monsterData.monsterCount}}</li>
    <li>Difficulty modifier: x{{monsterData.difficultyMultiplier}}</li>
    <li>XP Reward: {{monsterData.xpReward}} XP
      <span v-if="store.getCharactersData.number">({{monsterData.xpReward / store.getCharactersData.number}} XP each)</span>
    </li>
    <li>Adjusted Difficulty Level: {{monsterData.adjustedDifficulty}} XP</li>
  </ul>
</template>
