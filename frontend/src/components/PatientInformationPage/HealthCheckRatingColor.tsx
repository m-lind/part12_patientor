import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HeartProps {
  rating: HealthCheckRating;
}

const getHeartColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return "black";
  }
};

const Heart: React.FC<HeartProps> = ({ rating }) => {
  const heartColor = getHeartColor(rating);
  return <FavoriteIcon sx={{ color: heartColor }} />;
};

export default Heart;
