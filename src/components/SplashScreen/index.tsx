import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import sunIcon from "../../assets/clear.png";

/**
 * `SplashScreen` is a temporary animated screen displayed when the app starts.
 * It features a simple fade-in animation with a "Weather" title and sun icon,
 * and automatically redirects to the main weather page (`/weather`) after 2 seconds.
 *
 * This component enhances the user experience by adding a branded transition
 * before the main content is shown.
 *
 * @component
 * @example
 * return <SplashScreen />
 */
const SplashScreen = () => {
  const navigate = useNavigate();

  // Redirect to the weather page after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/weather");
    }, 2000);

    // Clear timeout if the component unmounts early
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #3b82f6, #6366f1)",
      }}
    >
      <motion.div
        className="splash-screen"
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.div
          className="splash-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#4a4a4a",
          }}
        >
          <img
            src={sunIcon}
            alt="Sun"
            style={{ width: "60px", height: "60px" }}
          />
          Weather
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
