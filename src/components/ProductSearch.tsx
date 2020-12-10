import { Button, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import { useForm } from "react-hook-form";

interface Values {
  search: string;
  type: "id" | "other";
}

export function ProductSearch({
  onSubmit,
}: {
  onSubmit: (values: Values) => void;
}) {
  const form = useForm<Values>({
    mode: "all",
    defaultValues: {
      type: "other",
    },
  });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            inputRef={form.register()}
            name="search"
            id="search"
            label="Buscar"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            inputRef={form.register()}
            select
            name="type"
            id="type"
            label="Buscar por"
            variant="filled"
            SelectProps={{ native: true }}
          >
            <option value="other">Marca y descripción</option>
            <option value="id">ID</option>
          </TextField>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            <Search />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
