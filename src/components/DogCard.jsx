import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";

function DogCard({ image, name }) {
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
    </Card>
  );
}
DogCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onRegret: PropTypes.func, // Si esta prop no es obligatoria
};

 
export default DogCard;
 