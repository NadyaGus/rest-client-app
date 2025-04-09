'use client';

import { VARIABLES_LOCAL_STORAGE_KEY } from '@/constants';
import { Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

interface Variable {
  name: string;
  value: string;
}

const paginationModel = { page: 0, pageSize: 5 };

export default function VariablesPage() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [nameEmptyError, setNameEmptyError] = useState('');
  const [valueEmptyError, setValueEmptyError] = useState('');

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1 },
    {
      field: 'delete',
      type: 'actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    setVariables(JSON.parse(localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY) || '[]'));
  }, []);

  const handleDeleteClick = (name: GridRowId) => () => {
    const updatedVariables = variables.filter((variable) => variable.name !== name);
    setVariables(updatedVariables);
    localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(updatedVariables));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string).trim();
    const value = (data.get('value') as string).trim();
    let isValid = true;

    if (!name) {
      setNameEmptyError('Name is required field');
      isValid = false;
    }
    if (!value) {
      setValueEmptyError('Value is required field');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const existsVariable = variables.findIndex((variable) => variable.name === name);
    const updatedVariables = [...variables];

    if (existsVariable !== -1) {
      updatedVariables[existsVariable].value = value;
    } else {
      updatedVariables.push({
        name: name,
        value: value,
      });
    }

    setVariables(updatedVariables);
    localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(updatedVariables));

    form.reset();
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h1">
          Variables
        </Typography>

        <Box component={'form'} onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
          <TextField name="name" label="Name" variant="outlined" required helperText={nameEmptyError} />
          <TextField name="value" label="Value" variant="outlined" required helperText={valueEmptyError} />
          <Button variant="contained" startIcon={<Add />} type="submit">
            Add variable
          </Button>
        </Box>

        <Paper sx={{ width: '60%' }}>
          <DataGrid
            rows={variables}
            columns={columns}
            getRowId={(row) => row.name}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </Paper>
      </Box>
    </>
  );
}
