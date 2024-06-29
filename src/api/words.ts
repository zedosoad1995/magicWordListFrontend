import { api } from ".";

export const pickDailyWords = () => {
  return api.put("/words/pick-daily");
};
