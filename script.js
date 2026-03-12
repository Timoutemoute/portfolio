// --- THÈME ---
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    icon.classList.replace(isLight ? 'fa-sun' : 'fa-moon', isLight ? 'fa-moon' : 'fa-sun');
});

// --- GITHUB API ---
async function loadGitHubData() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    try {
        const response = await fetch('https://api.github.com/users/Timoutemoute/repos?sort=updated&per_page=12');
        const repos = await response.json();
        
        grid.innerHTML = repos.filter(r => !r.fork).map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 1rem 0;">${repo.description || 'Projet sans description'}</p>
                <a href="${repo.html_url}" target="_blank" style="color: var(--accent); text-decoration:none; font-weight:bold;">Voir dépôt →</a>
            </div>
        `).join('');
    } catch (e) {
        grid.innerHTML = "Erreur de chargement des projets.";
    }
}
