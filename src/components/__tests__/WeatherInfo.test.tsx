import { render, screen } from "@testing-library/react";
import WeatherInfo from "../WeatherInfo"; // Assure-toi que le chemin d'importation est correct

// Mock de iconMap pour éviter les erreurs de fichier manquant
jest.mock("../../utils/iconMap", () => ({
  "01d": "clearIcon.png", // Remplace cela par l'URL de ton icône
  "02d": "cloudIcon.png",
}));

describe("WeatherInfo Component", () => {
  const mockData = {
    temp: 20,
    city: "Paris",
    icon: "01d",
    humidity: 75,
    wind: 15,
  };

  it("displays the correct icon based on the icon prop", () => {
    const { rerender } = render(<WeatherInfo {...mockData} />);

    // Vérifier l'icône initiale (clearIcon.png)
    let weatherIcon = screen.getByAltText("weather");
    expect(weatherIcon).toHaveAttribute("src", "clearIcon.png");

    // Modifier la prop icon pour tester un autre cas (cloudIcon.png)
    const updatedMockData = { ...mockData, icon: "02d" };
    rerender(<WeatherInfo {...updatedMockData} />);

    // Vérifier l'icône mise à jour
    weatherIcon = screen.getByAltText("weather");
    expect(weatherIcon).toHaveAttribute("src", "cloudIcon.png");
  });
});
