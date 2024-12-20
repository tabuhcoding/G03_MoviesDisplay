import Footer from "@components/layout/footer";
import Navigation from "@components/layout/navigation";
import AuthProvider from "@context/authContext";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="default-class">
      <body className="default-body-class">
        <AuthProvider>
          <Navigation />
          <main>
            <div className="d-flex flex-column min-vh-100">
              {children}
            </div>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
