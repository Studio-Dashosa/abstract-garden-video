// Task Picker Component
class TaskPicker {
    constructor() {
        this.currentUser = null;
        this.filters = {
            assignee: 'all',
            sprint: 'all',
            difficulty: 'all',
            status: 'open'
        };
    }

    init() {
        this.createUI();
        this.loadTasks();
    }

    createUI() {
        const pickerHTML = `
            <div id="task-picker-modal" class="modal" style="display: none;">
                <div class="modal-content task-picker">
                    <h2>⚔️ Choose Your Quest</h2>
                    
                    <!-- User Selection -->
                    <div class="user-select">
                        <button class="user-btn" data-user="jesse">
                            <span class="user-icon">🎭</span>
                            <span>Jesse</span>
                            <small>Animation & Rigging</small>
                        </button>
                        <button class="user-btn" data-user="michael">
                            <span class="user-icon">🏗️</span>
                            <span>Michael</span>
                            <small>Modeling & Rendering</small>
                        </button>
                    </div>

                    <!-- Filters -->
                    <div class="task-filters">
                        <select id="sprint-filter">
                            <option value="all">All Sprints</option>
                            <option value="Sprint 1">Sprint 1 - Foundation</option>
                            <option value="Sprint 2">Sprint 2 - Animation</option>
                            <option value="Sprint 3">Sprint 3 - Polish</option>
                        </select>
                        
                        <select id="difficulty-filter">
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy (50 XP)</option>
                            <option value="medium">Medium (100 XP)</option>
                            <option value="hard">Hard (150 XP)</option>
                            <option value="epic">Epic (500 XP)</option>
                        </select>
                        
                        <select id="status-filter">
                            <option value="open">Open Tasks</option>
                            <option value="assigned">My Tasks</option>
                            <option value="suggested">Suggested for Me</option>
                        </select>
                    </div>

                    <!-- Task List -->
                    <div id="task-list" class="task-list">
                        <!-- Tasks will be inserted here -->
                    </div>

                    <!-- Close Button -->
                    <button class="close-btn" onclick="taskPicker.close()">Close</button>
                </div>
            </div>
        `;

        // Add to page if not exists
        if (!document.getElementById('task-picker-modal')) {
            document.body.insertAdjacentHTML('beforeend', pickerHTML);
        }

        // Add event listeners
        document.querySelectorAll('.user-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectUser(btn.dataset.user));
        });

        document.getElementById('sprint-filter').addEventListener('change', (e) => {
            this.filters.sprint = e.target.value;
            this.filterTasks();
        });

        document.getElementById('difficulty-filter').addEventListener('change', (e) => {
            this.filters.difficulty = e.target.value;
            this.filterTasks();
        });

        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.filterTasks();
        });
    }

    selectUser(user) {
        this.currentUser = user;
        document.querySelectorAll('.user-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.user === user);
        });
        this.filterTasks();
    }

    loadTasks() {
        // Get issues from global state
        const tasks = window.issues || [];
        this.displayTasks(tasks);
    }

    filterTasks() {
        let tasks = window.issues || [];
        
        // Filter by sprint
        if (this.filters.sprint !== 'all') {
            tasks = tasks.filter(task => 
                task.labels?.some(l => l.name === this.filters.sprint)
            );
        }

        // Filter by difficulty
        if (this.filters.difficulty !== 'all') {
            tasks = tasks.filter(task => {
                const xp = this.calculateXP(task);
                switch(this.filters.difficulty) {
                    case 'easy': return xp <= 50;
                    case 'medium': return xp > 50 && xp <= 100;
                    case 'hard': return xp > 100 && xp <= 200;
                    case 'epic': return xp > 200;
                    default: return true;
                }
            });
        }

        // Filter by status/assignment
        if (this.filters.status === 'assigned' && this.currentUser) {
            const assignments = JSON.parse(localStorage.getItem('taskAssignments') || '{}');
            tasks = tasks.filter(task => assignments[task.number] === this.currentUser);
        } else if (this.filters.status === 'suggested' && this.currentUser) {
            tasks = tasks.filter(task => {
                const suggestion = this.suggestAssignment(task);
                return suggestion === this.currentUser;
            });
        }

        // Filter out closed and dashboard issues
        tasks = tasks.filter(task => 
            task.state === 'open' && 
            !task.labels?.some(l => l.name === 'dashboard')
        );

        this.displayTasks(tasks);
    }

    displayTasks(tasks) {
        const listEl = document.getElementById('task-list');
        
        if (tasks.length === 0) {
            listEl.innerHTML = '<p class="no-tasks">No tasks match your filters</p>';
            return;
        }

        const html = tasks.map(task => {
            const xp = this.calculateXP(task);
            const assignment = this.getAssignment(task.number);
            const suggestion = this.suggestAssignment(task);
            const isRecommended = this.currentUser && suggestion === this.currentUser;
            
            return `
                <div class="task-item ${assignment ? `assigned-${assignment}` : ''} ${isRecommended ? 'recommended' : ''}" 
                     data-issue="${task.number}">
                    <div class="task-header">
                        <span class="task-number">#${task.number}</span>
                        <span class="task-xp">+${xp} XP</span>
                        ${isRecommended ? '<span class="recommended-badge">⭐ Recommended</span>' : ''}
                        ${assignment ? `<span class="assigned-badge">${assignment.toUpperCase()[0]}</span>` : ''}
                    </div>
                    <h3 class="task-title">${task.title}</h3>
                    <div class="task-labels">
                        ${task.labels?.map(l => `<span class="label">${l.name}</span>`).join('') || ''}
                    </div>
                    <div class="task-actions">
                        <button onclick="taskPicker.claimTask(${task.number})">Claim Task</button>
                        <a href="${task.html_url}" target="_blank">View on GitHub</a>
                    </div>
                </div>
            `;
        }).join('');

        listEl.innerHTML = html;
    }

    claimTask(issueNumber) {
        if (!this.currentUser) {
            alert('Please select who you are (Jesse or Michael) first!');
            return;
        }

        const assignments = JSON.parse(localStorage.getItem('taskAssignments') || '{}');
        assignments[issueNumber] = this.currentUser;
        localStorage.setItem('taskAssignments', JSON.stringify(assignments));

        // Update UI
        const taskEl = document.querySelector(`[data-issue="${issueNumber}"]`);
        if (taskEl) {
            taskEl.classList.add(`assigned-${this.currentUser}`);
            
            // Show confirmation
            const confirmMsg = document.createElement('div');
            confirmMsg.className = 'claim-success';
            confirmMsg.textContent = `Task #${issueNumber} claimed by ${this.currentUser}!`;
            taskEl.appendChild(confirmMsg);
            
            setTimeout(() => confirmMsg.remove(), 3000);
        }

        // Refresh the list
        this.filterTasks();
    }

    getAssignment(issueNumber) {
        const assignments = JSON.parse(localStorage.getItem('taskAssignments') || '{}');
        return assignments[issueNumber];
    }

    calculateXP(task) {
        const rewards = {
            'Sprint 1': 50,
            'Sprint 2': 100,
            'Sprint 3': 150,
            'side-quest': 200,
            'epic': 500,
            'bug': 25,
            'enhancement': 75
        };

        let xp = 50; // default
        task.labels?.forEach(label => {
            if (rewards[label.name]) {
                xp = Math.max(xp, rewards[label.name]);
            }
        });
        return xp;
    }

    suggestAssignment(task) {
        const title = task.title.toLowerCase();
        const body = (task.body || '').toLowerCase();
        
        // Jesse's keywords
        const jesseKeywords = ['animation', 'rigging', 'character', 'maya', 'motion', 'bone', 'skin'];
        // Michael's keywords
        const michaelKeywords = ['model', 'texture', 'light', 'render', 'houdini', 'shader', 'material'];
        
        let jesseScore = 0;
        let michaelScore = 0;
        
        jesseKeywords.forEach(keyword => {
            if (title.includes(keyword) || body.includes(keyword)) jesseScore++;
        });
        
        michaelKeywords.forEach(keyword => {
            if (title.includes(keyword) || body.includes(keyword)) michaelScore++;
        });
        
        if (jesseScore > michaelScore) return 'jesse';
        if (michaelScore > jesseScore) return 'michael';
        return null;
    }

    open() {
        document.getElementById('task-picker-modal').style.display = 'block';
        this.loadTasks();
    }

    close() {
        document.getElementById('task-picker-modal').style.display = 'none';
    }
}

