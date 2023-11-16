'use client';

import { useEffect, useState } from 'react';
import { PillsInput, Pill } from '@mantine/core';

// ✅ TODO implement core functionality -- add / remove tags
// TODO clearAllTags (optional) - not necessary right now
// ✅ TODO connect to RHF by wrapping in Controller
// NOTE: field.ref may be required for focusing an input on error
// https://react-hook-form.com/docs/usecontroller/controller
// TODO validate input server side - mongoose validator
// TODO Error handling on server side
// TODO validate input client side
// TODO Error handling on client side & display UI errors
// TODO Check why useQuery is not caching products on fetch
// TODO use correct inputs from mantine for numeric values
// -> may have to manually configure a staleTime and pass it to the queryClient
export default function CustomTagsInput({
  label,
  description,
  placeholder,
  multiline = true,
  allowDuplicates = false,
  error,
  // When used with RHF, accepts same value as Controller's defaultValue prop
  defaultTags,
  // Optional callbacks that execute custom logic if received as prop
  onEnter,
  onRemove,
  // 'field' object from RHF Controller
  rhfField: rhfFieldProps,
}) {
  const [value, setValue] = useState(''); // PillsInput.Field value
  const [tags, setTags] = useState(defaultTags ?? []);

  // ! DEV ONLY - Log tags on state change
  useEffect(() => {
    console.log('tags:', tags);
  }, [tags]);

  // handleInputChange -> control PillInput.Field (track value in state)
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // On Enter key down, appends the PillInput's value to tags array
  const addTag = (e) => {
    if (e.key === 'Enter') {
      // e.preventDefault(); // prevent submission if used in form
      console.log('CustomTagsInput onKeyDown: addTag');

      // ? HOW DO I VALIDATE A FIELD WRAPPED WITH CONTROLLER
      // TODO Validate the input
      // TODO Errors may be set using the onEnter/onRemove callbacks
      // TODO Handle empty values
      if (!value.length) return console.error('Cannot have empty tag');

      // TODO Handle duplicate values -> make lowercase then check for dups
      if (!allowDuplicates && tags.includes(value)) {
        return console.error('Cannot enter duplicate tags');
      }

      const updatedTags = [...tags, value];

      setTags(updatedTags);

      // Exposes state values for use in parent component
      // Which can then be used to set the values in React Hook Form State
      onEnter?.(updatedTags); // Execute callback prop if received

      setValue(''); // Clear input field
    }
  };

  // Removes a tag on the Pill component's onRemove event
  const removeTag = (tagIndexToRemove) => {
    console.log('CustomTagsInput onRemove: removeTag');

    // Remove the tag whose index equals tagIndexToRemove
    setTags(tags.filter((_, index) => index !== tagIndexToRemove));

    onRemove?.(tagIndexToRemove); // Execute callback prop if received
  };

  return (
    <PillsInput
      label={label}
      description={description}
      onKeyDown={addTag}
      multiline={multiline}
      error={error}
    >
      <Pill.Group>
        {/* tags should be an array of Pill components -> to represent tags
          - each with an onClick handler for removing the tag
         */}
        {tags.map((tag, index) => (
          <Pill key={index} withRemoveButton onRemove={() => removeTag(index)}>
            {tag}
          </Pill>
        ))}
        <PillsInput.Field
          {...rhfFieldProps} // must spread FIRST, this registers component with RHF
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </Pill.Group>
    </PillsInput>
  );
}
