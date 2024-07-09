import "./Words.css";
import { useCallback, useEffect, useState } from "react";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { IWord, IWordSortBy } from "../../types/word";
import { getWords } from "../../api/words";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../types/query";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";
import { debounce } from "lodash";

type SortKeys =
  | "WORDS_A_Z"
  | "WORDS_Z_A"
  | "TRANSLATION_A_Z"
  | "TRANSLATION_Z_A"
  | "RELEVANCE_1_5"
  | "RELEVANCE_5_1"
  | "KNOWLEDGE_1_5"
  | "KNOWLEDGE_5_1"
  | "NEWEST_OLDEST"
  | "OLDEST_NEWEST";

const SORT_TYPES: Record<
  SortKeys,
  { name: string; sortBy: IWordSortBy; order: IOrder }
> = {
  WORDS_A_Z: { name: "words a-z", sortBy: "original", order: "asc" },
  WORDS_Z_A: { name: "words z-a", sortBy: "original", order: "desc" },
  TRANSLATION_A_Z: {
    name: "translation a-z",
    sortBy: "translation",
    order: "asc",
  },
  TRANSLATION_Z_A: {
    name: "translation z-a",
    sortBy: "translation",
    order: "desc",
  },
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
  NEWEST_OLDEST: {
    name: "newest to oldest",
    sortBy: "created_at",
    order: "desc",
  },
  OLDEST_NEWEST: {
    name: "oldest to newest",
    sortBy: "created_at",
    order: "asc",
  },
} as const;

export const Words = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<IWord[]>([]);
  const [sortValue, setSortValue] = useState<SortKeys>("WORDS_A_Z");
  const [isLearned, setIsLearned] = useState(false);
  const [search, setSearch] = useState<string>();

  const { callback: handleGetWords, isLoading: isLoadingWords } =
    useLoadingCallback(async () => {
      const { words } = await getWords({
        sortBy: SORT_TYPES[sortValue].sortBy,
        order: SORT_TYPES[sortValue].order,
        isLearned,
        search,
      });
      setWords(words);
    });

  useEffect(() => {
    handleGetWords();
  }, [sortValue, isLearned, search]);

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

  const handleClickIsLearnedCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLearned(event.currentTarget.checked);
  };

  const debouncedUpdateSearch = useCallback(
    debounce(
      (value: string) => setSearch(value.length ? value : undefined),
      250
    ),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateSearch(event.currentTarget.value);
  };

  return (
    <>
      <h1>Words</h1>
      <button onClick={handleClickAddWord}>Add Word</button>
      <div className="words-filters-container">
        <input
          placeholder="search"
          onChange={handleSearchChange}
          className="words-search"
        />
        <div className="words-sort-and-learned-container">
          <div>
            <label className="words-sort-label">Sort</label>
            <select value={sortValue} onChange={handleChangeSort}>
              {Object.entries(SORT_TYPES).map(([id, { name }]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="words-learned-label">Learned</label>
            <input
              type="checkbox"
              checked={isLearned}
              onChange={handleClickIsLearnedCheckbox}
              className="words-learned-input"
            />
          </div>
        </div>
      </div>
      {isLoadingWords && <div>Loading...</div>}
      {Boolean(!isLoadingWords && words.length) && (
        <ListOfWords words={words} />
      )}
      {Boolean(!isLoadingWords && !words.length) && (
        <div>Empty list of words</div>
      )}
    </>
  );
};
