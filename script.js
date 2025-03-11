// Mobile functionality
document.addEventListener('DOMContentLoaded', function() {
  // Define sample profile data
  const profileData = {
    generalInfo: 0, // out of 6
    workExp: 0, // out of 3
    profilePhoto: 0, // 0 or 1
    coverPhoto: 0, // 0 or 1
  };

  // Define sample students data
  const students = [
    {
      name: "James Brown",
      percentage: 40,
      imageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Julia Richardson",
      percentage: 50,
      imageUrl: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
      name: "Daniel Smith",
      percentage: 60,
      imageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
      name: "Adele Philips",
      percentage: 55,
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Megan Daniels",
      percentage: 60,
      imageUrl: "https://randomuser.me/api/portraits/women/70.jpg",
    },
    {
      name: "Ivan Michaelson",
      percentage: 30,
      imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      name: "Sebastian Edward",
      percentage: 30,
      imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
    },
  ];

  // Define sample posts data
  const dummyPosts = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      author: "John Doe",
      timestamp: "2023-10-01T12:00:00Z",
      media: "https://via.placeholder.com/600x400",
      mediaType: "image",
      isLiked: false,
      likes: 5,
      commentCount: 2,
      showComments: false,
      comments: [
        {
          id: 101,
          author: "Jane Smith",
          text: "Great post!",
          timestamp: "2023-10-01T12:05:00Z",
          replies: []
        },
        {
          id: 102,
          author: "Mike Johnson",
          text: "Love this!",
          timestamp: "2023-10-01T12:10:00Z",
          replies: []
        }
      ]
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      author: "Alice Brown",
      timestamp: "2023-10-02T09:00:00Z",
      media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      mediaType: "video",
      isLiked: true,
      likes: 3,
      commentCount: 0,
      showComments: false,
      comments: []
    }
  ];

  // Drawing the progress chart
  function drawProgress(percentage) {
    const canvas = document.getElementById("progressCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height;
    const radius = 80; // Half-circle radius
    const startAngle = Math.PI; // Start from the left
    const endAngle = startAngle + (percentage / 100) * Math.PI; // Move right

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background arc (gray)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress arc (green)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // Calculate and update profile completion
  function calculateProgress() {
    const totalFields = 6 + 3 + 1 + 1;
    const completedFields =
      profileData.generalInfo +
      profileData.workExp +
      profileData.profilePhoto +
      profileData.coverPhoto;
    const percentage = Math.round((completedFields / totalFields) * 100);

    // Update progress text
    document.getElementById("progress-text").textContent = percentage + "%";
    
    // Draw the progress chart
    drawProgress(percentage);

    // Update the checklist items
    document.getElementById("general-info").innerHTML = 
      profileData.generalInfo === 6 ? "✅ General Information" : `❌ General Information <span>${profileData.generalInfo}/6</span>`;
    
    document.getElementById("work-exp").innerHTML = 
      profileData.workExp === 3 ? "✅ Work Experience" : `❌ Work Experience <span>${profileData.workExp}/3</span>`;
    
    document.getElementById("profile-photo").innerHTML = 
      profileData.profilePhoto ? "✅ Profile Photo" : `❌ Profile Photo <span>0/1</span>`;
    
    document.getElementById("cover-photo").innerHTML = 
      profileData.coverPhoto ? "✅ Cover Photo" : `❌ Cover Photo <span>0/1</span>`;
  }

  // Function to complete field
  window.completeField = function(field) {
    if (field === "generalInfo" && profileData.generalInfo < 6) {
      profileData.generalInfo++;
    } else if (field === "workExp" && profileData.workExp < 3) {
      profileData.workExp++;
    } else if (field === "profilePhoto") {
      profileData.profilePhoto = 1;
    } else if (field === "coverPhoto") {
      profileData.coverPhoto = 1;
    }
    calculateProgress();
  };

  // Format timestamp
  function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString();
  }

  // Update feed with posts
  function updateFeed() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = dummyPosts.map(post => `
      <div class="post-card">
        <div class="post-header">
          <div class="user-info">
            <img src="${post.avatar}" alt="${post.author}" class="avatar">
            <div class="header-text">
              <div class="name-action">
                <span class="username">${post.author}</span>
                <span class="action">posted an update</span>
              </div>
              <div class="post-meta">
                <span class="timestamp">${formatTimestamp(post.timestamp)}</span>
                <span class="dot">•</span>
                <span class="globe-icon">🌐</span>
              </div>
            </div>
          </div>
          <button class="more-options">•••</button>
        </div>
        ${post.media ? 
          (post.mediaType === 'image' ?
          `<div class="photo-container"><img src="${post.media}" alt="Post image" class="img-fluid rounded mb-3"></div>` :
          `<div class="video-container">
            <video src="${post.media}" class="video-thumbnail" controls></video>
          </div>`) 
          : ''}
        <div class="post-content">
          ${post.content ? `<p>${post.content}</p>` : ''}
        </div>
        <div class="reactions">
          <div class="reaction-info">
            <div class="reaction-icons">
              <span class="reaction-icon">👍</span>
              <span class="reaction-icon">❤️</span>
            </div>
            <span class="reaction-text">${post.likes} people liked this</span>
          </div>
          <span class="comment-count">${post.commentCount} Comments</span>
        </div>
        <div class="action-buttons">
          <button class="action-btn like-button ${post.isLiked ? 'text-danger' : ''}" data-post-id="${post.id}">
            <span class="heart-icon">❤️</span>
            Love
          </button>
          <button class="action-btn comment-button" data-post-id="${post.id}">
            <span class="comment-icon">💬</span>
            Comment
          </button>
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display: ${post.showComments ? 'block' : 'none'};">
          <div class="comments-list mb-2">
            ${post.comments.map(comment => `
              <div class="comment">
                <img src="https://i.pravatar.cc/150?img=${comment.id % 70 || 1}" alt="${comment.author}" class="avatar">
                <div class="comment-content">
                  <div class="comment-bubble">
                    <span class="commenter-name">${comment.author}</span>
                    <p class="comment-text">${comment.text}</p>
                  </div>
                  <div class="comment-actions">
                    <button class="comment-action" data-comment-id="${comment.id}" data-post-id="${post.id}">Like</button>
                    <span class="dot">•</span>
                    <button class="comment-action reply-button" data-comment-id="${comment.id}" data-post-id="${post.id}">Reply</button>
                    <span class="dot">•</span>
                    <span class="timestamp">${formatTimestamp(comment.timestamp)}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="comment-input-container">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Current user" class="avatar">
            <div class="comment-input-wrapper">
              <input type="text" class="comment-input" placeholder="Write a comment...">
              <button class="tool-btn send-comment-btn" data-post-id="${post.id}">Send</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.comment-button').forEach(button => {
      button.addEventListener('click', function() {
        const postId = this.dataset.postId;
        const post = dummyPosts.find(p => p.id.toString() === postId);
        post.showComments = !post.showComments;
        updateFeed();
      });
    });
    
    document.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', function() {
        const postId = this.dataset.postId;
        const post = dummyPosts.find(p => p.id.toString() === postId);
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        updateFeed();
      });
    });
  }

  // Populate students list
  function populateStudentsList() {
    const studentsListContainer = document.getElementById('connectionsList');
    const mobileStudentsList = document.getElementById('mobileStudentsList');
    let studentsHTML = '';
    
    // Prepare the HTML for connections
    if (studentsListContainer) {
      students.forEach(student => {
        studentsHTML += `
          <div class="connection-item">
            <img src="${student.imageUrl}" alt="${student.name}" class="connection-avatar">
            <div class="connection-name">${student.name}</div>
            <div class="connection-actions">
              <button class="action-btn" title="Message">
                <i class="fas fa-envelope"></i>
              </button>
              <button class="action-btn" title="Follow">
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
        `;
      });
      
      // Update connections list
      studentsListContainer.innerHTML = studentsHTML;
    }
    
    // Prepare and update crowdfunding list
    if (mobileStudentsList) {
      let crowdfundingHTML = students.map(student => `
        <div class="student-item">
          <div class="student-image-container">
            <img src="${student.imageUrl}" alt="${student.name}" class="student-image">
          </div>
          <div class="student-info">
            <div class="student-name">${student.name}</div>
            <div class="percentage-label">Percentage of Approvals</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${student.percentage}%"></div>
            </div>
          </div>
          <div class="percentage-text">${student.percentage}%</div>
        </div>
      `).join('');
      
      mobileStudentsList.innerHTML = crowdfundingHTML;
    }
  }

  // Update connection tabs
  function updateConnectionTabs() {
    const tabs = {
      'students': students,
      'schools': schools,
      'educators': educators,
      'organizations': organizations
    };

    let currentTab = 'students';

    window.switchTab = function(tabType) {
      const studentsListContainer = document.getElementById('connectionsList');
      if (!studentsListContainer) return;

      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      document.querySelector(`.tab-btn[onclick="switchTab('${tabType}')"]`).classList.add('active');
      
      let html = '';
      const items = tabs[tabType];
      
      items.forEach(item => {
        html += `
          <div class="connection-item">
            <img src="${item.imageUrl}" alt="${item.name}" class="connection-avatar">
            <div class="connection-name">${item.name}</div>
            <div class="connection-actions">
              <button class="action-btn" title="Message">
                <i class="fas fa-envelope"></i>
              </button>
              <button class="action-btn" title="Follow">
                <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </div>
        `;
      });
      
      studentsListContainer.innerHTML = html;
      currentTab = tabType;
    };
  }

  // Function to switch tabs (for the connections section)
  window.switchTab = function(tabType) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`.tab-btn:nth-child(${
      tabType === 'students' ? 1 : 
      tabType === 'schools' ? 2 : 
      tabType === 'educators' ? 3 : 4
    })`).classList.add('active');
  };

  // Mobile sidebar toggle
  const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-open');
      sidebarOverlay.classList.toggle('show');
      document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
    });
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  // Desktop sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mainContent = document.getElementById('mainContent');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
    });
  }
  
  // Initialize the page with safety checks
  function initializePage() {
    try {
      calculateProgress();
      populateStudentsList();
      updateFeed();
      updateConnectionTabs();
      
      // Initialize with timeline tab on mobile
      if (window.innerWidth <= 768) {
        switchMobileTab('timeline');
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  // Call initialize instead of individual functions
  initializePage();
  
  // Create post functionality
  const postButton = document.querySelector('.post-button');
  const contentInput = document.querySelector('.content-input');
  
  if (postButton && contentInput) {
    postButton.addEventListener('click', function() {
      const content = contentInput.textContent.trim();
      if (content) {
        const newPost = {
          id: Date.now(),
          author: "Julia Richardson",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          content: content,
          timestamp: new Date().toISOString(),
          likes: 0,
          isLiked: false,
          commentCount: 0,
          showComments: false,
          comments: []
        };
        
        dummyPosts.unshift(newPost);
        contentInput.textContent = '';
        updateFeed();
      }
    });
  }
  
  // Fix for mobile viewport height issues (iOS Safari)
  function setMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setMobileHeight);
  window.addEventListener('orientationchange', setMobileHeight);
  setMobileHeight();
});