import { ChangeEvent } from 'react'

export const TextInput = ({
  handleChange,
  value,
}: {
  handleChange: (event: ChangeEvent) => void
  value: string
}) => (
  <div className='col-span-2'>
    <label
      htmlFor='name'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Task name
    </label>
    <input
      value={value}
      type='text'
      name='name'
      id='name'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
      placeholder='Write title here'
      required={true}
      onChange={handleChange}
    />
  </div>
)
