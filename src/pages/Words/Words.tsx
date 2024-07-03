import "./Words.css";
import { useEffect, useState } from "react";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { IWord, IWordSortBy } from "../../types/word";
import { getWords } from "../../api/words";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../types/query";

type SortKeys =
  | "WORDS_A_Z"
  | "WORDS_Z_A"
  | "RELEVANCE_1_5"
  | "RELEVANCE_5_1"
  | "KNOWLEDGE_1_5"
  | "KNOWLEDGE_5_1";

const SORT_TYPES: Record<
  SortKeys,
  { name: string; sortBy: IWordSortBy; order: IOrder }
> = {
  WORDS_A_Z: { name: "words a-z", sortBy: "original", order: "asc" },
  WORDS_Z_A: { name: "words z-a", sortBy: "original", order: "desc" },
  RELEVANCE_1_5: {
    name: "relevance 1 to 5",
    sortBy: "relevance",
    order: "asc",
  },
  RELEVANCE_5_1: {
    name: "relevance 5 to 1",
    sortBy: "relevance",
    order: "desc",
  },
  KNOWLEDGE_1_5: {
    name: "knowledge 1 to 5",
    sortBy: "knowledge",
    order: "asc",
  },
  KNOWLEDGE_5_1: {
    name: "knowledge 5 to 1",
    sortBy: "knowledge",
    order: "desc",
  },
} as const;

export const Words = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<IWord[]>([]);
  const [sortValue, setSortValue] = useState<SortKeys>("WORDS_A_Z");

  useEffect(() => {
    getWords({
      sortBy: SORT_TYPES[sortValue].sortBy,
      order: SORT_TYPES[sortValue].order,
    }).then(({ words }) => setWords(words));
  }, [sortValue]);

  const handleClickAddWord = () => {
    navigate("/word/add-word", { state: { from: window.location.pathname } });
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value as SortKeys;
    if (!Object.keys(SORT_TYPES).includes(value)) return;

    getWords({
      sortBy: SORT_TYPES[value].sortBy,
      order: SORT_TYPES[value].order,
    }).then(({ words }) => setWords(words));
    setSortValue(value);
  };

  return (
    <>
      <h1>Words</h1>
      <button onClick={handleClickAddWord}>Add Word</button>
      <div className="words-sort-container">
        <label className="words-sort-label">Sort:</label>
        <select value={sortValue} onChange={handleChangeSort}>
          {Object.entries(SORT_TYPES).map(([id, { name }]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <ListOfWords words={words} />
    </>
  );
};
