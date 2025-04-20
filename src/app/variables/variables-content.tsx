'use client';

import { useVariables } from '@/hooks/use-variables';
import { Alert, Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { VariableForm } from './components/variable-form';
import { VariableGrid } from './components/variable-grid';

export function VariablesContent() {
  const t = useTranslations('Routes');
  const { variables, loading, error, setError, addOrUpdateVariable, deleteVariable } = useVariables();

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          {t('Variables')}
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <VariableForm
          onSubmit={addOrUpdateVariable}
          existingNames={new Set(variables.map((v) => v.name))}
          isLoading={loading}
        />

        <VariableGrid variables={variables} onDelete={deleteVariable} isLoading={loading} />
      </Box>
    </Container>
  );
}
