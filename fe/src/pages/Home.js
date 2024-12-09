import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';

export default function Home() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardHeader
          title="Welcome to 21120041-50-76's App"
          subheader="There are our G02 projects"
          sx={{ textAlign: 'center' }}
        />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
            <Button variant="outlined" color="primary" onClick={handleRegister} fullWidth>Register</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
