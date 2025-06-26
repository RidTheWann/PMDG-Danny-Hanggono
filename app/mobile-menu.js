// Fungsi untuk toggle menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuButton = document.getElementById('mobileMenuButton');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
    // Fokuskan menu saat dibuka
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.setAttribute('tabindex', '-1');
      mobileMenu.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  if (menuButton) {
    menuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('active') ? 'true' : 'false');
  }
}

// Setup event listener
function setupMobileMenu() {
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMobileMenu);
  }
  // Tutup menu jika klik di luar area menu
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && e.target !== menuButton) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  });
  // Tutup menu dengan ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Ekspor fungsi untuk digunakan di komponen
export { toggleMobileMenu, setupMobileMenu };