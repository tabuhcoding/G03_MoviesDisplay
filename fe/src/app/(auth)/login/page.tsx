"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Link,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@context/authContext';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); 
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      const res = await fetch('api-v2/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const user = await res.json();
        login(user);
        setMessage("Đăng nhập thành công!");
        setFormData({ email: "", password: "" });
        router.push("/");
        return;
      }
      setMessage( (await res.json()).detail as string || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
      
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi trong quá trình đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('/api-v2/login/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        if (!res.ok) {
          throw new Error('Login failed');
        }

        const user = await res.json();
        login(user);
        router.push('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
      } catch (error) {
        console.error('Google login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 5, maxWidth: 400, width: '100%' }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Đăng nhập</Typography>}
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#01647e' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email"
              fullWidth
            />
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, rgb(30 213 169), rgb(1 180 228))',
                color: 'white',
                height: 56,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
                  color: '#01647e'
                }
              }}
              fullWidth
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
            <Typography variant="body2" color="textSecondary" align="right">
              Bạn chưa có tài khoản?{' '}
              <Link href="/register" color="primary" underline="hover">
                Đăng ký ngay
              </Link>
            </Typography>
            <Divider>
              <Typography variant="body2" color="textSecondary">
                Hoặc
              </Typography>
            </Divider>
            <Button
              variant="outlined"
              color="primary"
              sx={{ padding: '12px 24px', fontSize: '14px', height: 56 }}
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={() => {handleGoogleSignIn()}}
            >
              Đăng nhập với Google
            </Button>
            {message && (
              <Alert severity={message.includes('thành công') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
