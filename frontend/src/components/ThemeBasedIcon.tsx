import { useThemeMode } from "@contexts/ThemeContext";

export type ThemeBasedIconProps = {
  darkIcon: React.ReactNode;
  lightIcon: React.ReactNode;
};

const ThemeBasedIcon: React.FC<ThemeBasedIconProps> = ({
  darkIcon,
  lightIcon,
}) => {
  const { isDarkMode } = useThemeMode();

  return <>{isDarkMode ? darkIcon : lightIcon}</>;
};

export default ThemeBasedIcon;
