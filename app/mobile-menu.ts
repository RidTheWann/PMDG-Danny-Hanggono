/**
 * Toggle the mobile menu visibility and accessibility state.
 */
function toggleMobileMenu(): void {
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
  if (menuButton && mobileMenu) {
    menuButton.setAttribute(
      'aria-expanded',
      mobileMenu.classList.contains('active') ? 'true' : 'false',
    );
  }
}

/**
 * Setup event listeners for the mobile menu.
 */
function setupMobileMenu(): void {
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMobileMenu);
  }
  // Tutup menu jika klik di luar area menu
  document.addEventListener('click', (e: MouseEvent) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target as Node) && e.target !== menuButton) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        menuButton?.setAttribute('aria-expanded', 'false');
      }
    }
  });
  // Tutup menu dengan ESC
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });
}

export { toggleMobileMenu, setupMobileMenu };
