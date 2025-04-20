import { VARIABLES_LOCAL_STORAGE_KEY } from '@/constants';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

interface Variable {
  name: string;
  value: string;
}

export function useVariables() {
  const t = useTranslations('Variables');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedVariables = localStorage.getItem(VARIABLES_LOCAL_STORAGE_KEY);
      if (storedVariables) {
        setVariables(JSON.parse(storedVariables));
      }
    } catch {
      localStorage.removeItem(VARIABLES_LOCAL_STORAGE_KEY);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }, []);

  const addOrUpdateVariable = (data: Variable) => {
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
    } catch {
      setError(t('saveVariablesFailed'));
    }
  };

  const deleteVariable = (name: string) => {
    try {
      const newVariablesArray = variables.filter((variable) => variable.name !== name);
      setVariables(newVariablesArray);
      localStorage.setItem(VARIABLES_LOCAL_STORAGE_KEY, JSON.stringify(newVariablesArray));
      setError(null);
    } catch {
      setError(t('deleteVariableFailed'));
    }
  };

  const replaceVariables = (text?: string): string => {
    if (!text) {
      return '';
    }

    let result = text;
    variables.forEach((variable) => {
      result = result.replace(new RegExp(`{{${variable.name}}}`, 'g'), variable.value);
    });
    return result;
  };

  return {
    variables,
    loading,
    error,
    setError,
    addOrUpdateVariable,
    deleteVariable,
    replaceVariables,
  };
}
