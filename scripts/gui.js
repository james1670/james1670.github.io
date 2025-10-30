
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


// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('show') &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navLinks.classList.remove('show');
  }
});
