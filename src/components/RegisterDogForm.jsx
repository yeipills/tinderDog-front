import React, { useState } from "react";

function RegisterDogForm() {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [dogImage, setDogImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/perros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: dogName,
          descripcion: dogDescription,
          url_foto: dogImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el perro");
      }

      // Limpia el formulario
      setDogName("");
      setDogDescription("");
      setDogImage("");
      alert("Perro registrado con éxito");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRandomDogImage = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setDogImage(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
        placeholder="Nombre del perro"
        required
      />
      <textarea
        value={dogDescription}
        onChange={(e) => setDogDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <input
        type="text"
        value={dogImage}
        onChange={(e) => setDogImage(e.target.value)}
        placeholder="URL de la imagen"
        required
      />
      <button type="button" onClick={fetchRandomDogImage}>
        Obtener imagen aleatoria
      </button>
      <button type="submit">Registrar Perro</button>
    </form>
  );
}

export default RegisterDogForm;
