// Chatbot logic for Sahayak AI
const systemPrompt = `You are Sahayak AI, the official AI assistant for YatraKaar, a premium spiritual tours and travels company based in Hyderabad.
You must ONLY answer questions related to YatraKaar's services, destinations, and general spiritual travel information.

**About YatraKaar:**
- Founders: Sai Vardhan Reddy B, Venu Gopal Raj S, and Ravikanth Matpathi.
- Mission: To make sacred pilgrimages accessible, comfortable, and fully customizable.
- Key Services: Custom Yatras, VIP Darshan slots, Transportation (AC vehicles), Accommodation, Rituals & Poojas, Adventure Treks, and A-Z On-Ground Coordination.
- Popular Destinations: Char Dham Yatra (Badrinath, Kedarnath, Gangotri, Yamunotri), Ayodhya-Kashi-Prayagraj, Puri Jagannath, Tirupati Balaji, Nepal (Pashupatinath & Muktinath), 12 Jyotirlingas, Somnath & Dwaraka, and Himalayan Treks.

**Rules:**
1. If asked about the founders, list their names.
2. If asked what yatras/services are offered, list the popular destinations and services.
3. STRICTLY DO NOT answer unnecessary questions (e.g., general knowledge, coding, politics). 
4. DO NOT promote other brands or travel companies. 
5. If a user asks something outside your scope, reply: 'Please contact our team for more info on such questions.'`;

let chatHistory = [
  { role: 'system', content: systemPrompt }
];

export function initChatbot() {
  // Inject Chatbot HTML
  const chatbotHTML = `
    <div class="chatbot-container">
      <div class="chatbot-window" id="chatbotWindow">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
            <div>
              <h3 class="chatbot-title">Sahayak AI</h3>
              <span class="chatbot-status">Online</span>
            </div>
          </div>
          <button class="chatbot-close" id="chatbotClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
          <div class="message message-bot">Namaskaram! 🙏 I am Sahayak AI. How can I help you plan your spiritual journey today?</div>
        </div>
        <div class="chatbot-input-area">
          <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your question..." autocomplete="off">
          <button class="chatbot-send" id="chatbotSend"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
      <button class="chatbot-button" id="chatbotToggle" aria-label="Open Chat">
        <i class="fas fa-comment-dots"></i>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const toggleBtn = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const chatWindow = document.getElementById('chatbotWindow');
  const inputEl = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const messagesContainer = document.getElementById('chatbotMessages');

  let isOpen = false;

  const toggleChat = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatWindow.classList.add('active');
      toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
      inputEl.focus();
    } else {
      chatWindow.classList.remove('active');
      toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    }
  };

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  const addMessage = (content, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'message-user' : 'message-bot');
    msgDiv.textContent = content;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const showTypingIndicator = () => {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  };

  const sendMessage = async () => {
    const text = inputEl.value.trim();
    if (!text) return;

    // Add user message to UI and history
    addMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    inputEl.value = '';
    sendBtn.disabled = true;

    showTypingIndicator();

    try {
      // First try to use VITE_GROQ_API_KEY from env if available (for local dev)
      const clientSideKey = import.meta.env?.VITE_GROQ_API_KEY;
      
      let replyText = "";

      if (clientSideKey) {
        // Fallback to client-side API call via Vite Proxy if key is provided directly in .env
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${clientSideKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: chatHistory
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`API request failed: ${response.status} ${errText}`);
        }
        const data = await response.json();
        replyText = data.choices[0].message.content;
      } else {
        // Use Netlify function for production "supersafe" backend call
        const response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: chatHistory })
        });
        
        if (!response.ok) throw new Error('Backend request failed');
        const data = await response.json();
        replyText = data.reply;
      }

      removeTypingIndicator();
      addMessage(replyText, 'bot');
      chatHistory.push({ role: 'assistant', content: replyText });

    } catch (error) {
      console.error(error);
      removeTypingIndicator();
      addMessage("Sorry, I'm having trouble connecting right now. Please try again later or contact our team directly.", 'bot');
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
