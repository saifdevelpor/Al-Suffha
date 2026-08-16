(function () {
  function createCoursesDropdown() {
    const nav = document.querySelector('.q-nav');
    if (!nav || nav.querySelector('.q-course-dropdown')) return;
    const courseLink = Array.from(nav.querySelectorAll(':scope > a')).find(link => link.textContent.trim() === 'Courses');
    if (!courseLink) return;
    const style = document.createElement('style');
    style.textContent = '.q-course-dropdown{position:relative;display:flex;align-items:center}.q-course-dropdown> a:after{content:"\\F282";font-family:"bootstrap-icons";font-size:11px;margin-left:8px}.q-course-dropdown-menu{position:absolute;top:calc(100% + 15px);left:0;width:280px;padding:8px 0;background:#fff;border:1px solid #dce4ef;border-top:3px solid var(--blue);box-shadow:0 16px 32px #031b4222;opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s;z-index:50}.q-course-dropdown:hover .q-course-dropdown-menu,.q-course-dropdown:focus-within .q-course-dropdown-menu{opacity:1;visibility:visible;transform:translateY(0)}.q-course-dropdown-menu a{display:flex;align-items:center;gap:11px;padding:12px 17px!important;border-radius:0!important;color:var(--text)!important;font-size:13px!important;font-weight:700;text-decoration:none}.q-course-dropdown-menu a:hover{background:#eef4fd;color:var(--blue)!important}.q-course-dropdown-menu i{width:20px;color:var(--blue);font-size:17px}.q-course-dropdown-menu a:last-child{margin-top:5px;padding-top:14px!important;border-top:1px solid #dce4ef;color:var(--blue)!important}@media(max-width:991px){.q-mobile-menu .q-course-dropdown{position:static}.q-mobile-menu .q-course-dropdown>a:after{float:right}.q-mobile-menu .q-course-dropdown-menu{position:static;display:none;width:auto;padding:0 0 8px;border:0;border-top:0;box-shadow:none;opacity:1;visibility:visible;transform:none}.q-mobile-menu .q-course-dropdown.is-expanded .q-course-dropdown-menu{display:block}.q-mobile-menu .q-course-dropdown-menu a{padding:10px 12px 10px 25px!important;font-size:13px!important;background:transparent!important}.q-mobile-menu .q-course-dropdown-menu a i:first-child{display:inline-block;flex:0 0 18px;width:18px;margin-right:9px;font-size:15px}.q-mobile-menu .q-course-dropdown-menu a:last-child{border-top:1px solid #edf0f5;margin-top:3px}.q-mobile-menu .q-course-dropdown-menu a i:last-child{margin-left:auto}.q-mobile-menu .q-course-dropdown-menu i{font-size:15px}}';
    document.head.appendChild(style);
    const dropdown = document.createElement('div');
    dropdown.className = 'q-course-dropdown';
    courseLink.parentNode.insertBefore(dropdown, courseLink);
    dropdown.appendChild(courseLink);
    const links = [
      ['qaida', 'bi-journal-bookmark', 'Noorani Qaida Course'],
      ['reading', 'bi-book', 'Quran Reading Course'],
      ['tajweed', 'bi-mic', 'Tajweed Course'],
      ['hifz', 'bi-heart', 'Hifz and Revision'],
      ['islamic', 'bi-shield-check', 'Islamic Studies']
    ];
    const menu = document.createElement('div');
    menu.className = 'q-course-dropdown-menu';
    menu.innerHTML = links.map(item => '<a href="course-details.html?course=' + item[0] + '"><i class="bi ' + item[1] + '"></i><span>' + item[2] + '</span><i class="bi bi-chevron-right ms-auto"></i></a>').join('') + '<a href="courses.html"><i class="bi bi-arrow-right-circle"></i><span>Explore All Courses</span></a>';
    dropdown.appendChild(menu);
  }
  function createMobileMenu() {
    const header = document.querySelector('.q-header');
    const nav = document.querySelector('.q-nav');
    if (!header || !nav || document.querySelector('.q-mobile-menu')) return;
    const toggle = document.createElement('button');
    toggle.className = 'q-mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '<i class="bi bi-list"></i>';
    header.querySelector('.container').appendChild(toggle);
    const menu = document.createElement('div');
    menu.className = 'q-mobile-menu';
    menu.innerHTML = '<div class="q-mobile-menu__overlay"></div><div class="q-mobile-menu__panel"><div class="q-mobile-menu__head"><span class="q-mobile-menu__brand">Al Suffha Quran Academy</span><button class="q-mobile-menu__close" type="button" aria-label="Close menu"><i class="bi bi-x-lg"></i></button></div><nav>' + nav.innerHTML + '</nav><a class="q-button" href="contact.html">Book a Quran class</a></div>';
    document.body.appendChild(menu);
    const close = () => { menu.classList.remove('is-open'); document.body.classList.remove('q-mobile-lock'); };
    toggle.addEventListener('click', () => { menu.classList.add('is-open'); document.body.classList.add('q-mobile-lock'); });
    menu.querySelector('.q-mobile-menu__overlay').addEventListener('click', close);
    menu.querySelector('.q-mobile-menu__close').addEventListener('click', close);
    const mobileCourseToggle = menu.querySelector('.q-course-dropdown > a');
    if (mobileCourseToggle) {
      mobileCourseToggle.setAttribute('href', '#courses-menu');
      mobileCourseToggle.setAttribute('aria-expanded', 'false');
      mobileCourseToggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const dropdown = mobileCourseToggle.parentElement;
        const expanded = dropdown.classList.toggle('is-expanded');
        mobileCourseToggle.setAttribute('aria-expanded', String(expanded));
      });
    }
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  }
  function createPageHeroImages() {
    const hero = document.querySelector('.q-page-hero');
    if (!hero || hero.classList.contains('q-visual-hero')) return;
    const route = location.pathname.toLowerCase().split('/').pop() || 'index.html';
    const page = route.includes('.') ? route : route + '.html';
    const images = {
      'about.html': 'assets/img/course-qaida-online.png',
      'courses.html': 'assets/img/course-quran-reading-online.png',
      'trainers.html': 'assets/img/course-tajweed-online.png',
      'pricing.html': 'assets/img/course-hifz-online.png',
      'contact.html': 'assets/img/course-qaida-online.png',
      'events.html': 'assets/img/course-quran-reading-online.png',
      'starter-page.html': 'assets/img/course-hifz-online.png'
    };
    const image = images[page];
    if (!image) return;
    const style = document.createElement('style');
    style.textContent = '.q-page-hero.q-visual-hero{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(90deg,#031b42a8,#06265742),var(--page-hero-image) center/cover no-repeat}.q-page-hero.q-visual-hero:before{display:none}.q-page-hero.q-visual-hero h1{color:#fff}.q-page-hero.q-visual-hero .q-eyebrow{color:#dce9fb}.q-page-hero.q-visual-hero>div>p:not(.q-eyebrow){color:#e0e9f7}.q-page-hero.q-visual-hero .q-button{background:#fff;border-color:#fff;color:var(--navy)}.q-page-hero.q-visual-hero .q-button:hover{background:var(--silver);border-color:var(--silver)}@media(max-width:575px){.q-page-hero.q-visual-hero{background:linear-gradient(90deg,#031b42c9,#0626578f),var(--page-hero-image) center/cover no-repeat}}';
    document.head.appendChild(style);
    hero.classList.add('q-visual-hero');
    hero.style.setProperty('--page-hero-image', 'url("' + image + '")');
  }
  function createWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return;
    const style = document.createElement('style');
    style.textContent = '.whatsapp-float{position:fixed;right:22px;bottom:22px;z-index:9998;width:57px;height:57px;display:grid;place-items:center;border-radius:50%;background:#062657;color:#fff;text-decoration:none;font-size:29px;box-shadow:0 8px 22px #06265755;transition:.2s}.whatsapp-float:hover{background:#0a3f8c;color:#fff;transform:translateY(-4px)}.whatsapp-float:after{content:"WhatsApp us";position:absolute;right:69px;white-space:nowrap;padding:7px 11px;border-radius:3px;background:#12325e;color:#fff;font:600 12px Arial,sans-serif;opacity:0;transition:.2s}.whatsapp-float:hover:after{opacity:1}@media(max-width:575px){.whatsapp-float{width:52px;height:52px;right:16px;bottom:16px;font-size:26px}.whatsapp-float:after{display:none}}';
    document.head.appendChild(style);
    const button = document.createElement('a');
    button.className = 'whatsapp-float';
    button.href = 'https://wa.me/923045457180';
    button.target = '_blank';
    button.rel = 'noopener';
    button.setAttribute('aria-label', 'Chat with Al Suffha Quran Academy on WhatsApp');
    button.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(button);
  }
  function createHomeSlider() {
    const hero = document.querySelector('.ref-hero');
    if (!hero || hero.querySelector('.hero-slider-dots')) return;
    const images = [
      'https://images.unsplash.com/photo-1650083731760-d37a9ab6cf39?auto=format&fit=crop&w=2000&q=90',
      'https://images.unsplash.com/photo-1658797688029-710a0fc80a69?auto=format&fit=crop&w=2000&q=90',
      'https://images.unsplash.com/photo-1646205037017-c95da70fe001?auto=format&fit=crop&w=2000&q=90'
    ];
    const style = document.createElement('style');
    style.textContent = '.ref-hero:after{background-image:var(--hero-image)!important;transition:background-image .5s}.hero-slider-dots{position:absolute;z-index:3;right:7%;bottom:40px;display:flex;gap:9px}.hero-slider-dots button{width:11px;height:11px;padding:0;border:1px solid #fff;border-radius:50%;background:transparent}.hero-slider-dots button.active{background:#fff}@media(max-width:575px){.hero-slider-dots{right:24px;bottom:23px}}';
    document.head.appendChild(style);
    hero.style.setProperty('--hero-image', 'url("' + images[0] + '")');
    const dots = document.createElement('div');
    dots.className = 'hero-slider-dots';
    let current = 0;
    images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show hero image ' + (index + 1));
      if (index === 0) dot.className = 'active';
      dot.addEventListener('click', () => show(index));
      dots.appendChild(dot);
    });
    function show(index) {
      current = index;
      hero.style.setProperty('--hero-image', 'url("' + images[index] + '")');
      dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === index));
    }
    hero.appendChild(dots);
    setInterval(() => show((current + 1) % images.length), 6000);
  }
  function createReferenceFeatureSection() {
    const anchor = document.querySelector('.steps-band');
    if (!anchor || document.querySelector('.reference-features')) return;
    const style = document.createElement('style');
    style.textContent = '.reference-features{padding:90px 0;background:#fff}.reference-features-head{text-align:center;max-width:680px;margin:0 auto 42px}.reference-features-head h2{font:700 38px Playfair Display,serif;color:var(--navy);margin:0 0 9px}.reference-features-head p{margin:0;color:var(--muted)}.reference-feature-card{height:100%;overflow:hidden;border:1px solid #dfe6ef;border-radius:5px;background:#fff;box-shadow:0 8px 23px #0626570d;transition:.25s}.reference-feature-card:hover{transform:translateY(-6px);box-shadow:0 17px 35px #0626571b}.reference-feature-image{height:175px;position:relative;background:#eef4fd center/cover}.reference-feature-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,#031b4230)}.reference-feature-logo{position:absolute;z-index:1;top:12px;left:12px;width:37px;height:37px;object-fit:contain;border-radius:50%;background:#fff;padding:2px;box-shadow:0 3px 8px #031b4244}.reference-feature-icon{position:absolute;z-index:1;right:14px;bottom:12px;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--navy);color:#fff;font-size:19px}.reference-feature-card>div:last-child{padding:20px}.reference-feature-card h3{font:700 20px Playfair Display,serif;color:var(--navy);margin:0 0 8px}.reference-feature-card p{margin:0;color:var(--muted);font-size:13px;line-height:1.6}.reference-feature-card a{display:inline-block;margin-top:12px;color:var(--blue);font-size:13px;font-weight:700;text-decoration:none}@media(max-width:575px){.reference-features{padding:64px 0}.reference-features-head h2{font-size:32px}.reference-feature-image{height:160px}}';
    document.head.appendChild(style);
    const cards = [
      ['Flexible Schedule', 'Choose class timings that fit comfortably around school, work and family life.', 'bi-clock', 'https://images.unsplash.com/photo-1646205037017-c95da70fe001?auto=format&fit=crop&w=700&q=80'],
      ['Personalized Learning', 'One-to-one classes give every learner focused attention and clear guidance.', 'bi-person-video3', 'https://images.unsplash.com/photo-1658797688029-710a0fc80a69?auto=format&fit=crop&w=700&q=80'],
      ['Paid Class Consultation', 'Message us to discuss available timings, suitable courses and lesson fee details.', 'bi-chat-dots', 'https://images.unsplash.com/photo-1650083731760-d37a9ab6cf39?auto=format&fit=crop&w=700&q=80'],
      ['Dedicated Quran Teacher', 'Learn with one committed teacher and enjoy a consistent teaching approach.', 'bi-person-heart', 'https://images.unsplash.com/photo-1646205037017-c95da70fe001?auto=format&fit=crop&w=700&q=80'],
      ['Learn in Your Language', 'Clear guidance helps children and adults learn at a comfortable pace.', 'bi-translate', 'https://images.unsplash.com/photo-1658797688029-710a0fc80a69?auto=format&fit=crop&w=700&q=80'],
      ['Anywhere, Any Device', 'Join your live Quran lesson from home with a phone, tablet or computer.', 'bi-phone', 'https://images.unsplash.com/photo-1650083731760-d37a9ab6cf39?auto=format&fit=crop&w=700&q=80']
    ];
    const section = document.createElement('section');
    section.className = 'reference-features';
    section.innerHTML = '<div class="container"><div class="reference-features-head"><p class="q-eyebrow">AL SUFFHA QURAN ACADEMY KEY FEATURES</p><h2>Why families choose Al Suffha Quran Academy</h2><p>Personal Quran learning designed around every learner and family routine.</p></div><div class="row g-4">' + cards.map(card => '<div class="col-md-6 col-lg-4"><article class="reference-feature-card"><div class="reference-feature-image" style="background-image:url(&quot;' + card[3] + '&quot;)"><img class="reference-feature-logo" src="assets/img/al-suffha-logo.png" alt="Al Suffha logo"><span class="reference-feature-icon"><i class="bi ' + card[2] + '"></i></span></div><div><h3>' + card[0] + '</h3><p>' + card[1] + '</p><a href="contact.html">Learn more <i class="bi bi-arrow-right"></i></a></div></article></div>').join('') + '</div></div>';
    anchor.parentNode.insertBefore(section, anchor);
  }
  function createPremiumFooter() {
    const footer = document.querySelector('.q-footer');
    if (!footer || footer.classList.contains('premium-footer')) return;
    const style = document.createElement('style');
    style.textContent = '.premium-footer{margin-top:34px!important;padding:0!important;background:#03172f!important;border-top:4px solid #dfe7f5;color:#fff}.premium-footer .container:before{display:none!important}.premium-footer-inner{padding:45px 0 32px}.premium-footer-logo{display:block!important;width:104px;height:70px;object-fit:contain;margin:0 0 26px!important}.premium-footer h4{font:700 20px Playfair Display,serif;margin:0 0 19px;color:#fff}.premium-footer ul{margin:0;padding:0;list-style:none}.premium-footer li{margin:0 0 11px}.premium-footer li a{color:#c9d7eb;text-decoration:none;font-size:14px}.premium-footer li a:hover{color:#fff}.premium-footer li i{color:#dfe7f5;margin-right:11px}.footer-contact-line{display:flex;align-items:center;gap:12px;margin:0 0 14px;color:#d2def0;font-size:14px}.footer-contact-line i{display:grid;place-items:center;width:39px;height:39px;border:1px solid #6a7e9e;border-radius:10px;color:#dfe7f5;font-size:18px}.footer-social-title{margin:23px 0 11px;font-weight:700}.footer-socials{display:flex;gap:10px}.footer-socials a{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid #7183a0;color:#dfe7f5;text-decoration:none}.footer-socials a:hover{background:#dfe7f5;border-color:#dfe7f5;color:#03172f}.premium-footer-bottom{border-top:1px solid #ffffff1c;padding:19px 0;color:#91a5c3;font-size:13px;text-align:center}.premium-footer-bottom a{color:#dfe7f5;text-decoration:none;font-weight:700}.premium-footer-bottom a:hover{color:#fff;text-decoration:underline}.developer-credit{margin-top:7px;font-size:12px}@media(max-width:575px){.premium-footer-inner{padding:35px 0 24px}.premium-footer h4{margin-top:22px}.premium-footer{margin-top:20px!important}.premium-footer-logo{width:88px;height:58px;margin:0 0 20px!important}}';
    document.head.appendChild(style);
    footer.className = 'q-footer premium-footer';
    footer.innerHTML = '<div class="container premium-footer-inner"><img class="premium-footer-logo" src="assets/img/al-suffha-logo.png" alt="Al Suffha Quran Academy"><div class="row gy-4"><div class="col-6 col-lg-3"><h4>Quick Info</h4><ul><li><a href="courses.html"><i class="bi bi-arrow-right"></i>1-on-1 Online Classes</a></li><li><a href="trainers.html"><i class="bi bi-arrow-right"></i>Dedicated Teacher</a></li><li><a href="contact.html"><i class="bi bi-arrow-right"></i>Flexible Timings</a></li><li><a href="contact.html"><i class="bi bi-arrow-right"></i>Class Enquiry</a></li></ul></div><div class="col-6 col-lg-3"><h4>Our Courses</h4><ul><li><a href="course-details.html?course=qaida"><i class="bi bi-arrow-right"></i>Noorani Qaida</a></li><li><a href="course-details.html?course=reading"><i class="bi bi-arrow-right"></i>Quran Reading</a></li><li><a href="course-details.html?course=tajweed"><i class="bi bi-arrow-right"></i>Tajweed Course</a></li><li><a href="course-details.html?course=hifz"><i class="bi bi-arrow-right"></i>Hifz and Revision</a></li><li><a href="course-details.html?course=islamic"><i class="bi bi-arrow-right"></i>Islamic Studies</a></li></ul></div><div class="col-6 col-lg-3"><h4>Useful Links</h4><ul><li><a href="index.html"><i class="bi bi-arrow-right"></i>Home</a></li><li><a href="about.html"><i class="bi bi-arrow-right"></i>About Academy</a></li><li><a href="courses.html"><i class="bi bi-arrow-right"></i>All Courses</a></li><li><a href="pricing.html"><i class="bi bi-arrow-right"></i>Lesson Plans</a></li><li><a href="contact.html"><i class="bi bi-arrow-right"></i>Contact Us</a></li><li><a href="https://wa.me/923045457180"><i class="bi bi-arrow-right"></i>WhatsApp Support</a></li></ul></div><div class="col-12 col-lg-3"><h4>Contact Us</h4><div class="footer-contact-line"><i class="bi bi-envelope"></i><span>usmanayyub247@gmail.com</span></div><div class="footer-contact-line"><i class="bi bi-telephone"></i><span>+92 304 5457180</span></div><div class="footer-contact-line"><i class="bi bi-whatsapp"></i><span>WhatsApp us anytime</span></div><p class="footer-social-title">Connect With Us</p><div class="footer-socials"><a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="https://wa.me/923045457180" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a><a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a></div></div></div></div><div class="premium-footer-bottom"><div class="container">© 2026 Al Suffha Quran Academy. All rights reserved.<div class="developer-credit">Website Developed By <a href="https://saifprotfolio.netlify.app/" target="_blank" rel="noopener">Saif Developer</a></div></div></div>';
  }
  function createCourseExperience() {
    const courses = {
      qaida:{title:'Noorani Qaida Course',tag:'FOR BEGINNERS',image:'assets/img/course-qaida-online.png',intro:'Build a confident foundation for Quran reading through Arabic letters, sounds, joining and basic rules.',items:['Recognise Arabic letters and sounds','Learn harakaat, madd and joining letters','Read short Arabic words with confidence','Prepare for fluent Quran reading'],who:'Children, beginners and adults starting their Quran journey.'},
      reading:{title:'Quran Reading Course',tag:'BUILD FLUENCY',image:'assets/img/course-quran-reading-online.png',intro:'Read the Quran step by step with personal guidance, correct pronunciation and regular revision.',items:['Improve reading flow and accuracy','Learn practical recitation rules','Receive individual correction','Build a consistent Quran routine'],who:'Learners who know the Arabic alphabet and want to read the Quran fluently.'},
      tajweed:{title:'Tajweed Course',tag:'RECITE CORRECTLY',image:'assets/img/course-tajweed-online.png',intro:'Learn the essential Tajweed rules that make Quran recitation accurate, clear and beautiful.',items:['Makharij and correct letter sounds','Practical Tajweed rules','Teacher-led recitation correction','Guided Quran practice'],who:'Readers who want to improve pronunciation and Tajweed application.'},
      hifz:{title:'Hifz and Revision Course',tag:'MEMORISE WITH SUPPORT',image:'assets/img/course-hifz-online.png',intro:'Follow a structured online plan for Quran memorisation, listening and regular revision.',items:['Personal memorisation targets','Balanced new lesson and revision','Focused listening and correction','Steady Hifz routine'],who:'Learners ready to memorise Quran or strengthen existing revision.'},
      islamic:{title:'Islamic Studies Course',tag:'LEARN THE ESSENTIALS',image:'assets/img/course-qaida-online.png',intro:'Age-appropriate Islamic learning that complements a strong Quran education.',items:['Daily duas and Islamic manners','Salah and basic worship','Essential beliefs and values','Simple, engaging explanations'],who:'Children and adults who want to strengthen everyday Islamic knowledge.'}
    };
    const path = location.pathname.toLowerCase();
    const route = path.split('/').pop() || 'index.html';
    const page = route.includes('.') ? route : route + '.html';
    if (page === 'courses.html') {
      document.querySelectorAll('.q-program').forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const map = title.includes('Qaida') ? 'qaida' : title.includes('Reading') ? 'reading' : title.includes('Tajweed') ? 'tajweed' : title.includes('Hifz') ? 'hifz' : title.includes('Islamic') ? 'islamic' : null;
        if (map && !card.querySelector('.course-detail-link')) {
          const link = document.createElement('a');
          link.className = 'course-detail-link';
          link.href = 'course-details.html?course=' + map;
          link.innerHTML = 'View course details <i class="bi bi-arrow-right"></i>';
          card.appendChild(link);
        }
      });
    }
    if (page !== 'course-details.html') return;
    document.querySelectorAll('.q-nav a.active').forEach(link => link.classList.remove('active'));
    const slug = new URLSearchParams(location.search).get('course') || 'qaida';
    const course = courses[slug] || courses.qaida;
    const style = document.createElement('style');
    style.textContent = '.course-detail-link{display:inline-block;margin-top:16px;color:var(--blue)!important;font-weight:700;text-decoration:none}.course-detail-hero{padding:82px 0;background:#eef4fd}.course-detail-hero img{width:100%;height:390px;object-fit:cover}.course-detail-hero h1{font:700 clamp(40px,5vw,62px)/1.12 Playfair Display,serif;color:var(--navy)}.course-detail-hero p{color:var(--muted);font-size:17px}.course-info-card{height:100%;padding:28px;background:#fff;border:1px solid #dce5ef}.course-info-card i{font-size:26px;color:var(--blue)}.course-info-card h3{font:700 22px Playfair Display,serif;margin:14px 0 7px;color:var(--navy)}.course-info-card p{margin:0;color:var(--muted);font-size:14px}.course-syllabus li{padding:12px 0;border-bottom:1px solid #dfe6ef;list-style:none}.course-syllabus{padding:0;margin:20px 0}.course-syllabus i{color:var(--blue);margin-right:9px}.course-detail-cta{padding:46px;background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff}.course-detail-cta h2{font:700 36px Playfair Display,serif;margin:0 0 9px}.course-detail-cta p{margin:0;color:#dbe7f9}@media(max-width:575px){.course-detail-hero{padding:58px 0}.course-detail-hero img{height:270px}.course-detail-cta{padding:30px 22px}.course-detail-cta h2{font-size:29px}}';
    document.head.appendChild(style);
    document.title = course.title + ' | Al Suffha Quran Academy';
    document.querySelector('main').innerHTML = '<section class="course-detail-hero"><div class="container"><div class="row align-items-center g-5"><div class="col-lg-6"><p class="q-eyebrow">' + course.tag + '</p><h1>' + course.title + '</h1><p>' + course.intro + '</p><a class="q-button" href="https://wa.me/923045457180">Enquire on WhatsApp <i class="bi bi-whatsapp"></i></a></div><div class="col-lg-6"><img src="' + course.image + '" alt="' + course.title + '"></div></div></div></section><section class="q-section"><div class="container"><div class="row g-4"><div class="col-md-4"><article class="course-info-card"><i class="bi bi-person-video3"></i><h3>Online one-to-one classes</h3><p>Personal teaching and direct feedback in every class.</p></article></div><div class="col-md-4"><article class="course-info-card"><i class="bi bi-clock"></i><h3>Flexible timing</h3><p>Discuss a schedule that works for your family.</p></article></div><div class="col-md-4"><article class="course-info-card"><i class="bi bi-book"></i><h3>Clear progress plan</h3><p>Revision and new learning at a comfortable pace.</p></article></div></div></div></section><section class="q-section q-soft"><div class="container"><div class="row align-items-center g-5"><div class="col-lg-6"><p class="q-eyebrow">WHAT YOU WILL LEARN</p><h2 class="section-title">A clear path through the course</h2><ul class="course-syllabus">' + course.items.map(item => '<li><i class="bi bi-check2-circle"></i>' + item + '</li>').join('') + '</ul></div><div class="col-lg-6"><div class="course-info-card"><i class="bi bi-people"></i><h3>Who is this course for?</h3><p>' + course.who + '</p><hr><h3>How to begin</h3><p>Send us a WhatsApp enquiry with the learner age and preferred timings. We will share paid lesson fee details and availability.</p></div></div></div></div></section><section class="q-section"><div class="container"><div class="course-detail-cta"><div class="row align-items-center g-3"><div class="col-lg-8"><p class="q-eyebrow">READY TO START?</p><h2>Begin ' + course.title + ' online.</h2><p>Ask us about available timings and paid lesson fee details.</p></div><div class="col-lg-4 text-lg-end"><a class="q-button q-button-light" href="https://wa.me/923045457180">WhatsApp us now</a></div></div></div></div></section>';
  }
  function init() { createCoursesDropdown(); createMobileMenu(); createPageHeroImages(); createWhatsAppButton(); createHomeSlider(); createReferenceFeatureSection(); createCourseExperience(); createPremiumFooter(); }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
}());
