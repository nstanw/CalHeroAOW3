const heroData = {
  wasp: {
    levels: [250, 550, 1000, 1750, 3000, 5000, 8000, 12000, 17000, 23500, 33000, 48500],
    maxLevel: 12
  },
  wolverine: {
    levels: [1000, 600, 1200, 2100, 3600, 6000, 11000, 21000],
    maxLevel: 8
  },
  mole: {
    levels: [70, 160, 300, 520, 860, 1400, 2300, 3400, 4700, 6400, 8900, 12800],
    maxLevel: 12
  },
  salamander: {
    levels: [280, 175, 360, 625, 1000, 1700],
    maxLevel: 6
  },
  leviathan: {
    levels: [25, 60, 110, 180, 300, 500, 800, 1200, 1650, 2200, 3100, 4900],
    maxLevel: 12
  }
};

function calculateLevel() {
  const heroName = document.getElementById('heroName').value;
  const fragments = parseInt(document.getElementById('fragments').value);
  const currentLevel = parseInt(document.getElementById('currentLevel').value);

  // Validation
  if (isNaN(fragments) || fragments < 0) {
    showNotification('⚠️ Vui lòng nhập số fragments hợp lệ!', 'error');
    return;
  }

  const hero = heroData[heroName];
  let level = currentLevel;
  let remainingFragments = fragments;
  let levelDetails = "";
  let nextLevelFragmentsNeeded = 0;
  let startLevel = currentLevel + 1;

  for (let i = startLevel; i <= hero.maxLevel; i++) {
    const requiredFragments = hero.levels[i - 1];
    const fragmentsNeeded = requiredFragments - remainingFragments;
    const levelMessage = `<strong>Level ${i}:</strong> Cần ${requiredFragments} fragments`;
    let remainingMessage = "";
    
    if (remainingFragments >= requiredFragments) {
      remainingMessage = `✅ Đủ fragments! Còn lại: <span style="color: #27ae60; font-weight: bold;">${remainingFragments - requiredFragments}</span>`;
      remainingFragments -= requiredFragments;
      level++;
    } else {
      remainingMessage = `❌ Thiếu: <span style="color: #e74c3c; font-weight: bold;">${fragmentsNeeded > 0 ? fragmentsNeeded : 0}</span> fragments`;
      nextLevelFragmentsNeeded = fragmentsNeeded > 0 ? fragmentsNeeded : 0;
      break;
    }
    levelDetails += `<div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 8px; border-left: 3px solid #667eea;">${levelMessage}<br>${remainingMessage}</div>`;
  }

  // Show results with animations
  const resultDiv = document.getElementById('result');
  const heroEmoji = getHeroEmoji(heroName);
  
  resultDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 3em; margin-bottom: 10px;">${heroEmoji}</div>
      <h4 style="color: #2c3e50; margin-bottom: 15px;">${getHeroDisplayName(heroName)}</h4>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
      <div style="text-align: center; padding: 15px; background: #e3f2fd; border-radius: 10px;">
        <div style="font-size: 1.5em; color: #1976d2;">📊</div>
        <div style="font-weight: bold; color: #1976d2;">Level hiện tại</div>
        <div style="font-size: 1.5em; font-weight: bold;">${currentLevel}</div>
      </div>
      <div style="text-align: center; padding: 15px; background: #e8f5e8; border-radius: 10px;">
        <div style="font-size: 1.5em; color: #388e3c;">🎯</div>
        <div style="font-weight: bold; color: #388e3c;">Level tối đa đạt được</div>
        <div style="font-size: 1.5em; font-weight: bold; color: #27ae60;">${level}</div>
      </div>
      <div style="text-align: center; padding: 15px; background: #fff3e0; border-radius: 10px;">
        <div style="font-size: 1.5em; color: #f57c00;">💎</div>
        <div style="font-weight: bold; color: #f57c00;">Fragments còn lại</div>
        <div style="font-size: 1.5em; font-weight: bold;">${remainingFragments}</div>
      </div>
      <div style="text-align: center; padding: 15px; background: #fce4ec; border-radius: 10px;">
        <div style="font-size: 1.5em; color: #c2185b;">⚡</div>
        <div style="font-weight: bold; color: #c2185b;">Cần thêm cho level tiếp theo</div>
        <div style="font-size: 1.5em; font-weight: bold; color: ${nextLevelFragmentsNeeded > 0 ? '#e74c3c' : '#27ae60'};">${nextLevelFragmentsNeeded}</div>
      </div>
    </div>
  `;

  const levelDetailsDiv = document.getElementById('levelDetails');
  levelDetailsDiv.innerHTML = levelDetails || '<p style="text-align: center; color: #666;">🎉 Bạn đã đạt level tối đa!</p>';

  // Show result cards
  showResultCards();
  updateLevelNav(heroName);
  updateHeroList();
  
  showNotification('✅ Tính toán thành công!', 'success');
}

function setLevel(level) {
  document.getElementById('currentLevel').value = level;
}

function updateLevelNav(heroName) {
  const hero = heroData[heroName];
  const nav = document.getElementById('levelNav');
  const heroEmoji = getHeroEmoji(heroName);
  
  let navHTML = `<div style="text-align: center; margin-bottom: 15px;">
    <span style="font-size: 2em;">${heroEmoji}</span>
    <h4 style="color: #2c3e50; margin: 5px 0;">${getHeroDisplayName(heroName)}</h4>
  </div><ul style="list-style: none; padding: 0;">`;
  
  for (let i = 1; i <= hero.maxLevel; i++) {
    const fragments = hero.levels[i - 1];
    navHTML += `<li style="padding: 10px; margin: 5px 0; background: linear-gradient(45deg, #f8f9fa, #e9ecef); border-radius: 8px; border-left: 4px solid #667eea; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-weight: bold; color: #2c3e50;">Level ${i}</span>
      <span style="color: #667eea; font-weight: bold;">${fragments.toLocaleString()} fragments</span>
    </li>`;
  }
  navHTML += "</ul>";
  nav.innerHTML = navHTML;
}

function updateHeroList() {
  const heroListDiv = document.getElementById('heroList');
  let heroListHTML = "<ul style='list-style: none; padding: 0;'>";
  
  for (const hero in heroData) {
    const emoji = getHeroEmoji(hero);
    const displayName = getHeroDisplayName(hero);
    const maxLevel = heroData[hero].maxLevel;
    const totalFragments = heroData[hero].levels.reduce((sum, fragments) => sum + fragments, 0);
    
    heroListHTML += `<li style="padding: 15px; margin: 10px 0; background: linear-gradient(45deg, #f8f9fa, #e9ecef); border-radius: 12px; border-left: 4px solid #667eea; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.5em;">${emoji}</span>
          <div>
            <div style="font-weight: bold; color: #2c3e50;">${displayName}</div>
            <div style="font-size: 0.9em; color: #666;">Max Level: ${maxLevel} | Tổng: ${totalFragments.toLocaleString()} fragments</div>
          </div>
        </div>
        <button onclick="selectHero('${hero}')" style="padding: 8px 15px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 0.9em;">Chọn</button>
      </div>
    </li>`;
  }
  heroListHTML += "</ul>";
  heroListDiv.innerHTML = heroListHTML;
}

function showDetails() {
  const detailsDiv = document.getElementById('details');
  let detailsHTML = "<div style='display: grid; gap: 20px;'>";
  
  for (const hero in heroData) {
    const emoji = getHeroEmoji(hero);
    const displayName = getHeroDisplayName(hero);
    const totalFragments = heroData[hero].levels.reduce((sum, fragments) => sum + fragments, 0);
    
    detailsHTML += `<div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 5px solid #667eea;">
      <div style="text-align: center; margin-bottom: 15px;">
        <span style="font-size: 2.5em;">${emoji}</span>
        <h4 style="color: #2c3e50; margin: 10px 0;">${displayName}</h4>
        <p style="color: #666; font-size: 0.9em;">Max Level: ${heroData[hero].maxLevel} | Tổng fragments: ${totalFragments.toLocaleString()}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">`;
    
    heroData[hero].levels.forEach((fragments, index) => {
      detailsHTML += `<div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e6ed;">
        <div style="font-weight: bold; color: #667eea;">Level ${index + 1}</div>
        <div style="color: #2c3e50; font-weight: bold;">${fragments.toLocaleString()}</div>
        <div style="font-size: 0.8em; color: #666;">fragments</div>
      </div>`;
    });
    
    detailsHTML += "</div></div>";
  }
  detailsHTML += "</div>";
  detailsDiv.innerHTML = detailsHTML;
  
  // Show details card
  document.getElementById('detailsCard').style.display = 'block';
  document.getElementById('detailsCard').scrollIntoView({ behavior: 'smooth' });
  
  showNotification('📖 Hiển thị chi tiết tất cả heroes!', 'info');
}

