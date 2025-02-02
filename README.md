# Work Dashboard

A Chrome-based work dashboard to help you stay up-to-date with multiple time zones, manage schedules, and track todos. This project is designed to be a lightweight, customizable, and user-friendly tool for productivity.

---

## Features

### 1. **Dual Timezone Display**
   - View the current time in **two timezones** (e.g., California and India).
   - Automatically updates every second for real-time accuracy.

### 2. **Custom Schedules**
   - Add and manage your daily schedules with **title, start time, and end time**.
   - Schedules are saved in `localStorage` for persistence across sessions.

### 3. **Todo List**
   - Add, complete, and delete todos.
   - Todos are saved in `localStorage` for persistence.

### 4. **Bookmarks**
   - Quick access to your favorite websites.
   - Automatically fetches Chrome bookmarks (if available) or uses a default list.

### 5. **Dark/Light Mode**
   - Toggle between dark and light themes for better visibility.
   - Theme preference is saved in `localStorage`.

---

## Technologies Used

- **NextJs**: Frontend framework for building the UI.
- **shadcn/ui**: Modern and customizable UI components.
- **Lucide Icons**: Lightweight and customizable icons.
- **LocalStorage**: Persists todos, schedules, and theme preferences.

---

## How to Use

1. **Clone the Repository**:

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Project**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   - Navigate to `http://localhost:3000` to view the dashboard.

---

## Components

### 1. **TimeCards**
   - Displays the current time in two timezones.
   - Automatically updates every second.

### 2. **Bookmarks**
   - Displays a list of bookmarks for quick access.
   - Fetches Chrome bookmarks if available.

### 3. **CustomSchedule**
   - Allows users to add and manage schedules.
   - Schedules are saved in `localStorage`.

### 4. **TodoList**
   - A simple todo list with add, complete, and delete functionality.
   - Todos are saved in `localStorage`.

---

## Screenshots

![image](https://github.com/user-attachments/assets/b7245889-7e0c-4787-be46-01e5b5e8f754)

---

## Future Improvements

- Add support for more timezones.
- Integrate with Google Calendar for automatic schedule updates.
- Add drag-and-drop functionality for todos and schedules.
- Improve UI/UX for mobile responsiveness.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

Enjoy staying productive with the **Work Dashboard**! 🚀
