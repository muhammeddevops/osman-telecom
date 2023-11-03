import { Button, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import otApi from '@/api-requests';

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const createProduct = useMutation({
    mutationFn: (product) => otApi.createProduct(product),
  });

  console.log('Add product form errors:', errors);

  const onSubmit = (productData, e) => {
    console.log(productData); // form input values

    // Add new product to DB
    createProduct.mutate(productData, {
      onSuccess(data) {
        // TODO Update the products list on the client side
        console.log('Product created successfully:', data);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  justify-center flex-col gap-4"
    >
      <TextInput
        id="productName"
        {...register('name', {
          required: 'This field is required',
        })}
        label="Product Name"
        placeholder="Sindbad Khudri Dates"
        error={errors.name?.message}
      />

      <TextInput
        id="description"
        {...register('description', {
          required: 'This field is required',
        })}
        label="Description"
        placeholder="Khudri dates 450g"
        error={errors.description?.message}
      />

      <TextInput
        id="category"
        {...register('category', {
          required: 'This field is required',
        })}
        label="Category"
        placeholder="Food"
        error={errors.category?.message}
      />

      <TextInput
        id="price"
        {...register('price', {
          required: 'This field is required',
        })}
        label="Price"
        placeholder="4.50"
        error={errors.price?.message}
      />

      <TextInput
        id="quantity"
        {...register('quantity', {
          required: 'This field is required',
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
          disabled={isSubmitting}
        >
          Add Product
        </Button>
      </div>
    </form>
  );
}
