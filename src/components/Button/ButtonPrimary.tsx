import { ReactNode } from 'react'

const ButtonPrimary = ({
  text,
  svg,
  onClick,
}: {
  text: string
  svg: ReactNode
  onClick?: () => void
}) => (
  <button
    type='submit'
    className='flex items-center justify-center w-full mt-5 button-first'
    onClick={onClick}
  >
    {svg}
    {text}
  </button>
)

export { ButtonPrimary }
