import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import ProductsPage from "./pages/ProductsPage";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/">
        <Switch>
          <Route path="/products/create">
            <ProductPage />
          </Route>
          <Route path="/products/edit/:id">
            <ProductPage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Redirect to="/products" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
