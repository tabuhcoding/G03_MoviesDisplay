"use client"

/* Package System */
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
import { useAuth } from "@/src/context/authContext";

const TIMELEFT = 60;
const ATTEMPTS = 0;

export default function VerifyOTPActivateAccount() {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendAllowed, setIsResendAllowed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errors, setErrors] = useState({ otp: '' });
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();
  const { login, isLogin } = useAuth()

  useEffect(() => {
    const storedData = localStorage.getItem('tempRegisterData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEmail(parsedData.email);
      formData.email = parsedData.email;
    } else {
      router.push('/register');
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendAllowed(true);
    } else {
      setIsResendAllowed(false);
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.otp) {
      newErrors.otp = 'Mã OTP không được để trống';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'Mã OTP phải có 6 ký tự';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const otpRes = await fetch(END_POINT_URL_LIST.V2_VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });

      const otpData = await otpRes.json();

      if (otpRes.ok) {
        const tempData = localStorage.getItem('tempRegisterData');
        if (!tempData) throw new Error('Không tìm thấy dữ liệu đăng ký.');

        const registerData = JSON.parse(tempData);

        const registerRes = await fetch(END_POINT_URL_LIST.V2_REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerData)
        });

        const registerResponseData = await registerRes.json();

        if (registerRes.ok) {
          login(registerResponseData);
          setMessage('Tài khoản của bạn đã được kích hoạt thành công!');
          localStorage.removeItem('tempRegisterData');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }

        throw new Error(registerResponseData?.message || 'Đăng ký tài khoản thất bại.');
      }

      throw new Error(otpData?.message || 'Mã OTP không hợp lệ.');
    } catch (error: any) {
      setMessage(error.message || 'Đã xảy ra lỗi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch(END_POINT_URL_LIST.FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Mã OTP mới đã được gửi lại thành công.');
        setTimeLeft(data.timeLeft || TIMELEFT);
      } else {
        setMessage(data?.message?.message || 'Không thể gửi lại OTP.');
        throw new Error(data?.message?.message || 'Không thể gửi lại OTP.');
      }
    } catch (error: any) {
      setMessage(error.message || 'Không thể gửi lại mã OTP.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <CardHeader
          title={<Typography variant="h5" align="center">Xác thực tài khoản</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Chúng tôi đã gửi mã OTP đến email {email}</Typography>}
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#01647e' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="OTP"
              name="otp"
              type="text"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Nhập mã OTP gồm 6 chữ số"
              fullWidth
              error={!!errors.otp}
              helperText={errors.otp}
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
            <div className="text-center">
              <span style={{ fontSize: '12px', color: '#01647e' }}>Lưu ý: Bạn vui lòng kiểm tra tất cả các thư mục của email<br></br>(Hộp thư đến, Quảng cáo, Thư rác,...)</span>
              <br></br>
              <p style={{ fontSize: '12px', color: '#01647e' }}>Bạn không nhận được mã OTP? <strong onClick={handleResendOtp} className={`resend-btn ${isResendAllowed ? '' : 'btn-disabled disabled'}`}>Gửi lại mã</strong></p>
            </div>
            <div className="otp-timer d-flex align-items-center justify-content-center">
              <span>{formatTime(timeLeft)}</span>
            </div>
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