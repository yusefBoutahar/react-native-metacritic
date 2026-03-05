# Test Coverage Analysis

## Current State

**Test coverage: 0%** — The project has no test files, no test runner configured, and no testing dependencies installed.

There are 14 source files across components, screens, a service layer, and a proxy server, none of which have any tests.

---

## Recommended Testing Setup

Install the following dependencies to get started:

```bash
npx expo install -- --save-dev jest @testing-library/react-native @testing-library/jest-native jest-expo
```

Add to `package.json`:
```json
"scripts": {
  "test": "jest"
},
"jest": {
  "preset": "jest-expo"
}
```

---

## Priority Areas for Test Coverage

### 1. `lib/metacritic.js` — API Service Layer (HIGH PRIORITY)

This is the most critical file to test. It contains all data-fetching and transformation logic, making it the backbone of the app. It has pure data-mapping logic that is easy to test in isolation.

**What to test:**
- **`getLatestGames()`** — Mock `fetch`, verify it correctly maps the raw API response (extracts `title`, `slug`, `score`, `description`, constructs the image URL from `bucketType` + `bucketPath`)
- **`getGameDetails(slug)`** — Mock `fetch`, verify it extracts the correct component from `components[0].data.item`, finds the `cardImage` from the images array, and maps reviews from `components[3].data.items`
- **Error handling** — Currently neither function handles fetch failures or malformed responses. Tests should document this gap and verify behavior when `fetch` rejects or returns unexpected JSON structures
- **Edge cases** — Empty items array, missing `criticScoreSummary`, missing image fields, empty reviews array

**Why it matters:** A breaking API response change will silently break the entire app. Tests here act as a contract between the app and the external API.

---

### 2. `components/Score.jsx` — Score Badge (HIGH PRIORITY)

Small, pure component with color-selection logic that has a likely bug.

**What to test:**
- Score of 96 renders with red background (`bg-red-500`)
- Score of 97 renders with yellow background (`bg-yellow-500`)
- Score of 98+ renders with green background (`bg-green-500`)
- Score is displayed as text inside the badge

**Potential bug:** The `getColor()` function computes `(score / 100) * 100` which simplifies to just `score`. The thresholds (97, 98) seem too high for a 0–100 scale — almost every game would get red. This is likely a bug where the thresholds should be something like 50 and 75, or the formula should normalize differently. Tests would make this immediately visible.

---

### 3. `components/GameCard.jsx` — Game Card (MEDIUM PRIORITY)

Renders a game's image, title, score, and truncated description with navigation.

**What to test:**
- Renders game title, score, and image correctly
- Description is truncated to 100 characters with "..." appended
- Links to the correct detail route (`/${game.slug}`)
- Handles edge case: game with empty or very short description

---

### 4. `components/Main.jsx` — Game List Screen (MEDIUM PRIORITY)

Orchestrates data fetching and renders the list of games.

**What to test:**
- Shows loading indicator (`ActivityIndicator`) while games are being fetched
- Renders a `FlatList` of games after successful fetch
- Shows error text when `getLatestGames()` rejects
- Uses `game.slug` as the key extractor

---

### 5. `app/[id].js` — Game Detail Screen (MEDIUM PRIORITY)

Dynamic route that fetches and displays full game details.

**What to test:**
- Shows loading indicator while fetching
- Renders game image, title, description, and score after fetch
- Shows error message when `getGameDetails()` rejects
- Sets header title to game title (or "Cargando..." while loading)
- Does not fetch when `id` is undefined/null

---

### 6. `components/AnimatedCard.jsx` — Animated Wrapper (LOW PRIORITY)

Wraps `GameCard` with a fade-in animation.

**What to test:**
- Renders the child `GameCard` component
- Animation delay is calculated from `index * 200`
- Opacity starts at 0

---

### 7. `components/Screen.jsx`, `components/Icons.jsx` — Simple UI Components (LOW PRIORITY)

These are thin wrappers and static SVG icons with minimal logic.

**What to test:**
- `Screen` renders children with correct background styling
- Icon components render without crashing (snapshot or smoke tests)

---

### 8. `server/proxy.js` — Express Proxy Server (LOW PRIORITY)

This file appears to be unused by the app (the app calls the API directly). Consider removing it or, if it's needed for web builds:

**What to test:**
- `GET /api/latest-games` proxies to the Metacritic API and returns JSON
- `GET /api/game-details/:slug` proxies with the correct slug
- Returns 500 on upstream failure
- CORS headers are present

---

## Summary Table

| File | Priority | Reason |
|---|---|---|
| `lib/metacritic.js` | HIGH | Core data layer, API contract, data transformation logic |
| `components/Score.jsx` | HIGH | Contains color logic with a likely bug |
| `components/GameCard.jsx` | MEDIUM | Key UI component with truncation and navigation |
| `components/Main.jsx` | MEDIUM | Async state management, loading/error states |
| `app/[id].js` | MEDIUM | Async state management, dynamic routing |
| `components/AnimatedCard.jsx` | LOW | Thin animation wrapper |
| `components/Screen.jsx` | LOW | Simple layout wrapper |
| `components/Icons.jsx` | LOW | Static SVG icons |
| `server/proxy.js` | LOW | Appears unused |

## Bugs and Issues Discoverable Through Testing

1. **`Score.jsx` color thresholds are almost certainly wrong.** The formula `(score / 100) * 100` is a no-op, and thresholds of 97/98 mean virtually all games show red. Likely should be thresholds like 50/75 or the score should be compared differently.

2. **No error handling in `lib/metacritic.js`.** If the API returns an unexpected shape (missing `data.items`, missing `components[0]`, etc.), the app will crash with an unhelpful error. Tests would document expected error behavior and drive adding proper error handling.

3. **`Main.jsx` error display has a bug.** `error` is set from a caught Promise rejection (an Error object), but rendered as `{error}` inside `<Text>`. React Native cannot render Error objects as text — this would crash. It should be `{error.message}`.

4. **`GameCard.jsx` will crash if `description` is null/undefined.** The `.slice(0, 100)` call on `game.description` will throw if description is missing.
