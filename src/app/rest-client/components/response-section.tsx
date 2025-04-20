import { isHttpCodeSuccess } from '@/utils/helpers';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';

export const ResponseSection = ({ status, body }: { status: number; body: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(body);
  };

  const formattedBody = useMemo(() => {
    try {
      const parsed = JSON.parse(body);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return body;
    }
  }, [body]);

  return (
    <Box>
      {status === 0 && <Typography>Response</Typography>}
      {status !== 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip color={isHttpCodeSuccess(status) ? 'success' : 'error'} label={status} />
        </Box>
      )}

      <TextField
        multiline
        minRows={4}
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          mt: 2,
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#fff',
            color: '#fff',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        disabled
        value={formattedBody}
        slotProps={{
          input: {
            style: { fontFamily: 'monospace', fontSize: '12px' },
          },
        }}
      />

      <Button
        onClick={handleCopy}
        variant="text"
        sx={{ color: 'grey', minWidth: 0, transform: 'translateX(-44px) translateY(20px)' }}
      >
        <ContentCopyIcon />
      </Button>
    </Box>
  );
};
