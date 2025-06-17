// Fungsi untuk toggle menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

// Setup event listener
function setupMobileMenu() {
  const menuButton = document.getElementById('mobileMenuButton');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMobileMenu);
  }
}

// Ekspor fungsi untuk digunakan di komponen
export { toggleMobileMenu, setupMobileMenu };