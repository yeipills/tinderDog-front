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
  description,
  onAccept,
  onReject,
  onRegret,
  isLoading,
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
        <IconButton
          disabled={isLoading}
          aria-label="aceptar"
          onClick={onAccept}
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          disabled={isLoading}
          aria-label="rechazar"
          onClick={onReject}
        >
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="arrepentirse" onClick={onRegret}>
          <UndoIcon />
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          sx={{ ml: 'auto' }}
          aria-label="mostrar más"
        >
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
            {" "}
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
};
