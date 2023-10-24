import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UndoIcon from "@mui/icons-material/Undo";
import PropTypes from "prop-types";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function RecipeReviewCard({// Exportamos el componente
  image,
  name,
  description,
  onAccept,
  onReject,
  onRegret,
  isLoading,
  // Añadimos las props onAccept, onReject, onRegret y isLoading
}) {
  const [expanded, setExpanded] = useState(false);// Estado para controlar la apertura/cierre del Collapse

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };// Cambiamos el estado de la variable expanded

  return (// Retornamos el componente
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="dog">
            {name.charAt(0)}
          </Avatar>
        }
        title={name}
        subheader="Candidato Canino"
      />// El título de la card será el nombre del perro

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="194px">
          <CircularProgress />
        </Box>// Si isLoading es true, mostramos un CircularProgress
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Perro candidato"
        />// La imagen de la card será la imagen del perro
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Este es {name}, un candidato canino que busca ser aceptado. ¿Qué opinas?
        </Typography>
      </CardContent>// El texto de la card será la descripción del perro

      <CardActions disableSpacing>
        <IconButton
          disabled={isLoading}
          aria-label="aceptar"
          onClick={onAccept}
        >// El botón de aceptar
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          disabled={isLoading}
          aria-label="rechazar"
          onClick={onReject}// El botón de rechazar
        >
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="arrepentirse" onClick={onRegret}>// El botón de arrepentirse
          <UndoIcon />
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          sx={{ ml: 'auto' }}
          aria-label="mostrar más"
        >// El botón de expandir/cerrar el Collapse
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Detalles:</Typography>
          <Typography
            variant="body3"
            color="text.primari"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onRegret: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};// Definimos las props del componente
