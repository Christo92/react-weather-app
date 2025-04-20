import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";

const iconMap: Record<string, string> = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};

export default iconMap;
