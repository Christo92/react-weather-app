import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme/ThemeContext";
import { Toaster } from "react-hot-toast";
import Weather from "./components/Weather";
import SplashScreen from "./components/SplashScreen"; // Importation du SplashScreen

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <Routes>
              <Route path="/" element={<SplashScreen />} /> {/* Page d'accueil avec animation */}
              <Route path="/weather" element={<Weather />} /> {/* Page météo */}
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
