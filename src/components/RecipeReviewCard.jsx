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

export default function RecipeReviewCard({
  image,
  name,
  onAccept,
  onReject,
  onRegret,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="dog">
            {name.charAt(0)}
          </Avatar>
        }
        title={name}
        subheader="Candidato Canino"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Perro candidato"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Este es {name}, un candidato canino que busca ser aceptado. ¿Qué
          opinas?
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="aceptar" onClick={onAccept}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="rechazar" onClick={onReject}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="arrepentirse" onClick={onRegret}>
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="mostrar más"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Detalles:</Typography>
          <Typography paragraph>
            Aquí puedes agregar más detalles sobre el perro, su historia,
            características o cualquier otro dato relevante.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onRegret: PropTypes.func.isRequired,
};