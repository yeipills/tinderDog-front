import { useState, useEffect, useCallback } from "react";
import RecipeReviewCard from "./components/RecipeReviewCard";
import DogCard from "./components/DogCard";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import "./App.css";
import Container from "@mui/material/Container";

function App() {// Creamos el componente
  const [currentDog, setCurrentDog] = useState(null);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogImage = useCallback(async () => {// Creamos la función fetchDogImage
    setIsLoading(true);
    try {// Dentro de un try/catch
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const dogName = generateRandomName();
      const dogDescription = generateRandomDesciption();
      setCurrentDog({// Actualizamos el estado de currentDog
        image: data.message,
        description: dogDescription,
        name: dogName,
      });// Con la imagen, descripción y nombre del perro
    } catch (error) {
      console.error("Error fetching dog image:", error);// Si hay un error, lo mostramos por consola
    } finally {
      setIsLoading(false);// Finalmente, actualizamos el estado de isLoading
    }
  }, []);

  useEffect(() => {
    fetchDogImage();
  }, [fetchDogImage]);// Llamamos a fetchDogImage en el useEffect

  const generateRandomName = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }// Creamos una función para generar un nombre aleatorio
    return result;
  };// Con 6 caracteres aleatorios

  const generateRandomDesciption = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let resultDescription = "";
    const lineLength = 40;
  // Creamos una función para generar una descripción aleatoria
    for (let i = 0; i < 130; i++) {
      if (i > 0 && i % lineLength === 0) {
        resultDescription += '\n';   
      }
      resultDescription += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );// Con 130 caracteres aleatorios
    }
    return resultDescription;
  };// Con saltos de línea cada 40 caracteres

  const handleAccept = () => {
    if (isLoading) return;
    if (currentDog) {
      setAcceptedDogs([currentDog, ...acceptedDogs]);
      fetchDogImage();
    }
  };// Creamos la función handleAccept para aceptar

  const handleReject = () => {
    if (isLoading) return;
    if (currentDog) {
      setRejectedDogs([currentDog, ...rejectedDogs]);
      fetchDogImage();
    }
  };// Creamos la función handleReject para rechazar

  const handleRegret = () => {
    if (isLoading) return;
    if (acceptedDogs.length > 0) {
      const lastAcceptedDog = acceptedDogs[0];
      setAcceptedDogs(acceptedDogs.slice(1));
      setCurrentDog(lastAcceptedDog);
    } else if (rejectedDogs.length > 0) {
      const lastRejectedDog = rejectedDogs[0];
      setRejectedDogs(rejectedDogs.slice(1));
      setCurrentDog(lastRejectedDog);
    }
  };// Creamos la función handleRegret para arrepentirse

  return (
    <Container
      className="main-card"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: "#242424",
        padding: "5 rem"
      }}
    >
      <Box className="app">
        <Box className="candidate" sx={{ bgcolor: "#ECCBFF", margin: "2rem", borderRadius: "8px" }}>
          <CardHeader
            title="Perrito candidato"
            titleTypographyProps={{ color: "secondary" }}
          />
          {currentDog && (
            <RecipeReviewCard
              image={currentDog.image}
              name={currentDog.name}
              description={currentDog.description}
              onAccept={handleAccept}
              onReject={handleReject}
              onRegret={handleRegret}
              isLoading={isLoading}  
            />
          )}
        </Box>
  
        <Box className="accepted-list" sx={{ bgcolor: "#C9F3CC", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title=" Perrito aceptado"
            titleTypographyProps={{ color: "primary" }}
          />
          {acceptedDogs.map((dog, index) => (
            <DogCard
              key={index}
              image={dog.image}
              name={dog.name}
              description={dog.description}
            />
          ))}
        </Box>
  
        <Box className="rejected-list" sx={{ bgcolor: "#FFBEC8", margin: "1rem", borderRadius: "8px" }}>
          <CardHeader
            title="Perrito rechazado"
            titleTypographyProps={{ color: "error" }}
          />
          {rejectedDogs.map((dog, index) => (
            <DogCard
              key={index}
              image={dog.image}
              name={dog.name}
              description={dog.description}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}  

export default App;// Exportamos el componente App
