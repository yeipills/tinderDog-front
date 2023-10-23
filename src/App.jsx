import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dogImage, setDogImage] = useState('');
  const [dogName, setDogName] = useState('');
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);

  // Función para obtener una imagen aleatoria de perro
  const fetchDogImage = async () => {
    setIsLoading(true);
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message);
    setDogName(generateRandomName());
    setIsLoading(false);
  };

  // Función para generar un nombre aleatorio de 6 caracteres
  const generateRandomName = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  // Lógica para los botones
  const handleAccept = () => {
    setAcceptedDogs([{ name: dogName, image: dogImage }, ...acceptedDogs]);
    fetchDogImage();
  };

  const handleReject = () => {
    setRejectedDogs([{ name: dogName, image: dogImage }, ...rejectedDogs]);
    fetchDogImage();
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div className="container">
      {/* Columna del Candidato */}
      <div className="candidate">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <img src={dogImage} alt="Perro candidato" />
            <p>{dogName}</p>
            <button onClick={handleAccept}>Aceptar</button>
            <button onClick={handleReject}>Rechazar</button>
          </>
        )}
      </div>

      {/* Columna de Aceptados */}
      <div className="accepted">
        {acceptedDogs.map((dog) => (
          <img key={dog.name} src={dog.image} alt={dog.name} />
        ))}
      </div>

      {/* Columna de Rechazados */}
      <div className="rejected">
        {rejectedDogs.map((dog) => (
          <img key={dog.name} src={dog.image} alt={dog.name} />
        ))}
      </div>

      {/* Botón para arrepentirse (lo implementaremos en el siguiente paso) */}
      <button>Arrepentirse</button>
    </div>
  );
}

export default App;
