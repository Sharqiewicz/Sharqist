import React from 'react'

type ColorPickerProps = {
  color: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  handleChange,
}) => {
  return (
    <div>
      <label
        htmlFor='color'
        className='block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Color:
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
        style={{ backgroundColor: color }}
        type='color'
        id='color'
        name='color'
        value={color}
        onChange={handleChange}
      />
    </div>
  )
}
