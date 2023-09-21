import type { HTMLAttributesAndProps } from '../../utilities/types'

import { useEffect, useState } from 'react'

import { slider } from './style.module.scss'

const Slider = ({
  defaultValue,
  maximum,
  minimum,
  onChange,
  value,
  ...other
}: HTMLAttributesAndProps<
  HTMLInputElement,
  {
    defaultValue?: number
    maximum: number
    minimum: number
    onChange?: (value: number) => void
    value?: number
  }
>) => {
  const [currentValue, setValue] = useState(onChange ? value ?? 0 : defaultValue ?? 0)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Controlled component if onChange is provided
    if (onChange) return onChange?.(Number(event.target.value))

    // Uncontrolled component if onChange is not provided
    setValue(Number(event.target.value))
  }

  useEffect(() => {
    // Update the value if it is a controlled component
    if (onChange) setValue(value ?? 0)
  }, [onChange, value])

  useEffect(() => {
    // Update to new default value if it is an uncontrolled component
    if (!onChange) setValue(defaultValue ?? 0)
  }, [defaultValue, onChange])

  return (
    <input
      className={slider}
      max={maximum}
      min={minimum}
      onChange={onChangeHandler}
      type="range"
      value={onChange ? value : currentValue}
      {...other}
    />
  )
}

export default Slider
