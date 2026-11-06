# Chef's Menu Manager — Christoffel's Menu App

Final Portfolio of Evidence (PoE) for MAST5112. Last updated: 6 November 2026.

A React Native (Expo) mobile app that lets a restaurant chef add, edit, delete, search, filter and review menu items from his phone, instead of keeping the menu on paper.

## Features

- Add a dish with Dish Name, Description, Course (Starter, Main or Dessert) and Price
- Edit an existing dish; the change shows straight away
- Delete a dish, with a confirmation pop-up
- Search for a dish by name, with a Clear button that resets search and filter
- Filter by course using the tabs (All, Starters, Mains, Desserts), together with search
- Menu statistics: total number of items, average price, and number of items per course
- Required-field validation with clear error messages
- Success messages for adding, updating and deleting a dish
- Editable owner name (three-line menu icon, top right), so the title shows e.g. "Olivia's Menu"
- Helpful message when no items are found

## Tech Stack

- React Native
- Expo SDK 58 (Expo Router for navigation)
- @react-native-picker/picker (Course dropdown)
- react-native-safe-area-context

## How to Run This Project

### 1. Clone the repository

```bash
git clone https://github.com/oliviadaisyy0-lgtm/ChefMenuApp.git
cd ChefMenuApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Open the app

- **On a phone:** install **Expo Go** and scan the QR code in the terminal. The phone and computer must be on the same Wi-Fi network. This project uses Expo SDK 58, so Expo Go must support SDK 58.
- **In a browser:** press `w` in the terminal. The course dropdown and some pop-ups can look different on web, so a phone is the best way to test.
- **On an emulator:** press `a` for Android or `i` for iOS.

## Project Structure

```
ChefMenuApp/
├── MenuContext.js            # Shared menu list and the add, update and delete functions
├── .npmrc                    # npm setting used so packages install without peer conflicts
├── src/
│   ├── app/
│   │   ├── _layout.js        # Root layout, wraps the app in MenuProvider
│   │   ├── index.js          # Home screen: search, filters, statistics, menu list
│   │   ├── adddishscreen.js  # Add and Edit screen (form and validation)
│   │   └── style.js          # Styling for both screens
│   └── components/
│       └── MenuCard.js       # Reusable card for one menu item
├── assets/
│   └── images/
│       └── chef-hat.png      # Header image
└── package.json
```

## Change Log (Part 2 to Final PoE)

### New features

- **Edit menu items:** every card has an Edit button that opens the form filled with the dish's details. Saving updates the item immediately.
- **Delete menu items:** every card has a Delete button with a confirmation pop-up (works on phone and web).
- **Search:** a search bar finds dishes by name and works together with the course filter.
- **Clear:** one button resets the search text and the course filter.
- **Menu statistics:** a card shows total items, average price, and the number of Starters, Mains and Desserts. It updates automatically.
- **Owner name:** the menu icon opens a box to enter a name. The title changes to "[Name]'s Menu" and can be changed at any time.

### Improvements

- Success messages now match the action: added, updated or deleted successfully.
- The empty-list message now explains what to do (clear the search or filter, or add a dish).
- The Add screen heading and button change to "Edit Dish" and "Save Changes" in edit mode.
- The statistics card, success message and menu cards were redesigned to be smaller and easier to read.
- Replaced the deprecated `SafeAreaView` from React Native with the one from `react-native-safe-area-context`, which removed the warning.

### Refactoring

- **One screen for add and edit:** `adddishscreen.js` handles both modes instead of using two separate forms.
- **Shared state:** `MenuContext.js` holds the menu list and the `addMenuItem`, `updateMenuItem` and `deleteMenuItem` functions, so every screen uses the same data.
- **Reusable component:** the menu item card was moved into `src/components/MenuCard.js` and is used for every dish.
- **Reusable functions:** `showBanner` (success messages), `cleanPrice` (price cleaning) and `countByCourse` (statistics) replace repeated code.
- **Single filter check:** search and course filtering are combined in one `filteredItems` check.
- **Clearer names:** `handleAddDish` was renamed `handleSave`, because it now saves both new and edited dishes.
- **Styles:** all styling stays in `style.js`, with new styles grouped together for search, statistics, action buttons and the name box.

### Setup changes

- Upgraded the project from Expo SDK 57 to SDK 58 so it works with the current Expo Go app.
- Added an `.npmrc` file (`legacy-peer-deps=true`) so `npm install` works without peer dependency errors.

## Notes

- Menu items are stored in the app while it is open and reset when the app is fully restarted.
