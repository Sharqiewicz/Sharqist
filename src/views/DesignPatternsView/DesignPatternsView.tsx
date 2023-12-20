import { useState } from 'react'
import { ButtonPrimary } from '../../components/Button/ButtonPrimary'

function DesignPatternsView() {
  const categories = [
    {
      title: 'Creational Patterns',
      points: [
        {
          title: 'Singleton',
          description:
            'Ensure a class has only one instance, and provide a global point of access to it.',
        },
        {
          title: 'Factory Method',
          description:
            'Define an interface for creating an object, but let subclasses decide which class to instantiate.',
        },
      ],
    },
    {
      title: 'Structural Patterns',
      points: [
        {
          title: 'Adapter',
          description:
            'Convert the interface of a class into another interface clients expect.',
        },
        {
          title: 'Composite',
          description:
            'Compose objects into tree structures to represent part-whole hierarchies.',
        },
      ],
    },
    {
      title: 'Behavioral Patterns',
      points: [
        {
          title: 'Observer',
          description:
            'Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
        },
        {
          title: 'Strategy',
          description:
            'Define a family of algorithms, encapsulate each one, and make them interchangeable.',
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
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Design Patterns</h1>
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

export { DesignPatternsView }