// Helper functions
function getHeroEmoji(heroName) {
  const emojis = {
    wasp: '⚡',
    wolverine: '🐺', 
    mole: '🔮',
    salamander: '🔥',
    leviathan: '🌊'
  };
  return emojis[heroName] || '⚔️';
}

function getHeroDisplayName(heroName) {
  const names = {
    wasp: 'WASP/CERBERUS',
    wolverine: 'WOLVERINE/BEHOLDER',
    mole: 'MOLE/SERAPHIM', 
    salamander: 'SALAMANDER/PSION',
    leviathan: 'LEVIATHAN/SOLARIS'
  };
  return names[heroName] || heroName.toUpperCase();
}

function selectHero(heroName) {
  document.getElementById('heroName').value = heroName;
  showNotification(`✅ Đã chọn ${getHeroDisplayName(heroName)}!`, 'success');
}

function showResultCards() {
  document.getElementById('resultCard').style.display = 'block';
  document.getElementById('levelDetailsCard').style.display = 'block';
  document.getElementById('levelNavCard').style.display = 'block';
  document.getElementById('heroListCard').style.display = 'block';
}

function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = message;
  
  const colors = {
    success: '#27ae60',
    error: '#e74c3c', 
    info: '#3498db',
    warning: '#f39c12'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Mobile optimization functions
function isMobile() {
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function addMobileOptimizations() {
  // Prevent zoom on input focus for iOS
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (isMobile()) {
        document.querySelector('meta[name=viewport]').setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    });
    
    input.addEventListener('blur', function() {
      if (isMobile()) {
        document.querySelector('meta[name=viewport]').setAttribute('content', 
          'width=device-width, initial-scale=1.0');
      }
    });
  });

  // Add touch feedback for mobile
  if (isMobile()) {
    document.body.classList.add('mobile-device');
    
    // Smooth scroll to results on mobile
    const calculateBtn = document.querySelector('.btn-primary');
    calculateBtn.addEventListener('click', function() {
      setTimeout(() => {
        const resultCard = document.getElementById('resultCard');
        if (resultCard.style.display !== 'none') {
          resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}

// Optimize notifications for mobile
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = message;
  
  const colors = {
    success: '#27ae60',
    error: '#e74c3c', 
    info: '#3498db',
    warning: '#f39c12'
  };
  
  // Mobile-optimized positioning
  const isMobileDevice = isMobile();
  
  notification.style.cssText = `
    position: fixed;
    ${isMobileDevice ? 'top: 10px; left: 10px; right: 10px; width: auto;' : 'top: 20px; right: 20px;'}
    background: ${colors[type] || colors.info};
    color: white;
    padding: ${isMobileDevice ? '12px 15px' : '15px 20px'};
    border-radius: ${isMobileDevice ? '8px' : '10px'};
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: bold;
    font-size: ${isMobileDevice ? '0.9em' : '1em'};
    animation: slideIn 0.3s ease;
    text-align: center;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, isMobileDevice ? 2500 : 3000);
}

// Add CSS animations and mobile styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  /* Mobile-specific styles */
  .mobile-device .input-group:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
  
  .mobile-device .btn:active {
    transform: scale(0.98);
  }
  
  .mobile-device .level-buttons button:active {
    transform: scale(0.95);
  }
  
  /* Improve touch targets */
  @media (max-width: 480px) {
    button, .btn, input, select {
      min-height: 44px; /* Apple's recommended touch target size */
    }
    
    .level-buttons button {
      min-width: 44px;
      min-height: 44px;
    }
  }
  
  /* Loading animation for mobile */
  .loading {
    position: relative;
    pointer-events: none;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Visitor tracking system
class VisitorTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.isActive = true;
    this.lastActivity = Date.now();
    this.init();
  }

  generateSessionId() {
    return 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  init() {
    this.loadStats();
    this.trackVisit();
    this.initializeOnlineCount();
    this.startHeartbeat();
    this.setupActivityTracking();
    this.updateDisplay();
    
    // Update display every 30 seconds
    setInterval(() => this.updateDisplay(), 30000);
  }

  loadStats() {
    // Load from localStorage (simulate server data)
    this.stats = {
      totalVisits: parseInt(localStorage.getItem('totalVisits') || '0'),
      onlineUsers: this.getOnlineUsers(),
      lastUpdate: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  }

  initializeOnlineCount() {
    // Start with just the current user (honest approach)
    this.currentOnlineCount = 1;
    
    // In a real application, this would be managed by the server
    // For now, we'll just show the actual current user
    localStorage.setItem('currentOnlineCount', '1');
  }

  trackVisit() {
    // Increment total visits
    this.stats.totalVisits++;
    localStorage.setItem('totalVisits', this.stats.totalVisits.toString());
    
    // Add current session to online users
    const onlineUsers = this.getOnlineUsers();
    onlineUsers[this.sessionId] = {
      joinTime: Date.now(),
      lastSeen: Date.now(),
      userAgent: navigator.userAgent,
      location: this.getLocationInfo()
    };
    localStorage.setItem('onlineUsers', JSON.stringify(onlineUsers));
  }

  getOnlineUsers() {
    const stored = localStorage.getItem('onlineUsers');
    const users = stored ? JSON.parse(stored) : {};
    const now = Date.now();
    
    // Remove users inactive for more than 5 minutes
    Object.keys(users).forEach(sessionId => {
      if (now - users[sessionId].lastSeen > 5 * 60 * 1000) {
        delete users[sessionId];
      }
    });
    
    localStorage.setItem('onlineUsers', JSON.stringify(users));
    return users;
  }

  getLocationInfo() {
    // Simulate location detection (in real app, use IP geolocation)
    const locations = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Nha Trang'];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  startHeartbeat() {
    // Send heartbeat every 30 seconds
    setInterval(() => {
      if (this.isActive) {
        const onlineUsers = this.getOnlineUsers();
        if (onlineUsers[this.sessionId]) {
          onlineUsers[this.sessionId].lastSeen = Date.now();
          localStorage.setItem('onlineUsers', JSON.stringify(onlineUsers));
        }
      }
    }, 30000);
  }

  setupActivityTracking() {
    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        this.lastActivity = Date.now();
        this.isActive = true;
      }, true);
    });

    // Check for inactivity
    setInterval(() => {
      if (Date.now() - this.lastActivity > 2 * 60 * 1000) { // 2 minutes
        this.isActive = false;
      }
    }, 60000);
  }

  updateDisplay() {
    // Use the realistic online count instead of localStorage count
    const displayOnlineCount = this.currentOnlineCount || 1;
    
    // Update counters with animation
    this.animateCounter('onlineCount', displayOnlineCount);
    this.animateCounter('totalVisits', this.stats.totalVisits);
    
    // Update time
    document.getElementById('lastUpdate').textContent = 
      new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    // Add online indicator
    const onlineElement = document.getElementById('onlineCount');
    if (!onlineElement.querySelector('.online-indicator')) {
      onlineElement.innerHTML += '<span class="online-indicator"></span>';
    }
  }

  animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue === targetValue) return;
    
    const increment = targetValue > currentValue ? 1 : -1;
    const duration = 1000;
    const steps = Math.abs(targetValue - currentValue);
    const stepDuration = duration / steps;
    
    let current = currentValue;
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current.toLocaleString();
      
      if (current === targetValue) {
        clearInterval(timer);
        // Add flash effect
        element.style.animation = 'flash 0.5s ease';
        setTimeout(() => element.style.animation = '', 500);
      }
    }, stepDuration);
  }

  // Real user tracking (no fake simulation)
  simulateRealTimeUpdates() {
    // In a real application, this would connect to a WebSocket server
    // to get actual real-time user counts from multiple clients
    
    // For now, we just maintain the honest count of 1 (current user)
    // and update the total visits counter
    setInterval(() => {
      // Just update the timestamp to show the system is active
      this.updateDisplay();
    }, 30000); // Every 30 seconds
    
    // Note: In production, you would:
    // 1. Connect to WebSocket server
    // 2. Send heartbeat with user session
    // 3. Receive real online count from server
    // 4. Update display with actual data
  }
}

// Initialize visitor tracking
let visitorTracker;

// Initialize mobile optimizations when page loads
document.addEventListener('DOMContentLoaded', function() {
  addMobileOptimizations();
  
  // Initialize visitor tracking
  visitorTracker = new VisitorTracker();
  
  // Start real-time updates (honest tracking)
  setTimeout(() => {
    visitorTracker.simulateRealTimeUpdates();
  }, 5000);
  
  // Add loading state to calculate button
  const calculateBtn = document.querySelector('.btn-primary');
  const originalCalculateLevel = window.calculateLevel;
  
  window.calculateLevel = function() {
    calculateBtn.classList.add('loading');
    calculateBtn.disabled = true;
    
    setTimeout(() => {
      originalCalculateLevel();
      calculateBtn.classList.remove('loading');
      calculateBtn.disabled = false;
    }, isMobile() ? 300 : 100);
  };
});
