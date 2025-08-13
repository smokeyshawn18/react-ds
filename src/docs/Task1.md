# UI Component Library

A flexible React component library built with TypeScript for building professional web interfaces.

## Components

### DataTable

A powerful data table for displaying and interacting with structured data.

**Features:**

- Sortable columns
- Pagination
- Loading states
- Custom cell rendering
- Responsive design
- Empty state handling

**Example:**

```tsx
<DataTable<User>
  data={users}
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (user) => <UserActions user={user} />,
    },
  ]}
  onSort={handleSort}
  pagination={{ page: 1, pageSize: 10, total: 100 }}
  onPageChange={handlePageChange}
/>
```

### Modal

A flexible dialog component that renders outside the normal DOM flow.

**Features:**

- Portal-based rendering
- Focus management
- Keyboard navigation
- Multiple size options
- Smooth animations
- Body scroll locking

**Example:**

```tsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Edit Profile"
  size="medium"
>
  <ProfileForm user={currentUser} />
</Modal>
```

### Form Inputs

#### TextInput

Text input with validation support.

```tsx
<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  required
  validate={validateEmail}
  placeholder="your@email.com"
/>
```

#### SelectInput

Dropdown select with search capability.

```tsx
<SelectInput
  label="Country"
  value={country}
  onChange={setCountry}
  options={countryOptions}
  searchable
/>
```

#### FileUpload

File upload with drag and drop support.

```tsx
<FileUpload
  label="Profile Image"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onChange={handleFileChange}
/>
```

#### DatePicker

Date selection with calendar interface.

```tsx
<DatePicker
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  minDate={new Date()}
/>
```

## Accessibility

All components are built with accessibility in mind:

- Semantic HTML structure
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## Styling

Components use a consistent styling approach:

- Theme-based design system
- Tailwind
- Responsive by default
- Customizable via props, interfaces, types
- Consistent spacing and typography

## Error Handling

Robust error handling throughout:

- Form validation
- Loading states
- Empty states
- Error boundaries
- Fallback UI for failures
