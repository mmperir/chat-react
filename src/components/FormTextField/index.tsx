import { OutlinedTextFieldProps, TextField } from "@material-ui/core";
import { FC, useState } from "react";

interface FormTextFieldInterface extends OutlinedTextFieldProps {
  helperText: string;
}

const FormTextField: FC<FormTextFieldInterface> = ({ helperText, ...rest }) => {
  const [invalid, setInvalid] = useState(false);

  return (
    <TextField
      helperText={invalid ? helperText : undefined}
      error={invalid}
      margin="normal"
      fullWidth
      onInvalid={(e) => {
        e.preventDefault();
        setInvalid(true);
      }}
      {...rest}
    />
  );
};

export default FormTextField;
