interface CheckIconProps {
  fillColor?: string
  inlineColor?: string
}

const CheckIcon = ({ fillColor, inlineColor }: CheckIconProps) => {
  const defaultColor = `text-green-300 hover:text-green-400`
  const svgColor = inlineColor ? '' : fillColor || defaultColor
  const divClasses = inlineColor
    ? 'bg-black opacity-20 hover:opacity-0 rounded-full absolute top-0 left-0 right-0 bottom-0 duration-300'
    : ''

  const fullSvgColor = `${svgColor} w-12 h-12 cursor-pointer duration-300`

  return (
    <div className='relative'>
      <div className={divClasses}></div>
      <svg
        style={{ color: inlineColor }}
        className={fullSvgColor}
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill={'currentColor'}
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
      </svg>
    </div>
  )
}

export { CheckIcon }
