/* ============================================
   YatraKaar — Admin Dashboard
   ============================================ */

const LEADS_KEY = 'yatrakaar_leads';
const ADMIN_PASSWORD = 'yatrakaar2024';

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY)) || [];
  } catch {
    return [];
  }
}

function initAdmin() {
  const loginSection = document.getElementById('adminLogin');
  const dashboard = document.getElementById('adminDashboard');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (!loginSection || !dashboard) return;

  // Check if already authenticated this session
  if (sessionStorage.getItem('admin_auth') === 'true') {
    showDashboard();
    return;
  }

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      showDashboard();
    } else {
      loginError.textContent = 'Incorrect password. Please try again.';
      loginError.style.display = 'block';
    }
  });

  function showDashboard() {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
    renderLeads();
  }
}

function renderLeads() {
  const leads = getLeads();
  const tbody = document.getElementById('leadsTableBody');
  const totalCount = document.getElementById('totalLeads');
  const quoteCount = document.getElementById('quoteLeads');
  const contactCount = document.getElementById('contactLeads');
  const recentCount = document.getElementById('recentLeads');

  if (!tbody) return;

  // Update stats
  const now = new Date();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const recentLeads = leads.filter(l => new Date(l.timestamp) > weekAgo);

  if (totalCount) totalCount.textContent = leads.length;
  if (quoteCount) quoteCount.textContent = leads.filter(l => l.type === 'quote').length;
  if (contactCount) contactCount.textContent = leads.filter(l => l.type === 'contact').length;
  if (recentCount) recentCount.textContent = recentLeads.length;

  // Render table
  if (leads.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No leads captured yet. Leads will appear here when visitors submit forms.
        </td>
      </tr>
    `;
    return;
  }

  // Sort by newest first
  const sorted = [...leads].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  tbody.innerHTML = sorted.map(lead => `
    <tr>
      <td><span class="lead-type lead-type--${lead.type}">${lead.type}</span></td>
      <td>${escapeHTML(lead.name || '-')}</td>
      <td>${escapeHTML(lead.email || '-')}</td>
      <td>${escapeHTML(lead.phone || '-')}</td>
      <td>${escapeHTML(lead.destination || lead.subject || '-')}</td>
      <td class="lead-message" title="${escapeHTML(lead.message || '')}">${escapeHTML(truncate(lead.message || '-', 50))}</td>
      <td>${formatDate(lead.timestamp)}</td>
    </tr>
  `).join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function truncate(str, len) {
  return str.length > len ? str.substring(0, len) + '...' : str;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Export to CSV
function exportCSV() {
  const leads = getLeads();
  if (!leads.length) {
    alert('No leads to export.');
    return;
  }

  const headers = ['Type', 'Name', 'Email', 'Phone', 'Destination/Subject', 'Message', 'Travelers', 'Date', 'Page', 'Timestamp'];
  const rows = leads.map(l => [
    l.type,
    l.name || '',
    l.email || '',
    l.phone || '',
    l.destination || l.subject || '',
    (l.message || '').replace(/"/g, '""'),
    l.travelers || '',
    l.date || '',
    l.page || '',
    l.timestamp
  ]);

  let csv = headers.join(',') + '\n';
  csv += rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yatrakaar_leads_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearLeads() {
  if (confirm('Are you sure you want to delete ALL leads? This cannot be undone.')) {
    localStorage.removeItem(LEADS_KEY);
    renderLeads();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initAdmin();

  document.getElementById('exportCSV')?.addEventListener('click', exportCSV);
  document.getElementById('clearLeads')?.addEventListener('click', clearLeads);
  document.getElementById('refreshLeads')?.addEventListener('click', renderLeads);
});
