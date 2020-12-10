import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import ProductForm, { Values } from "../components/ProductForm";
import { ChevronLeft } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function ProductPage() {
  const classes = useStyles();
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = React.useState(Boolean(id));
  const [defaultValues, setDefaultValues] = React.useState<Values>();
  const [error, setError] = React.useState();
  React.useEffect(() => {
    if (id) {
      setLoading(true);
      Axios.get(`products/${id}`)
        .then((response) => setDefaultValues(response.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [id]);
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/products"
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Crear Producto
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {!loading ? (
            <ProductForm
              id={id}
              defaultValues={defaultValues}
              onResult={(d) => console.log(d)}
            />
          ) : (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
}
