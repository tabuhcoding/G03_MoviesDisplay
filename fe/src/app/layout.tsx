import Footer from "@components/layout/footer";
import Navigation from "@components/layout/navigation";
import AuthProvider from "@context/authContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="default-class">
      <body className="default-body-class">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
          <AuthProvider>
            <Navigation />
            <div className="d-flex flex-column min-vh-100">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
