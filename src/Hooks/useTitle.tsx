import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Online Shop`;
  }, [title]);
};

export default useTitle;
