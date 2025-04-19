'use client';

import { HTTP_METHODS, ROUTES } from '@/constants';
import { encodeStringToBase64 } from '@/utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Input, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RestClient({
  initMethod,
  initUrl,
  initBody,
}: {
  initMethod?: string;
  initUrl?: string;
  initBody?: string;
}) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(initMethod || HTTP_METHODS[0]);
  const [url, setUrl] = useState(initUrl || '');
  const [body, setBody] = useState(initBody || '');
  const [headerRows, setHeaderRows] = useState<Array<{ name: string; value: string }>>([{ name: '', value: '' }]);

  const handleHeaderChange = (index: number, field: 'name' | 'value', value: string) => {
    const newRows = [...headerRows];
    newRows[index][field] = value;
    setHeaderRows(newRows);

    const lastRow = newRows[newRows.length - 1];
    const needNewRow = lastRow.name && lastRow.value;
    if (needNewRow) {
      setHeaderRows([...newRows, { name: '', value: '' }]);
    }
  };

  const handleDeleteHeader = (index: number) => {
    const newRows = headerRows.filter((_, i) => i !== index);
    if (newRows.length === 0) {
      newRows.push({ name: '', value: '' });
    }
    setHeaderRows(newRows);
  };

  const handleChangeMethod = (event: SelectChangeEvent) => {
    setSelectedMethod(event.target.value);
  };

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleBodyBlur = () => {
    if (!body.trim()) {
      return;
    }
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch {
      // It's not valid JSON or Text, leave as is
    }
  };

  useEffect(() => {
    let updatedUrl = `${ROUTES.restClient.href}/${selectedMethod}`;
    if (url) {
      updatedUrl += `/${encodeStringToBase64(url)}`;
    }
    if (body.trim()) {
      updatedUrl += `/${encodeStringToBase64(body)}`;
    }
    window.history.replaceState({}, '', updatedUrl);
  }, [router, selectedMethod, url, body]);

  return (
    <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Select value={selectedMethod} onChange={handleChangeMethod}>
          {HTTP_METHODS.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>

        <Input sx={{ width: 800 }} value={url} onChange={handleChangeUrl} autoFocus placeholder="Enter URL" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {headerRows.map((row, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Input
              placeholder="Header name"
              value={row.name}
              onChange={(e) => handleHeaderChange(index, 'name', e.target.value)}
              sx={{ width: 200 }}
            />
            <Input
              placeholder="Header value"
              value={row.value}
              onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <IconButton
              onClick={() => handleDeleteHeader(index)}
              disabled={headerRows.length === 1 && !row.name && !row.value}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <TextField
        multiline
        rows={4}
        value={body}
        onChange={handleChangeBody}
        onBlur={handleBodyBlur}
        placeholder="Request body (Text/JSON)"
        sx={{ fontFamily: 'monospace' }}
      />
    </Box>
  );
}
