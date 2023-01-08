import { useEffect, useState, MutableRefObject } from "react";

type RefOutsideClick = MutableRefObject<HTMLButtonElement | undefined>;

export default function OutsideClick(ref: RefOutsideClick) {
  const [isClicked, setIsClicked] = useState<boolean>();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) setIsClicked(true);
      else setIsClicked(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClicked;
}
