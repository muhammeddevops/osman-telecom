'use client';

import { Button, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import otApi from '@/api-requests';
import { useEffect } from 'react';
import CustomTagsInput from '@/components/CustomTagsInput';

export default function AddProductForm({ close }) {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    setError,
  } = useForm();

  // Log form errors (if any)
  console.log('RHF Add Product Errors:', errors);

  // Log useForm state values
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log('RHF watch:', value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  // Log form errors (if any)
  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log('Add product form errors:', errors);
    }
  }, [errors]);

  const createProduct = useMutation({
    mutationFn: (product) => otApi.createProduct(product),
  });

  const onSubmit = (productData, e) => {
    console.log('product form data:', productData); // form input values

    // Add new product to DB
    createProduct.mutate(productData, {
      onSuccess(data) {
        // TODO Update the products list on the client side
        // ? This happens already, but will it happen after caching results
        // ? OR do we need to invalidate the cache, and update it manually?
        console.log('Product created successfully:', data);
        close();
      },
      onError(err) {
        const error = err.response.data;
        console.error('createProduct, onError:', error);

        // Set server errors in RHF state
        for (const inputName in error.errors) {
          setError(inputName, {
            type: 'manual',
            message: error.errors[inputName],
          });
        }
      },
    });
  };

  // Prevent submission on Enter key press (the default behaviour of RHF)
  const preventSubmissionOnEnter = (e) => {
    return e.key === 'Enter' && e.preventDefault();
  };

  const handleAddCategory = (updatedCategories) => {
    console.log('--- handleAddCategory ---');
    console.log('updatedCategories:', updatedCategories);
    setValue(`categories`, updatedCategories);
  };

  const handleRemoveCategory = (categoryIndexToRemove) => {
    console.log('--- handleRemoveCategory ---');

    // Update categories by mutating a copy of the original array
    const updatedCategories = [...getValues('categories')];
    console.log('BEFORE removing from categories:', updatedCategories);

    // Remove the category at the given index
    updatedCategories.splice(categoryIndexToRemove, 1);
    console.log('AFTER removing from categories:', updatedCategories);
    console.log(
      "NOTE: we don't mutate the original array:",
      getValues('categories')
    );

    // Overwrite categories in the useForm state with the updatedCategories
    setValue('categories', updatedCategories);
  };

  return (
    <form
      className="flex justify-center flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={preventSubmissionOnEnter}
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

      <Controller
        name="categories"
        control={control}
        defaultValue={[
          'Electronics',
          'Beverages',
          'Toiletries',
          'Household Supplies',
        ]}
        render={({ field }) => {
          console.log('categories input, rhf field props:', { field });

          return (
            <CustomTagsInput
              label="Categories"
              description="Type and press Enter to add a category"
              defaultTags={field.value} // init internal state with Controllers defaultValue prop
              placeholder="Add a category"
              onEnter={handleAddCategory}
              onRemove={handleRemoveCategory}
              rhfField={field}
              allowDuplicates
              error={errors.categories?.message}
            />
          );
        }}
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
