import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, TextField, Typography } from '@mui/material';

export const ResponseSection = ({ status, body }: { status: number; body: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(body);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Response</Typography>
        <Typography sx={{ visibility: status === 0 ? 'hidden' : 'visible' }}>Status: {status}</Typography>
      </Box>
      <TextField
        multiline
        minRows={4}
        fullWidth
        variant="outlined"
        size="small"
        sx={{
          mt: 2,
          fontFamily: 'monospace',
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#fff',
            color: '#fff',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        disabled
        value={body}
        slotProps={{
          input: {
            style: { fontFamily: 'monospace' },
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
