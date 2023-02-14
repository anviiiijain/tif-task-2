import { Button, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import FormInput from '../../components/formComponents/FormInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PageNumbers } from '../../interface/home'
import { IJobDetails } from '../../interface/forms'
import { useData } from './DataProvider'
import { validateConfig } from 'next/dist/server/config-shared'

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void
}> = ({ handleTab }) => {
  const { ...rest } = useData()
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: '',
        jobDetails: '',
        jobLocation: '',
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required('Job Title is required'),
        jobDetails: Yup.string().required('Job Details is required'),
        jobLocation: Yup.string().required('Job Location is required'),
        //Problem: job possition is not a field but it was required in validation, Solution: remove the validation that is unnecessary
      }),
      onSubmit: (values) => {
        handleTab(2)
      },
    })

  const handleInput = (e: any) => {
    rest.setState({
      ...rest.state,
      jobDetails: {
        ...rest.state.jobDetails,
        [e.target.name]: e.target.value,
      },
    })
  }

  return (
    <Box width='100%' as='form' onSubmit={handleSubmit as any}>
      <Box width='100%'>
        <FormInput
          label='Job Title'
          placeholder='Enter job title'
          name='jobTitle'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
          inputProps={{ onInput: handleInput }}
        />
        <FormInput
          label='Job Details'
          placeholder='Enter job details'
          name='jobDetails'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
          inputProps={{ onInput: handleInput }}
        />
        <FormInput
          label='Job Location'
          name='jobLocation'
          placeholder='Enter job location'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
          inputProps={{ onInput: handleInput }}
        />
        <Flex w='100%' justify='flex-end' mt='4rem' gap='20px'>
          <Button colorScheme='gray' type='button' onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button
            colorScheme='red'
            type='submit'
            onClick={() => handleSubmit()}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default JobDetailsForm
