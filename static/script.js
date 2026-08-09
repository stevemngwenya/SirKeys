const navItems = document.querySelectorAll('.nav-item');
const sectionPanels = document.querySelectorAll('.section-panel');
const controlCards = document.querySelectorAll('.control-card');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.dataset.target;

    navItems.forEach((nav) => nav.classList.toggle('active', nav === item));
    sectionPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.section === target);
    });
  });
});

controlCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
    const toggle = card.querySelector('.toggle-pill');
    if (toggle) {
      toggle.classList.toggle('on');
      toggle.textContent = toggle.classList.contains('on') ? 'On' : 'Off';
    }
  });
});

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const formStatus = document.getElementById('formStatus');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validateField() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    let valid = true;

    usernameError.textContent = '';
    passwordError.textContent = '';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    if (!username) {
      usernameError.textContent = 'Email or username is required.';
      valid = false;
    } else if (!isValidEmail(username) && username.length < 3) {
      usernameError.textContent = 'Use a valid email or username with at least 3 characters.';
      valid = false;
    }

    if (!password) {
      passwordError.textContent = 'Password is required.';
      valid = false;
    } else if (password.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters long.';
      valid = false;
    }

    return valid;
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateField()) {
      formStatus.textContent = 'Please correct the highlighted fields.';
      formStatus.classList.add('error');
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    formStatus.textContent = `Welcome back, ${username}. Authenticating...`;
    formStatus.classList.add('success');

    console.log('Login request prepared:', {
      username,
      passwordLength: password.length,
      rememberMe: document.getElementById('rememberMe').checked,
    });
  });
}
