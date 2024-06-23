import React from "react";

export function useForm<T>(initial: T) {
  const [values, setValues] = React.useState(initial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  
  const clearForm = () => {
    setValues(initial);
  }

  return {values, handleChange, setValues, clearForm};
}
