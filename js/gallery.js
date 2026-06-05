/* ============================================
   YatraKaar — Gallery Lightbox & Filtering
   ============================================ */

export function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleItems = [...galleryItems];

  // ---- Filtering ----
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      galleryItems.forEach((item, index) => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;
        
        if (show) {
          item.style.display = '';
          item.style.animation = `fadeInUp 0.5s ${index * 0.05}s forwards`;
        } else {
          item.style.display = 'none';
        }
      });

      visibleItems = [...galleryItems].filter(item => {
        const category = item.dataset.category;
        return filter === 'all' || category === filter;
      });
    });
  });

  // ---- Lightbox ----
  if (!lightbox) return;

  function openLightbox(index) {
    currentIndex = index;
    const item = visibleItems[index];
    if (!item) return;

    const img = item.querySelector('img');
    const caption = item.dataset.caption || img?.alt || '';
    
    lightboxImg.src = img.src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    const img = item.querySelector('img');
    const caption = item.dataset.caption || img?.alt || '';
    
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = caption;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibleIndex = visibleItems.indexOf(item);
      if (visibleIndex !== -1) openLightbox(visibleIndex);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => navigate(-1));
  lightboxNext?.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
