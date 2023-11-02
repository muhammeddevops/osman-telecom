// import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import { Datepicker } from "flowbite-react";

import { TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export default function AddProdForm() {
  return (
    <form className="flex  justify-center flex-col gap-4">
      <TextInput
        id="productName"
        label="Product Name"
        placeholder="Sindbad Khudri Dates"
        required
      />

      <TextInput
        id="description"
        label="Description"
        placeholder="Khudri dates 450g"
        required
      />

      <TextInput id="category" label="Category" placeholder="Food" required />

      <TextInput id="price" label="Price" placeholder="4.50" required />

      <TextInput id="quantity" label="Quantity" placeholder="50" required />

      <TextInput id="image" label="Image" placeholder="Add an image" required />

      <DatePickerInput
        id="expDate"
        label="Expiry Date"
        size={"sm"}
        // minDate={new Date()}
      />
    </form>
  );
}
