import { useState, useEffect, useCallback } from "react";
import RecipeReviewCard from "./components/RecipeReviewCard";
import DogCard from "./components/DogCard";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);

  const fetchDogImage = useCallback(async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const dogName = generateRandomName();
      setCurrentDog({ image: data.message, name: dogName });
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  }, []);

  useEffect(() => {
    fetchDogImage();
  }, [fetchDogImage]);

  const generateRandomName = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleAccept = () => {
    if (currentDog) {
      setAcceptedDogs([currentDog, ...acceptedDogs]);
      fetchDogImage();
    }
  };

  const handleReject = () => {
    if (currentDog) {
      setRejectedDogs([currentDog, ...rejectedDogs]);
      fetchDogImage();
    }
  };

  const handleRegret = () => {
    if (acceptedDogs.length > 0) {
      const lastAcceptedDog = acceptedDogs[0];
      setAcceptedDogs(acceptedDogs.slice(1));
      setCurrentDog(lastAcceptedDog);
    } else if (rejectedDogs.length > 0) {
      const lastRejectedDog = rejectedDogs[0];
      setRejectedDogs(rejectedDogs.slice(1));
      setCurrentDog(lastRejectedDog);
    }
  };

  return (
    <Box className="main-card" sx={{ bgcolor: "#242424", padding: "10rem" }}>
      <div className="app">
        <Box sx={{ bgcolor: "#ECCBFF", margin: "1rem", borderRadius: "px" }}>
          <CardHeader
            title="Candidato"
            titleTypographyProps={{ color: "secondary" }}
          />
          {currentDog && (
            <RecipeReviewCard
              image={currentDog.image}
              name={currentDog.name}
              onAccept={handleAccept}
              onReject={handleReject}
              onRegret={handleRegret}
            />
          )}
        </Box>
        <Box sx={{ bgcolor: "#C9F3CC", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title="Aceptado"
            titleTypographyProps={{ color: "primary" }}
          />
          {acceptedDogs.map((dog, index) => (
            <DogCard key={index} image={dog.image} name={dog.name} />
          ))}
        </Box>
        <Box sx={{ bgcolor: "#FFBEC8", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title="Rechazado"
            titleTypographyProps={{ color: "error" }}
          />
          {rejectedDogs.map((dog, index) => (
            <DogCard key={index} image={dog.image} name={dog.name} />
          ))}
        </Box>
      </div>
    </Box>
  );
}

export default App;