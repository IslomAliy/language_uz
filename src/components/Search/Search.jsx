import React, { useMemo, useState } from "react";
import { CopyIcon } from "../../assets/icons/icons";
import { words } from "../../data";
import cls from "./styles.module.scss";

const DEBOUNCE_DELAY = 500;

const Search = () => {
  const [search, setSearch] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);

  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = useMemo(() => {
    return debounce((value) => {
      if (!value) {
        setFilteredArray([]);
        return;
      }
      const lowerCaseValue = value.toLowerCase();
      const filtered = words.filter((text) =>
        text.toLowerCase().includes(lowerCaseValue)
      );
      setFilteredArray(filtered);
    }, DEBOUNCE_DELAY);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const handleCopy = (elm) => {
    navigator.clipboard.writeText(elm);
  };

  return (
    <div className={cls.search}>
      <h2>Ўзбекча имло луғати</h2>
      <input
        className={cls.searchInput}
        placeholder="Сўзни криллчада киритинг..."
        value={search}
        onChange={handleChange}
      />
      <div className={cls.results}>
        {filteredArray?.map((elm, index) => (
          <div key={index} className={cls.resultCardWrapper}>
            <div className={cls.resultCard}>
              <span>{elm}</span>
              <img
                src="/images/copy-svgrepo-com.svg"
                alt="copy"
                width="20px"
                height="20px"
                className={cls.copyIcon}
                onClick={() => handleCopy(elm)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
