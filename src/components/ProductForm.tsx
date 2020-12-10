import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import ProductRequest from "./ProductRequest";

export interface Values {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductFormProps {
  id?: string;
  defaultValues?: Values;
  onResult: (data?: unknown, error?: any) => void;
}

export default function ProductForm({
  id,
  defaultValues,
  onResult,
}: ProductFormProps) {
  const form = useForm<Values>({
    mode: "all",
    defaultValues,
  });

  return (
    <ProductRequest id={id} onResult={onResult}>
      {(onSubmit, loading) => (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                inputRef={form.register({
                  required: true,
                })}
                name="id"
                id="id"
                label="ID"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                inputRef={form.register({
                  required: true,
                })}
                name="name"
                id="name"
                label="Nombre"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                inputRef={form.register({
                  required: true,
                })}
                name="brand"
                id="brand"
                label="Marca"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                inputRef={form.register({
                  required: true,
                  valueAsNumber: true,
                })}
                name="price"
                id="price"
                label="Precio"
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                inputRef={form.register({
                  required: true,
                })}
                name="description"
                id="description"
                label="Descripción"
                variant="filled"
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                inputRef={form.register()}
                name="image"
                id="image"
                label="URL Image"
                variant="filled"
                type="url"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!form.formState.isValid || loading}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </ProductRequest>
  );
}
