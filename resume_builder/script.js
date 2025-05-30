document.addEventListener("DOMContentLoaded", () => {
    // Define all sections with their icons and visibility (completion removed)
    const sections = [
      { id: "general", name: "General Information", icon: "user", component: "general-info-template", visibility: "public" },
      { id: "skills", name: "Skills", icon: "code", component: "skills-template", visibility: "public" },
      { id: "work", name: "Work Experience", icon: "briefcase", component: "work-template", visibility: "public" },
      { id: "education", name: "Education", icon: "graduation-cap", component: "education-template", visibility: "public" },
      { id: "languages", name: "Languages", icon: "language", component: "languages-template", visibility: "public" },
      { id: "specializations", name: "Specializations", icon: "star", component: "specializations-template", visibility: "public" },
      { id: "personal", name: "Personal Statement", icon: "file-alt", component: "personal-statement-template", visibility: "public" },
      { id: "social", name: "Social Links", icon: "share-alt", component: "social-template", visibility: "public" },
      { id: "certifications", name: "Certifications", icon: "award", component: "certifications-template", visibility: "public" },
      { id: "research", name: "Research Projects", icon: "book-open", component: "research-template", visibility: "public" },
      { id: "group", name: "Group Projects", icon: "users", component: "group-template", visibility: "public" },
      { id: "extracurricular", name: "Extracurricular Activities", icon: "running", component: "extracurricular-template", visibility: "public" },
      { id: "career", name: "Career Goals", icon: "rocket", component: "career-template", visibility: "public" },
      { id: "motivation", name: "Motivation Statements", icon: "lightbulb", component: "motivation-template", visibility: "public" },
      { id: "scholarships", name: "Scholarships", icon: "bookmark", component: "scholarships-template", visibility: "public" },
      { id: "financial", name: "Financial Aid Status", icon: "dollar-sign", component: "financial-template", visibility: "public" },
      { id: "portfolios", name: "Portfolios", icon: "folder-open", component: "portfolios-template", visibility: "public" },
      { id: "video", name: "Video Resumes", icon: "video", component: "video-template", visibility: "public" },
      { id: "recommendations", name: "Recommendation Letters", icon: "envelope", component: "recommendations-template", visibility: "public" },
      { id: "impact", name: "Social Impacts", icon: "hand-holding-heart", component: "impact-template", visibility: "public" },
      { id: "availability", name: "Availability Preferences", icon: "clock", component: "availability-template", visibility: "public" },
      { id: "analytics", name: "Profile Analytics", icon: "chart-bar", component: "analytics-template", visibility: "public" },
    ]
  
    // Get main tabs (first 5) and other tabs for dropdown
    const mainTabs = sections.slice(0, 5)
    const otherTabs = sections.slice(5)
  
    // DOM elements
    const sidebar = document.getElementById("sidebar")
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const navList = document.getElementById("nav-list")
    const mainTabsContainer = document.getElementById("main-tabs")
    const dropdownMenu = document.getElementById("dropdown-menu")
    const contentSections = document.getElementById("content-sections")
    const dropdownToggle = document.querySelector(".dropdown-toggle")
  
    // Initialize sidebar navigation
    function initSidebar() {
      sections.forEach((section) => {
        const listItem = document.createElement("li")
        listItem.className = "nav-item"
        listItem.dataset.section = section.id
        listItem.innerHTML = `
          <i class="fas fa-${section.icon}"></i>
          <div class="nav-item-content">
            <span>${section.name}</span>
          </div>
        `
        navList.appendChild(listItem)
      })
    }
  
    // Initialize main tabs
    function initMainTabs() {
      mainTabs.forEach((tab) => {
        const tabElement = document.createElement("div")
        tabElement.className = "tab"
        tabElement.dataset.section = tab.id
        tabElement.innerHTML = `
          <i class="fas fa-${tab.icon}"></i>
          <span>${tab.name}</span>
        `
        mainTabsContainer.appendChild(tabElement)
      })
    }
  
    // Initialize dropdown menu
    function initDropdownMenu() {
      otherTabs.forEach((tab) => {
        const item = document.createElement("div")
        item.className = "dropdown-item"
        item.dataset.section = tab.id
        item.innerHTML = `
          <div class="dropdown-item-text">
            <i class="fas fa-${tab.icon}"></i>
            <span>${tab.name}</span>
          </div>
        `
        dropdownMenu.appendChild(item)
      })
    }
  
    // Initialize content sections
    function initContentSections() {
      sections.forEach((section) => {
        if (section.component) {
          const template = document.getElementById(section.component)
          if (template) {
            const sectionElement = document.createElement("section")
            sectionElement.className = "section"
            sectionElement.id = section.id

            const sectionHeader = document.createElement("div")
            sectionHeader.className = "section-header"
            sectionHeader.innerHTML = `
              <h2 class="section-title">${section.name}</h2>
              <button class="edit-button">
                <i class="fas fa-pencil-alt"></i> Edit
              </button>
            `

            const sectionContent = document.createElement("div")
            sectionContent.className = "section-content"
            sectionContent.appendChild(document.importNode(template.content, true))
            // Add visibility toggle button at the bottom of the content area
            const visibilityBtn = document.createElement("button")
            visibilityBtn.className = "visibility-toggle-btn"
            visibilityBtn.dataset.section = section.id
            visibilityBtn.innerHTML = `<span style="font-weight:bold;">Visibility: ${section.visibility === "public" ? "Public" : "Private"}</span> <i class="fas fa-chevron-down" style="margin-left:8px;"></i>`
            visibilityBtn.style.display = "block"
            visibilityBtn.style.margin = "24px auto 0 auto"
            visibilityBtn.style.background = section.visibility === "public" ? "#007bff" : "#6c757d"
            visibilityBtn.style.color = "#fff"
            visibilityBtn.style.border = "none"
            visibilityBtn.style.borderRadius = "20px"
            visibilityBtn.style.padding = "8px 24px"
            visibilityBtn.style.fontWeight = "bold"
            visibilityBtn.style.cursor = "pointer"
            visibilityBtn.style.transition = "background 0.2s"
            visibilityBtn.style.position = "relative"
            // Dropdown for visibility options
            const dropdown = document.createElement("div")
            dropdown.className = "visibility-dropdown"
            dropdown.style.display = "none"
            dropdown.style.position = "absolute"
            dropdown.style.left = "50%"
            dropdown.style.transform = "translateX(-50%)"
            dropdown.style.background = "#fff"
            dropdown.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)"
            dropdown.style.borderRadius = "8px"
            dropdown.style.marginTop = "4px"
            dropdown.style.zIndex = "100"
            dropdown.style.minWidth = "120px"
            dropdown.style.textAlign = "center"
            dropdown.style.bottom = "calc(100% + 8px)"
            // Dropdown options
            const publicOpt = document.createElement("div")
            publicOpt.textContent = "Public"
            publicOpt.style.padding = "8px 0"
            publicOpt.style.cursor = "pointer"
            publicOpt.style.color = "#007bff"
            const privateOpt = document.createElement("div")
            privateOpt.textContent = "Private"
            privateOpt.style.padding = "8px 0"
            privateOpt.style.cursor = "pointer"
            privateOpt.style.color = "#6c757d"
            dropdown.appendChild(publicOpt)
            dropdown.appendChild(privateOpt)
            // Container for positioning
            const visContainer = document.createElement("div")
            visContainer.style.position = "relative"
            visContainer.style.width = "100%"
            visContainer.appendChild(visibilityBtn)
            visContainer.appendChild(dropdown)
            sectionContent.appendChild(visContainer)
            // Toggle dropdown on button click
            visibilityBtn.addEventListener("click", (e) => {
              e.stopPropagation()
              dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
            })
            // Hide dropdown on click outside
            document.addEventListener("click", (e) => {
              if (!visContainer.contains(e.target)) {
                dropdown.style.display = "none"
              }
            })
            // Handle option click
            publicOpt.addEventListener("click", () => {
              setSectionVisibility(section.id, "public", visibilityBtn)
              dropdown.style.display = "none"
            })
            privateOpt.addEventListener("click", () => {
              setSectionVisibility(section.id, "private", visibilityBtn)
              dropdown.style.display = "none"
            })

            sectionElement.appendChild(sectionHeader)
            sectionElement.appendChild(sectionContent)
            contentSections.appendChild(sectionElement)
          }
        } else {
          // Create placeholder for sections without templates
          const sectionElement = document.createElement("section")
          sectionElement.className = "section"
          sectionElement.id = section.id

          const sectionHeader = document.createElement("div")
          sectionHeader.className = "section-header"
          sectionHeader.innerHTML = `
            <h2 class="section-title">${section.name}</h2>
            <button class="edit-button">
              <i class="fas fa-pencil-alt"></i> Edit
            </button>
          `

          const sectionContent = document.createElement("div")
          sectionContent.className = "section-content"
          sectionContent.innerHTML = `<p>This section is under development.</p>`
          // Add visibility toggle button inside the content area (top right)
          const visibilityBtn = document.createElement("button")
          visibilityBtn.className = "visibility-toggle-btn"
          visibilityBtn.dataset.section = section.id
          visibilityBtn.textContent = section.visibility === "public" ? "Public" : "Private"
          visibilityBtn.style.margin = "10px 0 0 0"
          visibilityBtn.style.float = "right"
          sectionContent.insertBefore(visibilityBtn, sectionContent.firstChild)

          sectionElement.appendChild(sectionHeader)
          sectionElement.appendChild(sectionContent)
          contentSections.appendChild(sectionElement)
        }
      })
    }
  
    // Switch active section
    function switchSection(sectionId) {
      // Hide all sections
      document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active")
      })
  
      // Show selected section
      const selectedSection = document.getElementById(sectionId)
      if (selectedSection) {
        selectedSection.classList.add("active")
      }
  
      // Update sidebar active state
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active")
      })
  
      const sidebarItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`)
      if (sidebarItem) {
        sidebarItem.classList.add("active")
      }
  
      // Update tabs active state
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.classList.remove("active")
      })
  
      const tabItem = document.querySelector(`.tab[data-section="${sectionId}"]`)
      if (tabItem) {
        tabItem.classList.add("active")
      }
    }
  
    // Toggle sidebar on mobile
    function toggleSidebar() {
      sidebar.classList.toggle("open")
    }
  
    // Create and manage dropdown overlay
    function createDropdownOverlay() {
      // Check if overlay already exists
      let overlay = document.querySelector(".dropdown-overlay")
  
      if (!overlay) {
        overlay = document.createElement("div")
        overlay.className = "dropdown-overlay"
        document.body.appendChild(overlay)
  
        // Close dropdown when clicking on overlay
        overlay.addEventListener("click", () => {
          closeDropdown()
        })
      }
  
      return overlay
    }
  
    // Toggle dropdown menu
    function toggleDropdown(event) {
      event.stopPropagation()
  
      const overlay = createDropdownOverlay()
  
      if (dropdownMenu.classList.contains("show")) {
        closeDropdown()
      } else {
        dropdownMenu.classList.add("show")
        overlay.classList.add("show")
      }
    }
  
    // Close dropdown
    function closeDropdown() {
      dropdownMenu.classList.remove("show")
      const overlay = document.querySelector(".dropdown-overlay")
      if (overlay) {
        overlay.classList.remove("show")
      }
    }
  
    // Handle edit button clicks
    function handleEditButtonClick(event) {
      if (event.target.closest(".edit-button")) {
        const button = event.target.closest(".edit-button");
        const section = button.closest(".section");
        const isEditing = button.querySelector("i").classList.contains("fa-save");

        if (isEditing) {
          // Save mode - switch back to view mode
          button.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
          // Disable all inputs, textareas, selects in the section
          section.querySelectorAll("input, textarea, select").forEach((input) => {
            input.disabled = true;
          });
        } else {
          // Edit mode
          button.innerHTML = '<i class="fas fa-save"></i> Save';
          // Enable all inputs, textareas, selects in the section
          section.querySelectorAll("input, textarea, select").forEach((input) => {
            input.disabled = false;
          });
        }
      }
      // For save buttons inside cards (e.g., certifications, portfolios)
      if (event.target.closest(".save-btn")) {
        const card = event.target.closest(".card");
        // Disable all inputs in the card
        card.querySelectorAll("input, textarea, select").forEach((input) => {
          input.disabled = true;
        });
        // Optionally, change button text/icon if you want
      }
    }

    // Generalized add/delete for all dynamic list sections
    function handleDynamicListActions(event) {
      // Add new card for any section with .add-button in .section-header
      if (event.target.closest('.add-button') && event.target.closest('.section-header')) {
        const section = event.target.closest('.section') || event.target.closest('.section-header').parentElement;
        const cardsGrid = section.querySelector('.cards-grid');
        if (!cardsGrid) return;
        let newCard = null;
        // Create a new card based on section id
        const sectionId = section.id;
        switch (sectionId) {
          case 'recommendations':
            newCard = document.createElement('div');
            newCard.className = 'card recommendation-card';
            newCard.innerHTML = `<div class="card-content">
              <div class="recommendation-header">
                <div>
                  <input class='input-inline recommendation-title' placeholder='Recommender Name'>
                  <input class='input-inline recommendation-meta' placeholder='Title, Institution'>
                  <input class='input-inline recommendation-meta' placeholder='Email'>
                  <input class='input-inline recommendation-meta' placeholder='Date' type='date'>
                </div>
                <span class="badge status-badge">Pending</span>
              </div>
              <div class="recommendation-actions">
                <button class="secondary-button"><i class="fas fa-eye"></i> View Letter</button>
                <button class="primary-button"><i class="fas fa-download"></i> Download</button>
              </div>
            </div>`;
            break;
          case 'portfolios':
            newCard = document.createElement('div');
            newCard.className = 'card portfolio-card';
            newCard.innerHTML = `<img src="../Img/Company.jpg" alt="Project Image" class="portfolio-image" />
              <div class="card-content">
                <input class='input-inline portfolio-title' placeholder='Project Title'>
                <textarea class='portfolio-description' placeholder='Project Description'></textarea>
                <div class="tags-container">
                  <input class='input-inline tag' placeholder='Tech Stack (comma separated)'>
                </div>
                <div class="portfolio-links">
                  <a href="#" class="primary-button">Live Demo</a>
                  <a href="#" class="secondary-button">Source Code</a>
                </div>
              </div>`;
            break;
          case 'impact':
            newCard = document.createElement('div');
            newCard.className = 'card impact-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline impact-title' placeholder='Impact Title'>
                <input class='input-inline impact-meta' placeholder='Organization, Role, Year'>
                <textarea class='impact-description' placeholder='Description'></textarea>
                <ul class="impact-list">
                  <li><input class='input-inline' placeholder='Impact Point'></li>
                </ul>
                <div class="tags-container">
                  <input class='input-inline tag' placeholder='Category Tags (comma separated)'>
                </div>
              </div>`;
            break;
          case 'group':
            newCard = document.createElement('div');
            newCard.className = 'card group-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline group-title' placeholder='Project Title'>
                <input class='input-inline group-meta' placeholder='Course, Institution, Year'>
                <textarea class='group-description' placeholder='Project Description'></textarea>
                <ul class="group-list">
                  <li><input class='input-inline' placeholder='Contribution'></li>
                </ul>
                <div class="tags-container">
                  <input class='input-inline tag' placeholder='Tech Stack (comma separated)'>
                </div>
                <div class="group-team">
                  <input class='input-inline' placeholder='Team Members (comma separated)'>
                </div>
                <a href="#" class="secondary-button">Project Repo</a>
              </div>`;
            break;
          case 'research':
            newCard = document.createElement('div');
            newCard.className = 'card research-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline research-title' placeholder='Research Title'>
                <input class='input-inline research-meta' placeholder='Institution, Year(s)'>
                <textarea class='research-description' placeholder='Description'></textarea>
                <ul class="research-list">
                  <li><input class='input-inline' placeholder='Outcome'></li>
                </ul>
                <div class="tags-container">
                  <input class='input-inline tag' placeholder='Tags (comma separated)'>
                </div>
                <a href="#" class="secondary-button">Project Repo</a>
              </div>`;
            break;
          case 'extracurricular':
            newCard = document.createElement('div');
            newCard.className = 'card extracurricular-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline extracurricular-title' placeholder='Activity Title'>
                <input class='input-inline extracurricular-meta' placeholder='Organization, Role, Year'>
                <textarea class='extracurricular-description' placeholder='Description'></textarea>
                <ul class="extracurricular-list">
                  <li><input class='input-inline' placeholder='Achievement/Point'></li>
                </ul>
                <div class="tags-container">
                  <input class='input-inline tag' placeholder='Tags (comma separated)'>
                </div>
              </div>`;
            break;
          case 'motivation':
            newCard = document.createElement('div');
            newCard.className = 'card motivation-card';
            newCard.innerHTML = `<div class="card-content">
                <textarea class='motivation-statement' placeholder='Enter your motivation statement'></textarea>
              </div>`;
            break;
          case 'scholarships':
            newCard = document.createElement('div');
            newCard.className = 'card scholarship-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline scholarship-title' placeholder='Scholarship Name'>
                <input class='input-inline scholarship-meta' placeholder='Awarding Institution'>
                <input class='input-inline scholarship-type' placeholder='Type'>
                <input class='input-inline scholarship-amount' placeholder='Amount'>
                <input class='input-inline scholarship-date' type='date' placeholder='Date'>
              </div>`;
            break;
          case 'video':
            newCard = document.createElement('div');
            newCard.className = 'card video-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline video-title' placeholder='Video Title'>
                <input class='input-inline video-url' placeholder='Video URL'>
                <input class='input-inline video-file' type='file'>
              </div>`;
            break;
          case 'availability':
            newCard = document.createElement('div');
            newCard.className = 'card availability-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline availability-title' placeholder='Preference Title'>
                <input class='input-inline availability-date' type='date' placeholder='Available From'>
                <input class='input-inline availability-sector' placeholder='Preferred Sector'>
                <input class='input-inline availability-role' placeholder='Desired Role'>
              </div>`;
            break;
          case 'analytics':
            newCard = document.createElement('div');
            newCard.className = 'card analytics-card';
            newCard.innerHTML = `<div class="card-content">
                <input class='input-inline analytics-views' placeholder='Profile Views'>
                <input class='input-inline analytics-downloads' placeholder='Resume Downloads'>
                <input class='input-inline analytics-date' type='date' placeholder='Date'>
              </div>`;
            break;
          default:
            // Fallback: create a minimal placeholder card
            newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.innerHTML = '<div class="card-content">New item</div>';
        }
        // Add delete button if not present
        if (!newCard.querySelector('.delete-btn')) {
          const delBtn = document.createElement('button');
          delBtn.className = 'danger-button delete-btn';
          delBtn.type = 'button';
          delBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
          newCard.querySelector('.card-content').appendChild(delBtn);
        }
        // Add save and cancel buttons to every new card
        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        const saveBtn = document.createElement('button');
        saveBtn.className = 'primary-button save-btn';
        saveBtn.type = 'button';
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save';
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'secondary-button cancel-btn';
        cancelBtn.type = 'button';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        cardFooter.appendChild(saveBtn);
        cardFooter.appendChild(cancelBtn);
        newCard.appendChild(cardFooter);
        cardsGrid.appendChild(newCard);
      }
      // Delete card (any section)
      if (event.target.closest('.delete-btn')) {
        const card = event.target.closest('.card');
        if (card) card.remove();
        // If no cards left, show a placeholder
        const cardsGrid = card?.parentElement;
        if (cardsGrid && cardsGrid.children.length === 0) {
          const placeholder = document.createElement('div');
          placeholder.className = 'card';
          placeholder.innerHTML = '<div class="card-content text-light">No items yet. Click Add to create one.</div>';
          cardsGrid.appendChild(placeholder);
        }
      }
      // Save/cancel logic for new cards
      if (event.target.closest('.cancel-btn')) {
        const card = event.target.closest('.card');
        if (card) card.remove();
        // If no cards left, show a placeholder
        const cardsGrid = card?.parentElement;
        if (cardsGrid && cardsGrid.children.length === 0) {
          const placeholder = document.createElement('div');
          placeholder.className = 'card';
          placeholder.innerHTML = '<div class="card-content text-light">No items yet. Click Add to create one.</div>';
          cardsGrid.appendChild(placeholder);
        }
      }
      if (event.target.closest('.save-btn')) {
        const card = event.target.closest('.card');
        // Optionally, disable inputs after save
        card.querySelectorAll('input, textarea, select').forEach(input => input.disabled = true);
        // Remove save/cancel buttons after save
        const footer = card.querySelector('.card-footer');
        if (footer) footer.remove();
      }
    }
  
    // Handle section tab clicks
    function handleSectionTabClick(event) {
      if (event.target.classList.contains("section-tab")) {
        const tabId = event.target.dataset.tab
        const tabContainer = event.target.closest(".section-tabs")
        const section = tabContainer.closest(".section")
  
        // Update active tab
        tabContainer.querySelectorAll(".section-tab").forEach((tab) => {
          tab.classList.remove("active")
        })
        event.target.classList.add("active")
  
        // Update active content
        section.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active")
        })
        section.querySelector(`#${tabId}-tab`).classList.add("active")
      }
    }
  
    // Toggle visibility between public and private
    function toggleVisibility(sectionId) {
      const section = sections.find(s => s.id === sectionId)
      if (!section) return
      section.visibility = section.visibility === "public" ? "private" : "public"
      // Update all toggle buttons for this section
      document.querySelectorAll(`.visibility-toggle-btn[data-section="${sectionId}"]`).forEach(btn => {
        btn.textContent = section.visibility === "public" ? "Public" : "Private"
      })
    }
  
    // Helper to set visibility and update button style/text
    function setSectionVisibility(sectionId, value, btn) {
      const section = sections.find(s => s.id === sectionId)
      if (!section) return
      btn.innerHTML = `<span style="font-weight:bold;">Visibility: ${value === "public" ? "Public" : "Private"}</span> <i class="fas fa-chevron-down" style="margin-left:8px;"></i>`
      section.visibility = value
      btn.style.background = value === "public" ? "#007bff" : "#6c757d"
    }
  
    // Initialize the app
    function init() {
      initSidebar()
      initMainTabs()
      initDropdownMenu()
      initContentSections()
  
      // Event listeners
      sidebarToggle.addEventListener("click", toggleSidebar)
      dropdownToggle.addEventListener("click", toggleDropdown)
      contentSections.addEventListener("click", handleEditButtonClick)
      contentSections.addEventListener("click", handleDynamicListActions)
  
      // Add event listener for section tabs
      contentSections.addEventListener("click", handleSectionTabClick)
  
      // Sidebar navigation
      navList.addEventListener("click", (event) => {
        const item = event.target.closest(".nav-item")
        if (item) {
          const sectionId = item.dataset.section
          switchSection(sectionId)
  
          // Close sidebar on mobile after selection
          if (window.innerWidth <= 768) {
            sidebar.classList.remove("open")
          }
        }
      })
  
      // Tab navigation
      mainTabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("visibility-toggle-btn")) {
          event.stopPropagation()
          const btn = event.target
          const sectionId = btn.dataset.section
          toggleVisibility(sectionId)
          return
        }
        const tab = event.target.closest(".tab")
        if (tab) {
          const sectionId = tab.dataset.section
          switchSection(sectionId)
        }
      })
  
      // Dropdown navigation
      dropdownMenu.addEventListener("click", (event) => {
        if (event.target.classList.contains("visibility-toggle-btn")) {
          event.stopPropagation()
          const btn = event.target
          const sectionId = btn.dataset.section
          toggleVisibility(sectionId)
          return
        }
        const item = event.target.closest(".dropdown-item")
        if (item) {
          const sectionId = item.dataset.section
          switchSection(sectionId)
          closeDropdown()
        }
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdown") && dropdownMenu.classList.contains("show")) {
          closeDropdown()
        }
      })
  
      // Initialize with the first section active
      switchSection("general")
  
      // Add resize event listener to handle responsive behavior
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && sidebar.classList.contains("open")) {
          sidebar.classList.remove("open")
        }
  
        // Close dropdown on resize
        if (dropdownMenu.classList.contains("show")) {
          closeDropdown()
        }
      })
    }
  
    // Start the app
    init()
  })
