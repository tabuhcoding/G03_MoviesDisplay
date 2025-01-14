'use client'

/* Package System */
import { useEffect, useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Alert, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/* Package Application */
import { useAuth } from '@/src/context/authContext';
import { END_POINT_URL_LIST } from '@/src/util/constant';

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()
  const { login, isLogin } = useAuth()
  useEffect(() => {
    if (isLogin) {
      return router.push('/')
    }
  }, [isLogin, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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

    if (!formData.username) {
      newErrors.username = 'Tên đăng nhập không được để trống';
    }

    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Nhập lại mật khẩu không được để trống';
    } else if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Nhập lại mật khẩu không khớp';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const otpRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.SEND_OTP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        setMessage('Mã OTP đã được gửi đến email của bạn thành công.');
        localStorage.setItem('tempRegisterData', JSON.stringify(formData));
        setTimeout(() => {
          router.push('/activate-otp');
        }, 2000);
        return;
      }

      setMessage(otpData?.message?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.');
      throw new Error(otpData?.message?.message || 'Không thể gửi mã OTP. Vui lòng thử lại.');
    } catch (error: any) {
      console.log(error)
      setMessage(error.response?.data?.message || error?.message || "Đã xảy ra lỗi trong quá trình đăng ký");
    } finally {
      setIsLoading(false)
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
          title={<Typography variant="h5" component="h2">Đăng ký</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Tạo tài khoản mới</Typography>}
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#01647e' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Tên đăng nhập"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
            />
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
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
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
  )
}
