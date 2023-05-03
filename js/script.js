window.addEventListener('DOMContentLoaded', () => {
  
  // sticky navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    const value = window.scrollY;
    return value > 0 ? navbar.classList.add('active') : navbar.classList.remove('active');
  });
  
  // tombol hamburger navbar
  const navbarButton = document.querySelector('#hamburger');
  navbarButton.addEventListener('click', () => {
    const navbarListGroup = document.querySelector('.navbar-list-group');
    navbarListGroup.classList.toggle('active');
  });
  
  // modal
  const modals = document.querySelectorAll('.modal');
  const btnModal = document.querySelectorAll('.btn-modal');
  btnModal.forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.modal.trim().toLowerCase();
      showAndHideModal(id);
    });
  });
  
  // tampilkan modal yang sesuai dengan isi data-id dan sembunyikan modal lainnya 
  function showAndHideModal(id) {
    modals.forEach(modal => {
      const data = modal.dataset.id.trim().toLowerCase();
      if (data === id) return modal.classList.toggle('active');
      return modal.classList.remove('active');
    });
  }
  
  // tombol untuk menghilangkan modal tertentu
  const btnModalClose = document.querySelectorAll('.btn-modal-close');
  btnModalClose.forEach(btnClose => {
    btnClose.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.remove('active'));
    });
  });
  
  // event input pencarian menu
  const cardContainer = document.querySelector('.card-container');
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('keyup', function() {
    const value = this.value.trim().toLowerCase();
    searchMenu(value);
  });
  
  // tampilkan menu yang cocok dengan isi input pencarian
  function searchMenu(value) {
    const menus = Array.from(cardContainer.children);
    menus.forEach(menu => {
      const string = menu.textContent.toLowerCase();
      menu.style.display = (string.indexOf(value) != -1) ? '' : 'none';
    });
  }
  
});