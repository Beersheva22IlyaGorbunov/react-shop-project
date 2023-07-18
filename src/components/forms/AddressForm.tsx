import { Box, Button, TextField } from "@mui/material";
import React, { MutableRefObject, RefObject, useState } from "react";
import Address from "../../model/Address";

type Props = {
  initial?: Address;
  required?: boolean;
  hideButton?: boolean;
  formRef?: MutableRefObject<HTMLFormElement | undefined>;
  onChange?: (address: Address) => void;
  onSubmit?: (address: Address) => Promise<void>;
};

const emptyAddress: Address = {
  country: "",
  city: "",
  street: "",
  building: "",
  flat: 0,
};

const AddressForm: React.FC<Props> = ({
  initial = emptyAddress,
  formRef,
  required = false,
  hideButton = false,
  onChange,
  onSubmit,
}) => {
  const [address, setAddress] = useState<Address>(initial);

  const handleFieldChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const city = e.target.value;
    setAddress((prev) => ({
      ...prev,
      city: city,
    }));
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const country = e.target.value;
    setAddress((prev) => ({
      ...prev,
      country: country,
    }));
  }

  function handleStreetChange(e: React.ChangeEvent<HTMLInputElement>) {
    const street = e.target.value;
    setAddress((prev) => ({
      ...prev,
      street: street,
    }));
  }

  function handleBuildingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const building = e.target.value;
    setAddress((prev) => ({
      ...prev,
      building: building,
    }));
  }

  function handleFlatChange(e: React.ChangeEvent<HTMLInputElement>) {}

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit");
    onSubmit && onSubmit(address).catch((e) => console.log(e));
  }

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    // onChange && onChange(address)
  }

  return (
    <Box
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
      component="form"
    >
      <TextField
        margin="dense"
        fullWidth
        required={required}
        size="small"
        label="Country"
        onChange={handleFieldChange("country")}
        value={address.country}
      />
      <TextField
        margin="dense"
        fullWidth
        required={required}
        size="small"
        label="City"
        onChange={handleFieldChange("city")}
        value={address.city}
      />
      <TextField
        margin="dense"
        fullWidth
        required={required}
        size="small"
        label="Street"
        onChange={handleStreetChange}
        value={address.street}
      />
      <TextField
        margin="dense"
        fullWidth
        required={required}
        size="small"
        label="Building"
        onChange={handleBuildingChange}
        value={address.building}
      />
      {!hideButton && <Button type="submit">Submit</Button>}
    </Box>
  );
};

export default AddressForm;
