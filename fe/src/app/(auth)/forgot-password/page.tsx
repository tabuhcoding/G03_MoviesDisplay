"use client"

/* Package System */
import { useState, ChangeEvent, FormEvent } from "react"
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';

/* Package Application */
import '@public/styles/admin/style.css';
import { END_POINT_URL_LIST } from "@/src/util/constant";

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '' });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  }

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch(END_POINT_URL_LIST.V2_FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Tìm thấy email thành công!');

        localStorage.setItem('forgotPasswordEmail', formData.email);
        localStorage.setItem('expiresAt', data.expiresAt);
        localStorage.setItem('remainingAttempts', data.remainingAttempts);

        setFormData({ email: '' });
        router.push('/verify-otp');
        return;
      }

      throw new Error(data?.message?.message || "Không tìm thấy email trong hệ thống.");
    } catch (error) {
      console.log(error);
      setMessage("Không tìm thấy email trong hệ thống.");
    } finally {
      setIsLoading(false);
    }
  }

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
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 5, maxWidth: 400, width: '100%' }}>
        {/* <Link 
          href="/login"
          sx={{
            padding: '5px',
            color: 'black',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)' 
            }
          }}
        >
          Về trang đăng nhập
        </Link> */}
        <CardHeader
          title={<Typography variant="h5" align="center">Quên mật khẩu</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Nhập email của bạn để tạo lại mật khẩu</Typography>}
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#01647e' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <Divider />
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
              {isLoading ? 'Đang xác nhận...' : 'Xác nhận'}
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