// Create global instance
window.taskPicker = new TaskPicker();

// Add styles
const styles = `
<style>
.task-picker {
    max-width: 900px;
    max-height: 80vh;
    overflow-y: auto;
}

.user-select {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.user-btn {
    flex: 1;
    padding: 1rem;
    background: var(--stone-dark);
    border: 2px solid var(--border-iron);
    color: var(--pale-text);
    cursor: pointer;
    transition: all 0.3s;
}

.user-btn:hover, .user-btn.active {
    border-color: var(--ember-glow);
    background: var(--ash-black);
}

.user-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
}

.task-filters {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.task-filters select {
    flex: 1;
    padding: 0.5rem;
    background: var(--stone-dark);
    border: 1px solid var(--border-iron);
    color: var(--pale-text);
}

.task-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border-iron);
    padding: 1rem;
    background: var(--ash-black);
}

.task-item {
    background: var(--stone-dark);
    border: 1px solid var(--border-iron);
    padding: 1rem;
    margin-bottom: 1rem;
    transition: all 0.3s;
}

.task-item:hover {
    border-color: var(--ember-glow);
}

.task-item.recommended {
    border-color: var(--soul-blue);
    box-shadow: 0 0 10px rgba(65, 105, 225, 0.3);
}

.task-item.assigned-jesse {
    border-left: 4px solid #9333EA;
}

.task-item.assigned-michael {
    border-left: 4px solid #10B981;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.task-number {
    color: var(--faded-text);
    font-size: 0.9rem;
}

.task-xp {
    color: var(--ember-glow);
    font-weight: bold;
}

.recommended-badge {
    background: var(--soul-blue);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    font-size: 0.8rem;
}

.assigned-badge {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--ember-glow);
    color: var(--blood-dark);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.task-title {
    color: var(--pale-text);
    margin: 0.5rem 0;
    font-size: 1.1rem;
}

.task-labels {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0.5rem 0;
}

.task-labels .label {
    padding: 0.2rem 0.5rem;
    background: var(--ash-black);
    border: 1px solid var(--border-iron);
    color: var(--faded-text);
    font-size: 0.8rem;
    border-radius: 3px;
}

.task-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.task-actions button, .task-actions a {
    padding: 0.5rem 1rem;
    background: var(--stone-dark);
    border: 1px solid var(--border-iron);
    color: var(--pale-text);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
}

.task-actions button:hover, .task-actions a:hover {
    background: var(--ember-glow);
    color: var(--blood-dark);
}

.claim-success {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--success-green);
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    font-weight: bold;
    animation: fadeInOut 3s;
}

@keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);

export default TaskPicker;
