// Project Workspace Application
class ProjectWorkspace {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.distillations = [];
        this.currentDistillation = null;
        this.init();
    }

    init() {
        this.loadProjects();
        this.loadDistillations();
        this.setupEventListeners();
        this.renderProjects();
        this.renderDistillations();
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

    // Distillations Data Management
    loadDistillations() {
        const saved = localStorage.getItem('distillationsWorkspace');
        this.distillations = saved ? JSON.parse(saved) : this.getDefaultDistillations();
    }

    saveDistillations() {
        localStorage.setItem('distillationsWorkspace', JSON.stringify(this.distillations));
    }

    getDefaultDistillations() {
        return [
            {
                id: '1',
                title: 'Supplement Reference Guide',
                description: 'Comprehensive guide to supplements, dosages, and benefits',
                tags: ['health', 'supplements', 'nutrition', 'reference'],
                created: new Date('2024-01-15').toISOString(),
                modified: new Date().toISOString(),
                content: `<div class="container">
        <h1>🧬 Supplement Reference Guide</h1>
        
        <div class="legend">
            <div class="legend-item">
                <div class="legend-color minerals"></div>
                <span>Minerals</span>
            </div>
            <div class="legend-item">
                <div class="legend-color vitamins"></div>
                <span>Vitamins</span>
            </div>
            <div class="legend-item">
                <div class="legend-color amino-acids"></div>
                <span>Amino Acids</span>
            </div>
            <div class="legend-item">
                <div class="legend-color herbs-adaptogens"></div>
                <span>Herbs & Adaptogens</span>
            </div>
            <div class="legend-item">
                <div class="legend-color oils-fats"></div>
                <span>Oils & Fats</span>
            </div>
            <div class="legend-item">
                <div class="legend-color probiotics"></div>
                <span>Probiotics</span>
            </div>
            <div class="legend-item">
                <div class="legend-color multi-complex"></div>
                <span>Multi-Complex</span>
            </div>
            <div class="legend-item">
                <div class="legend-color nootropics"></div>
                <span>Nootropics</span>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Supplement</th>
                        <th>Ingredient</th>
                        <th>Recommended Daily Dose</th>
                        <th>Benefits</th>
                        <th>Amount per Daily Serving</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Individual Supplements -->
                    <tr class="minerals">
                        <td class="product-name">Zinc Lozenge</td>
                        <td class="ingredient">Zinc (acetate/gluconate)</td>
                        <td class="dose">15-30 mg/day</td>
                        <td class="benefits">Immune & cold defense</td>
                        <td class="dose">15-30 mg</td>
                    </tr>
                    
                    <tr class="vitamins">
                        <td class="product-name">Vitamin D3</td>
                        <td class="ingredient">Cholecalciferol</td>
                        <td class="dose">1000-4000 IU/day</td>
                        <td class="benefits">Bone, hormone & immune support</td>
                        <td class="dose">1000-4000 IU/day</td>
                    </tr>
                    
                    <tr class="multi-complex">
                        <td class="product-name">B Complex</td>
                        <td class="ingredient">Active B vitamins (B1–B12)</td>
                        <td class="dose">1 dose/day</td>
                        <td class="benefits">Energy & nervous support</td>
                        <td class="dose">Typically 100-300% RDA</td>
                    </tr>
                    
                    <tr class="amino-acids">
                        <td class="product-name">N-Acetyl Cysteine</td>
                        <td class="ingredient">NAC</td>
                        <td class="dose">600-1800 mg/day</td>
                        <td class="benefits">Liver & respiratory health, glutathione precursor</td>
                        <td class="dose">600-1800 mg</td>
                    </tr>
                    
                    <tr class="amino-acids">
                        <td class="product-name">L-Citrulline</td>
                        <td class="ingredient">L-Citrulline or malate</td>
                        <td class="dose">3-6 g pre-workout</td>
                        <td class="benefits">NO-mediated blood flow & endurance</td>
                        <td class="dose">3-6 g</td>
                    </tr>
                    
                    <tr class="probiotics">
                        <td class="product-name">Prebiotic</td>
                        <td class="ingredient">Lactobacillus acidophilus probiotic</td>
                        <td class="dose">1-10 billion CFU/day</td>
                        <td class="benefits">Gut & immune health</td>
                        <td class="dose">1-10 billion CFU</td>
                    </tr>
                    
                    <tr class="amino-acids">
                        <td class="product-name">Creatine Monohydrate</td>
                        <td class="ingredient">Creatine monohydrate</td>
                        <td class="dose">3-5 g/day</td>
                        <td class="benefits">Strength, power & cognitive support</td>
                        <td class="dose">3-5 g</td>
                    </tr>
                    
                    <tr class="minerals">
                        <td class="product-name">Magnesium Glycinate</td>
                        <td class="ingredient">Magnesium glycinate</td>
                        <td class="dose">300-400 mg/day</td>
                        <td class="benefits">Muscle relaxation & sleep quality</td>
                        <td class="dose">300-400 mg</td>
                    </tr>
                    
                    <tr class="oils-fats">
                        <td class="product-name">Omega-3 Fish Oil</td>
                        <td class="ingredient">EPA + DHA</td>
                        <td class="dose">1000-2000 mg/day</td>
                        <td class="benefits">Inflammation & cardiovascular support</td>
                        <td class="dose">1000-2000 mg</td>
                    </tr>
                    
                    <tr class="herbs-adaptogens">
                        <td class="product-name">Turmeric</td>
                        <td class="ingredient">Curcumin + piperine (Bioperine)</td>
                        <td class="dose">500-1000 mg/day</td>
                        <td class="benefits">Joint anti-inflammatory & recovery</td>
                        <td class="dose">500-1000 mg</td>
                    </tr>
                    
                    <tr class="herbs-adaptogens">
                        <td class="product-name">Ashwagandha Extract</td>
                        <td class="ingredient">Withania somnifera extract (standardized KSM-66)</td>
                        <td class="dose">300-600 mg/day</td>
                        <td class="benefits">Stress resilience & recovery</td>
                        <td class="dose">300-600 mg</td>
                    </tr>
                    
                    <!-- Pure Encapsulations Men's Pure Pack -->
                    <tr class="section-header">
                        <td colspan="5">PURE ENCAPSULATIONS MEN'S PURE PACK - 1 PACKET</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin A</td>
                        <td class="ingredient">Beta-carotene</td>
                        <td class="dose">—</td>
                        <td class="benefits">Vision & immune support</td>
                        <td class="dose">1125 μg RAE</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin C</td>
                        <td class="ingredient">Ascorbic acid</td>
                        <td class="dose">—</td>
                        <td class="benefits">Antioxidant & immune health</td>
                        <td class="dose">125 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin D3</td>
                        <td class="ingredient">Cholecalciferol</td>
                        <td class="dose">—</td>
                        <td class="benefits">Bone & hormone health</td>
                        <td class="dose">1500 IU</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin E</td>
                        <td class="ingredient">d-alpha tocopherol</td>
                        <td class="dose">—</td>
                        <td class="benefits">Antioxidant & cardiovascular support</td>
                        <td class="dose">40 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin K</td>
                        <td class="ingredient">Phylloquinone</td>
                        <td class="dose">—</td>
                        <td class="benefits">Bone & blood clotting</td>
                        <td class="dose">50 μg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Thiamin (B1)</td>
                        <td class="ingredient">Thiamine</td>
                        <td class="dose">—</td>
                        <td class="benefits">Energy metabolism</td>
                        <td class="dose">12.5 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Magnesium</td>
                        <td class="ingredient">Magnesium citrate</td>
                        <td class="dose">—</td>
                        <td class="benefits">Muscle & nerve function</td>
                        <td class="dose">150 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">CoQ10</td>
                        <td class="ingredient">Coenzyme Q10</td>
                        <td class="dose">—</td>
                        <td class="benefits">Cellular energy & heart health</td>
                        <td class="dose">60 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">EPA</td>
                        <td class="ingredient">Fish oil</td>
                        <td class="dose">—</td>
                        <td class="benefits">Anti-inflammatory & heart health</td>
                        <td class="dose">300 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">DHA</td>
                        <td class="ingredient">Fish oil</td>
                        <td class="dose">—</td>
                        <td class="benefits">Brain & cardiovascular support</td>
                        <td class="dose">200 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Saw Palmetto</td>
                        <td class="ingredient">Saw palmetto extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Prostate health</td>
                        <td class="dose">160 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Pumpkin Seed Oil</td>
                        <td class="ingredient">Pumpkin seed oil</td>
                        <td class="dose">—</td>
                        <td class="benefits">Prostate & urinary function</td>
                        <td class="dose">320 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Pygeum Extract</td>
                        <td class="ingredient">Pygeum extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Prostate support</td>
                        <td class="dose">20 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Nettle Root</td>
                        <td class="ingredient">Nettle root extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Prostate & urinary health</td>
                        <td class="dose">200 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Astragalus</td>
                        <td class="ingredient">Astragalus extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Immune & stamina</td>
                        <td class="dose">50 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Maca Extract</td>
                        <td class="ingredient">Maca extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Energy & endurance</td>
                        <td class="dose">100 mg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Lycopene</td>
                        <td class="ingredient">Lycopene</td>
                        <td class="dose">—</td>
                        <td class="benefits">Prostate antioxidant support</td>
                        <td class="dose">Unknown μg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Green Tea Extract</td>
                        <td class="ingredient">Green tea extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Antioxidant & prostate health</td>
                        <td class="dose">Unknown</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Red Wine Concentrate</td>
                        <td class="ingredient">Red wine concentrate/grape seed</td>
                        <td class="dose">—</td>
                        <td class="benefits">Cardiovascular antioxidant support</td>
                        <td class="dose">Unknown</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Vitamin B12</td>
                        <td class="ingredient">Methylcobalamin</td>
                        <td class="dose">—</td>
                        <td class="benefits">Energy metabolism & red blood cells</td>
                        <td class="dose">750 μg</td>
                    </tr>
                    
                    <tr class="brand-pure">
                        <td class="product-name">Chromium</td>
                        <td class="ingredient">Chromium picolinate</td>
                        <td class="dose">—</td>
                        <td class="benefits">Blood sugar regulation</td>
                        <td class="dose">200 μg</td>
                    </tr>
                    
                    <!-- Onnit Products -->
                    <tr class="section-header">
                        <td colspan="5">ONNIT SHROOM TECH - 4 CAPS PRE-WORKOUT</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Cordyceps Sinensis</td>
                        <td class="ingredient">Cordyceps sinensis (O₂ Blend)</td>
                        <td class="dose">—</td>
                        <td class="benefits">Endurance & oxygen utilization</td>
                        <td class="dose">1200 mg</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Ashwagandha</td>
                        <td class="ingredient">Ashwagandha extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Stress resilience & endurance</td>
                        <td class="dose">Part of 930 mg blend</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Green Tea</td>
                        <td class="ingredient">Green tea extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Antioxidant & metabolism</td>
                        <td class="dose">Part of blend</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Rhodiola</td>
                        <td class="ingredient">Rhodiola extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Adaptogen & fatigue resistance</td>
                        <td class="dose">Part of blend</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Astragalus</td>
                        <td class="ingredient">Astragalus extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Immune & energy</td>
                        <td class="dose">Part of blend</td>
                    </tr>
                    
                    <!-- Onnit Alpha Brain -->
                    <tr class="section-header">
                        <td colspan="5">ONNIT ALPHA BRAIN - 2 CAPS/DAY</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Flow Blend</td>
                        <td class="ingredient">L-Tyrosine, L-Theanine, Oat straw extract, Phosphatidylserine</td>
                        <td class="dose">—</td>
                        <td class="benefits">Focus & neurotransmitter support, calm focus, brain blood flow & cognition, memory & stress support</td>
                        <td class="dose">Amount undisclosed</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Focus Blend</td>
                        <td class="ingredient">Alpha-GPC, Bacopa monnieri, Toothed clubmoss extract</td>
                        <td class="dose">—</td>
                        <td class="benefits">Acetylcholine precursor, memory & learning support, acetylcholinesterase inhibitor</td>
                        <td class="dose">100 mg Bacopa, 400 μg Huperzine A</td>
                    </tr>
                    
                    <tr class="brand-onnit">
                        <td class="product-name">Fuel Blend</td>
                        <td class="ingredient">L-Leucine, Pterostilbene, Vitamin B6</td>
                        <td class="dose">—</td>
                        <td class="benefits">Neuro-regeneration, antioxidant, neurotransmitter synthesis</td>
                        <td class="dose">10 mg B6, others undisclosed</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center; font-size: 12px; color: #666;">
            <p><strong>Note:</strong> This reference guide is for informational purposes only. Consult with a healthcare professional before starting any supplement regimen.</p>
            <p>Last updated: July 2025</p>
        </div>
    </div>`
            },
            {
                id: '2',
                title: 'JavaScript Best Practices',
                description: 'Essential patterns and practices for modern JavaScript development',
                tags: ['javascript', 'programming', 'best-practices', 'development'],
                created: new Date('2024-02-01').toISOString(),
                modified: new Date().toISOString(),
                content: `<h2>JavaScript Best Practices</h2>
<h3>Code Organization</h3>
<ul>
<li>Use meaningful variable and function names</li>
<li>Keep functions small and focused</li>
<li>Use ES6+ features (const, let, arrow functions)</li>
<li>Implement proper error handling</li>
</ul>

<h3>Performance</h3>
<ul>
<li>Avoid DOM queries in loops</li>
<li>Use event delegation for dynamic content</li>
<li>Minimize reflows and repaints</li>
<li>Implement proper memory management</li>
</ul>

<h3>Security</h3>
<ul>
<li>Validate all user inputs</li>
<li>Use HTTPS for data transmission</li>
<li>Implement proper authentication</li>
<li>Sanitize data before rendering</li>
</ul>`
            }
        ];
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

        // Distillations events
        this.setupDistillationEvents();
    }

    setupDistillationEvents() {
        // Add distillation button
        document.getElementById('addDistillationBtn')?.addEventListener('click', () => {
            this.showAddDistillationModal();
        });

        // Search functionality
        document.getElementById('distillationSearch')?.addEventListener('input', (e) => {
            this.filterDistillations(e.target.value);
        });

        // Distillation modal events
        document.getElementById('closeDistillationModalBtn')?.addEventListener('click', () => {
            this.closeDistillationModal();
        });

        document.getElementById('editDistillationBtn')?.addEventListener('click', () => {
            this.toggleDistillationEditMode();
        });

        document.getElementById('saveDistillationBtn')?.addEventListener('click', () => {
            this.saveCurrentDistillation();
        });

        // Add distillation modal events
        document.getElementById('createDistillationBtn')?.addEventListener('click', () => {
            this.createNewDistillation();
        });

        document.getElementById('closeAddDistillationModalBtn')?.addEventListener('click', () => {
            this.closeAddDistillationModal();
        });

        document.getElementById('cancelCreateDistillationBtn')?.addEventListener('click', () => {
            this.closeAddDistillationModal();
        });
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

    // Distillations Rendering
    renderDistillations() {
        const grid = document.getElementById('distillationsGrid');
        if (!grid) return;

        grid.innerHTML = this.distillations.map(distillation => this.createDistillationCard(distillation)).join('');
        
        // Add click listeners to distillation cards
        document.querySelectorAll('.distillation-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const distillationId = card.dataset.distillationId;
                this.openDistillation(distillationId);
            });
        });
    }

    createDistillationCard(distillation) {
        const tags = distillation.tags.map(tag => `<span class="distillation-tag">${tag}</span>`).join('');
        const modifiedDate = new Date(distillation.modified).toLocaleDateString();
        
        // Create a preview of the content (strip HTML tags)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = distillation.content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const preview = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
        
        return `
            <div class="distillation-card" data-distillation-id="${distillation.id}">
                <div class="distillation-header">
                    <div class="distillation-title">${distillation.title}</div>
                    <div class="distillation-description">${distillation.description}</div>
                </div>
                <div class="distillation-body">
                    <div class="distillation-preview">${preview}</div>
                    <div class="distillation-tags">${tags}</div>
                    <div class="distillation-meta">
                        <span>Modified: ${modifiedDate}</span>
                        <span>${distillation.tags.length} tags</span>
                    </div>
                </div>
            </div>
        `;
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

    // Distillation Management
    openDistillation(distillationId) {
        this.currentDistillation = this.distillations.find(d => d.id === distillationId);
        if (!this.currentDistillation) return;

        this.populateDistillationModal();
        this.showDistillationModal();
    }

    populateDistillationModal() {
        if (!this.currentDistillation) return;

        // Update modal header
        document.getElementById('modalDistillationTitle').textContent = this.currentDistillation.title;
        document.getElementById('modalDistillationDate').textContent = `Created: ${new Date(this.currentDistillation.created).toLocaleDateString()}`;

        // Update content display
        document.getElementById('distillationContent').innerHTML = this.currentDistillation.content;

        // Update form fields (for edit mode)
        document.getElementById('distillationTitle').value = this.currentDistillation.title;
        document.getElementById('distillationDescription').value = this.currentDistillation.description;
        document.getElementById('distillationTags').value = this.currentDistillation.tags.join(', ');
        document.getElementById('distillationHtmlEditor').innerHTML = this.currentDistillation.content;
    }

    toggleDistillationEditMode() {
        const contentDiv = document.getElementById('distillationContent');
        const editorDiv = document.getElementById('distillationEditor');
        const editBtn = document.getElementById('editDistillationBtn');
        const saveBtn = document.getElementById('saveDistillationBtn');

        if (editorDiv.style.display === 'none') {
            // Switch to edit mode
            contentDiv.style.display = 'none';
            editorDiv.style.display = 'block';
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-block';
        } else {
            // Switch to view mode
            contentDiv.style.display = 'block';
            editorDiv.style.display = 'none';
            editBtn.style.display = 'inline-block';
            saveBtn.style.display = 'none';
        }
    }

    saveCurrentDistillation() {
        if (!this.currentDistillation) return;

        // Update distillation data
        this.currentDistillation.title = document.getElementById('distillationTitle').value;
        this.currentDistillation.description = document.getElementById('distillationDescription').value;
        this.currentDistillation.tags = document.getElementById('distillationTags').value.split(',').map(t => t.trim()).filter(t => t);
        this.currentDistillation.content = document.getElementById('distillationHtmlEditor').innerHTML;
        this.currentDistillation.modified = new Date().toISOString();

        // Update in distillations array
        const index = this.distillations.findIndex(d => d.id === this.currentDistillation.id);
        if (index !== -1) {
            this.distillations[index] = this.currentDistillation;
        }

        this.saveDistillations();
        this.renderDistillations();
        
        // Update the displayed content
        document.getElementById('distillationContent').innerHTML = this.currentDistillation.content;
        
        // Switch back to view mode
        this.toggleDistillationEditMode();
        
        this.showNotification('Distillation saved successfully!');
    }

    createNewDistillation() {
        const title = document.getElementById('newDistillationTitle').value.trim();
        const description = document.getElementById('newDistillationDescription').value.trim();
        const tags = document.getElementById('newDistillationTags').value.split(',').map(t => t.trim()).filter(t => t);
        const content = document.getElementById('newDistillationContent').value.trim() || '<h2>New Distillation</h2><p>Start adding your content here...</p>';

        if (!title) {
            this.showNotification('Please enter a distillation title', 'error');
            return;
        }

        const newDistillation = {
            id: Date.now().toString(),
            title,
            description,
            tags,
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            content
        };

        this.distillations.unshift(newDistillation);
        this.saveDistillations();
        this.renderDistillations();
        this.closeAddDistillationModal();
        this.showNotification('Distillation created successfully!');
    }

    filterDistillations(searchTerm) {
        const cards = document.querySelectorAll('.distillation-card');
        const term = searchTerm.toLowerCase();

        cards.forEach(card => {
            const title = card.querySelector('.distillation-title').textContent.toLowerCase();
            const description = card.querySelector('.distillation-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.distillation-tag')).map(tag => tag.textContent.toLowerCase());

            const matches = title.includes(term) || 
                           description.includes(term) || 
                           tags.some(tag => tag.includes(term));

            card.style.display = matches ? 'block' : 'none';
        });
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

    // Distillation Modal Management
    showDistillationModal() {
        document.getElementById('distillationModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDistillationModal() {
        document.getElementById('distillationModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentDistillation = null;
        
        // Reset to view mode
        const contentDiv = document.getElementById('distillationContent');
        const editorDiv = document.getElementById('distillationEditor');
        const editBtn = document.getElementById('editDistillationBtn');
        const saveBtn = document.getElementById('saveDistillationBtn');
        
        contentDiv.style.display = 'block';
        editorDiv.style.display = 'none';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
    }

    showAddDistillationModal() {
        document.getElementById('addDistillationModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAddDistillationModal() {
        document.getElementById('addDistillationModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        // Clear form
        document.getElementById('newDistillationTitle').value = '';
        document.getElementById('newDistillationDescription').value = '';
        document.getElementById('newDistillationTags').value = '';
        document.getElementById('newDistillationContent').value = '';
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
        const distillationEditor = document.getElementById('distillationHtmlEditor');
        
        // Setup project notes editor
        if (editor) {
            this.setupEditorToolbar(editor);
        }
        
        // Setup distillation HTML editor
        if (distillationEditor) {
            this.setupEditorToolbar(distillationEditor);
        }
    }

    setupEditorToolbar(editor) {
        // Find the toolbar for this editor
        const toolbar = editor.closest('.rich-editor, .html-editor-container')?.querySelector('.editor-toolbar');
        if (!toolbar) return;

        // Toolbar functionality
        toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                
                if (command === 'createLink') {
                    const url = prompt('Enter URL:');
                    if (url) {
                        document.execCommand('createLink', false, url);
                    }
                } else if (command === 'insertTable') {
                    const rows = prompt('Number of rows:', '3');
                    const cols = prompt('Number of columns:', '3');
                    if (rows && cols) {
                        this.insertTable(editor, parseInt(rows), parseInt(cols));
                    }
                } else {
                    document.execCommand(command, false, null);
                }
                btn.classList.toggle('active');
            });
        });

        // Auto-save for project notes
        if (editor.id === 'notesEditor') {
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
    }

    insertTable(editor, rows, cols) {
        let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">';
        
        for (let i = 0; i < rows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < cols; j++) {
                if (i === 0) {
                    tableHTML += '<th style="padding: 8px; border: 1px solid #ddd;">Header</th>';
                } else {
                    tableHTML += '<td style="padding: 8px; border: 1px solid #ddd;">Cell</td>';
                }
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        
        document.execCommand('insertHTML', false, tableHTML);
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