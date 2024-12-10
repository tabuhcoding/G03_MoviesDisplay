import { useUser } from "../../helpers/useContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Typography, CircularProgress, Avatar } from "@mui/material";
import { LogOut, User } from "lucide-react";

export default function Profile() {
  const { user } = useUser(); // Lấy user từ context
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Card sx={{ width: "100%", maxWidth: 400, p: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar}
              alt={user.username}
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            >
              {!user.avatar && <User size={40} />}
            </Avatar>
          }
          title={<Typography variant="h5" component="h2">Trang cá nhân</Typography>}
          subheader={<Typography variant="body2" color="textSecondary">Thông tin người dùng</Typography>}
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Tên đăng nhập:</strong> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={navigate('/logout')}
            startIcon={<LogOut />}
          >
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
