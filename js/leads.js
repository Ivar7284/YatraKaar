/* ============================================
   YatraKaar — Lead Capture & localStorage
   ============================================ */

import { showToast } from './main.js';

const LEADS_KEY = 'yatrakaar_leads';

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLead(lead) {
  const leads = getLeads();
  leads.push({
    ...lead,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
  });
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function initLeadCapture() {
  // Quote form (modal)
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(quoteForm);
      const lead = {
        type: 'quote',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        destination: formData.get('destination'),
        travelers: formData.get('travelers'),
        date: formData.get('date'),
        message: formData.get('message'),
      };

      saveLead(lead);
      quoteForm.reset();
      
      // Close modal
      document.getElementById('quoteModal')?.classList.remove('active');
      document.body.style.overflow = '';
      
      showToast('🙏 Thank you! We\'ll get back to you shortly with a custom plan.', 'success');
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const lead = {
        type: 'contact',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      saveLead(lead);
      contactForm.reset();
      
      showToast('🙏 Message sent successfully! We\'ll respond within 24 hours.', 'success');
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(newsletterForm);
      const lead = {
        type: 'newsletter',
        email: formData.get('email'),
      };

      saveLead(lead);
      newsletterForm.reset();
      
      showToast('✨ Subscribed! You\'ll receive our latest updates.', 'success');
    });
  }

  // Enquiry buttons with data attributes
  document.querySelectorAll('[data-enquire]').forEach(btn => {
    btn.addEventListener('click', () => {
      const destination = btn.dataset.enquire;
      const modal = document.getElementById('quoteModal');
      const destSelect = document.getElementById('quoteDestination');
      
      if (modal && destSelect) {
        // Pre-select destination
        const option = [...destSelect.options].find(o => 
          o.value === destination || o.textContent.toLowerCase().includes(destination.toLowerCase())
        );
        if (option) destSelect.value = option.value;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

// Export for admin page
export { getLeads, LEADS_KEY };
