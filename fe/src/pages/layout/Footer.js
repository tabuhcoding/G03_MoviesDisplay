import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <>
      <footer class="py-3 sticky-footer" style={{ backgroundColor: '#032541', color: 'white' }}>
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><a href="/" class="nav-link px-2 text-white">Home</a></li>
          <li class="nav-item"><a href="/" class="nav-link px-2 text-white">Movies</a></li>
          <li class="nav-item"><a href="/" class="nav-link px-2 text-white">FAQs</a></li>
          <li class="nav-item"><a href="/" class="nav-link px-2 text-white">About</a></li>
        </ul>
        <p class="text-center text-white">© 2024 Group</p>
      </footer>
    </>
  );
}

export default Footer;