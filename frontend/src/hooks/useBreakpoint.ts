import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";

const useBreakpoints = <T>(values: T[]) => {
  const theme = useTheme();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [value, setValue] = useState<T>(values[0]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (windowWidth >= theme.breakpoints.values.xl)
      setValue(values[Math.min(4, values.length - 1)]);
    else if (windowWidth >= theme.breakpoints.values.lg)
      setValue(values[Math.min(3, values.length - 1)]);
    else if (windowWidth >= theme.breakpoints.values.md)
      setValue(values[Math.min(2, values.length - 1)]);
    else if (windowWidth >= theme.breakpoints.values.sm)
      setValue(values[Math.min(1, values.length - 1)]);
    else if (windowWidth >= theme.breakpoints.values.xs) setValue(values[0]);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return value;
};

export default useBreakpoints;
