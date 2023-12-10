import React, { useState, useEffect } from "react";

function DogList({ onSelectDog }) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch("http://localhost:8000/api/perros");
      const data = await response.json();
      setDogs(data);
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <h2>Selecciona un Perro Interesado</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id} onClick={() => onSelectDog(dog)}>
            {dog.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogList;
