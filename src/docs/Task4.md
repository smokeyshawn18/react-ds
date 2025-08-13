# White-Label DataTable Component - Task 4

This component provides a fully configurable data table that can be styled and feature-toggled based on different client configurations.

## Features

- **Themeable**: Configure colors, fonts, spacing, and other visual aspects per client
- **Feature Toggles**: Enable/disable pagination, sorting, search, export, and row actions per client
- **Consistent API**: The same component API works across all client configurations
- **Extensible**: Easy to add new themes, features, or client configurations

## Usage

### Basic Usage

```jsx
import WhiteLabelDataTable from "./components/dataTable/WhiteLabelDataTable";

function MyComponent() {
  return (
    <WhiteLabelDataTable
      data={myData}
      columns={myColumns}
      clientId="client-a" // Use predefined client configuration
    />
  );
}
```

### Custom Configuration

```jsx
import WhiteLabelDataTable from "./components/dataTable/WhiteLabelDataTable";

// Custom theme
const customTheme = {
  primaryColor: "#8A2BE2",
  secondaryColor: "#FF7F50",
  fontFamily: "Roboto, sans-serif",
  borderRadius: "12px",
  spacing: {
    small: "10px",
    medium: "20px",
    large: "30px",
  },
};

// Custom features
const customFeatures = {
  showPagination: true,
  allowSorting: true,
  showSearch: true,
  exportData: true,
  rowActions: ["view", "edit", "delete"],
};

function MyComponent() {
  return (
    <WhiteLabelDataTable
      data={myData}
      columns={myColumns}
      theme={customTheme}
      features={customFeatures}
      onRowAction={(action, row) => {
        console.log(`Action ${action} on:`, row);
      }}
    />
  );
}
```

## Configuration Options

### Theme Configuration

```typescript
interface ThemeConfig {
  primaryColor: string; // Main brand color
  secondaryColor: string; // Secondary color for accents
  fontFamily: string; // Font family for the table
  borderRadius: string; // Border radius for UI elements
  spacing: {
    // Spacing scale
    small: string;
    medium: string;
    large: string;
  };
}
```

### Feature Configuration

```typescript
interface FeatureConfig {
  showPagination: boolean; // Show pagination controls
  allowSorting: boolean; // Allow column sorting
  showSearch: boolean; // Show search input
  exportData: boolean; // Show export button
  rowActions: Array<"view" | "edit" | "delete">; // Available row actions
}
```

## Adding New Clients

To add a new client configuration:

1. Add a new entry to the `clientThemes` object in `interfaces/themeInterface.ts`:

```typescript
'client-c': {
  primaryColor: '#9c27b0',
  secondaryColor: '#ff9800',
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '6px',
  spacing: {
    small: '10px',
    medium: '18px',
    large: '28px'
  }
}
```

2. Add a new entry to the `clientFeatures` object in the same file:

```typescript
'client-c': {
  showPagination: true,
  allowSorting: true,
  showSearch: true,
  exportData: true,
  rowActions: ['view', 'edit']
}
```

3. Use the new client ID in your component:

```jsx
<WhiteLabelDataTable data={myData} columns={myColumns} clientId="client-c" />
```

## Extending the Component

The component is designed to be extensible. To add new features:

1. Update the `FeatureConfig` interface with your new feature flag
2. Update the `clientFeatures` object for each client
3. Implement the feature in the `WhiteLabelDataTable` component
4. Update the theme styles in `useThemeStyles` if the feature requires new styling
