import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ image, title, price, clicked }) {
  return (
    <Card sx={{ width: 300, margin: "0 auto", padding: "0.1em" }}>
      <CardMedia
        component="img"
        sx={{
          height: 300,
          cursor: "pointer",
          padding: "1em 1em 0 1em",
          objectFit: "contain",
        }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={clicked} size="small">
          Show Details
        </Button>
      </CardActions>
    </Card>
  );
}
