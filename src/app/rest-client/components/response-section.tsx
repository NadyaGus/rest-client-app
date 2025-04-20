import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, TextField, Typography } from '@mui/material';

export const ResponseSection = ({ status, body }: { status: number; body: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(body);
  };

  return (
    <Box>
      <Typography>Response Status: {status ? status : 'N/A'}</Typography>
      <TextField
        component={'pre'}
        multiline
        minRows={4}
        fullWidth
        variant="outlined"
        size="small"
        sx={{ mt: 2 }}
        disabled
        value={body}
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
