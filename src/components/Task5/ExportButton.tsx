import {
  type ThemeConfig,
  defaultTheme,
} from "../../interfaces/themeInterface";
import { useThemeStyles } from "../../hooks/useThemeStyles";

interface ExportButtonProps {
  onExport: () => void;
  theme?: ThemeConfig;
}

export function ExportButton({
  onExport,
  theme = defaultTheme,
}: ExportButtonProps) {
  const styles = useThemeStyles(theme);

  return (
    <button
      onClick={onExport}
      className="ml-auto"
      style={{
        backgroundColor: styles.exportButton.backgroundColor,
        color: styles.exportButton.color,
        borderRadius: styles.exportButton.borderRadius,
        padding: styles.exportButton.padding,
      }}
    >
      Export Data
    </button>
  );
}
