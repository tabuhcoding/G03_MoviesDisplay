"use client";

/* Package System */
import { useState, ChangeEvent, FormEvent, use, useEffect } from "react"
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
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from "@mui/icons-material";

/* Package Application */
import '@public/styles/admin/style.css';
import { useAuth } from '@/src/context/authContext';
import { END_POINT_URL_LIST } from "@/src/util/constant";

export default function RenewPassword() {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) {
      return router.push('/');
    }
  }, [isLogin, router]);

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

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
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
      const email = localStorage.getItem('forgotPasswordEmail');
      if (!email) {
        throw new Error('Không tìm thấy email, vui lòng thử lại từ đầu.');
      }

      const res = await fetch(END_POINT_URL_LIST.V2_RESET_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: formData.password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data?.message);
        setIsLoading(false);
        localStorage.removeItem('forgotPasswordEmail');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      setMessage(data?.message?.message || 'Đã xảy ra lỗi không xác định');
      throw new Error(data?.message?.message || 'Đã xảy ra lỗi không xác định');
    } catch (error) {
      console.error(error);
      setMessage((error as Error).message);
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'url(../../background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardHeader
          title={<Typography variant="h5" component="h2">Tạo mật khẩu mới</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Nhập mật khẩu mới của bạn</Typography>}
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#01647e' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <TextField
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth
              style={{
                background: 'linear-gradient(to right, rgb(30 213 169), rgb(1 180 228))', color: 'white',
                border: 'none',
                padding: '12px 24px',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                height: 56
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                (e.target as HTMLElement).style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.3)';
                (e.target as HTMLElement).style.color = '#01647e';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
                (e.target as HTMLElement).style.color = 'white';
              }}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Đang thay đổi...' : 'Thay đổi'}
            </Button>
          </form>
          {message && (
            <Alert severity={message.includes('thành công') ? 'success' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}