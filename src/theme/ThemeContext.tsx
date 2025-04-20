import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Interface describing the shape of the Theme Context.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * `ThemeContext` provides access to the current theme ("light" or "dark")
 * and a function to toggle between them.
 */
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

/**
 * `ThemeProvider` wraps your application and provides a context
 * for managing light/dark mode across the app.
 *
 * It uses localStorage to persist the user's theme preference,
 * and also respects the user's system preference on initial load.
 *
 * It also toggles the `dark` class on the HTML document element,
 * which is required for Tailwind's dark mode support.
 *
 * @component
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @param {object} props - Props containing `children`, the wrapped component tree.
 * @returns {JSX.Element} A context provider that supplies the theme and toggle method.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Load saved theme from localStorage or fallback to system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored) {
      setTheme(stored);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  // Apply the theme to the document and store it in localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Toggle the theme between light and dark.
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
