// Mobile functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile sidebar toggle
  const mobileSidebarToggle = document.getElementById("mobileSidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  mobileSidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
    sidebarOverlay.classList.toggle("show");
    document.body.style.overflow = sidebar.classList.contains("mobile-open") ? "hidden" : "";
  });

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open");
    sidebarOverlay.classList.remove("show");
    document.body.style.overflow = "";
  });

  // Mobile tabs functionality
  const mobileTabs = document.querySelectorAll(".mobile-tab");
  const mobileSections = document.querySelectorAll(".mobile-section");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

  function switchMobileTab(tabId) {
    // Update tab buttons
    mobileTabs.forEach((tab) => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Update sections
    mobileSections.forEach((section) => {
      if (section.id === `${tabId}-section`) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Update bottom nav
    mobileNavItems.forEach((item) => {
      if (item.dataset.tab === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Add click event to tabs
  mobileTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.dataset.tab;
      switchMobileTab(tabId);
    });
  });

  // Add click event to bottom nav items
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const tabId = this.dataset.tab;
      switchMobileTab(tabId);
    });
  });

  // Initialize with timeline tab
  if (window.innerWidth <= 768) {
    switchMobileTab("timeline");

    // Show wallet section on mobile
    document.getElementById("wallet-section").classList.remove("mobile-section");

    // Fix duplicate IDs for studentsList
    const studentsLists = document.querySelectorAll("#studentsList");
    if (studentsLists.length > 1) {
      studentsLists[1].id = "mobileStudentsList";

      // Update the students list for mobile
      const mobileStudentsList = document.getElementById("mobileStudentsList");

      // Sample student data (replace with your actual data source)
      const students = [
        { name: "Alice", imageUrl: "https://via.placeholder.com/50", percentage: 85 },
        { name: "Bob", imageUrl: "https://via.placeholder.com/50", percentage: 60 },
        { name: "Charlie", imageUrl: "https://via.placeholder.com/50", percentage: 92 },
      ];

      students.forEach((student) => {
        const studentHTML = `
          <div class="student-item">
            <div class="student-image-container">
              <img 
                src="${student.imageUrl}" 
                alt="${student.name}" 
                class="student-image"
              >
            </div>
            <div class="student-info">
              <div class="student-name">${student.name}</div>
              <div class="percentage-label">Percentage of Approvals</div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  style="width: ${student.percentage}%"
                ></div>
              </div>
            </div>
            <div class="percentage-text">${student.percentage}%</div>
          </div>
        `;
        mobileStudentsList.innerHTML += studentHTML;
      });
    }
  }

  // Handle orientation change or resize
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      if (!document.querySelector(".mobile-section.active")) {
        switchMobileTab("timeline");
      }
    }
  });

  // Add post creation functionality for mobile
  const centerButton = document.querySelector(".mobile-nav-item.center");
  if (centerButton) {
    centerButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Switch to timeline tab
      switchMobileTab("timeline");

      // Focus on the content input
      setTimeout(() => {
        const contentInput = document.querySelector(".content-input");
        if (contentInput) {
          contentInput.focus();
        }
      }, 100);
    });
  }

  // Post button functionality
  const postButton = document.querySelector(".post-button");
  if (postButton) {
    postButton.addEventListener("click", () => {
      const contentInput = document.querySelector(".content-input");
      const feedContainer = document.getElementById("feed-container");

      if (contentInput && feedContainer) {
        const postContent = contentInput.innerText.trim();
        if (postContent) {
          const postHTML = `
            <div class="post-box">
              <div class="post-header">
                <div class="post-user">
                  <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Julia" class="user-avatar">
                  <div class="post-info">
                    <a href="#" class="user-name">Julia Richardson</a>
                    <div class="post-meta">
                      <span class="post-time">Just now</span>
                    </div>
                  </div>
                </div>
                <button class="more-options">
                  <i class="fas fa-ellipsis-h"></i>
                </button>
              </div>
              <div class="post-content">
                <p>${postContent}</p>
              </div>
              <div class="post-engagement">
                <div class="reactions">
                  <div class="reaction-info">
                    <i class="fas fa-thumbs-up reaction-icon"></i>
                    <span class="reaction-text">0</span>
                  </div>
                  <div class="comment-count">0 Comments</div>
                </div>
                <div class="action-buttons">
                  <button class="action-btn">
                    <i class="fas fa-thumbs-up"></i>
                    Like
                  </button>
                  <button class="action-btn">
                    <i class="fas fa-comment"></i>
                    Comment
                  </button>
                </div>
              </div>
            </div>
          `;
          feedContainer.innerHTML = postHTML + feedContainer.innerHTML;
          contentInput.innerText = "";
        }
      }
    });
  }
});

// Fix for mobile viewport height issues (iOS Safari)
function setMobileHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", setMobileHeight);
window.addEventListener("orientationchange", setMobileHeight);
setMobileHeight();

