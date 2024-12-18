import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, Button, Typography } from '@mui/material';

export interface ErrorData{
  message: string;
  detail: string;
  statusCode: string;
}

interface ErrorHandlingProps {
  error: ErrorData;
  callback?: () => void;
}

export function ErrorHandling({ error, callback }: ErrorHandlingProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert severity="error" style={{ display: 'flex', alignItems: 'flex-start', padding: '16px' }}>
      <AlertCircle className="h-6 w-6" style={{ marginRight: '16px' }} />
      <div>
        <AlertTitle>
          Error {error.statusCode ? `(${error.statusCode})` : ''}: {error.message || 'An error occurred'}
        </AlertTitle>
        <Typography variant="body2" color="textSecondary">
          {error.detail || 'No additional details provided.'}
        </Typography>
        {callback && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={callback} 
            style={{ marginTop: '16px' }}
          >
            Retry
          </Button>
        )}
      </div>
    </Alert>
  );
}
