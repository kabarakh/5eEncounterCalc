<script setup lang="ts">
import {useEncounterStore} from "@/stores/encounter";

const store = useEncounterStore();

const removeMonsters = (xp: number) => {
  store.removeMonsters(xp);
};
</script>

<template>
  <v-table class="text-center">
    <thead>
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
    </thead>
    <tbody>
    <tr v-for="monsters in store.monsters" :key="monsters.level">
      <td>{{ monsters.cr }}</td>
      <td>{{ monsters.xp }}</td>
      <td>{{ monsters.number }}</td>
      <td class="py-1">
        <v-btn color="secondary" variant="elevated" type="button" @click.prevent="removeMonsters(monsters.xp)">Delete</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
