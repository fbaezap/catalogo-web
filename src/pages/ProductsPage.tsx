import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Products, { Product } from "../components/Products";
import Axios from "axios";
import { Box, CircularProgress, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { ProductSearch } from "../components/ProductSearch";
import isPalindrome from "../utils/isPalindrome";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function ProductsPage() {
  const classes = useStyles();

  const [search, setSearch] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [palindrome, setPalindrome] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>();
  const [error, setError] = React.useState<"SEARCH" | "UNKNOWN">();
  const loadData = React.useCallback(
    (params?: { search: string; type: string }) => {
      setError(undefined);
      if (params && params.type === "other" && params.search.length < 3) {
        setError("SEARCH");
        return;
      }
      setLoading(true);
      Axios.get("products", {
        params,
      })
        .then((response) => {
          setSearch(params?.search ?? undefined);
          setPalindrome(params?.search ? isPalindrome(params.search) : false);
          setProducts(response.data);
        })
        .catch((error) => {
          setError("UNKNOWN");
        })
        .finally(() => setLoading(false));
    },
    []
  );
  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Productos
          </Typography>
          <Button color="inherit" component={Link} to="/products/create">
            Crear
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Box marginBottom={2}>
            <ProductSearch
              onSubmit={(values) =>
                loadData(values.search && values.type ? values : undefined)
              }
            />
          </Box>
          {error && (
            <Box marginBottom={2}>
              <Alert severity="error">
                {error === "SEARCH"
                  ? "Si buscas por nombre deben haber al menos 3 caracteres"
                  : "Ha ocurrido un error"}
              </Alert>
            </Box>
          )}
          {loading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {products && !loading && (
            <>
              <Typography paragraph>
                {search
                  ? `Mostrando resultados de "${search}"`
                  : "Mostrando todos los resultados"}
              </Typography>
              {products.length ? (
                <Products
                  products={products}
                  onRefresh={loadData}
                  palindrome={palindrome}
                />
              ) : (
                <Typography>No hay productos</Typography>
              )}
            </>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
}
