import { useState } from 'react'
import { ButtonPrimary } from '../../components/Button/ButtonPrimary'

function CleanCodeView() {
  const categories = [
    {
      title: 'Naming and Formatting',
      points: [
        {
          title: 'Meaningful Names',
          description:
            'Use clear and meaningful names for variables, functions, classes, modules, etc.',
        },
        {
          title: 'Consistent Formatting',
          description:
            'Consistently follow a coding style. This includes indentation, spaces around operators, line length, etc.',
        },
      ],
    },
    {
      title: 'Code Structure',
      points: [
        {
          title: 'Small Functions',
          description: 'Keep functions small and ensure they do one thing.',
        },
        {
          title: 'Modularity',
          description:
            'Divide your program into small, interchangeable modules.',
        },
        {
          title: 'Avoid Duplication',
          description:
            'If you find yourself writing the same code more than once, consider refactoring.',
        },
      ],
    },
    {
      title: 'Error Handling and Testing',
      points: [
        {
          title: 'Graceful Error Handling',
          description: "Handle errors gracefully and don't return error codes.",
        },
        {
          title: 'Testing',
          description:
            'Write tests for your code. They ensure your code works as expected and make it easier to refactor.',
        },
      ],
    },
    {
      title: 'Comments',
      points: [
        {
          title: 'Minimal Comments',
          description:
            'Use comments sparingly. If you feel the need to add a comment, consider rewriting the code to make it clearer.',
        },
      ],
    },
  ]

  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>(
    {},
  )

  const handleCheckboxChange = (categoryIndex: number, pointIndex: number) => {
    setCheckedPoints({
      ...checkedPoints,
      [`${categoryIndex}-${pointIndex}`]:
        !checkedPoints[`${categoryIndex}-${pointIndex}`],
    })
  }

  const resetCheckboxes = () => {
    setCheckedPoints({})
  }

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Clean Code</h1>
      <div className='row'>
        {categories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className='flex flex-col items-start max-w-md p-6 mx-auto my-2 space-y-4 bg-white shadow-md rounded-xl'
          >
            <h2 className='text-xl font-semibold'>{category.title}</h2>
            {category.points.map((point, pointIndex) => (
              <div key={pointIndex} className='flex items-start'>
                <input
                  type='checkbox'
                  checked={
                    checkedPoints[`${categoryIndex}-${pointIndex}`] || false
                  }
                  onChange={() =>
                    handleCheckboxChange(categoryIndex, pointIndex)
                  }
                />
                <div className='ml-2'>
                  <h3 className='text-lg font-semibold'>{point.title}</h3>
                  <p className='mt-2 text-gray-600'>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <ButtonPrimary svg='' text='Reset' onClick={resetCheckboxes} />
      </div>
    </>
  )
}

export { CleanCodeView }
