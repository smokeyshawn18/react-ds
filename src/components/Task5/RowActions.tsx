import {
  type ThemeConfig,
  defaultTheme,
} from "../../interfaces/themeInterface";
import { useThemeStyles } from "../../hooks/useThemeStyles";

interface RowActionsProps<T> {
  row: T;
  actions: Array<"view" | "edit" | "delete">;
  onAction: (action: string, row: T) => void;
  theme?: ThemeConfig;
}

export function RowActions<T>({
  row,
  actions,
  onAction,
  theme = defaultTheme,
}: RowActionsProps<T>) {
  const styles = useThemeStyles(theme);

  return (
    <div className="flex">
      {actions.includes("view") && (
        <button
          onClick={() => onAction("view", row)}
          style={{
            ...styles.actionButton,
            backgroundColor: theme.secondaryColor,
          }}
          className="mr-2"
        >
          View
        </button>
      )}

      {actions.includes("edit") && (
        <button
          onClick={() => onAction("edit", row)}
          style={styles.actionButton}
          className="mr-2"
        >
          Edit
        </button>
      )}

      {actions.includes("delete") && (
        <button
          onClick={() => onAction("delete", row)}
          style={{
            ...styles.actionButton,
            backgroundColor: "#dc3545",
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
