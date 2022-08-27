import { ScrollContext } from "./ScrollContext";

export const ScrollProvider = (props) => {
  const scroll = {
    scrollLeft() {},
    scrollRight() {},
  };

  return (
    <ScrollContext.Provider value={scroll}>
      {props.children}
    </ScrollContext.Provider>
  );
};
