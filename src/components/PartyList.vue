<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEncounterStore } from '@/stores/encounter';

const store = useEncounterStore();
const characterData = computed(() => {
  return store.getCharactersData;
})

const numberOfCharacters = ref(0);
const levelOfCharacters = ref(0);

const addCharacters = () => {
  if (numberOfCharacters.value > 0 && levelOfCharacters.value > 0) {
    store.addCharacters(numberOfCharacters.value, levelOfCharacters.value);
    numberOfCharacters.value = 0;
    levelOfCharacters.value = 0;
  }
};

const removeCharacters = (level: number) => {
  store.removeCharacters(level);
}
</script>

<template>
  <table>
    <tr>
      <th>
        Level
      </th>
      <th>
        Characters
      </th>
      <th></th>
    </tr>
    <tr v-for="characters in store.characters" :key="characters.level">
      <td>{{characters.level}}</td>
      <td>{{characters.number}}</td>
      <td><button type="button" @click.prevent="removeCharacters(characters.level)">Delete</button></td>
    </tr>
  </table>
  <form @submit.prevent="addCharacters">
    <label>Level: <input max="20" min="0" type="number" v-model="levelOfCharacters"/></label>
    <label>Number: <input min="0" type="number" v-model="numberOfCharacters"/></label>
    <button>Add</button>
  </form>
  <ul v-if="store.characters.length">
    <li>Total number of Characters: {{characterData.number}}</li>
    <li>XP level easy: {{characterData.xp.easy}} XP</li>
    <li>XP level medium: {{characterData.xp.medium}} XP</li>
    <li>XP level hard: {{characterData.xp.hard}} XP</li>
    <li>XP level deadly: {{characterData.xp.deadly}} XP</li>
  </ul>
</template>
