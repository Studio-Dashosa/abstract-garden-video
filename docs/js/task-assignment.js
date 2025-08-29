// Task Assignment System
const TASK_ASSIGNMENTS = {
    // Jesse's specializations
    jesse: {
        skills: ['animation', 'rigging', 'character', 'maya', 'motion'],
        labels: ['animation', 'rigging', 'character-work', 'maya-specific'],
        sprints: ['Sprint 2'] // Animation sprint
    },
    
    // Michael's specializations  
    michael: {
        skills: ['modeling', 'texturing', 'lighting', 'rendering', 'houdini'],
        labels: ['modeling', 'texturing', 'lighting', 'render', 'houdini-specific'],
        sprints: ['Sprint 1', 'Sprint 3'] // Foundation and Polish
    }
};

// Auto-assign based on issue content
function suggestAssignment(issue) {
    const title = issue.title.toLowerCase();
    const body = (issue.body || '').toLowerCase();
    const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
    
    let jesseScore = 0;
    let michaelScore = 0;
    
    // Check Jesse's keywords
    TASK_ASSIGNMENTS.jesse.skills.forEach(skill => {
        if (title.includes(skill) || body.includes(skill)) jesseScore += 2;
    });
    TASK_ASSIGNMENTS.jesse.labels.forEach(label => {
        if (labels.includes(label)) jesseScore += 3;
    });
    if (labels.some(l => TASK_ASSIGNMENTS.jesse.sprints.includes(l))) jesseScore += 1;
    
    // Check Michael's keywords
    TASK_ASSIGNMENTS.michael.skills.forEach(skill => {
        if (title.includes(skill) || body.includes(skill)) michaelScore += 2;
    });
    TASK_ASSIGNMENTS.michael.labels.forEach(label => {
        if (labels.includes(label)) michaelScore += 3;
    });
    if (labels.some(l => TASK_ASSIGNMENTS.michael.sprints.includes(l))) michaelScore += 1;
    
    // Return suggestion
    if (jesseScore > michaelScore) return 'jesse';
    if (michaelScore > jesseScore) return 'michael';
    return 'unassigned';
}

// Store assignments in localStorage
function assignTask(issueNumber, assignee) {
    const assignments = JSON.parse(localStorage.getItem('taskAssignments') || '{}');
    assignments[issueNumber] = assignee;
    localStorage.setItem('taskAssignments', JSON.stringify(assignments));
    
    // Update UI
    updateAssignmentDisplay(issueNumber, assignee);
}

function getAssignment(issueNumber) {
    const assignments = JSON.parse(localStorage.getItem('taskAssignments') || '{}');
    return assignments[issueNumber] || 'unassigned';
}

function updateAssignmentDisplay(issueNumber, assignee) {
    const element = document.querySelector(`[data-issue="${issueNumber}"]`);
    if (element) {
        element.className = `task-card assigned-${assignee}`;
        const badge = element.querySelector('.assignee-badge');
        if (badge) {
            badge.textContent = assignee === 'jesse' ? 'J' : assignee === 'michael' ? 'M' : '?';
        }
    }
}

export { suggestAssignment, assignTask, getAssignment, updateAssignmentDisplay, TASK_ASSIGNMENTS };
