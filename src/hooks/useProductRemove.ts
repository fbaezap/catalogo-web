import Axios from "axios";
import React from "react";

export default function useProductRemove() {
  const [loading, setLoading] = React.useState(false);
  const [, setData] = React.useState();
  const [error, setError] = React.useState();
  const request = React.useCallback((id: string) => {
    setLoading(true);
    return Axios.delete(`products/${id}`)
      .then((response) => setData(response.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  return { loading, error, request };
}
