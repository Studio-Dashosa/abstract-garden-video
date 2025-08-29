/**
 * Task Picker Interface - Direct GitHub integration
 * Allows picking tasks, uploading deliverables, and tracking progress
 */

class TaskPicker {
  constructor() {
    this.currentFilter = 'all';
    this.selectedTask = null;
    this.issuesData = [];
    this.completedTasks = new Set();
    this.userUploads = {};
    
    this.init();
  }

  async init() {
    await this.loadIssues();
    this.createUI();
    this.attachEventListeners();
    this.loadSavedProgress();
  }

  async loadIssues() {
    try {
      const response = await fetch('./data/issues.json');
      this.issuesData = await response.json();
      
      // Enrich with task values
      this.issuesData.forEach(issue => {
        const taskValue = window.getTaskValue(issue.number);
        issue.xp = taskValue.xp;
        issue.coins = taskValue.coins;
        issue.difficulty = taskValue.difficulty;
        issue.value = taskValue.value;
      });
    } catch (error) {
      console.error('Failed to load issues:', error);
      this.issuesData = [];
    }
  }

  createUI() {
    const container = document.createElement('div');
    container.id = 'task-picker-container';
    container.className = 'task-picker-overlay';
    container.innerHTML = `
      <div class="task-picker-modal">
        <div class="task-picker-header">
          <h2 class="souls-title">Choose Your Trial</h2>
          <button class="close-picker">×</button>
        </div>
        
        <div class="task-filters">
          <button class="filter-btn active" data-filter="all">All Tasks</button>
          <button class="filter-btn" data-filter="Sprint 1">Sprint 1 - Foundation</button>
          <button class="filter-btn" data-filter="Sprint 2">Sprint 2 - Development</button>
          <button class="filter-btn" data-filter="Sprint 3">Sprint 3 - Mastery</button>
          <button class="filter-btn" data-filter="available">Available Only</button>
        </div>

        <div class="task-list-container">
          <div class="task-grid">
            <!-- Tasks will be populated here -->
          </div>
        </div>

        <div class="task-details" style="display: none;">
          <h3 class="task-title"></h3>
          <div class="task-rewards">
            <span class="xp-reward">XP: 0</span>
            <span class="coin-reward">Coins: 0</span>
            <span class="value-reward">Value: $0</span>
          </div>
          <div class="task-description"></div>
          
          <div class="deliverable-section">
            <h4>Upload Deliverable</h4>
            <div class="upload-area">
              <input type="file" id="deliverable-upload" accept=".ma,.mb,.blend,.fbx,.obj,.png,.jpg,.mp4">
              <label for="deliverable-upload" class="upload-label">
                <span class="upload-icon">📁</span>
                <span>Choose File or Drag & Drop</span>
              </label>
              <div class="upload-preview"></div>
            </div>
            
            <textarea class="completion-notes" placeholder="Describe what you learned..."></textarea>
            
            <div class="task-actions">
              <button class="btn-start-task">Start Task</button>
              <button class="btn-submit-task" style="display: none;">Submit Completion</button>
              <a class="btn-github-link" href="#" target="_blank">View on GitHub</a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    this.renderTasks();
  }

  renderTasks() {
    const grid = document.querySelector('.task-grid');
    if (!grid) return;
    
    const filteredTasks = this.getFilteredTasks();
    
    grid.innerHTML = filteredTasks.map(task => {
      const isCompleted = task.state === 'closed' || this.completedTasks.has(task.number);
      const isLocked = this.isTaskLocked(task);
      const difficultyColor = window.DIFFICULTY_COLORS[task.difficulty] || '#666';
      
      return `
        <div class="task-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}" 
             data-task-id="${task.number}"
             style="border-color: ${difficultyColor}">
          <div class="task-card-header">
            <span class="task-number">#${task.number}</span>
            <span class="task-difficulty" style="color: ${difficultyColor}">${task.difficulty}</span>
          </div>
          <h4 class="task-card-title">${task.title}</h4>
          <div class="task-card-rewards">
            <span class="xp">+${task.xp} XP</span>
            <span class="coins">+${task.coins} 🪙</span>
            <span class="value">${task.value}</span>
          </div>
          ${isCompleted ? '<div class="task-status">✓ Completed</div>' : ''}
          ${isLocked ? '<div class="task-status">🔒 Locked</div>' : ''}
        </div>
      `;
    }).join('');
  }

  getFilteredTasks() {
    let filtered = this.issuesData.filter(task => task.number !== 78); // Exclude dashboard issue
    
    switch(this.currentFilter) {
      case 'Sprint 1':
        filtered = filtered.filter(t => t.labels.some(l => l.name === 'Sprint 1'));
        break;
      case 'Sprint 2':
        filtered = filtered.filter(t => t.labels.some(l => l.name === 'Sprint 2'));
        break;
      case 'Sprint 3':
        filtered = filtered.filter(t => t.labels.some(l => l.name === 'Sprint 3'));
        break;
      case 'available':
        filtered = filtered.filter(t => !this.isTaskLocked(t) && t.state === 'open');
        break;
    }
    
    // Sort by XP value (lower to higher for progression)
    return filtered.sort((a, b) => a.xp - b.xp);
  }

  isTaskLocked(task) {
    // Sprint 2 locked until 5 Sprint 1 tasks complete
    // Sprint 3 locked until 10 Sprint 2 tasks complete
    const sprint1Complete = this.getCompletedByLabel('Sprint 1').length;
    const sprint2Complete = this.getCompletedByLabel('Sprint 2').length;
    
    if (task.labels.some(l => l.name === 'Sprint 2')) {
      return sprint1Complete < 5;
    }
    if (task.labels.some(l => l.name === 'Sprint 3')) {
      return sprint2Complete < 10;
    }
    return false;
  }

  getCompletedByLabel(label) {
    return this.issuesData.filter(task => 
      (task.state === 'closed' || this.completedTasks.has(task.number)) &&
      task.labels.some(l => l.name === label)
    );
  }

  selectTask(taskId) {
    const task = this.issuesData.find(t => t.number === parseInt(taskId));
    if (!task) return;
    
    this.selectedTask = task;
    const details = document.querySelector('.task-details');
    
    // Update details panel
    details.querySelector('.task-title').textContent = task.title;
    details.querySelector('.xp-reward').textContent = `XP: +${task.xp}`;
    details.querySelector('.coin-reward').textContent = `Coins: +${task.coins}`;
    details.querySelector('.value-reward').textContent = `Value: ${task.value}`;
    details.querySelector('.task-description').innerHTML = this.parseMarkdown(task.body);
    details.querySelector('.btn-github-link').href = task.html_url;
    
    // Show appropriate buttons
    if (task.state === 'closed' || this.completedTasks.has(task.number)) {
      details.querySelector('.btn-start-task').style.display = 'none';
      details.querySelector('.btn-submit-task').style.display = 'none';
      details.querySelector('.deliverable-section').innerHTML = `
        <div class="task-completed-message">
          ✓ Task Completed! 
          ${this.userUploads[task.number] ? '<br>Deliverable uploaded' : ''}
        </div>
      `;
    } else {
      details.querySelector('.btn-start-task').style.display = 'block';
      details.querySelector('.btn-submit-task').style.display = 'none';
    }
    
    details.style.display = 'block';
  }

  handleFileUpload(file) {
    if (!this.selectedTask) return;
    
    const preview = document.querySelector('.upload-preview');
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    
    if (file.size > maxSize) {
      preview.innerHTML = '<div class="upload-error">File too large (max 10MB)</div>';
      return;
    }
    
    // Store file reference (in real app, would upload to server)
    this.userUploads[this.selectedTask.number] = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
    
    preview.innerHTML = `
      <div class="upload-success">
        <span class="file-icon">📎</span>
        <span class="file-name">${file.name}</span>
        <span class="file-size">(${(file.size / 1024).toFixed(1)}KB)</span>
      </div>
    `;
    
    // Show submit button
    document.querySelector('.btn-submit-task').style.display = 'block';
    document.querySelector('.btn-start-task').style.display = 'none';
  }

  submitTask() {
    if (!this.selectedTask) return;
    
    const notes = document.querySelector('.completion-notes').value;
    const taskId = this.selectedTask.number;
    
    // Mark as completed
    this.completedTasks.add(taskId);
    
    // Award XP and coins
    const rewards = {
      xp: this.selectedTask.xp,
      coins: this.selectedTask.coins,
      notes: notes,
      upload: this.userUploads[taskId],
      completedAt: new Date().toISOString()
    };
    
    // Trigger reward animation
    this.showRewardAnimation(rewards);
    
    // Update game state
    if (window.gameState) {
      window.gameState.completeTask(taskId, rewards);
    }
    
    // Save progress
    this.saveProgress();
    
    // Refresh UI
    this.renderTasks();
    this.selectTask(taskId);
    
    // Post to GitHub (would need backend)
    this.postCompletionToGitHub(taskId, notes, this.userUploads[taskId]);
  }

  showRewardAnimation(rewards) {
    const animation = document.createElement('div');
    animation.className = 'reward-animation';
    animation.innerHTML = `
      <div class="reward-burst">
        <div class="xp-gain">+${rewards.xp} XP</div>
        <div class="coin-gain">+${rewards.coins} Coins</div>
        <div class="message">Task Complete!</div>
      </div>
    `;
    document.body.appendChild(animation);
    
    setTimeout(() => animation.remove(), 3000);
  }

  async postCompletionToGitHub(taskId, notes, upload) {
    // This would need a backend API to post to GitHub
    // For now, just log it
    console.log('Task completion:', {
      issue: taskId,
      notes: notes,
      upload: upload,
      comment: `Task completed! ${upload ? `Deliverable: ${upload.name}` : ''}\n\n${notes}`
    });
    
    // In production, this would:
    // 1. Upload file to GitHub/S3
    // 2. Post comment on issue
    // 3. Close issue if authorized
  }

  attachEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderTasks();
      });
    });

    // Task cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.task-card');
      if (card && !card.classList.contains('locked')) {
        this.selectTask(card.dataset.taskId);
      }
    });

    // File upload
    const uploadInput = document.getElementById('deliverable-upload');
    if (uploadInput) {
      uploadInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          this.handleFileUpload(e.target.files[0]);
        }
      });
    }

    // Drag and drop
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) {
          this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });
    }

    // Action buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-start-task')) {
        e.target.style.display = 'none';
        document.querySelector('.upload-area').style.display = 'block';
      }
      
      if (e.target.classList.contains('btn-submit-task')) {
        this.submitTask();
      }
      
      if (e.target.classList.contains('close-picker')) {
        this.close();
      }
    });
  }

  parseMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h4>$1</h4>')
      .replace(/^# (.*$)/gim, '<h5>$1</h5>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  saveProgress() {
    localStorage.setItem('completedTasks', JSON.stringify([...this.completedTasks]));
    localStorage.setItem('userUploads', JSON.stringify(this.userUploads));
  }

  loadSavedProgress() {
    try {
      const saved = localStorage.getItem('completedTasks');
      if (saved) {
        this.completedTasks = new Set(JSON.parse(saved));
      }
      
      const uploads = localStorage.getItem('userUploads');
      if (uploads) {
        this.userUploads = JSON.parse(uploads);
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
  }

  open() {
    document.getElementById('task-picker-container').style.display = 'flex';
  }

  close() {
    document.getElementById('task-picker-container').style.display = 'none';
  }
}

// Initialize when ready
if (typeof window !== 'undefined') {
  window.TaskPicker = TaskPicker;
}