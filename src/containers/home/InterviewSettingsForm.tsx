import { Button, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import FormSelect from '../../components/formComponents/FormSelect'
import { useFormik } from 'formik'
import { PageNumbers } from '../../interface/home'
import { IInterViewSettings } from '../../interface/forms'
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from './constants'
import * as Yup from 'yup'
import { useData } from './DataProvider'

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void
}> = ({ handleTab }) => {
  const { ...rest } = useData()

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: '',
      interviewDuration: '',
      interviewLanguage: '',
    },
    // Feature: add validation to form
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required('Interview Mode is required'),
      interviewDuration: Yup.string().required(
        'Interview Duration is required'
      ),
      interviewLanguage: Yup.string().required(
        'Interview Language is required'
      ),
    }),
    onSubmit: (values) => {
      alert('Form successfully submitted')
    },
  })

  const handleFieldChange = (name: string, value: string) => {
    setFieldValue(name, value)
    rest.setState({
      ...rest.state,
      interviewSettings: {
        ...rest.state.interviewSettings,
        [name]: value,
      },
    })
  }

  return (
    <Box width='100%' as='form' onSubmit={handleSubmit as any}>
      <Box width='100%'>
        <FormSelect
          label='Interview Mode'
          placeholder='Select interview mode'
          name='interviewMode'
          options={interviewModeOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label='Interview Duration'
          placeholder='Select interview duration'
          name='interviewDuration'
          options={interviewDurationOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label='Job Location'
          //Problem: label may not be write,Solution: label='Interview Language'
          name='interviewLanguage'
          placeholder='Select interview language'
          options={interviewLanguageOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w='100%' justify='flex-end' mt='4rem' gap='20px'>
          <Button colorScheme='gray' type='button' onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme='red' type='submit'>
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default InterviewDetailsForm
