import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { Characters } from '@/interfaces/Characters';
import { LEVEL_TO_EXPERIENCE } from '@/interfaces/Characters';
import type { Monsters } from '@/interfaces/Monsters';
import { XP_TO_CR } from '@/interfaces/Monsters';
import { forEach } from 'lodash';
import * as module from 'module';

const ENCOUNTER_MULTIPLIER_STEPS = [
  {
    number: 1,
    modifier: .5
  },
  {
    number: 2,
    modifier: .5
  },
  {
    number: 3,
    modifier: .5
  },
  {
    number: 7,
    modifier: .5
  },
  {
    number: 11,
    modifier: .5
  },
  {
    number: 15,
    modifier: 1
  },
  {
    number: 999,
    modifier: 1
  },
];

export const useEncounterStore = defineStore({
  id: 'encounter-data',
  state: () => {
    return {
      characters: useStorage<Characters[]>('encounter.characters', []),
      monsters: useStorage<Monsters[]>('encounter.monsters', [])
    };
  },
  getters: {
    getCharactersData() {
      const characterData = {
        number: 0,
        xp: {
          easy: 0,
          medium: 0,
          hard: 0,
          deadly: 0,
        }
      };
      this.characters.forEach((currentCharacters) => {
        characterData.number += currentCharacters.number;
        characterData.xp.easy += currentCharacters.number * LEVEL_TO_EXPERIENCE[currentCharacters.level].easy;
        characterData.xp.medium += currentCharacters.number * LEVEL_TO_EXPERIENCE[currentCharacters.level].medium;
        characterData.xp.hard += currentCharacters.number * LEVEL_TO_EXPERIENCE[currentCharacters.level].hard;
        characterData.xp.deadly += currentCharacters.number * LEVEL_TO_EXPERIENCE[currentCharacters.level].deadly;
      });

      return characterData;
    },
    getMonstersData() {
      const monsterData = {
        monsterCount: 0,
        xpReward: 0,
        difficultyMultiplier: .5,
        adjustedDifficulty: 0,
        encounterChallenge: 0,
      };
      this.monsters.forEach((currentMonsters) => {
        monsterData.monsterCount += currentMonsters.number;
        monsterData.xpReward += currentMonsters.number * currentMonsters.xp;
      });

      let myKey = 0;
      ENCOUNTER_MULTIPLIER_STEPS.forEach((currentValue) => {
        if (monsterData.monsterCount >= currentValue.number) {
          myKey++;
        }
      });

      if (this.getCharactersData.number > 0 && this.getCharactersData.number < 3) {
        myKey++;
      } else if (this.getCharactersData.number > 5) {
        myKey--;
      }

      let difficultyModifier = .5;
      for (let i = 0; i < myKey; i++) {
        difficultyModifier += ENCOUNTER_MULTIPLIER_STEPS[i].modifier;
      }
      monsterData.difficultyMultiplier = difficultyModifier;

      monsterData.adjustedDifficulty = monsterData.difficultyMultiplier * monsterData.xpReward;
      return monsterData;
    },
    getEncounterRating() {
      if (this.getMonstersData.adjustedDifficulty <= this.getCharactersData.xp.easy) {
        return 'easy';
      }
      if (this.getMonstersData.adjustedDifficulty <= this.getCharactersData.xp.medium) {
        return 'medium';
      }
      if (this.getMonstersData.adjustedDifficulty <= this.getCharactersData.xp.hard) {
        return 'hard';
      }
      return 'deadly';
    }
  },
  actions: {
    addCharacters(number: number, level: number) {
      const charactersOfGivenLevel = this.characters.find(characters => characters.level === level);
      if (charactersOfGivenLevel) {
        charactersOfGivenLevel.number += number;
      } else {
        this.characters.push({number: number, level: level});
      }
      this.characters.sort((a, b) => {
        return a.level - b.level;
      });
    },
    removeCharacters(level: number) {
      this.characters = this.characters.filter((currentCharacters: Characters) => {
        return currentCharacters.level !== level;
      });
    },
    addMonsters(number: number, xp: number) {
      const monstersOfGivenXp = this.monsters.find(monsters => monsters.xp === xp);
      if (monstersOfGivenXp) {
        monstersOfGivenXp.number += number;
      } else {
        this.monsters.push({number: number, xp: xp, cr: XP_TO_CR[xp]});
      }
      this.monsters.sort((a, b) => {
        return a.xp - b.xp;
      });
    },
    removeMonsters(xp: number) {
      this.monsters = this.monsters.filter((currentMonsters: Monsters) => {
        return currentMonsters.xp !== xp;
      });
    },
  }
});
