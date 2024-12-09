'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Card, CardContent, CardHeader, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../helpers/cookies'

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
      const response = await axios.post( `${process.env.REACT_APP_BACKEND_URL}/user/register`, formData, {withCredentials: true})
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardHeader
          title={<Typography variant="h5" component="h2">Đăng ký</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Tạo tài khoản mới</Typography>}
          sx={{ textAlign: 'center' }}
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
            <Button type="submit" variant="contained" color="primary" fullWidth>Đăng ký</Button>
          </form>
          {message && (
            <Alert severity={message.includes('thành công') ? 'success' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
