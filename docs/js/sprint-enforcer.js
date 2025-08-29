/**
 * Sprint Enforcer - Ensures proper agile/sprint sequential task completion
 * Tasks must be completed in order within sprints, and sprints unlock sequentially
 */

class SprintEnforcer {
  constructor() {
    // Define sprint structure and task order
    this.sprintStructure = {
      'Sprint 1': {
        name: 'Foundation',
        requiredCompletion: 0, // Can start immediately
        tasks: [
          { id: 70, name: "Install Maya 2024", order: 1, assignee: null },
          { id: 71, name: "Install Blender 3.6", order: 2, assignee: null },
          { id: 72, name: "Install Houdini", order: 3, assignee: null },
          { id: 73, name: "Test Maya", order: 4, assignee: null, requires: [70] },
          { id: 74, name: "Test Blender", order: 5, assignee: null, requires: [71] },
          { id: 75, name: "Create base geometry", order: 6, assignee: null, requires: [70, 73] },
          { id: 76, name: "Apply smoothing", order: 7, assignee: null, requires: [75] },
          { id: 77, name: "Export FBX", order: 8, assignee: null, requires: [76] }
        ]
      },
      'Sprint 2': {
        name: 'Development',
        requiredCompletion: 6, // Must complete 6 Sprint 1 tasks
        tasks: [
          // Part 3 - Modeling (must be done first)
          { id: 31, name: "Model simple furniture", order: 1, assignee: null, requires: [] },
          { id: 32, name: "Create UV maps", order: 2, assignee: null, requires: [31] },
          { id: 33, name: "Apply textures", order: 3, assignee: null, requires: [32] },
          { id: 34, name: "Set up shaders", order: 4, assignee: null, requires: [33] },
          
          // Part 4 - Character (requires modeling basics)
          { id: 35, name: "Create robot model", order: 5, assignee: null, requires: [31] },
          { id: 36, name: "Rig character", order: 6, assignee: null, requires: [35] },
          { id: 37, name: "Animate walk cycle", order: 7, assignee: null, requires: [36] },
          { id: 38, name: "Animate actions", order: 8, assignee: null, requires: [37] },
          
          // Part 5 - Environment (can start after modeling)
          { id: 39, name: "Build underwater city", order: 9, assignee: null, requires: [31] },
          { id: 40, name: "Design modular buildings", order: 10, assignee: null, requires: [39] },
          { id: 41, name: "Create street props", order: 11, assignee: null, requires: [40] },
          { id: 42, name: "Build complete scene", order: 12, assignee: null, requires: [41] },
          
          // Part 6 - Lighting (requires scene)
          { id: 43, name: "Three-point lighting", order: 13, assignee: null, requires: [42] },
          { id: 44, name: "HDRI setup", order: 14, assignee: null, requires: [43] },
          { id: 45, name: "Light animation", order: 15, assignee: null, requires: [44] },
          { id: 46, name: "Atmosphere effects", order: 16, assignee: null, requires: [45] },
          
          // Part 7 - Materials (can start after textures)
          { id: 47, name: "Basic materials", order: 17, assignee: null, requires: [33] },
          { id: 48, name: "Car paint shader", order: 18, assignee: null, requires: [47] },
          { id: 49, name: "Glass refraction", order: 19, assignee: null, requires: [48] },
          { id: 50, name: "Layered textures", order: 20, assignee: null, requires: [49] },
          
          // Part 8 - Rendering (requires materials and lighting)
          { id: 51, name: "Arnold render", order: 21, assignee: null, requires: [46, 50] },
          { id: 52, name: "Optimize settings", order: 22, assignee: null, requires: [51] },
          { id: 53, name: "Create AOVs", order: 23, assignee: null, requires: [52] },
          { id: 54, name: "Batch render", order: 24, assignee: null, requires: [53] },
          
          // Part 9 - Effects (requires rendering)
          { id: 55, name: "Particle dust", order: 25, assignee: null, requires: [54] },
          { id: 56, name: "Fire simulation", order: 26, assignee: null, requires: [55] }
        ]
      },
      'Sprint 3': {
        name: 'Polish & Advanced',
        requiredCompletion: 20, // Must complete 20 Sprint 2 tasks
        tasks: [
          // Advanced simulations
          { id: 57, name: "Ocean simulation", order: 1, assignee: null, requires: [56] },
          
          // CAD Integration
          { id: 58, name: "SolidWorks design", order: 2, assignee: null, requires: [] },
          { id: 59, name: "Revit architecture", order: 3, assignee: null, requires: [] },
          { id: 60, name: "CAD integration", order: 4, assignee: null, requires: [58, 59] },
          { id: 61, name: "Production workflow", order: 5, assignee: null, requires: [60] },
          
          // Crowd simulation
          { id: 62, name: "Golaem crowds", order: 6, assignee: null, requires: [] },
          { id: 63, name: "Behavior system", order: 7, assignee: null, requires: [62] },
          { id: 64, name: "Navigation mesh", order: 8, assignee: null, requires: [63] },
          { id: 65, name: "Stadium crowd", order: 9, assignee: null, requires: [64] },
          
          // Final integration
          { id: 66, name: "Pipeline unification", order: 10, assignee: null, requires: [61, 65] },
          { id: 67, name: "Portfolio package", order: 11, assignee: null, requires: [66] },
          { id: 68, name: "Advanced techniques", order: 12, assignee: null, requires: [67] },
          { id: 69, name: "Final integration", order: 13, assignee: null, requires: [68] }
        ]
      }
    };

    this.completedTasks = new Set();
    this.currentUser = null;
    this.loadProgress();
  }

