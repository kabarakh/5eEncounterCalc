<script setup lang="ts">
import {useEncounterStore} from "@/stores/encounter";

const store = useEncounterStore();

const removeCharacters = (level: number) => {
  store.removeCharacters(level);
}
</script>

<template>
  <v-table class="text-center">
    <thead>
    <tr>
      <th>
        Level
      </th>
      <th>
        Characters
      </th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="characters in store.characters" :key="characters.level">
      <td>{{ characters.level }}</td>
      <td>{{ characters.number }}</td>
      <td>
        <v-btn color="secondary" variant="elevated" type="button" @click.prevent="removeCharacters(characters.level)">Delete</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
