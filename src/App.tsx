import React from "react";
import Weather from "./components/Weather";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme/ThemeContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
          <Weather />
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
