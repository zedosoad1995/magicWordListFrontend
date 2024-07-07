import { useCallback, useEffect, useState } from "react";
import "./Settings.css";
import { editSettings, getSettings } from "../../api/settings";
import { debounce } from "lodash";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";

export const Settings = () => {
  const [wordsPerDay, setWordsPerDay] = useState<number>();

  const {
    callback: handleGetSettings,
    isLoading,
    isSet,
  } = useLoadingCallback(async () => {
    const { words_per_day } = await getSettings();
    setWordsPerDay(words_per_day);
  });

  useEffect(() => {
    handleGetSettings();
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
      {isLoading && <div>Loading...</div>}
      {!isLoading && isSet && (
        <div className="settings-row">
          <label>Words per day (1-100)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={wordsPerDay}
            onChange={handleWordsPerDayChange}
          />
        </div>
      )}
    </>
  );
};
