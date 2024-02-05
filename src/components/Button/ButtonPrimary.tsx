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
  <button type='submit' className='flex button-third' onClick={onClick}>
    {svg}
    {text}
  </button>
)

export { ButtonPrimary }
