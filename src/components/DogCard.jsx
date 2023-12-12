import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardActions from "@mui/material/CardActions";

function DogCard({ image, name, description }) {
  const [expanded, setExpanded] = useState(false);

  /* Cambia el estado para expandir o colapsar la sección de detalles */
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="dog">
            {name.charAt(0)}
          </Avatar>
        }
        /* Nombre del perro */
        title={name}
      />

      <CardMedia
        component="img"
        height="194" /* Altura de la imagen */
        image={image} /* URL de la imagen */
        alt={name} /* Texto alternativo para la imagen */
      />
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          sx={{ ml: "auto" }}
          aria-label="mostrar más"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Detalles:</Typography>
          <Typography
            variant="body2"
            color="text.primary"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

/* Definición de PropTypes para el componente */
DogCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onRegret: PropTypes.func /* Función opcional de "arrepentimiento" */,
};

export default DogCard; /* Exportación del componente DogCard */
