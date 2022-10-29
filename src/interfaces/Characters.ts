export interface Characters {
  number: number,
  level: number
}

export const LEVEL_TO_EXPERIENCE = {
  1: {
    easy: 25,
    medium: 50,
    hard: 75,
    deadly: 100
  },
  2: {
    easy: 50,
    medium: 100,
    hard: 150,
    deadly: 200
  },
};
