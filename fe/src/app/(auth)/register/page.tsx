'use client'

import { useState } from 'react'
import { Button, TextField, Card, CardContent, CardHeader, Typography, Alert, Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/context/authContext'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    setIsLoading(true)
    try {
      const res = await fetch('api-v2/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const user = await res.json();
        login(user);
        setMessage('Đăng ký thành công!')
        setFormData({ username: '', email: '', password: '' })
        setTimeout(() => {
          router.push('/')
        }, 2000)
        return;
      }
      
      setMessage((await res.json()).detail as string || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin đăng ký.')
    } catch (error: any) {
      console.log(error)
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi trong quá trình đăng ký");
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
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              fullWidth
            />
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
