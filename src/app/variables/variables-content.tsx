'use client';

import { VariableForm } from '@/components/variable-form';
import { VariableGrid } from '@/components/variable-grid';
import { VARIABLES_LOCAL_STORAGE_KEY } from '@/constants';
import { Alert, Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Variable {
  name: string;
  value: string;
}

export function VariablesContent() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedVariables = localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY);
      if (storedVariables) {
        setVariables(JSON.parse(storedVariables));
      }
    } catch (err) {
      console.error('Failed to parse variables from localStorage:', err);
      localStorage.removeItem(VARIABLES_LOCAL_STORAGE_KEY);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (data: Variable) => {
    try {
      const newVariablesArray = [...variables];
      const existingIndex = variables.findIndex((variable) => variable.name === data.name);
      const isNewVariable = existingIndex === -1;

      if (isNewVariable) {
        newVariablesArray.push(data);
      } else {
        newVariablesArray[existingIndex].value = data.value;
      }

      setVariables(newVariablesArray);
      localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(newVariablesArray));
      setError(null);
    } catch (err) {
      setError('Failed to save variables');
      console.error('Failed to save variables:', err);
    }
  };

  const handleDelete = (name: string) => {
    try {
      const newVariablesArray = variables.filter((variable) => variable.name !== name);
      setVariables(newVariablesArray);
      localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(newVariablesArray));
      setError(null);
    } catch (err) {
      setError('Failed to delete variable');
      console.error('Failed to delete variable:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Variables
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <VariableForm
          onSubmit={handleSubmit}
          existingNames={new Set(variables.map((v) => v.name))}
          isLoading={loading}
        />

        <VariableGrid variables={variables} onDelete={handleDelete} isLoading={loading} />
      </Box>
    </Container>
  );
}
