export interface ISettings {
  id: string;
  words_per_day: number;
  words_picked_at: Date | null;
  training_try_num: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IEditSettingsBody {
  words_per_day: number;
}
