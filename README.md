# Chef Christoffel's Menu App

A React Native (Expo) mobile application built for Part 2 of the MAST5112 POE.
Allows a restaurant chef to add and view menu items through a simple, user-friendly interface.

## Features

- Add a new dish with Dish Name, Description, Course, and Price
- Required-field validation with inline error messages
- Success confirmation banner when a dish is added
- Automatically updating menu list, with filter tabs (All / Starters / Mains / Desserts)
- Empty-state message when no items exist yet
- Edit and delete existing menu items (with a delete confirmation)
- Search for a dish by name, with a Clear button to reset search and filter
- Menu statistics: total items, average price, and number of items per course
- Editable owner name (three-line menu icon, top right) so the title shows e.g. "Olivia's Menu"

## Tech Stack

- React Native
- Expo (Expo Router for navigation)
- @react-native-picker/picker (for the Course dropdown)

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

This installs everything listed in `package.json`, including `@react-native-picker/picker`.

### 3. Start the development server

```bash
npx expo start
```

### 4. Open the app

- **On a phone**: install the **Expo Go** app (from the App Store or Google Play), then scan the QR code shown in the terminal. Phone and computer must be on the same Wi-Fi network.
- **In a browser**: press `w` in the terminal after starting, or visit the printed `http://localhost:8082` link. (Note: the course dropdown may behave slightly differently on web vs. a real phone.)
- **On an emulator**: press `a` for Android or `i` for iOS if you have an emulator set up.

## Project Structure

```
ChefMenuApp/
├── MenuContext.js          # Shared state for menu items across screens
├── src/
│   └── app/
│       ├── _layout.js      # Root layout, wraps app in MenuProvider
│       ├── index.js        # Home screen (menu list + filters)
│       ├── adddishscreen.js # Add New Dish screen (form + validation)
│       └── style.js        # Shared styling for both screens
├── assets/
│   └── images/
│       └── chef-hat.png    # Header image
└── package.json
```

## Notes

- Edit and delete existing menu items (with a delete confirmation)
- Search for a dish by name, with a Clear button to reset search and filter
- Menu statistics: total items, average price, and number of items per course
- Editable owner name (three-line menu icon, top right) so the title shows e.g. "Asukia's Menu"
- If you see a yellow "SafeAreaView has been deprecated" warning on launch, this is expected and does not affect functionality.

## Change Log (Part 2 to Final PoE)

### New features

- **Edit menu items:** each card has an Edit button that opens the form filled with the dish's details. Saving updates the item straight away.
- **Delete menu items:** each card has a Delete button with a confirmation pop-up (works on phone and web).
- **Search:** a search bar finds dishes by name. It works together with the course filter tabs.
- **Clear:** one button resets both the search text and the course filter to show all items.
- **Menu statistics:** a card shows total items, average price, and the number of Starters, Mains and Desserts. It updates automatically.
- **Owner name:** the three-line icon opens a box to enter a name. The title changes to "[Name]'s Menu" and can be changed any time.

### Improvements

- Success messages now match the action: "added", "updated" or "deleted" successfully.
- The empty-list message explains how to fix an empty result (clear the search or filter, or add a dish).
- The statistics card was redesigned to be compact and easy to read.
- The Add screen heading and button change to "Edit Dish" and "Save Changes" in edit mode.

### Refactoring

- **One screen for add and edit:** `adddishscreen.js` handles both modes, instead of duplicating a second form screen.
- **Shared state:** `MenuContext.js` holds the menu list and the `addMenuItem`, `updateMenuItem` and `deleteMenuItem` functions, so both screens use the same data.
- **Reusable functions:** `showBanner` (success messages) in `MenuContext.js`, `cleanPrice` (price cleaning), and `countByCourse` (statistics) replace repeated code.
- **Single filter function:** search and course filtering are combined in one `filteredItems` check.
- **Clearer names:** `handleAddDish` was renamed `handleSave` because it now saves both new and edited dishes.
- **Styles:** all styling stays in `style.js`, with new styles grouped for search, statistics, action buttons and the name box.
