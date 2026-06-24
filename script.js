// menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// scroll reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => obs.observe(el));
}

// terminal typing effect
const lines = [
  { prompt: '$ whoami', out: '> [Seu Nome] — Dev [Full Stack]' },
  { prompt: '$ stack --list', out: '> React · Node.js · TypeScript · PostgreSQL' },
  { prompt: '$ status', out: '> Disponível para novos projetos' }
];
const body = document.getElementById('terminalBody');

function typeLine(text, className, el, cb) {
  let i = 0;
  const span = document.createElement('div');
  span.className = 'terminal-line ' + className;
  el.appendChild(span);
  const speed = reduceMotion ? 0 : 22;
  if (reduceMotion) {
    span.textContent = text;
    cb();
    return;
  }
  const interval = setInterval(() => {
    span.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      cb();
    }
  }, speed);
}

function runSequence(index) {
  if (index >= lines.length) {
    const caret = document.createElement('span');
    caret.className = 'caret';
    body.appendChild(caret);
    return;
  }
  typeLine(lines[index].prompt, 'prompt', body, () => {
    setTimeout(() => {
      typeLine(lines[index].out, 'out', body, () => {
        setTimeout(() => runSequence(index + 1), 280);
      });
    }, 180);
  });
}
runSequence(0);
