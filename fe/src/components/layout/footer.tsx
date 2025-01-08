import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-3 sticky-footer" style={{ backgroundColor: '#032541', color: 'white' }}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link href="/" className="nav-link px-2 text-white">Home</Link></li>
        <li className="nav-item"><Link href="/movies" className="nav-link px-2 text-white">Movies</Link></li>
        <li className="nav-item"><Link href="/faqs" className="nav-link px-2 text-white">FAQs</Link></li>
        <li className="nav-item"><Link href="/about" className="nav-link px-2 text-white">About</Link></li>
      </ul>
      <p className="text-center text-white">© 2024 Group</p>
    </footer>
  );
};

export default Footer;