import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchAllProducts } from "@/api-requests/products";

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors, "<<< erorrs");
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  justify-center flex-col gap-4"
    >
      <TextInput
        id="productName"
        {...register("productName", {
          required: "This field is required",
        })}
        label="Product Name"
        placeholder="Sindbad Khudri Dates"
        error={errors.productName?.message}
      />

      <TextInput
        id="description"
        {...register("description", {
          required: "This field is required",
        })}
        label="Description"
        placeholder="Khudri dates 450g"
        error={errors.description?.message}
      />

      <TextInput
        id="category"
        {...register("category", {
          required: "This field is required",
        })}
        label="Category"
        placeholder="Food"
        error={errors.category?.message}
      />

      <TextInput
        id="price"
        {...register("price", {
          required: "This field is required",
        })}
        label="Price"
        placeholder="4.50"
        error={errors.price?.message}
      />

      <TextInput
        id="quantity"
        {...register("quantity", {
          required: "This field is required",
        })}
        label="Quantity"
        placeholder="50"
        error={errors.quantity?.message}
      />

      {/* <TextInput id="image" label="Image" placeholder="Add an image" required /> */}

      <div className="flex flex-row justify-end mt-2">
        <Button
          type="submit"
          color="green"
          className="py-1 px-3 rounded border-none mt-2"
        >
          Add Product
        </Button>
      </div>
    </form>
  );
}
