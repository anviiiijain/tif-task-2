import React, { useEffect, useState } from 'react'
import { useTheme } from '@chakra-ui/react'
import FromWrapper from './FormWrapper'
import { IFormInputProps } from '@src/interface/forms'
import ReactSelect, { Props } from 'react-select'

interface IFormSelectProps
  extends Omit<IFormInputProps, 'inputProps' | 'type' | 'onChange' | 'onBlur'> {
  options: { label: string; value: string }[] | any
  selectProps?: Props
  onChange?: any
  onBlur?: any
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme()

  const handleChange = (value: any) => {
    onChange && onChange(name, value?.value)
  }
  const handleBlur = () => {
    onBlur && onBlur(name, true)
  }

  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(
    null
  )

  //Problem: select options were being rendered behind other elements, Solution: set the menuPortalTarget to document.body when the document is defined

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setMenuPortalTarget(document.body)
    }
  }, [])

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={options.find((item: { value: string }) => item?.value === value)}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        menuPortalTarget={menuPortalTarget}
        menuPosition={'fixed'}
        // styles
        styles={{
          container: (base) => ({
            ...base,
            width: '100%',
            minWidth: 'none',
            height: 'auto',
            maxHeight: 'none',
            minHeight: 'none',
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: '100%',
            minWidth: '272px',
            height: '45px',
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : '1px solid #c0bcd7',
            backgroundColor: theme.colors.inputBg,
            borderRadius: '10px',
            fontSize: '.875rem',
            fontWeight: '500',
            '&:hover': {
              border: `1px solid ${theme.colors.primary}`,
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: '20px',
          }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: '.875rem',
            fontWeight: '500',
          }),
        }}
        {...selectProps}
      />
      {children}
    </FromWrapper>
  )
}

export default FormSelect
