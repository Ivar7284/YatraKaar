/* ============================================
   YATRA BUILDER — Step Wizard Logic
   ============================================ */

(function() {
  'use strict';

  // --- Destinations Data ---
  const DESTINATIONS = {
    chardham: [
      { id: 'char-dham', name: 'Char Dham (Kedarnath, Badrinath, Gangotri, Yamunotri)', icon: '🏔️' },
      { id: 'do-dham', name: 'Do Dham (Any Two)', icon: '⛰️' },
      { id: 'one-dham', name: 'One Dham (Any One)', icon: '⛰️' },
    ],
    holy: [
      { id: 'naimisharanya', name: 'Naimisharanya', icon: '🌿' },
      { id: 'ayodhya', name: 'Ayodhya', icon: '🛕' },
      { id: 'kashi', name: 'Kashi', icon: '🔱' },
      { id: 'chitrakoot', name: 'Chitrakoot', icon: '🌳' },
      { id: 'prayagraj', name: 'Prayagraj', icon: '🌅' },
    ],
    south: [
      { id: 'tirupati', name: 'Tirupati', icon: '🌅' },
      { id: 'srisailam', name: 'Srisailam', icon: '🔱' },
      { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', icon: '🛕' },
      { id: 'madurai', name: 'Madurai Meenakshi', icon: '🏛️' },
      { id: 'rameswaram', name: 'Rameswaram', icon: '🌊' },
      { id: 'arunachalam', name: 'Arunachalam', icon: '🔥' },
      { id: 'ahobilam', name: 'Ahobilam', icon: '🦁' },
    ],
    west: [
      { id: 'somnath', name: 'Somnath', icon: '🔱' },
      { id: 'dwaraka', name: 'Dwaraka', icon: '🛕' },
      { id: 'nashik-ujjain', name: 'Nashik & Ujjain', icon: '⚱️' },
    ],
    nepal: [
      { id: 'nepal', name: 'Nepal (Pashupatinath & Muktinath)', icon: '🇳🇵' },
    ],
    adventures: [
      { id: 'rishikesh', name: 'Rishikesh', icon: '🧘' },
      { id: 'haridwar', name: 'Haridwar', icon: '🌊' },
      { id: 'mathura', name: 'Mathura', icon: '🦚' },
      { id: 'vrindavan', name: 'Vrindavan', icon: '🪈' },
      { id: 'hemkund-sahib', name: 'Hemkund Sahib', icon: '🙏' },
      { id: 'himalayan-treks', name: 'Himalayan Treks', icon: '🏔️' },
    ]
  };

  // --- Dynamic Recommendations Mapping ---
  const RECOMMENDATIONS = {
    'char-dham': {
      title: 'Char Dham',
      places: [
        { id: 'rec-rishikesh', name: 'Rishikesh (River Rafting & Yoga abodes)', icon: '🧘' },
        { id: 'rec-haridwar', name: 'Haridwar (Ganga Aarti at Har Ki Pauri)', icon: '🌊' },
        { id: 'rec-hemkund-sahib', name: 'Hemkund Sahib Gurudwara (15,200 ft lake)', icon: '🙏' }
      ],
      things: [
        { id: 'todo-vasudhara', name: 'Vasudhara Falls Trek (Badrinath/Mana)', icon: '🚶' },
        { id: 'todo-kedar-puja', name: 'Kedarnath Temple Abhishek Puja', icon: '🔱' },
        { id: 'todo-yamunotri-aarti', name: 'Yamunotri Yamuna River Maha Aarti', icon: '🌅' }
      ]
    },
    'do-dham': {
      title: 'Do Dham',
      places: [
        { id: 'rec-rishikesh', name: 'Rishikesh (River Rafting & Yoga abodes)', icon: '🧘' },
        { id: 'rec-haridwar', name: 'Haridwar (Ganga Aarti at Har Ki Pauri)', icon: '🌊' }
      ],
      things: [
        { id: 'todo-vasudhara', name: 'Vasudhara Falls Trek (Badrinath/Mana)', icon: '🚶' },
        { id: 'todo-kedar-puja', name: 'Kedarnath Temple Abhishek Puja', icon: '🔱' }
      ]
    },
    'one-dham': {
      title: 'One Dham',
      places: [
        { id: 'rec-rishikesh', name: 'Rishikesh (River Rafting & Yoga abodes)', icon: '🧘' },
        { id: 'rec-haridwar', name: 'Haridwar (Ganga Aarti at Har Ki Pauri)', icon: '🌊' }
      ],
      things: [
        { id: 'todo-vasudhara', name: 'Vasudhara Falls Trek (Badrinath/Mana)', icon: '🚶' },
        { id: 'todo-kedar-puja', name: 'Kedarnath Temple Abhishek Puja', icon: '🔱' }
      ]
    },
    'naimisharanya': {
      title: 'Naimisharanya',
      places: [
        { id: 'rec-ayodhya', name: 'Ayodhya (Lord Rama Birthplace)', icon: '🛕' },
        { id: 'rec-kashi', name: 'Kashi (Varanasi Shiva Temple)', icon: '🔱' }
      ],
      things: [
        { id: 'todo-satyanarayana', name: 'Satyanarayana Swamy Katha (Famous at Naimisharanya)', icon: '📖' },
        { id: 'todo-chakra-tirth', name: 'Chakra Tirth Holy Bath', icon: '🌀' }
      ]
    },
    'ayodhya': {
      title: 'Ayodhya',
      places: [
        { id: 'rec-naimisharanya', name: 'Naimisharanya Sacred Forest', icon: '🌿' },
        { id: 'rec-kashi', name: 'Kashi (Varanasi Shiva Temple)', icon: '🔱' },
        { id: 'rec-prayagraj', name: 'Prayagraj (Triveni Sangam)', icon: '🌅' }
      ],
      things: [
        { id: 'todo-saryu-aarti', name: 'Saryu River Boat Ride & Evening Aarti', icon: '🌅' },
        { id: 'todo-ram-darshan', name: 'Ram Mandir VIP Special Darshan', icon: '🛕' }
      ]
    },
    'kashi': {
      title: 'Kashi',
      places: [
        { id: 'rec-ayodhya', name: 'Ayodhya (Lord Rama Birthplace)', icon: '🛕' },
        { id: 'rec-prayagraj', name: 'Prayagraj (Triveni Sangam)', icon: '🌅' }
      ],
      things: [
        { id: 'todo-ganga-aarti', name: 'Dashashwamedh Ghat Ganga Aarti (Varanasi)', icon: '🌊' },
        { id: 'todo-kashi-darshan', name: 'Kashi Vishwanath VIP Sparsha Darshan', icon: '🔱' }
      ]
    },
    'chitrakoot': {
      title: 'Chitrakoot',
      places: [
        { id: 'rec-prayagraj', name: 'Prayagraj (Triveni Sangam)', icon: '🌅' },
        { id: 'rec-ayodhya', name: 'Ayodhya (Lord Rama Birthplace)', icon: '🛕' }
      ],
      things: [
        { id: 'todo-kamadgiri', name: 'Kamadgiri Hill Parikrama', icon: '🚶' },
        { id: 'todo-gupt-godavari', name: 'Gupt Godavari Cave Exploration', icon: '🦇' }
      ]
    },
    'prayagraj': {
      title: 'Prayagraj',
      places: [
        { id: 'rec-kashi', name: 'Kashi (Varanasi Shiva Temple)', icon: '🔱' },
        { id: 'rec-chitrakoot', name: 'Chitrakoot (Lord Rama Exile)', icon: '🌳' }
      ],
      things: [
        { id: 'todo-sangam-bath', name: 'Triveni Sangam (Holy Bath) & Boat Ride', icon: '⛵' }
      ]
    },
    'nepal': {
      title: 'Nepal',
      places: [],
      things: [
        { id: 'todo-pashupati-puja', name: 'Pashupatinath Rudrabhishek Puja', icon: '🔱' },
        { id: 'todo-muktinath-bath', name: 'Muktinath 108 Water Spouts Holy Bath', icon: '🚿' }
      ]
    },
    'tirupati': {
      title: 'Tirupati',
      places: [],
      things: [
        { id: 'todo-kalahasti-puja', name: 'Rahu-Ketu Special Pooja at Srikalahasti', icon: '🐍' }
      ]
    },
    'rameswaram': {
      title: 'Rameswaram',
      places: [],
      things: [
        { id: 'todo-22wells', name: '22 Holy Wells Theertham Bathing', icon: '🪣' }
      ]
    },
    'arunachalam': {
      title: 'Arunachalam',
      places: [],
      things: [
        { id: 'todo-girivalam', name: 'Arunachala Hill Girivalam (14km circumambulation)', icon: '🚶' }
      ]
    },
    'ahobilam': {
      title: 'Ahobilam',
      places: [],
      things: [
        { id: 'todo-narasimha-trek', name: '9 Narasimha Temples Forest Trekking', icon: '🚶' }
      ]
    },
    'rishikesh': {
      title: 'Rishikesh',
      places: [],
      things: [
        { id: 'todo-rafting', name: 'White Water River Rafting (Ganga)', icon: '⛵' }
      ]
    },
    'haridwar': {
      title: 'Haridwar',
      places: [],
      things: [
        { id: 'todo-haridwar-aarti', name: 'Ganga Aarti at Har Ki Pauri', icon: '🌊' }
      ]
    }
  };

  const TOTAL_STEPS = 4;
  let currentStep = 1;
  let selectedDests = [];
  let customDests = [];
  let selectedRecs = [];
  let selectedTransport = [];
  let selectedAccom = '';

  // --- Build Modal HTML ---
  function createBuilderHTML() {
    const floatBtn = document.createElement('button');
    floatBtn.className = 'yatra-builder-float';
    floatBtn.id = 'yatraBuilderFloat';
    floatBtn.innerHTML = '<i class="fas fa-magic"></i><span class="float-label">Build Custom Yatra</span>';
    document.body.appendChild(floatBtn);

    const overlay = document.createElement('div');
    overlay.className = 'yb-overlay';
    overlay.id = 'ybOverlay';
    overlay.innerHTML = `
      <div class="yb-modal" id="ybModal">
        <div class="yb-header">
          <button class="yb-close" id="ybClose"><i class="fas fa-times"></i></button>
          <div class="yb-title">🕉️ Build Your Custom Yatra</div>
          <div class="yb-subtitle">Design your sacred journey in simple steps</div>
          <div class="yb-progress" id="ybProgress">
            ${Array.from({length: TOTAL_STEPS}, (_, i) => `<div class="yb-progress-step${i === 0 ? ' active' : ''}" data-step="${i+1}"></div>`).join('')}
          </div>
          <div class="yb-step-labels">
            <span class="yb-step-label active">Destinations</span>
            <span class="yb-step-label">People & Dates</span>
            <span class="yb-step-label">Preferences</span>
            <span class="yb-step-label">Submit</span>
          </div>
        </div>
        <div class="yb-body">
          <!-- Step 1: Choose Destinations -->
          <div class="yb-step active" data-step="1">
            <div class="yb-step-title">Choose Your Sacred Destinations</div>
            <div class="yb-step-desc">Select one or more yatras. Custom recommendations and rituals will appear dynamically.</div>
            
            <div class="yb-dest-grid" id="ybDestGrid"></div>
            
            <div class="yb-custom-dest">
              <input type="text" placeholder="Request a destination not listed..." id="ybCustomInput">
              <button id="ybAddCustom">+ Add</button>
            </div>
            <div class="yb-custom-tags" id="ybCustomTags"></div>

            <!-- Dynamic Recommendations Section -->
            <div id="ybRecommendations" style="display: none; margin-top: 1.5rem; background: rgba(230,184,79,0.03); border: 1px dashed rgba(230,184,79,0.25); border-radius: var(--radius-xl); padding: 1.25rem;">
              <div style="font-family: var(--font-heading); font-size: var(--text-xs); color: var(--gold-400); font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>✨ Recommendations & Special Activities for Selected Yatras</span>
              </div>
              <div id="ybRecList" class="yb-check-grid"></div>
            </div>

            <div class="yb-nav">
              <div></div>
              <button class="yb-btn yb-btn-next" id="ybNext1">Next <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>

          <!-- Step 2: People & Dates -->
          <div class="yb-step" data-step="2">
            <div class="yb-step-title">Travelers & Schedule</div>
            <div class="yb-step-desc">Tell us about your group and preferred travel dates</div>
            
            <!-- Error feedback banner -->
            <div class="yb-error-msg" id="ybStep2Error" style="display: none; background: rgba(255,77,77,0.1); border: 1px solid rgba(255,77,77,0.3); color: #ff4d4d; border-radius: var(--radius-lg); padding: 0.65rem 0.85rem; font-size: var(--text-xs); margin-bottom: 1rem; font-weight: 600;">
              ⚠️ Please enter both your Full Name and Phone/WhatsApp number to proceed.
            </div>

            <div class="yb-form-row">
              <div class="yb-form-group">
                <label class="yb-form-label">Full Name *</label>
                <input class="yb-form-input" type="text" id="ybName" placeholder="Your full name" required>
              </div>
              <div class="yb-form-group">
                <label class="yb-form-label">Phone / WhatsApp *</label>
                <input class="yb-form-input" type="tel" id="ybPhone" placeholder="+91 XXXXXXXXXX" required>
              </div>
            </div>
            <div class="yb-form-row">
              <div class="yb-form-group">
                <label class="yb-form-label">Number of People</label>
                <input class="yb-form-input" type="number" id="ybPeople" placeholder="e.g. 4" min="1">
              </div>
              <div class="yb-form-group">
                <label class="yb-form-label">Email (Optional)</label>
                <input class="yb-form-input" type="email" id="ybEmail" placeholder="your@email.com">
              </div>
            </div>
            <div class="yb-form-row">
              <div class="yb-form-group">
                <label class="yb-form-label">Preferred Start Date</label>
                <input class="yb-form-input" type="date" id="ybStartDate">
              </div>
              <div class="yb-form-group">
                <label class="yb-form-label">Preferred End Date</label>
                <input class="yb-form-input" type="date" id="ybEndDate">
              </div>
            </div>
            <div class="yb-nav">
              <button class="yb-btn yb-btn-back" id="ybBack2"><i class="fas fa-arrow-left"></i> Back</button>
              <button class="yb-btn yb-btn-next" id="ybNext2">Next <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>

          <!-- Step 3: Preferences -->
          <div class="yb-step" data-step="3">
            <div class="yb-step-title">Special Preferences</div>
            <div class="yb-step-desc">Select travel arrangements and your preferred accommodation class</div>
            
            <div class="yb-form-group">
              <label class="yb-form-label">Transportation Preference</label>
              <div class="yb-check-grid" id="ybTransport">
                <label class="yb-check-item" data-value="ac-car">
                  <input type="checkbox"><span class="yb-check-box">✓</span> 🚗 AC Car/SUV
                </label>
                <label class="yb-check-item" data-value="train">
                  <input type="checkbox"><span class="yb-check-box">✓</span> 🚂 Train
                </label>
                <label class="yb-check-item" data-value="flight">
                  <input type="checkbox"><span class="yb-check-box">✓</span> ✈️ Flight
                </label>
                <label class="yb-check-item" data-value="tempo">
                  <input type="checkbox"><span class="yb-check-box">✓</span> 🚐 Tempo Traveller
                </label>
              </div>
            </div>



            <div class="yb-nav">
              <button class="yb-btn yb-btn-back" id="ybBack3"><i class="fas fa-arrow-left"></i> Back</button>
              <button class="yb-btn yb-btn-next" id="ybNext3">Next <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>

          <!-- Step 4: Review & Submit -->
          <div class="yb-step" data-step="4">
            <div class="yb-step-title">Review & Submit</div>
            <div class="yb-step-desc">Check your selections and send us your yatra request</div>
            <div id="ybReview" style="margin-bottom: 1rem;"></div>
            <div class="yb-form-group">
              <label class="yb-form-label">Any Special Requests?</label>
              <textarea class="yb-form-textarea" id="ybSpecialReq" placeholder="E.g. elderly members needing wheelchair, dietary needs, specific hotel requests..."></textarea>
            </div>
            <div class="yb-nav">
              <button class="yb-btn yb-btn-back" id="ybBack4"><i class="fas fa-arrow-left"></i> Back</button>
              <button class="yb-btn yb-btn-next yb-btn-submit" id="ybSubmit"><i class="fas fa-paper-plane"></i> Submit Yatra Request</button>
            </div>
          </div>

          <!-- Success -->
          <div class="yb-step" data-step="success" id="ybSuccess">
            <div class="yb-success">
              <div class="yb-success-icon">🎉</div>
              <h3>Yatra Request Sent!</h3>
              <p>Our team will review your custom yatra request and get back to you within 24 hours with a personalized itinerary and quote.</p>
              <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
                <a href="https://wa.me/917569435006" target="_blank" class="yb-btn yb-btn-submit" style="text-decoration: none;"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
                <button class="yb-btn yb-btn-back" id="ybCloseSuccess">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // --- Populate Destination Grid ---
  function populateDestGrid() {
    const grid = document.getElementById('ybDestGrid');
    if (!grid) return;

    let html = '';
    
    html += '<div class="yb-dest-section">🏔️ Char Dham Circuit</div>';
    DESTINATIONS.chardham.forEach(d => {
      html += `<div class="yb-dest-chip main" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    html += '<div class="yb-dest-section">🌿 Holy Circuit (Choose all or any combination)</div>';
    DESTINATIONS.holy.forEach(d => {
      html += `<div class="yb-dest-chip" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    html += '<div class="yb-dest-section">🌅 South India</div>';
    DESTINATIONS.south.forEach(d => {
      html += `<div class="yb-dest-chip" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    html += '<div class="yb-dest-section">🛕 West India</div>';
    DESTINATIONS.west.forEach(d => {
      html += `<div class="yb-dest-chip" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    html += '<div class="yb-dest-section">🇳🇵 Nepal</div>';
    DESTINATIONS.nepal.forEach(d => {
      html += `<div class="yb-dest-chip main" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    html += '<div class="yb-dest-section">🧘 Adventures & Other abodes</div>';
    DESTINATIONS.adventures.forEach(d => {
      html += `<div class="yb-dest-chip" data-id="${d.id}">${d.icon} ${d.name}</div>`;
    });

    grid.innerHTML = html;

    // Chip click handler
    grid.querySelectorAll('.yb-dest-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        chip.classList.toggle('selected');
        if (selectedDests.includes(id)) {
          selectedDests = selectedDests.filter(d => d !== id);
          // Auto remove corresponding recommendations if destination deselected
          const rec = RECOMMENDATIONS[id];
          if (rec) {
            if (rec.places) rec.places.forEach(p => { selectedRecs = selectedRecs.filter(r => r !== p.id); });
            if (rec.things) rec.things.forEach(t => { selectedRecs = selectedRecs.filter(r => r !== t.id); });
          }
        } else {
          selectedDests.push(id);
        }
        updateRecommendations();
      });
    });
  }

  // --- Dynamic Recommendations ---
  function updateRecommendations() {
    const recContainer = document.getElementById('ybRecommendations');
    const recList = document.getElementById('ybRecList');
    if (!recContainer || !recList) return;

    let itemsHtml = '';
    let hasRecs = false;

    selectedDests.forEach(destId => {
      const rec = RECOMMENDATIONS[destId];
      if (rec) {
        hasRecs = true;

        // Near & Doable Places
        if (rec.places && rec.places.length > 0) {
          itemsHtml += `<div style="grid-column: 1 / -1; font-size: 11px; color: var(--gold-500); font-weight: 700; text-transform: uppercase; margin: 0.5rem 0 0.25rem; border-bottom: 1px solid rgba(230,184,79,0.08); padding-bottom: 2px;">📍 Recommended Near & Doable Places (${rec.title}):</div>`;
          rec.places.forEach(p => {
            const isChecked = selectedRecs.includes(p.id) || selectedDests.includes(p.id.replace('rec-', ''));
            itemsHtml += `
              <label class="yb-check-item rec-item${isChecked ? ' selected' : ''}" data-type="place" data-dest-id="${p.id.replace('rec-', '')}" data-id="${p.id}">
                <input type="checkbox" ${isChecked ? 'checked' : ''}><span class="yb-check-box">✓</span> ${p.icon} ${p.name}
              </label>
            `;
          });
        }

        // Special Things to Do & Rituals
        if (rec.things && rec.things.length > 0) {
          itemsHtml += `<div style="grid-column: 1 / -1; font-size: 11px; color: var(--gold-500); font-weight: 700; text-transform: uppercase; margin: 0.5rem 0 0.25rem; border-bottom: 1px solid rgba(230,184,79,0.08); padding-bottom: 2px;">✨ Special Rituals & Things To Do (${rec.title}):</div>`;
          rec.things.forEach(t => {
            const isChecked = selectedRecs.includes(t.id);
            itemsHtml += `
              <label class="yb-check-item rec-item${isChecked ? ' selected' : ''}" data-type="thing" data-id="${t.id}">
                <input type="checkbox" ${isChecked ? 'checked' : ''}><span class="yb-check-box">✓</span> ${t.icon} ${t.name}
              </label>
            `;
          });
        }
      }
    });

    if (hasRecs) {
      recContainer.style.display = 'block';
      recList.innerHTML = itemsHtml;

      // Add click listeners to recommendations
      recList.querySelectorAll('.rec-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const id = item.dataset.id;
          const type = item.dataset.type;
          
          item.classList.toggle('selected');
          const checkbox = item.querySelector('input');
          checkbox.checked = !checkbox.checked;

          if (selectedRecs.includes(id)) {
            selectedRecs = selectedRecs.filter(r => r !== id);
            if (type === 'place') {
              const destId = item.dataset.destId;
              selectedDests = selectedDests.filter(d => d !== destId);
              const chip = document.querySelector(`.yb-dest-chip[data-id="${destId}"]`);
              if (chip) chip.classList.remove('selected');
            }
          } else {
            selectedRecs.push(id);
            if (type === 'place') {
              const destId = item.dataset.destId;
              if (!selectedDests.includes(destId)) {
                selectedDests.push(destId);
                const chip = document.querySelector(`.yb-dest-chip[data-id="${destId}"]`);
                if (chip) chip.classList.add('selected');
              }
            }
          }
        });
      });
    } else {
      recContainer.style.display = 'none';
      recList.innerHTML = '';
    }
  }

  // --- Custom Destination ---
  function setupCustomDest() {
    const input = document.getElementById('ybCustomInput');
    const btn = document.getElementById('ybAddCustom');
    const tagsEl = document.getElementById('ybCustomTags');

    if (!btn) return;

    function addCustom() {
      const val = input.value.trim();
      if (!val) return;
      customDests.push(val);
      input.value = '';
      renderCustomTags();
    }

    btn.addEventListener('click', addCustom);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') addCustom(); });

    function renderCustomTags() {
      tagsEl.innerHTML = customDests.map((d, i) => 
        `<span class="yb-custom-tag">${d} <span class="remove-tag" data-idx="${i}">&times;</span></span>`
      ).join('');
      tagsEl.querySelectorAll('.remove-tag').forEach(t => {
        t.addEventListener('click', () => {
          customDests.splice(parseInt(t.dataset.idx), 1);
          renderCustomTags();
        });
      });
    }
  }

  // --- Checkbox Items ---
  function setupCheckItems() {
    document.querySelectorAll('.yb-check-item:not(.rec-item)').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('selected');
      });
    });
  }

  // --- Navigation ---
  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.yb-step').forEach(s => s.classList.remove('active'));
    const target = document.querySelector(`.yb-step[data-step="${step}"]`);
    if (target) target.classList.add('active');

    // Update progress
    document.querySelectorAll('.yb-progress-step').forEach((p, i) => {
      p.classList.remove('active', 'done');
      if (i + 1 < step) p.classList.add('done');
      if (i + 1 === step) p.classList.add('active');
    });

    // Update step labels
    document.querySelectorAll('.yb-step-label').forEach((l, i) => {
      l.classList.toggle('active', i + 1 === step);
    });

    // Scroll modal to top
    const modal = document.getElementById('ybModal');
    if (modal) modal.scrollTop = 0;

    // Build review on Step 4
    if (step === 4) buildReview();
  }

  // --- Build Review Summary ---
  function buildReview() {
    const review = document.getElementById('ybReview');
    if (!review) return;

    const allDests = [...selectedDests.map(id => {
      for (const cat of Object.values(DESTINATIONS)) {
        const found = cat.find(d => d.id === id);
        if (found) return found.name;
      }
      return id;
    }), ...customDests];

    const name = document.getElementById('ybName')?.value || 'Not provided';
    const phone = window.ybIti ? window.ybIti.getNumber() : (document.getElementById('ybPhone')?.value || 'Not provided');
    const people = document.getElementById('ybPeople')?.value || 'Not provided';
    const startDate = document.getElementById('ybStartDate')?.value || 'Flexible';
    const endDate = document.getElementById('ybEndDate')?.value || 'Flexible';

    // Parse recommendations chosen
    const recThings = [];
    selectedRecs.forEach(recId => {
      // Find matching item in recommendations
      for (const rec of Object.values(RECOMMENDATIONS)) {
        const foundThing = rec.things?.find(t => t.id === recId);
        if (foundThing) recThings.push(foundThing.name);
      }
    });

    const transport = [];
    document.querySelectorAll('#ybTransport .yb-check-item.selected').forEach(item => {
      transport.push(item.textContent.trim());
    });

    review.innerHTML = `
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1rem; font-size: 13px; line-height: 2;">
        <div><strong style="color: var(--gold-400);">📍 Chosen Destinations:</strong> ${allDests.length ? allDests.join(', ') : 'None selected'}</div>
        <div><strong style="color: var(--gold-400);">👤 Full Name:</strong> ${name}</div>
        <div><strong style="color: var(--gold-400);">📱 Phone / WhatsApp:</strong> ${phone}</div>
        <div><strong style="color: var(--gold-400);">👥 Group Size:</strong> ${people}</div>
        <div><strong style="color: var(--gold-400);">📅 Preferred Dates:</strong> ${startDate} → ${endDate}</div>
        <div><strong style="color: var(--gold-400);">✨ Special Rituals/Activities Chosen:</strong> ${recThings.length ? recThings.join(', ') : 'None selected'}</div>
        <div><strong style="color: var(--gold-400);">🚗 Transportation:</strong> ${transport.length ? transport.join(', ') : 'Not specified'}</div>
      </div>
    `;
  }

  // --- Submit Handler ---
  function handleSubmit() {
    const allDests = [...selectedDests.map(id => {
      for (const cat of Object.values(DESTINATIONS)) {
        const found = cat.find(d => d.id === id);
        if (found) return found.name;
      }
      return id;
    }), ...customDests];

    const data = {
      destinations: allDests.join(', '),
      name: document.getElementById('ybName')?.value || '',
      phone: window.ybIti ? window.ybIti.getNumber() : (document.getElementById('ybPhone')?.value || ''),
      email: document.getElementById('ybEmail')?.value || '',
      people: document.getElementById('ybPeople')?.value || '',
      startDate: document.getElementById('ybStartDate')?.value || '',
      endDate: document.getElementById('ybEndDate')?.value || '',
      specialRequests: document.getElementById('ybSpecialReq')?.value || '',
    };

    const recThings = [];
    selectedRecs.forEach(recId => {
      for (const rec of Object.values(RECOMMENDATIONS)) {
        const foundThing = rec.things?.find(t => t.id === recId);
        if (foundThing) recThings.push(foundThing.name);
      }
    });
    data.specialRituals = recThings.join(', ');

    const transport = [];
    document.querySelectorAll('#ybTransport .yb-check-item.selected').forEach(item => {
      transport.push(item.textContent.trim());
    });
    data.transport = transport.join(', ');

    // Post to formsubmit endpoint
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/matpathiravikanth@gmail.com';
    form.style.display = 'none';

    // Form settings
    const subjectField = document.createElement('input');
    subjectField.type = 'hidden';
    subjectField.name = '_subject';
    subjectField.value = `New Custom Yatra Design Request from ${data.name}`;
    form.appendChild(subjectField);

    const captchaField = document.createElement('input');
    captchaField.type = 'hidden';
    captchaField.name = '_captcha';
    captchaField.value = 'false';
    form.appendChild(captchaField);

    // Append fields
    Object.keys(data).forEach(key => {
      const field = document.createElement('input');
      field.type = 'hidden';
      field.name = key;
      field.value = data[key];
      form.appendChild(field);
    });

    document.body.appendChild(form);
    form.submit();

    // Show success UI locally in wizard
    document.querySelectorAll('.yb-step').forEach(s => s.classList.remove('active'));
    document.getElementById('ybSuccess').classList.add('active');

    // Update progress to all done
    document.querySelectorAll('.yb-progress-step').forEach(p => p.classList.add('done'));
  }

  // --- Open/Close Modal ---
  function openModal() {
    document.getElementById('ybOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('ybOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function resetWizard() {
    currentStep = 1;
    selectedDests = [];
    customDests = [];
    selectedRecs = [];
    
    // Reset form values
    const inputs = document.querySelectorAll('.yb-modal input, .yb-modal textarea, .yb-modal select');
    inputs.forEach(inp => { inp.value = ''; });

    // Reset selections
    document.querySelectorAll('.yb-dest-chip').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.yb-check-item').forEach(c => c.classList.remove('selected'));
    document.getElementById('ybCustomTags').innerHTML = '';
    
    const recContainer = document.getElementById('ybRecommendations');
    if (recContainer) recContainer.style.display = 'none';
    const recList = document.getElementById('ybRecList');
    if (recList) recList.innerHTML = '';

    goToStep(1);
  }

  // --- Init ---
  function init() {
    createBuilderHTML();

    // Load intl-tel-input
    if (!window.intlTelInput) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/css/intlTelInput.css';
      document.head.appendChild(css);
      
      const customCss = document.createElement('style');
      customCss.innerHTML = '.iti { width: 100%; } .iti__flag-container { z-index: 10; }';
      document.head.appendChild(customCss);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/intlTelInput.min.js';
      script.onload = () => {
        const phoneInput = document.getElementById('ybPhone');
        if (phoneInput) {
          window.ybIti = window.intlTelInput(phoneInput, {
            initialCountry: "in",
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js"
          });
        }
      };
      document.head.appendChild(script);
    }

    populateDestGrid();
    setupCustomDest();
    setupCheckItems();

    // Float button
    document.getElementById('yatraBuilderFloat').addEventListener('click', () => {
      resetWizard();
      openModal();
    });

    // Close
    document.getElementById('ybClose').addEventListener('click', closeModal);
    document.getElementById('ybOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('ybCloseSuccess')?.addEventListener('click', closeModal);

    // Navigation Step 1
    document.getElementById('ybNext1')?.addEventListener('click', () => {
      goToStep(2);
    });

    // Navigation Step 2 with validation
    document.getElementById('ybNext2')?.addEventListener('click', () => {
      const nameInput = document.getElementById('ybName');
      const phoneInput = document.getElementById('ybPhone');
      const errorEl = document.getElementById('ybStep2Error');

      const isPhoneValid = window.ybIti ? window.ybIti.isValidNumber() : phoneInput.value.trim() !== '';

      if (!nameInput.value.trim() || !isPhoneValid) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.innerHTML = '⚠️ Please enter both your Full Name and a valid Phone/WhatsApp number to proceed.';
        }
        nameInput.style.borderColor = !nameInput.value.trim() ? '#ff4d4d' : '';
        phoneInput.style.borderColor = !isPhoneValid ? '#ff4d4d' : '';
        return;
      }
      
      if (errorEl) errorEl.style.display = 'none';
      nameInput.style.borderColor = '';
      phoneInput.style.borderColor = '';
      goToStep(3);
    });
    document.getElementById('ybBack2')?.addEventListener('click', () => goToStep(1));

    // Navigation Step 3
    document.getElementById('ybNext3')?.addEventListener('click', () => goToStep(4));
    document.getElementById('ybBack3')?.addEventListener('click', () => goToStep(2));

    // Navigation Step 4 (Back only)
    document.getElementById('ybBack4')?.addEventListener('click', () => goToStep(3));

    // Submit
    document.getElementById('ybSubmit')?.addEventListener('click', handleSubmit);

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
