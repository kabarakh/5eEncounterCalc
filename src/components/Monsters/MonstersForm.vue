<script setup lang="ts">
import {useEncounterStore} from "@/stores/encounter";
import {ref} from "vue";
import {map} from "lodash";
import {XP_TO_CR} from "@/interfaces/Monsters";

const store = useEncounterStore();

const numberOfMonsters = ref(0);
const crXp = ref(-1);

const selectValues = [
  {
    title: 'CR/XP',
    value: -1
  },
  ...map(XP_TO_CR, (cr, xp) => {
    return {
      title: `${cr} (${xp} XP)`,
      value: xp
    };
  })
];

const addMonsters = () => {
  if (numberOfMonsters.value > 0 && crXp.value > -1) {
    store.addMonsters(numberOfMonsters.value, crXp.value);
    numberOfMonsters.value = 0;
    crXp.value = -1;
  }
};

</script>

<template>
  <v-form @submit.prevent="addMonsters">
    <v-row align="center">
      <v-col>
        <v-select label="CR/XP" variant="solo" v-model.number="crXp" :items="selectValues" :rules="[
        v => v > -1 || 'Please select an option'
      ]"></v-select>
      </v-col>
      <v-col>
        <v-text-field variant="solo" type="number" v-model.number="numberOfMonsters" label="Number" :rules="[
        v => v > 0 || 'Number must be larger than 0'
      ]"></v-text-field>
      </v-col>
      <v-col>
        <v-btn type="submit" color="primary" variant="elevated">Add</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
