import {
  defaultTheme,
  type ThemeConfig,
} from "../../interfaces/themeInterface";
import { useThemeStyles } from "../../hooks/useThemeStyles";

interface SearchInputProps {
  onSearch: (term: string) => void;
  theme?: ThemeConfig;
}

export function SearchInput({
  onSearch,
  theme = defaultTheme,
}: SearchInputProps) {
  const styles = useThemeStyles(theme);

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="border p-2 w-full max-w-xs"
        style={{
          borderRadius: styles.searchInput.borderRadius,
          borderColor: styles.searchInput.borderColor,
          padding: styles.searchInput.padding,
          fontFamily: styles.searchInput.fontFamily,
        }}
      />
    </div>
  );
}
