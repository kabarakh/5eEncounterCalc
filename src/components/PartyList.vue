<script setup lang="ts">
import {ref} from "vue";
import {useEncounterStore} from "@/stores/encounter";

const store = useEncounterStore();

const numberOfCharacters = ref(0);
const levelOfCharacters = ref(0);

const addCharacters = () => {
  if (numberOfCharacters.value > 0 && levelOfCharacters.value > 0) {
    store.addCharacters(numberOfCharacters.value, levelOfCharacters.value);
    numberOfCharacters.value = 0;
    levelOfCharacters.value = 0;
  }
}
</script>

<template>
  <form @submit.prevent="addCharacters">
    <input type="number" v-model="numberOfCharacters"/>
    <input type="number" v-model="levelOfCharacters"/>
    <button>Add</button>
  </form>
</template>