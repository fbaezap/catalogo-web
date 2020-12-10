import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import useProductRemove from "../hooks/useProductRemove";
import formatToCurrency from "../utils/formatToCurrency";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  lineThrough: {
    textDecoration: "line-through",
  },
}));

export interface Product {
  _id: string;
  id: string;
  brand: string;
  image?: string;
  name: string;
  description: string;
  price: number;
}

export default function Products({
  palindrome,
  products,
  onRefresh,
}: {
  palindrome?: boolean;
  products: Product[];
  onRefresh: () => void;
}) {
  const classes = useStyles();
  const { loading: deleting, request: remove } = useProductRemove();
  return (
    <Grid container spacing={1}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.image ?? "https://source.unsplash.com/random"}
              title={product.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography>{product.id}</Typography>
              <Typography>{product.description}</Typography>
              <Typography
                className={clsx({ [classes.lineThrough]: palindrome })}
              >
                {formatToCurrency(product.price)}
              </Typography>
              {palindrome && (
                <Typography>{formatToCurrency(product.price * 0.8)}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to={`/products/edit/${product._id}`}
                size="small"
                color="primary"
                disabled={deleting}
              >
                Editar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => remove(product._id).then(() => onRefresh())}
                disabled={deleting}
              >
                Borrar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
