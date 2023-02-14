import { Button, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import FormInput from '../../components/formComponents/FormInput'
import FormSelect from '../../components/formComponents/FormSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PageNumbers } from '../../interface/home'
import { IRequisitionDetails } from '../../interface/forms'
import { genderOptions, urgencyOptions } from './constants'
import { useData } from './DataProvider'

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void
}> = ({ handleTab }) => {
  const { ...rest } = useData()
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: '',
      noOfOpenings: 0,
      urgency: '',
      gender: '',
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required('Requisition title is required'),
      noOfOpenings: Yup.number()
        .typeError('Enter a valid number')
        .required('Number of openings is required')
        .positive('Enter a valid number')
        .min(1, 'Enter a valid number'),
      urgency: Yup.string().required('Urgency is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      handleTab(1)
    },
  })

  //Feature: update the state every time a select feild or input field changes
  const handleFieldChange = (name: string, value: string) => {
    setFieldValue(name, value)
    rest.setState({
      ...rest.state,
      requisitionDetails: {
        ...rest.state.requisitionDetails,
        [name]: value,
      },
    })
  }

  const handleInput = (e: any) => {
    rest.setState({
      ...rest.state,
      requisitionDetails: {
        ...rest.state.requisitionDetails,
        [e.target.name]: e.target.value,
      },
    })
  }

  return (
    <Box width='100%' as='form' onSubmit={handleSubmit as any}>
      <Box width='100%'>
        <FormInput
          label='Requisition Title'
          placeholder='Enter requisition title'
          name='requisitionTitle'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
          inputProps={{ onInput: handleInput }}
        />
        <FormInput
          label='Number of openings'
          placeholder='Enter number of openings'
          name='noOfOpenings'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
          inputProps={{ onInput: handleInput }}
        />
        <FormSelect
          label='Gender'
          name='gender'
          placeholder='Select gender'
          options={genderOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label='Urgency'
          name='urgency'
          placeholder='Select urgency'
          options={urgencyOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w='100%' justify='flex-end' mt='4rem'>
          <Button colorScheme='red' type='submit'>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default RequisitionDetailsForm
