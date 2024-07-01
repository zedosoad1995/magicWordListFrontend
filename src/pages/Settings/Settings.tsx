import { useCallback, useEffect, useState } from "react";
import "./Settings.css";
import { editSettings, getSettings } from "../../api/settings";
import { debounce } from "lodash";

export const Settings = () => {
  const [wordsPerDay, setWordsPerDay] = useState<number>();

  useEffect(() => {
    getSettings().then(({ words_per_day }) => setWordsPerDay(words_per_day));
  }, []);

  const debouncedEditSettings = useCallback(
    debounce((value) => editSettings({ words_per_day: value }), 500),
    []
  );

  const handleWordsPerDayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.value === "") {
      setWordsPerDay(undefined);
      return;
    }

    const value = Number(event.currentTarget.value);
    if (value < 1 || value > 50 || !/^\d+$/.test(event.currentTarget.value)) {
      return;
    }

    setWordsPerDay(value);
    debouncedEditSettings(value);
  };

  return (
    <>
      <h1>Settings</h1>
      <div className="settings-row">
        <label>Words per day (1-50)</label>
        <input
          type="number"
          min={1}
          max={50}
          value={wordsPerDay}
          onChange={handleWordsPerDayChange}
        />
      </div>
    </>
  );
};
