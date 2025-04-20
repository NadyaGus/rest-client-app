import { VariablesContent } from '@/app/variables/variables-content';
import { VARIABLES_LOCAL_STORAGE_KEY } from '@/constants';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, beforeEach, test, vi } from 'vitest';

describe('VariablesContent Component', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  test('renders the Variables Content', () => {
    render(<VariablesContent />);
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('value')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'addVariable' })).toBeInTheDocument();
  });

  test('adds a new variable to the grid and local storage', async () => {
    render(<VariablesContent />);

    const nameInput = screen.getByLabelText('name');
    const valueInput = screen.getByLabelText('value');
    const addButton = screen.getByRole('button', { name: 'addVariable' });

    fireEvent.change(nameInput, { target: { value: 'testName' } });
    fireEvent.change(valueInput, { target: { value: 'testValue' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY)).toEqual('[{"name":"testName","value":"testValue"}]');
      expect(screen.getByText('testName')).toBeInTheDocument();
      expect(screen.getByText('testValue')).toBeInTheDocument();
    });
  });

  test('shows error messages when name or value are empty', async () => {
    render(<VariablesContent />);

    const nameInput = screen.getByLabelText('name');
    const valueInput = screen.getByLabelText('value');
    const addButton = screen.getByRole('button', { name: 'addVariable' });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(valueInput, { target: { value: '' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Value is required')).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: 'test@name' } });
    fireEvent.change(valueInput, { target: { value: 'testValue' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(
        screen.getByText('Name can only contain latin letters, numbers, underscores and hyphens')
      ).toBeInTheDocument();
    });
  });

  test('updates an existing variable', async () => {
    localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, '[{"name":"testName","value":"oldValue"}]');
    render(<VariablesContent />);

    const nameInput = screen.getByLabelText('name');
    const valueInput = screen.getByLabelText('value');
    const addButton = screen.getByRole('button', { name: 'addVariable' });

    fireEvent.change(nameInput, { target: { value: 'testName' } });
    fireEvent.change(valueInput, { target: { value: 'newValue' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY)).toEqual('[{"name":"testName","value":"newValue"}]');
      expect(screen.getByText('newValue')).toBeInTheDocument();
    });
  });

  test('deletes a variable', async () => {
    localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, '[{"name":"testName","value":"testValue"}]');
    render(<VariablesContent />);

    const deleteButton = screen.getByLabelText('deleteVariable');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY)).toEqual('[]');
      expect(screen.queryByText('testName')).not.toBeInTheDocument();
    });
  });
});
