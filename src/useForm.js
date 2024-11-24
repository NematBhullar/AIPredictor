import { useState } from "react";

export function useForm(pages) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  function next() {
    setCurrentPageIndex((i) => (i >= pages.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentPageIndex((i) => (i <= 0 ? i : i - 1));
  }

  // function goToPage(index) {
  //   setCurrentPageIndex(index);
  // }

  return {
    currentPageIndex,
    page: pages[currentPageIndex],
    pages,
    isFirstPage: currentPageIndex === 0,
    isLastPage: currentPageIndex === pages.length - 1,
    next,
    back,
  };
}