  loadProgress() {
    // Load from localStorage
    const saved = localStorage.getItem('completedTasks');
    if (saved) {
      this.completedTasks = new Set(JSON.parse(saved));
    }
    
    // Load current user/assignee
    this.currentUser = localStorage.getItem('currentUser') || 'default';
  }

  saveProgress() {
    localStorage.setItem('completedTasks', JSON.stringify([...this.completedTasks]));
  }

  /**
   * Check if a task is available to work on
   */
  isTaskAvailable(taskId) {
    // Find which sprint this task belongs to
    for (const [sprintName, sprint] of Object.entries(this.sprintStructure)) {
      const task = sprint.tasks.find(t => t.id === taskId);
      
      if (task) {
        // Check if sprint is unlocked
        if (!this.isSprintUnlocked(sprintName)) {
          return { 
            available: false, 
            reason: `Complete ${sprint.requiredCompletion} tasks from previous sprint first` 
          };
        }
        
        // Check if assigned to someone else
        if (task.assignee && task.assignee !== this.currentUser) {
          return { 
            available: false, 
            reason: `Assigned to ${task.assignee}` 
          };
        }
        
        // Check prerequisites within sprint
        if (task.requires && task.requires.length > 0) {
          const missingPrereqs = task.requires.filter(reqId => !this.completedTasks.has(reqId));
          if (missingPrereqs.length > 0) {
            const prereqNames = missingPrereqs.map(id => this.getTaskName(id)).join(', ');
            return { 
              available: false, 
              reason: `Complete prerequisites first: ${prereqNames}` 
            };
          }
        }
        
        // Check if already completed
        if (this.completedTasks.has(taskId)) {
          return { 
            available: false, 
            reason: 'Already completed' 
          };
        }
        
        // Task is available!
        return { available: true, reason: null };
      }
    }
    
    return { available: false, reason: 'Task not found' };
  }

  /**
   * Check if a sprint is unlocked
   */
  isSprintUnlocked(sprintName) {
    const sprint = this.sprintStructure[sprintName];
    if (!sprint) return false;
    
    if (sprint.requiredCompletion === 0) return true;
    
    // Count completed tasks from previous sprint
    const previousSprint = this.getPreviousSprint(sprintName);
    if (!previousSprint) return true;
    
    const completedInPrevious = this.getCompletedTasksInSprint(previousSprint);
    return completedInPrevious >= sprint.requiredCompletion;
  }

  /**
   * Get previous sprint name
   */
  getPreviousSprint(sprintName) {
    const sprints = Object.keys(this.sprintStructure);
    const index = sprints.indexOf(sprintName);
    return index > 0 ? sprints[index - 1] : null;
  }

  /**
   * Count completed tasks in a sprint
   */
  getCompletedTasksInSprint(sprintName) {
    const sprint = this.sprintStructure[sprintName];
    if (!sprint) return 0;
    
    return sprint.tasks.filter(task => this.completedTasks.has(task.id)).length;
  }

  /**
   * Get next available task for the user
   */
  getNextAvailableTask() {
    // Go through sprints in order
    for (const [sprintName, sprint] of Object.entries(this.sprintStructure)) {
      if (!this.isSprintUnlocked(sprintName)) continue;
      
      // Find first available task in this sprint
      for (const task of sprint.tasks.sort((a, b) => a.order - b.order)) {
        const availability = this.isTaskAvailable(task.id);
        if (availability.available) {
          return {
            ...task,
            sprint: sprintName,
            sprintName: sprint.name
          };
        }
      }
    }
    
    return null; // No available tasks
  }

  /**
   * Get all available tasks
   */
  getAvailableTasks() {
    const available = [];
    
    for (const [sprintName, sprint] of Object.entries(this.sprintStructure)) {
      if (!this.isSprintUnlocked(sprintName)) continue;
      
      for (const task of sprint.tasks) {
        const availability = this.isTaskAvailable(task.id);
        if (availability.available) {
          available.push({
            ...task,
            sprint: sprintName,
            sprintName: sprint.name
          });
        }
      }
    }
    
    return available;
  }

  /**
   * Complete a task
   */
  completeTask(taskId) {
    const availability = this.isTaskAvailable(taskId);
    if (!availability.available) {
      throw new Error(`Cannot complete task ${taskId}: ${availability.reason}`);
    }
    
    this.completedTasks.add(taskId);
    this.saveProgress();
    
    return {
      success: true,
      nextTask: this.getNextAvailableTask()
    };
  }

  /**
   * Get task name by ID
   */
  getTaskName(taskId) {
    for (const sprint of Object.values(this.sprintStructure)) {
      const task = sprint.tasks.find(t => t.id === taskId);
      if (task) return task.name;
    }
    return `Task #${taskId}`;
  }

  /**
   * Get sprint progress summary
   */
  getSprintProgress() {
    const progress = {};
    
    for (const [sprintName, sprint] of Object.entries(this.sprintStructure)) {
      const completed = this.getCompletedTasksInSprint(sprintName);
      const total = sprint.tasks.length;
      const unlocked = this.isSprintUnlocked(sprintName);
      
      progress[sprintName] = {
        name: sprint.name,
        completed,
        total,
        percentage: Math.floor((completed / total) * 100),
        unlocked,
        requiredCompletion: sprint.requiredCompletion
      };
    }
    
    return progress;
  }

  /**
   * Set current user/assignee
   */
  setCurrentUser(username) {
    this.currentUser = username;
    localStorage.setItem('currentUser', username);
  }

  /**
   * Assign task to user
   */
  assignTask(taskId, username) {
    for (const sprint of Object.values(this.sprintStructure)) {
      const task = sprint.tasks.find(t => t.id === taskId);
      if (task) {
        task.assignee = username;
        return true;
      }
    }
    return false;
  }
}

// Export for use
if (typeof window !== 'undefined') {
  window.SprintEnforcer = SprintEnforcer;
}