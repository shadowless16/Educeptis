// Tabs functionality
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const tabId = trigger.getAttribute('data-tab');
        
        // Remove active class from all triggers and contents
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked trigger and corresponding content
        trigger.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Preview Modal
const previewBtns = document.querySelectorAll('.preview-btn');
const previewModal = document.getElementById('previewModal');
const previewModalClose = document.getElementById('previewModalClose');
const previewModalTitle = document.getElementById('previewModalTitle');
const modulesList = document.getElementById('modulesList');

previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const courseTitle = btn.getAttribute('data-course');
        const modules = JSON.parse(btn.getAttribute('data-modules'));
        
        previewModalTitle.textContent = courseTitle;
        
        // Clear previous modules
        modulesList.innerHTML = '';
        
        // Add modules
        modules.forEach(module => {
            const moduleItem = document.createElement('div');
            moduleItem.className = `module-item ${module.locked ? 'locked' : ''}`;
            
            moduleItem.innerHTML = `
                <span class="module-title">${module.title}</span>
                <button class="module-action ${module.locked ? 'locked' : 'unlocked'}">
                    ${module.locked ? 
                        '<i class="fas fa-lock"></i> Locked' : 
                        '<i class="fas fa-play"></i> Start'}
                </button>
            `;
            
            modulesList.appendChild(moduleItem);
        });
        
        previewModal.classList.add('open');
    });
});

previewModalClose.addEventListener('click', () => {
    previewModal.classList.remove('open');
});

// Course Details Modal
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const courseDetailsModal = document.getElementById('courseDetailsModal');
const courseDetailsClose = document.getElementById('courseDetailsClose');
const courseDetailsTitle = document.getElementById('courseDetailsTitle');
const courseDetailsInstructor = document.getElementById('courseDetailsInstructor');
const courseDetailsImage = document.getElementById('courseDetailsImage');
const courseDetailsRating = document.getElementById('courseDetailsRating');
const courseDetailsStudents = document.getElementById('courseDetailsStudents');
const courseDetailsDuration = document.getElementById('courseDetailsDuration');
const courseDetailsLevel = document.getElementById('courseDetailsLevel');
const courseDetailsDescription = document.getElementById('courseDetailsDescription');
const courseDetailsPrice = document.getElementById('courseDetailsPrice');
const courseDetailsOriginalPrice = document.getElementById('courseDetailsOriginalPrice');

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const courseTitle = btn.getAttribute('data-course');
        const instructor = btn.getAttribute('data-instructor');
        const rating = btn.getAttribute('data-rating');
        const students = btn.getAttribute('data-students');
        const duration = btn.getAttribute('data-duration');
        const level = btn.getAttribute('data-level');
        const price = btn.getAttribute('data-price');
        const originalPrice = btn.getAttribute('data-original-price');
        const description = btn.getAttribute('data-description');
        
        courseDetailsTitle.textContent = courseTitle;
        courseDetailsInstructor.textContent = instructor;
        courseDetailsImage.src = `https://placehold.co/400x200/e2e8f0/1e293b?text=${encodeURIComponent(courseTitle.replace(/\s+/g, '+'))}`;
        courseDetailsRating.textContent = rating;
        courseDetailsStudents.textContent = students;
        courseDetailsDuration.textContent = duration;
        courseDetailsLevel.textContent = level;
        courseDetailsDescription.textContent = description;
        courseDetailsPrice.textContent = price;
        
        if (originalPrice) {
            courseDetailsOriginalPrice.textContent = originalPrice;
            courseDetailsOriginalPrice.style.display = 'inline';
        } else {
            courseDetailsOriginalPrice.style.display = 'none';
        }
        
        courseDetailsModal.classList.add('open');
    });
});

courseDetailsClose.addEventListener('click', () => {
    courseDetailsModal.classList.remove('open');
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === previewModal) {
        previewModal.classList.remove('open');
    }
    if (event.target === courseDetailsModal) {
        courseDetailsModal.classList.remove('open');
    }
});

// Search functionality for marketplace
const searchInput = document.querySelector('.search-input');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const courseCards = document.querySelectorAll('#marketplace .course-card');

function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const levelValue = levelFilter.value;

    courseCards.forEach(card => {
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
        const description = card.querySelector('.course-description').textContent.toLowerCase();
        const category = card.querySelector('.course-badge').textContent.toLowerCase();
        const level = card.querySelector('.level-badge').textContent.toLowerCase();

        const matchesSearch = title.includes(searchTerm) ||
                              instructor.includes(searchTerm) ||
                              description.includes(searchTerm);

        const matchesCategory = categoryValue === 'all' || category.includes(categoryValue);
        const matchesLevel = levelValue === 'all' || level.includes(levelValue);

        if (matchesSearch && matchesCategory && matchesLevel) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    let visibleCount = 0;
    courseCards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCount++;
        }
    });

    let noResultsMessage = document.getElementById('noResultsMessage');
    if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.id = 'noResultsMessage';
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.padding = '20px';
        noResultsMessage.style.color = '#555';
        noResultsMessage.textContent = 'No courses available.';
        const courseGrid = document.querySelector('#marketplace .course-grid');
        courseGrid.parentNode.insertBefore(noResultsMessage, courseGrid.nextSibling);
    }
    if (visibleCount === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

searchInput.addEventListener('input', filterCourses);
categoryFilter.addEventListener('change', filterCourses);
levelFilter.addEventListener('change', filterCourses);
