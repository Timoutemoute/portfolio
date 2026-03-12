// --- GESTION DU THÈME ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// --- API GITHUB (Uniquement pour projets.html) ---
async function loadGitHubData() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    try {
        const response = await fetch('https://api.github.com/users/Timoutemoute/repos?sort=updated&per_page=12');
        const repos = await response.json();
        
        grid.innerHTML = repos.filter(r => !r.fork).map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p style="color: var(--text-secondary); margin: 10px 0;">${repo.description || 'Projet sans description.'}</p>
                <div style="display:flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.8rem; color: var(--accent)">${repo.language || 'Code'}</span>
                    <a href="${repo.html_url}" target="_blank" style="color: var(--text-primary)"><i class="fab fa-github"></i></a>
                </div>
            </div>
        `).join('');
    } catch (e) {
        grid.innerHTML = "<p>Erreur de chargement des dépôts.</p>";
    }
}