'use client'
/* Package System */
import { useRouter } from 'next/navigation';
import { CircularProgress, Avatar } from "@mui/material";
import { User } from "lucide-react";

/* Package Application */
import { useAuth } from "@context/authContext";
import "@public/styles/user/profile.css";

const Profile: React.FC = () => {
  const { userInfo: user } = useAuth();
  const router = useRouter();

  if (!user || Object.keys(user).length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }
  const formatDate = (dateString: string) => {
    if (dateString === "") return "";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className='bg_image'>
      <div className='block header gradient blue'>
        <div className='inner_content'>
          <div className='content'>
            <span className='avatar'>
              <Avatar
                src={user?.avatar ?? undefined}
                alt={user?.username ?? ''}
                onClick={() => router.push("/profile")}
              >
                {!user.avatar && <User size={150} />}
              </Avatar>
            </span>
            <div className='user_info'>
              <div className='about_me'>
                <div className='content_wrapper flex'>
                  <h2>{user.username ?? ''}</h2>
                  <h3>Member since {formatDate(user?.createdAt ?? '')}</h3>
                </div>
                <div className='content_wrapper flex'>
                  <span>Email: {user?.email ?? ''}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
