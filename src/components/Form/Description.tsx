type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const Description = ({
  handleChange,
  value,
}: {
  handleChange: (event: ChangeEvent) => void
  value: string
}) => (
  <div className='col-span-2 mt-5'>
    <label
      htmlFor='description'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Description
    </label>
    <textarea
      value={value}
      name='description'
      onChange={e => handleChange(e as unknown as ChangeEvent)}
      id='description'
      rows={4}
      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      placeholder='Write description here'
    ></textarea>
  </div>
)
