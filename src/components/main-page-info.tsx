import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import Link from 'next/link';

export const MainPageInfo = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 4, maxWidth: '600px' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>About Project</AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary">
            RESTful Client App is a simple and user-friendly tool for interacting with RESTful APIs. It allows you to
            explore, create, update, and delete data from an API.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>Developed by</AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            <Link href="https://github.com/NadyaGus" target="_blank">
              Nadya Gusakova
            </Link>
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center">
            <Link href="https://github.com/davydovmurad" target="_blank">
              Murad Davydov
            </Link>
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center">
            <Link href="https://github.com/osulyanov" target="_blank">
              Oleg Sulyanov
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>About Course</AccordionSummary>
        <AccordionDetails>
          <Typography component={'p'} variant="body1" color="text.secondary">
            This project was created as part of the{' '}
            <Link href="https://rs.school/courses/reactjs" target="_blank">
              RS School
            </Link>{' '}
            React course. This is a free course for web developers. Everyone can study at RS School, regardless of age,
            professional employment, or place of residence.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
