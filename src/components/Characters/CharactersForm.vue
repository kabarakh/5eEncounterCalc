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
};

</script>

<template>
  <v-form @submit.prevent="addCharacters">
    <v-row align="center">
      <v-col>
        <v-text-field variant="solo" type="number" v-model.number="levelOfCharacters" label="Level" :rules="[
        v => v > 0 || 'Level must be larger than 0',
        v => v <= 20 || 'Level must be smaller than 20 or equal'
      ]"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field variant="solo" type="number" v-model.number="numberOfCharacters" label="Number" :rules="[
        v => v > 0 || 'Number must be larger than 0'
      ]"></v-text-field>
      </v-col>
      <v-col>
        <v-btn type="submit" variant="elevated">Add</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>