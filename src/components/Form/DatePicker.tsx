import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const CustomDatePicker = ({
  date,
  setDate,
}: {
  date: Date
  setDate: (date: Date) => void
}) => (
  <div className='mt-5 w-44'>
    <label
      htmlFor='date'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Date
    </label>
    <DatePicker
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
      selected={date}
      onChange={date => {
        setDate(date as Date)
      }}
      dateFormat={'dd.MM.yyyy'}
      required={true}
      id='date'
    />
  </div>
)

export { CustomDatePicker as DatePicker }
