/**
 * Windows XP Luna Theme - JavaScript
 * Handles window state, taskbar logic, and start menu functionality
 */

(function() {
  'use strict';

  // Window State Management
  const windowStates = {};

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function() {
    initClock();
    initStartMenu();
    initWindowDrag();
    initDesktopIcons();
    initKeyboardShortcuts();
  });

  /**
   * Clock functionality
   */
  function initClock() {
    const clockEl = document.getElementById('xp-clock');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      clockEl.textContent = hours + ':' + minutes + ' ' + ampm;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  /**
   * Start Menu functionality
   */
  function initStartMenu() {
    const startBtn = document.getElementById('xp-start-btn');
    const startMenu = document.getElementById('xp-start-menu');

    if (!startBtn || !startMenu) return;

    // Close start menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        xpCloseStartMenu();
      }
    });
  }

  /**
   * Toggle Start Menu
   */
  window.xpToggleStartMenu = function() {
    const startMenu = document.getElementById('xp-start-menu');
    const startBtn = document.getElementById('xp-start-btn');

    if (!startMenu) return;

    if (startMenu.classList.contains('open')) {
      startMenu.classList.remove('open');
      startBtn.classList.remove('active');
    } else {
      startMenu.classList.add('open');
      startBtn.classList.add('active');
    }
  };

  /**
   * Close Start Menu
   */
  window.xpCloseStartMenu = function() {
    const startMenu = document.getElementById('xp-start-menu');
    const startBtn = document.getElementById('xp-start-btn');

    if (startMenu) {
      startMenu.classList.remove('open');
    }
    if (startBtn) {
      startBtn.classList.remove('active');
    }
  };

  /**
   * Minimize Window
   */
  window.xpMinimizeWindow = function(windowId) {
    const windowEl = document.getElementById('xp-main-window');
    if (!windowEl) return;

    windowEl.classList.add('minimized');
    windowStates[windowId] = windowStates[windowId] || {};
    windowStates[windowId].minimized = true;

    // Update taskbar item
    const taskbarItem = document.querySelector('.xp-taskbar-item.active');
    if (taskbarItem) {
      taskbarItem.classList.remove('active');
    }
  };

  /**
   * Maximize Window
   */
  window.xpMaximizeWindow = function(windowId) {
    const windowEl = document.getElementById('xp-main-window');
    if (!windowEl) return;

    windowStates[windowId] = windowStates[windowId] || {};

    if (windowEl.classList.contains('maximized')) {
      // Restore
      windowEl.classList.remove('maximized');
      windowStates[windowId].maximized = false;

      // Restore previous position if saved
      if (windowStates[windowId].savedPosition) {
        const pos = windowStates[windowId].savedPosition;
        windowEl.style.top = pos.top;
        windowEl.style.left = pos.left;
        windowEl.style.width = pos.width;
        windowEl.style.height = pos.height;
      }
    } else {
      // Save current position
      windowStates[windowId].savedPosition = {
        top: windowEl.style.top || windowEl.offsetTop + 'px',
        left: windowEl.style.left || windowEl.offsetLeft + 'px',
        width: windowEl.style.width || windowEl.offsetWidth + 'px',
        height: windowEl.style.height || windowEl.offsetHeight + 'px'
      };

      // Maximize
      windowEl.classList.add('maximized');
      windowStates[windowId].maximized = true;
    }
  };

  /**
   * Close Window - Navigate back to home
   */
  window.xpCloseWindow = function() {
    // Navigate to homepage
    window.location.href = '/';
  };

  /**
   * Restore Window from minimized state
   */
  window.xpRestoreWindow = function(windowId) {
    const windowEl = document.getElementById('xp-main-window');
    if (!windowEl) return;

    windowEl.classList.remove('minimized');
    windowStates[windowId] = windowStates[windowId] || {};
    windowStates[windowId].minimized = false;

    // Update taskbar item
    const taskbarItem = document.querySelector('.xp-taskbar-item');
    if (taskbarItem) {
      taskbarItem.classList.add('active');
    }
  };

  /**
   * Window Dragging functionality
   */
  function initWindowDrag() {
    const windows = document.querySelectorAll('.xp-window');

    windows.forEach(function(windowEl) {
      const titlebar = windowEl.querySelector('.xp-titlebar');
      if (!titlebar) return;

      let isDragging = false;
      let currentX;
      let currentY;
      let initialX;
      let initialY;
      let xOffset = 0;
      let yOffset = 0;

      titlebar.addEventListener('mousedown', function(e) {
        // Don't drag if clicking buttons
        if (e.target.closest('.xp-titlebar-buttons')) return;
        // Don't drag if maximized
        if (windowEl.classList.contains('maximized')) return;

        isDragging = true;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        titlebar.style.cursor = 'move';
      });

      document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        // Keep window in bounds
        const maxX = window.innerWidth - windowEl.offsetWidth;
        const maxY = window.innerHeight - windowEl.offsetHeight - 30; // Account for taskbar

        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        windowEl.style.left = currentX + 'px';
        windowEl.style.top = currentY + 'px';
      });

      document.addEventListener('mouseup', function() {
        isDragging = false;
        titlebar.style.cursor = 'default';
      });
    });
  }

  /**
   * Desktop Icons - Double-click handling
   */
  function initDesktopIcons() {
    const icons = document.querySelectorAll('.xp-icon');

    icons.forEach(function(icon) {
      let clickCount = 0;
      let clickTimer = null;

      icon.addEventListener('click', function(e) {
        e.preventDefault();
        clickCount++;

        if (clickCount === 1) {
          // Single click - select
          icons.forEach(function(i) { i.classList.remove('selected'); });
          icon.classList.add('selected');

          clickTimer = setTimeout(function() {
            clickCount = 0;
          }, 300);
        } else if (clickCount === 2) {
          // Double click - navigate
          clearTimeout(clickTimer);
          clickCount = 0;
          const href = icon.getAttribute('href');
          if (href) {
            window.location.href = href;
          }
        }
      });
    });

    // Deselect when clicking desktop
    const desktopArea = document.querySelector('.xp-desktop-area');
    if (desktopArea) {
      desktopArea.addEventListener('click', function(e) {
        if (e.target === desktopArea || e.target.classList.contains('xp-desktop-icons')) {
          icons.forEach(function(i) { i.classList.remove('selected'); });
        }
      });
    }
  }

  /**
   * Keyboard Shortcuts
   */
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Escape - Close start menu
      if (e.key === 'Escape') {
        xpCloseStartMenu();
      }

      // Windows key (Meta) - Toggle start menu
      if (e.key === 'Meta' || e.key === 'OS') {
        e.preventDefault();
        xpToggleStartMenu();
      }
    });
  }

  /**
   * Taskbar Item Click - Restore or toggle window
   */
  window.xpTaskbarItemClick = function(windowId) {
    const windowEl = document.getElementById('xp-main-window');
    if (!windowEl) return;

    if (windowEl.classList.contains('minimized')) {
      xpRestoreWindow(windowId);
    } else {
      xpMinimizeWindow(windowId);
    }
  };

  /**
   * Log Off - Navigate to login page
   */
  window.xpLogOff = function() {
    xpCloseStartMenu();
    window.location.href = '/login/';
  };

  /**
   * Show Shutdown Dialog
   */
  window.xpShowShutdownDialog = function() {
    xpCloseStartMenu();
    const overlay = document.getElementById('xp-shutdown-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  };

  /**
   * Hide Shutdown Dialog
   */
  window.xpHideShutdownDialog = function() {
    const overlay = document.getElementById('xp-shutdown-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  };

  /**
   * Turn Off Computer - Close the browser tab/window
   */
  window.xpTurnOffComputer = function() {
    xpHideShutdownDialog();

    // Create shutdown screen
    const shutdownScreen = document.createElement('div');
    shutdownScreen.className = 'xp-shutdown-screen';
    shutdownScreen.innerHTML = '<div style="text-align: center;"><div style="margin-bottom: 20px;">Windows is shutting down...</div></div>';
    document.body.appendChild(shutdownScreen);

    // After a brief delay, try to close or show final message
    setTimeout(function() {
      // Try to close the window/tab
      window.close();

      // If window.close() doesn't work (browser security restrictions),
      // show "It is now safe to turn off your computer" message
      setTimeout(function() {
        shutdownScreen.innerHTML = '<div style="text-align: center;"><div style="color: #ff9900; font-size: 18px; margin-bottom: 10px;">It is now safe to turn off</div><div style="color: #ff9900; font-size: 18px;">your computer.</div></div>';
      }, 500);
    }, 1500);
  };

  /**
   * Initialize shutdown dialog keyboard handler
   */
  function initShutdownDialog() {
    document.addEventListener('keydown', function(e) {
      const overlay = document.getElementById('xp-shutdown-overlay');
      if (overlay && overlay.classList.contains('active')) {
        if (e.key === 'Escape') {
          xpHideShutdownDialog();
        } else if (e.key === 'Enter') {
          xpTurnOffComputer();
        }
      }
    });

    // Close dialog when clicking overlay background
    const overlay = document.getElementById('xp-shutdown-overlay');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          xpHideShutdownDialog();
        }
      });
    }
  }

  // Add shutdown dialog initialization
  document.addEventListener('DOMContentLoaded', function() {
    initShutdownDialog();
  });

})();
