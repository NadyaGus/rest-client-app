import { APP_NAME } from '@/constants';
import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const developers = [
  { name: 'Nadya', link: 'https://github.com/NadyaGus' },
  { name: 'Murad', link: 'https://github.com/davydovmurad' },
  { name: 'Oleg', link: 'https://github.com/osulyanov' },
];

export const MainPageInfo = () => {
  const t = useTranslations('MainPageInfo');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 4, maxWidth: '600px' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>{t('aboutTitle')}</AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary">
            {t('aboutDescription', { appName: APP_NAME })}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>{t('developedByTitle')}</AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', gap: 2 }}>
          {developers.map((developer) => (
            <Typography key={developer.name} variant="body1" color="text.secondary" align="center">
              <Link href={developer.link} target="_blank">
                {t(developer.name)}
              </Link>
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownCircleOutlined />}>{t('aboutCourseTitle')}</AccordionSummary>
        <AccordionDetails>
          <Typography component={'p'} variant="body1" color="text.secondary">
            {t('aboutCourseDescription1')}
            <Link href="https://rs.school/courses/reactjs" target="_blank">
              RS School
            </Link>
            {t('aboutCourseDescription2')}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
