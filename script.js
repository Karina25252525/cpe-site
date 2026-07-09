const projects = {
  gubkina: {
    title: 'РГУ нефти и газа имени И.М. Губкина',
    city: 'Москва',
    text: 'Для учебного пространства университета реализованы элементы визуальной навигации, информационного и интерьерного оформления с учетом архитектуры объекта и задач посетителей.',
    images: [
      {src: 'assets/gubkina-01.png', alt: 'Учебная аудитория РГУ нефти и газа имени И.М. Губкина'},
      {src: 'assets/gubkina-02.png', alt: 'Коридор с навигацией'},
      {src: 'assets/gubkina-03.png', alt: 'Холл с фирменным оформлением'},
      {src: 'assets/gubkina-04.png', alt: 'Учебная аудитория с кольцевыми светильниками'}
    ],
    works: ['проектирование навигационной системы', 'изготовление информационных конструкций', 'оформление учебных пространств', 'разработка элементов фирменного стиля', 'монтаж элементов навигации']
  },
  neftyanik: {
    title: 'Центр хоккейной подготовки «Нефтяник»',
    city: 'Альметьевск',
    text: 'Оформление спортивного комплекса с акцентом на удобную навигацию, узнаваемость клуба и современную визуальную среду для спортсменов и посетителей.',
    images: [
      {src: 'assets/neftyanik-01.png', alt: 'Интерьер Центра хоккейной подготовки Нефтяник'},
      {src: 'assets/neftyanik-02.png', alt: 'Фасад Центра хоккейной подготовки Нефтяник'},
      {src: 'assets/neftyanik-03.png', alt: 'Общий вид здания Центра хоккейной подготовки Нефтяник'}
    ],
    works: ['проектирование навигационной системы', 'изготовление информационных конструкций', 'оформление внутренних пространств', 'монтаж элементов навигации']
  },
  rusalochka: {
    title: 'Детский сад «Русалочка»',
    city: 'Альметьевск',
    text: 'Тематическое художественное оформление интерьера, которое помогает создать яркую, дружелюбную и понятную среду для детей и сотрудников учреждения.',
    images: [
      {src: 'assets/rusalochka-01.png', alt: 'Оформление входной группы детского сада Русалочка'},
      {src: 'assets/rusalochka-02.png', alt: 'Тематическое оформление спортивного зала'},
      {src: 'assets/rusalochka-03.png', alt: 'Оформление внутренних пространств детского сада'}
    ],
    works: ['художественное оформление интерьера', 'тематическое оформление стен', 'разработка элементов внутренней навигации', 'изготовление и монтаж информационных табличек']
  }
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('#modalTitle');
const modalCity = document.querySelector('#modalCity');
const modalText = document.querySelector('#modalText');
const modalWorks = document.querySelector('#modalWorks');
const thumbs = document.querySelector('.modal-thumbs');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
let currentProject = null;
let currentIndex = 0;

function renderImage(index){
  if (!currentProject) return;
  const list = currentProject.images;
  currentIndex = (index + list.length) % list.length;
  const photo = list[currentIndex];
  modalImg.src = photo.src;
  modalImg.alt = photo.alt || currentProject.title;
  thumbs.innerHTML = list.map((img, i) => `
    <button class="modal-thumb ${i === currentIndex ? 'is-active' : ''}" type="button" data-index="${i}" aria-label="Открыть фото ${i + 1}">
      <img src="${img.src}" alt="" />
    </button>
  `).join('');
}

function openProject(key){
  const p = projects[key];
  if (!p) return;
  currentProject = p;
  currentIndex = 0;
  modalTitle.textContent = p.title;
  modalCity.textContent = p.city;
  modalText.textContent = p.text;
  modalWorks.innerHTML = p.works.map(w => `<li>${w}</li>`).join('');
  renderImage(0);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
function nextPhoto(){ renderImage(currentIndex + 1); }
function prevPhoto(){ renderImage(currentIndex - 1); }

document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => openProject(card.dataset.project)));
document.querySelector('.modal-close')?.addEventListener('click', closeModal);
document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
nextBtn?.addEventListener('click', nextPhoto);
prevBtn?.addEventListener('click', prevPhoto);
thumbs?.addEventListener('click', (event) => {
  const btn = event.target.closest('.modal-thumb');
  if (btn) renderImage(Number(btn.dataset.index));
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
  if(modal?.classList.contains('is-open') && e.key === 'ArrowRight') nextPhoto();
  if(modal?.classList.contains('is-open') && e.key === 'ArrowLeft') prevPhoto();
});

let touchStartX = 0;
modalImg?.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
modalImg?.addEventListener('touchend', event => {
  const diff = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 45) diff < 0 ? nextPhoto() : prevPhoto();
}, { passive: true });
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.onclick = function () {
    nav.classList.toggle('is-open');
    burger.classList.toggle('is-active');
  };

  nav.querySelectorAll('a').forEach(function (link) {
    link.onclick = function () {
      nav.classList.remove('is-open');
      burger.classList.remove('is-active');
    };
  });
}

const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
const scrollTopButton = document.querySelector('.scroll-top');

if (scrollTopButton) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      scrollTopButton.classList.add('is-visible');
    } else {
      scrollTopButton.classList.remove('is-visible');
    }
  });

  scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
