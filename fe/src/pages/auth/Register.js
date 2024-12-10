'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Card, CardContent, CardHeader, Typography, Alert, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../helpers/cookies'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, formData, { withCredentials: true })
      setMessage('Đăng ký thành công!')
      setFormData({ username: '', email: '', password: '' })
      setCookie('token', response.data.token, 7)
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message.message)
      } else {
        setMessage('Đã xảy ra lỗi trong quá trình đăng ký')
      }
    }
    finally {
      console.log(message)
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
      justifyContent: 'center',
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
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.3)';
                e.target.style.color = '#01647e';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
                e.target.style.color = 'white';
              }}
            >
              Đăng ký
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
