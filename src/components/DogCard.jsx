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
import { CardActions } from "@mui/material";

function DogCard({ image, name, description }) {
  const [expanded, setExpanded] = useState(false); // Estado para controlar la apertura/cierre del Collapse

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
        title={name}
      />

      <CardMedia
        className="card-image"
        component="img"
        image={image}
        alt={name}
      />

      <CardActions>
        <IconButton
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
              style={{ wordWrap: "break-word" , overflowWrap: "break-word"}}
            >
              {" "}
              {description}
            </Typography>
          </CardContent>
        </Collapse>
    </Card>
  );
}
DogCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onRegret: PropTypes.func, // Si esta prop no es obligatoria
};

export default DogCard;
