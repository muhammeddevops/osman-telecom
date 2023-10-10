import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Datepicker } from "flowbite-react";

export default function AddProdForm() {
  return (
    <div>
      <form className="flex max-w-md flex-col gap-4">
        <div className="">
          <div className="mb-2 block ">
            <Label htmlFor="productName" value="Product name" />
          </div>
          <TextInput
            id="productName"
            placeholder="Sindbad Khudri Dates"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Product description" />
          </div>
          <TextInput
            id="description"
            placeholder="Khudri dates 450g"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <TextInput id="category" placeholder="Food" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" placeholder="4.50" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="quantity" value="Quantity" />
          </div>
          <TextInput id="quantity" placeholder="50" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Image" />
          </div>
          <TextInput id="image" placeholder="Add an image" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="expDate" value="Expiry Date" />
          </div>
          <Datepicker id="expDate" size={"lg"} minDate={new Date()} />
        </div>
      </form>
    </div>
  );
}
