import { ReactNode } from 'react'

const ButtonPrimary = ({ text, svg }: { text: string; svg: ReactNode }) => (
  <button
    type='submit'
    className='flex items-center justify-center w-full mt-5 button-first'
  >
    {svg}
    {text}
  </button>
)

export { ButtonPrimary }
