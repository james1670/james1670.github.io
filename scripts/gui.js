
document.getElementById('cliSwitch').addEventListener('change', function () {
  if (this.checked) {
    setTimeout(() => {
      window.location.href = 'cli.html';
    }, 300);
  }
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
