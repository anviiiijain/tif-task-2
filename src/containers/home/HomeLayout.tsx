import {
  Box,
  Container,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PageNumbers } from '../../interface/home'
import { useData } from './DataProvider'
import InterviewSettingsForm from './InterviewSettingsForm'
import JobDetailsForm from './JobDetailsForm'
import DisplayCard from './PreviewCard'
import RequisitionForm from './RequisitionDetailsForm'

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p='1rem' fontFamily='Poppins' {...props}>
      {children}
    </Tab>
  )
}

const HomeLayout = () => {
  const [page, setPage] = useState<PageNumbers>(0)

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber)
  }

  const { ...rest } = useData()

  return (
    <Box w='100%'>
      <Container maxW='1200px'>
        <Heading fontFamily='Poppins' fontSize='1.5rem' my='2rem'>
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior='keepMounted'>
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display='grid' gridTemplateColumns='3fr 2fr' gap='24px'>
            <TabPanels>
              <TabPanel>
                <RequisitionForm handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm handleTab={handlePage} />
              </TabPanel>
            </TabPanels>
            {/* Feature: Access the required data through the custom hook and pass it to the display component*/}
            <DisplayCard {...rest.state} />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  )
}

export default HomeLayout
