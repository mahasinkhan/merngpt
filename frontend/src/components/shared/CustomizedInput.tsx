import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin='normal'
      InputLabelProps={{ style: { color: "white" } }} // Customize label color
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "400px", // Input width
          borderRadius: 10, // Rounded corners
          fontSize: 20, // Font size for input text
          color: "white", // Input text color
        },
      }}
      fullWidth
      variant="outlined"
    />
  );
};

export default CustomizedInput;
