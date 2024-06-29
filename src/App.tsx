import { useEffect } from "react";
import { pickDailyWords } from "./api/words";

function App() {
  useEffect(() => {
    pickDailyWords().then(console.log);
  }, []);

  return <></>;
}

export default App;
