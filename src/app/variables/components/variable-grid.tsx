import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';

interface Variable {
  name: string;
  value: string;
}

interface VariableGridProps {
  variables: Variable[];
  onDelete: (name: string) => void;
  isLoading?: boolean;
}

const paginationModel = { page: 0, pageSize: 5 };

export function VariableGrid({ variables, onDelete, isLoading }: VariableGridProps) {
  const t = useTranslations('Variables');
  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 1 },
    { field: 'value', headerName: t('value'), flex: 1 },
    {
      field: 'delete',
      type: 'actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label={t('deleteVariable')}
            onClick={() => onDelete(id as string)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Paper sx={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={variables}
        columns={columns}
        getRowId={(row) => row.name}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25, 50]}
        loading={isLoading}
      />
    </Paper>
  );
}
