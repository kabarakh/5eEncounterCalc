import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';
import type { Characters } from '@/interfaces/Characters';
import { LEVEL_TO_EXPERIENCE } from '@/interfaces/Characters';
import type {Monsters} from "@/interfaces/Monsters";

export const useEncounterStore = defineStore({
  id: "encounter-data",
  state: () => {
    return {
      characters: useStorage<Characters[]>('encounter.characters', []),
      monsters: useStorage<Monsters[]>('encounter.monsters', []),
      useCr: useStorage<boolean>('encounter.useCr', false)
    }
  },
  getters: {
    getXpThreshholds: () => {
      let threshholds = {
        easy: 0,
        medium: 0,
        hard: 0,
        deadly: 0
      };
      threshholds = this.characters.reduce((characters: Characters, currentThreshhold: {easy: number, medium: number, hard: number, deadly: number}) => {
        return {
          easy: currentThreshhold.easy + LEVEL_TO_EXPERIENCE[characters.level].easy * characters.number,
          medium: currentThreshhold.hard + LEVEL_TO_EXPERIENCE[characters.level].medium * characters.number,
          hard: currentThreshhold.medium + LEVEL_TO_EXPERIENCE[characters.level].hard * characters.number,
          deadly: currentThreshhold.deadly + LEVEL_TO_EXPERIENCE[characters.level].deadly * characters.number
        };
      }, threshholds);
      return threshholds;
    },
    getEncounterXpRating: () => {},
    getEncounterDifficulty: () => {}
  },
  actions: {
    addCharacters(number: number, level: number) {
      const characterOfGivenLevel = this.characters.find(character => character.level === level);
      if (characterOfGivenLevel) {
        characterOfGivenLevel.number += number;
      } else {
        this.characters.push({number: number, level: level});
      }
    }
  }
})
