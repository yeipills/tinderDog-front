import { useState, useEffect, useCallback } from "react";
import RecipeReviewCard from "./components/RecipeReviewCard";
import DogCard from "./components/DogCard";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import "./App.css";
import Container from "@mui/material/Container";
import { red } from "@mui/material/colors";
import { Card } from "@mui/material";

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);

  const fetchDogImage = useCallback(async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const dogName = generateRandomName();
      const dogDescription = generateRandomDesciption();
      setCurrentDog({ image: data.message, description: dogDescription ,name: dogName });
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

  const generateRandomDesciption = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let resultDescription = "";
    for (let i = 20; i < 50; i++) {
      resultDescription += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return resultDescription;
  };

  const
  handleAccept = () => {
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
    <Container className="main-card" sx={{ border: "5 rem", bgcolor: "#242424", padding: "5 rem" }}>

      <Box className="app">

        <Box sx={{ bgcolor: "#ECCBFF", margin: "1rem", borderRadius: "px" }}>
          <CardHeader
            title="Perrito candidato"
            titleTypographyProps={{ color: "secondary" }}
          />
          {currentDog && (
            <RecipeReviewCard
              image={currentDog.image}
              name={currentDog.name}
              description={currentDog.description}
              onAccept={handleAccept}//boton de aceptar
              onReject={handleReject}//boton de rechazo
              onRegret={handleRegret}//boton de arrepentimiento
            />
          )}
        </Box>


        <Box sx={{ bgcolor: "#C9F3CC", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title=" Perrito aceptado"
            titleTypographyProps={{ color: "primary" }}
          />
          {acceptedDogs.map((dog, index) => (
            <DogCard key={index} image={dog.image} name={dog.name} description={dog.description} />
          ))}
        </Box>


        <Box sx={{ bgcolor: "#FFBEC8", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title="Perrito rechazado"
            titleTypographyProps={{ color: "error" }}
          />
          {rejectedDogs.map((dog, index) => (
            <DogCard key={index} image={dog.image} name={dog.name} description={dog.description} />
          ))}
        </Box>


      </Box>
    </Container>
  );
}

export default App;