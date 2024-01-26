const data = [
  "apple",
  "mango",
  "orange",
  "banana",
  "lemon",
  "apricot",
  "barry",
];

const inputBox = document.getElementById("inputbox");
const suggestionBox = document.getElementById("suggestionbox");

export const getSuggestion = (Keyword) => {
  const result = data.filter(
    (i) =>
      i.substring(0, Keyword.length).toLowerCase() === Keyword.toLowerCase()
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), 2000);
  });
};
const resetstate = () => {

  suggestionBox.innerHTML = "";
  suggestionBox.classList.remove("suggestionboxvisible");
};

const renderDropdown = (list) => {
  const suggfreg = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown");
    suggfreg.appendChild(el);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggfreg);
};

const handleSearch = async (value) => {
    const result = await getSuggestion(value);
    console.log(result);
  if (result.length) {
    suggestionBox.classList.add("suggestionboxvisible");
    renderDropdown(result);
  }

};
const handleInput = (e) => {
  const value = e.target.value;
  if (value) {
    handleSearch(value);
  } else {
    resetstate();
  }
};
const debounce = (fn, delay = 500) => {
  let timer;
  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  };
};
(() => {
  inputBox.addEventListener("input", debounce(handleInput,500));
})();

// getSuggestion("b").then((res) => console.log(res));
