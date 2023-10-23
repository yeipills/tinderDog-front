import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [lastAction, setLastAction] = useState(null); // 'accepted' o 'rejected'

  // Función para obtener una imagen aleatoria de perro
  const fetchDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return {
      image: data.message,
      name: generateRandomName()
    };
  };

  const { data: dog, isLoading, refetch } = useQuery('dogImage', fetchDogImage, {
    staleTime: 0
  });

  // Función para generar un nombre aleatorio de 6 caracteres
  const generateRandomName = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  // Lógica para los botones
  const handleAccept = useCallback(() => {
    if (dog) {
      setAcceptedDogs([dog, ...acceptedDogs]);
      setLastAction('accepted');
      refetch();
    }
  }, [dog, acceptedDogs, refetch]);

  const handleReject = useCallback(() => {
    if (dog) {
      setRejectedDogs([dog, ...rejectedDogs]);
      setLastAction('rejected');
      refetch();
    }
  }, [dog, rejectedDogs, refetch]);

  const handleRepent = () => {
    if (lastAction === 'accepted' && acceptedDogs.length > 0) {
      const lastAcceptedDog = acceptedDogs[0];
      setAcceptedDogs(acceptedDogs.slice(1));
      setRejectedDogs([lastAcceptedDog, ...rejectedDogs]);
    } else if (lastAction === 'rejected' && rejectedDogs.length > 0) {
      const lastRejectedDog = rejectedDogs[0];
      setRejectedDogs(rejectedDogs.slice(1));
      setAcceptedDogs([lastRejectedDog, ...acceptedDogs]);
    }
  };

  return (
    <div className="container">
      {/* Columna del Candidato */}
      <div className="candidate">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <img src={dog?.image} alt="Perro candidato" />
            <p>{dog?.name}</p>
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

      {/* Botón para arrepentirse */}
      <button onClick={handleRepent}>Arrepentirse</button>
    </div>
  );
}

export default App;
