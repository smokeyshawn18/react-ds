import { useMemo } from "react";

import { defaultTheme, type ThemeConfig } from "../interfaces/themeInterface";

export function useThemeStyles(theme: ThemeConfig = defaultTheme) {
  const styles = useMemo(() => {
    return {
      table: {
        fontFamily: theme.fontFamily,
        borderRadius: theme.borderRadius,
      },
      header: {
        backgroundColor: theme.secondaryColor,
        color: "#ffffff",
        padding: `${theme.spacing.small} ${theme.spacing.medium}`,
      },
      row: {
        evenRow: {
          backgroundColor: "#f9f9f9",
        },
        hoverRow: {
          backgroundColor: `${theme.primaryColor}20`, // 20% opacity
        },
      },
      pagination: {
        button: {
          backgroundColor: theme.primaryColor,
          color: "#ffffff",
          borderRadius: theme.borderRadius,
          padding: `${theme.spacing.small} ${theme.spacing.medium}`,
        },
        disabledButton: {
          backgroundColor: theme.secondaryColor,
          opacity: "0.5",
        },
        text: {
          color: theme.secondaryColor,
          fontFamily: theme.fontFamily,
        },
      },
      actionButton: {
        backgroundColor: theme.primaryColor,
        color: "#ffffff",
        borderRadius: theme.borderRadius,
        padding: `${theme.spacing.small} ${theme.spacing.medium}`,
        margin: theme.spacing.small,
      },
      searchInput: {
        borderRadius: theme.borderRadius,
        borderColor: theme.secondaryColor,
        padding: theme.spacing.small,
        fontFamily: theme.fontFamily,
      },
      exportButton: {
        backgroundColor: theme.secondaryColor,
        color: "#ffffff",
        borderRadius: theme.borderRadius,
        padding: theme.spacing.small,
      },
    };
  }, [theme]);

  return styles;
}
