export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface FeatureConfig {
  showPagination: boolean;
  allowSorting: boolean;
  showSearch: boolean;
  exportData: boolean;
  rowActions: Array<"view" | "edit" | "delete">;
}

export interface ClientConfig {
  theme: ThemeConfig;
  features: FeatureConfig;
}

export const clientThemes: Record<string, ThemeConfig> = {
  "client-a": {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    fontFamily: "Arial, sans-serif",
    borderRadius: "4px",
    spacing: {
      small: "8px",
      medium: "16px",
      large: "24px",
    },
  },
  "client-b": {
    primaryColor: "#28a745",
    secondaryColor: "#dc3545",
    fontFamily: "Georgia, serif",
    borderRadius: "8px",
    spacing: {
      small: "12px",
      medium: "20px",
      large: "32px",
    },
  },
};

export const clientFeatures: Record<string, FeatureConfig> = {
  "client-a": {
    showPagination: true,
    allowSorting: true,
    showSearch: true,
    exportData: false,
    rowActions: ["edit", "delete"],
  },
  "client-b": {
    showPagination: false,
    allowSorting: false,
    showSearch: true,
    exportData: true,
    rowActions: ["view", "edit"],
  },
};

export const defaultTheme: ThemeConfig = {
  primaryColor: "#333333",
  secondaryColor: "#666666",
  fontFamily: "system-ui, sans-serif",
  borderRadius: "4px",
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};

export const defaultFeatures: FeatureConfig = {
  showPagination: true,
  allowSorting: true,
  showSearch: false,
  exportData: false,
  rowActions: [],
};
