import Axios from "axios";
import React from "react";
import { useForm, UseFormMethods } from "react-hook-form";

export interface Values {
  brand: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductRequestProps {
  id?: string;
  onResult: (data?: unknown, error?: any) => void;
  children: (
    onSubmit: (values: Values) => void,
    loading: boolean
  ) => JSX.Element;
}

export default function ProductRequest({
  id,
  onResult,
  children,
}: ProductRequestProps) {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = React.useCallback(
    (values: Values) => {
      setLoading(true);
      Axios.request({
        method: id ? "PUT" : "POST",
        url: `products/${id ?? ""}`,
        data: values,
      })
        .then((response) => onResult(response.data))
        .catch((error) => onResult(undefined, error))
        .finally(() => setLoading(false));
    },
    [id]
  );

  return children(onSubmit, loading);
}
