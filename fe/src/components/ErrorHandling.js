import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, Button, Typography } from '@mui/material';

export function ErrorHandling({ error, callback }) {
  if (!error || !Array.isArray(error)) {
    return null;
  }

  return (
    <Alert severity="error" style={{ display: 'flex', alignItems: 'flex-start', padding: '16px' }}>
      <AlertCircle className="h-6 w-6" style={{ marginRight: '16px' }} />
      <div>
        <AlertTitle>
          Error {error[2] ? `(${error[2]})` : ''}: {error[0] || 'An error occurred'}
        </AlertTitle>
        <Typography variant="body2" color="textSecondary">
          {error[1] || 'No additional details provided.'}
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