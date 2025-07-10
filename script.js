// Project Workspace Application
class ProjectWorkspace {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.init();
    }

    init() {
        this.loadProjects();
        this.setupEventListeners();
        this.renderProjects();
        this.setupRichEditor();
    }

    // Data Management
    loadProjects() {
        const saved = localStorage.getItem('projectWorkspace');
        this.projects = saved ? JSON.parse(saved) : this.getDefaultProjects();
    }

    saveProjects() {
        localStorage.setItem('projectWorkspace', JSON.stringify(this.projects));
    }

    getDefaultProjects() {
        return [
            {
                id: '1',
                title: 'Personal Portfolio',
                description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript.',
                tags: ['web', 'portfolio', 'responsive'],
                status: 'completed',
                created: new Date('2024-01-15').toISOString(),
                modified: new Date().toISOString(),
                notes: '<h3>Project Overview</h3><p>This portfolio showcases my skills and projects in a clean, professional design.</p><ul><li>Responsive design</li><li>Modern animations</li><li>SEO optimized</li></ul>',
                codeSnippets: [
                    {
                        id: '1',
                        title: 'CSS Grid Layout',
                        code: '.projects-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 2rem;\n}',
                        language: 'css'
                    }
                ],
                resources: [
                    {
                        id: '1',
                        title: 'GitHub Repository',
                        url: 'https://github.com/tmduggan/homepage',
                        description: 'Source code for the portfolio'
                    }
                ],
                todos: [
                    { id: '1', text: 'Add dark mode', completed: false },
                    { id: '2', text: 'Optimize images', completed: true },
                    { id: '3', text: 'Add contact form', completed: false }
                ]
            },
            {
                id: '2',
                title: 'Task Management App',
                description: 'A React-based task management application with drag-and-drop functionality.',
                tags: ['react', 'typescript', 'firebase'],
                status: 'development',
                created: new Date('2024-02-01').toISOString(),
                modified: new Date().toISOString(),
                notes: '<h3>Development Notes</h3><p>Building a modern task management app with React and TypeScript.</p>',
                codeSnippets: [],
                resources: [],
                todos: [
                    { id: '1', text: 'Set up React project', completed: true },
                    { id: '2', text: 'Implement drag-and-drop', completed: false },
                    { id: '3', text: 'Add Firebase integration', completed: false }
                ]
            }
        ];
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Project workspace events
        this.setupProjectEvents();
    }

    setupProjectEvents() {
        // Add project button
        document.getElementById('addProjectBtn')?.addEventListener('click', () => {
            this.showAddProjectModal();
        });

        // Search functionality
        document.getElementById('projectSearch')?.addEventListener('input', (e) => {
            this.filterProjects(e.target.value);
        });

        // Modal events
        document.getElementById('closeModalBtn')?.addEventListener('click', () => {
            this.closeProjectModal();
        });

        document.getElementById('saveProjectBtn')?.addEventListener('click', () => {
            this.saveCurrentProject();
        });

        // Add project modal events
        document.getElementById('createProjectBtn')?.addEventListener('click', () => {
            this.createNewProject();
        });

        document.getElementById('closeAddModalBtn')?.addEventListener('click', () => {
            this.closeAddProjectModal();
        });

        document.getElementById('cancelCreateBtn')?.addEventListener('click', () => {
            this.closeAddProjectModal();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Workspace content events
        this.setupWorkspaceEvents();
    }

    setupWorkspaceEvents() {
        // Code snippets
        document.getElementById('addSnippetBtn')?.addEventListener('click', () => {
            this.addCodeSnippet();
        });

        // Resources
        document.getElementById('addResourceBtn')?.addEventListener('click', () => {
            this.addResource();
        });

        // Todos
        document.getElementById('addTodoBtn')?.addEventListener('click', () => {
            this.addTodo();
        });
    }

    // Project Rendering
    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = this.projects.map(project => this.createProjectCard(project)).join('');
        
        // Add click listeners to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const projectId = card.dataset.projectId;
                this.openProject(projectId);
            });
        });
    }

    createProjectCard(project) {
        const tags = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        const statusClass = project.status;
        const modifiedDate = new Date(project.modified).toLocaleDateString();
        
        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    <i class="fas fa-code"></i>
                    <span class="project-status-badge ${statusClass}">${project.status}</span>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">${tags}</div>
                    <div class="project-meta">
                        <span>Modified: ${modifiedDate}</span>
                        <span>${project.todos.filter(t => !t.completed).length} todos</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Project Management
    openProject(projectId) {
        this.currentProject = this.projects.find(p => p.id === projectId);
        if (!this.currentProject) return;

        this.populateProjectModal();
        this.showProjectModal();
    }

    populateProjectModal() {
        if (!this.currentProject) return;

        // Update modal header
        document.getElementById('modalProjectTitle').textContent = this.currentProject.title;
        document.getElementById('modalProjectStatus').textContent = this.currentProject.status;
        document.getElementById('modalProjectDate').textContent = `Created: ${new Date(this.currentProject.created).toLocaleDateString()}`;

        // Update form fields
        document.getElementById('projectTitle').value = this.currentProject.title;
        document.getElementById('projectDescription').value = this.currentProject.description;
        document.getElementById('projectTags').value = this.currentProject.tags.join(', ');
        document.getElementById('projectStatus').value = this.currentProject.status;

        // Update notes
        document.getElementById('notesEditor').innerHTML = this.currentProject.notes || '';

        // Update code snippets
        this.renderCodeSnippets();

        // Update resources
        this.renderResources();

        // Update todos
        this.renderTodos();
    }

    saveCurrentProject() {
        if (!this.currentProject) return;

        // Update project data
        this.currentProject.title = document.getElementById('projectTitle').value;
        this.currentProject.description = document.getElementById('projectDescription').value;
        this.currentProject.tags = document.getElementById('projectTags').value.split(',').map(t => t.trim()).filter(t => t);
        this.currentProject.status = document.getElementById('projectStatus').value;
        this.currentProject.notes = document.getElementById('notesEditor').innerHTML;
        this.currentProject.modified = new Date().toISOString();

        // Update in projects array
        const index = this.projects.findIndex(p => p.id === this.currentProject.id);
        if (index !== -1) {
            this.projects[index] = this.currentProject;
        }

        this.saveProjects();
        this.renderProjects();
        this.showNotification('Project saved successfully!');
    }

    createNewProject() {
        const title = document.getElementById('newProjectTitle').value.trim();
        const description = document.getElementById('newProjectDescription').value.trim();
        const tags = document.getElementById('newProjectTags').value.split(',').map(t => t.trim()).filter(t => t);

        if (!title) {
            this.showNotification('Please enter a project title', 'error');
            return;
        }

        const newProject = {
            id: Date.now().toString(),
            title,
            description,
            tags,
            status: 'active',
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            notes: '',
            codeSnippets: [],
            resources: [],
            todos: []
        };

        this.projects.unshift(newProject);
        this.saveProjects();
        this.renderProjects();
        this.closeAddProjectModal();
        this.showNotification('Project created successfully!');
    }

    // Modal Management
    showProjectModal() {
        document.getElementById('projectModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        document.getElementById('projectModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentProject = null;
    }

    showAddProjectModal() {
        document.getElementById('addProjectModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAddProjectModal() {
        document.getElementById('addProjectModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        // Clear form
        document.getElementById('newProjectTitle').value = '';
        document.getElementById('newProjectDescription').value = '';
        document.getElementById('newProjectTags').value = '';
    }

    // Tab Management
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Workspace Content Management
    renderCodeSnippets() {
        const container = document.getElementById('snippetsContainer');
        if (!container || !this.currentProject) return;

        container.innerHTML = this.currentProject.codeSnippets.map(snippet => `
            <div class="code-snippet" data-snippet-id="${snippet.id}">
                <div class="snippet-title">${snippet.title}</div>
                <pre class="snippet-code">${snippet.code}</pre>
                <div class="item-actions">
                    <button class="delete-btn" onclick="projectWorkspace.deleteCodeSnippet('${snippet.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    renderResources() {
        const container = document.getElementById('resourcesContainer');
        if (!container || !this.currentProject) return;

        container.innerHTML = this.currentProject.resources.map(resource => `
            <div class="resource-item" data-resource-id="${resource.id}">
                <div class="resource-title">${resource.title}</div>
                <a href="${resource.url}" class="resource-url" target="_blank">${resource.url}</a>
                ${resource.description ? `<div>${resource.description}</div>` : ''}
                <div class="item-actions">
                    <button class="delete-btn" onclick="projectWorkspace.deleteResource('${resource.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    renderTodos() {
        const container = document.getElementById('todosContainer');
        if (!container || !this.currentProject) return;

        container.innerHTML = this.currentProject.todos.map(todo => `
            <div class="todo-item" data-todo-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="projectWorkspace.toggleTodo('${todo.id}')">
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <div class="item-actions">
                    <button class="delete-btn" onclick="projectWorkspace.deleteTodo('${todo.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    addCodeSnippet() {
        if (!this.currentProject) return;

        const title = prompt('Enter snippet title:');
        if (!title) return;

        const code = prompt('Enter code:');
        if (!code) return;

        const snippet = {
            id: Date.now().toString(),
            title,
            code,
            language: 'javascript'
        };

        this.currentProject.codeSnippets.push(snippet);
        this.renderCodeSnippets();
        this.showNotification('Code snippet added!');
    }

    addResource() {
        if (!this.currentProject) return;

        const title = prompt('Enter resource title:');
        if (!title) return;

        const url = prompt('Enter URL:');
        if (!url) return;

        const description = prompt('Enter description (optional):');

        const resource = {
            id: Date.now().toString(),
            title,
            url,
            description
        };

        this.currentProject.resources.push(resource);
        this.renderResources();
        this.showNotification('Resource added!');
    }

    addTodo() {
        if (!this.currentProject) return;

        const text = prompt('Enter todo item:');
        if (!text) return;

        const todo = {
            id: Date.now().toString(),
            text,
            completed: false
        };

        this.currentProject.todos.push(todo);
        this.renderTodos();
        this.showNotification('Todo added!');
    }

    deleteCodeSnippet(snippetId) {
        if (!this.currentProject) return;
        this.currentProject.codeSnippets = this.currentProject.codeSnippets.filter(s => s.id !== snippetId);
        this.renderCodeSnippets();
        this.showNotification('Code snippet deleted!');
    }

    deleteResource(resourceId) {
        if (!this.currentProject) return;
        this.currentProject.resources = this.currentProject.resources.filter(r => r.id !== resourceId);
        this.renderResources();
        this.showNotification('Resource deleted!');
    }

    deleteTodo(todoId) {
        if (!this.currentProject) return;
        this.currentProject.todos = this.currentProject.todos.filter(t => t.id !== todoId);
        this.renderTodos();
        this.showNotification('Todo deleted!');
    }

    toggleTodo(todoId) {
        if (!this.currentProject) return;
        const todo = this.currentProject.todos.find(t => t.id === todoId);
        if (todo) {
            todo.completed = !todo.completed;
            this.renderTodos();
        }
    }

    // Search and Filter
    filterProjects(searchTerm) {
        const cards = document.querySelectorAll('.project-card');
        const term = searchTerm.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase());

            const matches = title.includes(term) || 
                           description.includes(term) || 
                           tags.some(tag => tag.includes(term));

            card.style.display = matches ? 'block' : 'none';
        });
    }

    // Rich Editor Setup
    setupRichEditor() {
        const editor = document.getElementById('notesEditor');
        if (!editor) return;

        // Toolbar functionality
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                document.execCommand(command, false, null);
                btn.classList.toggle('active');
            });
        });

        // Auto-save notes
        let saveTimeout;
        editor.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                if (this.currentProject) {
                    this.currentProject.notes = editor.innerHTML;
                    this.currentProject.modified = new Date().toISOString();
                }
            }, 1000);
        });
    }

    // Utility Functions
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application
let projectWorkspace;
document.addEventListener('DOMContentLoaded', () => {
    projectWorkspace = new ProjectWorkspace();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 