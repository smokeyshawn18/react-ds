## Identified Performance Issues

1. **Expensive Filtering and Sorting on Every Render**
   - Filtering and sorting are performed directly inside the render function, causing recalculation on every render, even if unrelated state changes.
2. **Unnecessary Re-Rendering of UserCard Components**
   - Each UserCard is recreated on every render, and the department lookup (`departments.find(...)`) occurs for each user on each render.
3. **No Memoization of Derived Data**
   - No use of `useMemo` for filtered/sorted users, leading to unnecessary computations.
4. **UserCard Not Memoized**
   - UserCard could be wrapped in `React.memo` to prevent unnecessary re-renders when props don't change.
5. **Inefficient Inline Functions**
   - Arrow functions (e.g., `onClick={() => onUserSelect(user)}`) are created for each UserCard on every render.
6. **No Key Optimization**
   - Not a direct issue, but ensure stable unique keys for lists.
7. **No Performance Monitoring/Profiling**
   - No React Profiler or performance logging implemented.

---

<!-- Optimizations -->

**Key Optimizations:**

- Memoize filtered and sorted users
- Memoize department lookup
- Memoize UserCard
- Memoize callbacks
- Minimize expensive calculations in render

---

**Add Performance Monitoring:**

- Use React DevTools Profiler to measure component render timings
- Add `console.time`/`console.timeEnd` around memoized sections
- (Optional) Integrate `why-did-you-render` library
  ``

## Add Performance Monitoring to SlowUserList

**Steps:**

1. Integrate [React DevTools Profiler](https://react.dev/reference/react/Profiler) and measure before/after render timings.
2. Add `console.time('filter-sort')` and `console.timeEnd('filter-sort')` around the filter/sort logic to measure CPU time for those steps.
3. Optionally, install [`why-did-you-render`](https://github.com/welldone-software/why-did-you-render) to detect unnecessary renders during development.

**Example:**

```jsx
const filteredSortedUsers = useMemo(() => {
  console.time("filter-sort");
  const result = users.filter(/**/).sort(/**/);
  console.timeEnd("filter-sort");
  return result;
}, [users, searchTerm, selectedDepartment]);
```

**Goal:**

- Quantify improvement in render and compute performance
- Detect and prevent regressions
