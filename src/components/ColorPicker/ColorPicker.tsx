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
      <label htmlFor='colorPicker'>Color:</label>
      <input
        type='color'
        id='colorPicker'
        name='colorPicker'
        value={color}
        onChange={handleChange}
      />
    </div>
  )
}
