import { zodResolver } from '@hookform/resolvers/zod';
import { Add } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const variableSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Name can only contain latin letters, numbers, underscores and hyphens'),
  value: z.string().min(1, 'Value is required'),
});
type VariableFormData = z.infer<typeof variableSchema>;

interface VariableFormProps {
  onSubmit: (data: VariableFormData) => void;
  existingNames?: Set<string>;
  isLoading?: boolean;
}

export function VariableForm({ onSubmit, existingNames, isLoading }: VariableFormProps) {
  const t = useTranslations('Variables');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VariableFormData>({
    resolver: zodResolver(variableSchema),
  });

  const onFormSubmit = async (data: VariableFormData) => {
    if (existingNames?.has(data.name)) {
      if (!confirm(t('variableExists'))) {
        return;
      }
    }
    onSubmit(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        width: '100%',
      }}
    >
      <TextField
        label={t('name')}
        variant="outlined"
        disabled={isLoading}
        error={!!errors.name}
        helperText={errors.name?.message ? t(errors.name.message) : ''}
        fullWidth
        {...register('name')}
      />
      <TextField
        label={t('value')}
        variant="outlined"
        disabled={isLoading}
        error={!!errors.value}
        helperText={errors.value?.message ? t(errors.value.message) : ''}
        fullWidth
        {...register('value')}
      />
      <Button
        variant="contained"
        startIcon={<Add />}
        type="submit"
        disabled={isLoading}
        sx={{
          alignSelf: { xs: 'stretch', sm: 'flex-start' },
          height: { xs: 'auto', sm: 55 },
          minWidth: { xs: '100%', sm: 'auto' },
          whiteSpace: 'nowrap',
        }}
      >
        {t('addVariable')}
      </Button>
    </Box>
  );
}
