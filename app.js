// ================= RETRIEVED STATE STORAGE HOOKS =================
let activeLayout = localStorage.getItem('kairos_layout') || 'single';
let completedModules = JSON.parse(localStorage.getItem('kairos_completed_modules')) || [];

// ================= AUTOMATED FOREX MULTI-ZONE CLOCK SYSTEM =================
function updateForexClocks() {
    const now = new Date();

    // Cross-browser formatting engine using formatToParts to completely bypass iOS/Safari localization bugs
    const getZoneTimeValues = (tz) => {
        try {
            const formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: tz,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            const parts = formatter.formatToParts(now);
            const hour = parts.find(p => p.type === 'hour')?.value || "00";
            const minute = parts.find(p => p.type === 'minute')?.value || "00";
            const second = parts.find(p => p.type === 'second')?.value || "00";
            
            return {
                string: `${hour}:${minute}:${second}`,
                hourNumeric: parseInt(hour, 10)
            };
        } catch (e) {
            return { string: "00:00:00", hourNumeric: 0 };
        }
    };

    const timeUTC = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const tokyoData = getZoneTimeValues('Asia/Tokyo');
    const londonData = getZoneTimeValues('Europe/London');
    const newyorkData = getZoneTimeValues('America/New_York');

    // Map current local city times safely to DOM targets
    const nodes = {
        'live-time': timeUTC,
        'clock-tokyo': tokyoData.string,
        'clock-london': londonData.string,
        'clock-newyork': newyorkData.string
    };

    for (const [id, val] of Object.entries(nodes)) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    // Dynamic Session Status Indicator Toggles (Standard 08:00 - 17:00 Weekday Market Rules)
    const toggleStatus = (id, hour) => {
        const indicator = document.getElementById(`status-${id}`);
        if (!indicator) return;

        // Detect weekend closure globally (Saturday = 6, Sunday = 0)
        const dayUTC = now.getUTCDay();
        const isWeekend = (dayUTC === 6 || dayUTC === 0);

        if (hour >= 8 && hour < 17 && !isWeekend) {
            indicator.className = "h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]";
        } else {
            indicator.className = "h-1.5 w-1.5 rounded-full bg-zinc-800";
        }
    };

    toggleStatus('tokyo', tokyoData.hourNumeric);
    toggleStatus('london', londonData.hourNumeric);
    toggleStatus('newyork', newyorkData.hourNumeric);
}

// ================= CHART WORKSPACE CONFIGURATOR (index.html only) =================
function setLayout(layoutFormat) {
    if(!document.getElementById('workspace-single')) return;
    activeLayout = layoutFormat;
    localStorage.setItem('kairos_layout', layoutFormat);
    
    const singleView = document.getElementById('workspace-single');
    const splitView = document.getElementById('workspace-split');
    const btnSingle = document.getElementById('layout-btn-single');
    const btnSplit = document.getElementById('layout-btn-split');
    
    btnSingle.className = "px-2 py-1 text-[10px] uppercase rounded transition-all cursor-pointer font-bold text-zinc-500 hover:text-zinc-300";
    btnSplit.className = "px-2 py-1 text-[10px] uppercase rounded transition-all cursor-pointer font-bold text-zinc-500 hover:text-zinc-300";

    if(layoutFormat === 'split') {
        singleView.classList.add('hidden');
        splitView.classList.remove('hidden');
        btnSplit.className = "px-2 py-1 text-[10px] uppercase rounded transition-all cursor-pointer font-bold bg-zinc-900 text-cyan-400 border border-zinc-800";
    } else {
        singleView.classList.remove('hidden');
        splitView.classList.add('hidden');
        btnSingle.className = "px-2 py-1 text-[10px] uppercase rounded transition-all cursor-pointer font-bold bg-zinc-900 text-cyan-400 border border-zinc-800";
    }
}

// ================= DYNAMIC DOCUMENT READ GENERATOR =================
function compileAndOpenDocument(type, id) {
    if (type === 'blog' && typeof KAIROS_BLOG_DATABASE === 'undefined') return;
    if (type === 'academy' && typeof KAIROS_ACADEMY_DATABASE === 'undefined') return;

    const database = type === 'blog' ? KAIROS_BLOG_DATABASE : KAIROS_ACADEMY_DATABASE;
    const doc = database.find(item => item.id === id);
    if(!doc) return;

    document.getElementById('modal-badge').textContent = type === 'blog' ? `RESEARCH // ${doc.category}` : `ACADEMY // ${doc.moduleCode}`;
    document.getElementById('markdown-reader-target').innerHTML = marked.parse(doc.markdown);
    document.getElementById('immersive-reader').style.display = 'flex';
}

function closeReader() {
    document.getElementById('immersive-reader').style.display = 'none';
}

function toggleModuleMilestone(id, event) {
    event.stopPropagation();
    if(completedModules.includes(id)) {
        completedModules = completedModules.filter(mId => mId !== id);
    } else {
        completedModules.push(id);
    }
    localStorage.setItem('kairos_completed_modules', JSON.stringify(completedModules));
    renderAcademyDomElements();
    calculateProgressMetrics();
}

// ================= PROGRESS METRIC CALCULATION ENGINE =================
function calculateProgressMetrics() {
    const targetNode = document.getElementById('portal-progress-metric');
    if (!targetNode) return;
    if (typeof KAIROS_ACADEMY_DATABASE === 'undefined') {
        targetNode.textContent = "DATA PENDING";
        return;
    }
    const totalModules = KAIROS_ACADEMY_DATABASE.length;
    if(totalModules === 0) return;
    const ratio = Math.round((completedModules.length / totalModules) * 100);
    targetNode.textContent = `${ratio}% COMPLETE`;
}

// ================= RENDER DOM PIPELINES =================
function renderPublicationsFeed() {
    const targetNode = document.getElementById('blog-posts-grid');
    if(!targetNode) return;
    if (typeof KAIROS_BLOG_DATABASE === 'undefined') {
        targetNode.innerHTML = `<p class="text-xs font-mono text-zinc-600">// WARNING: data.js file missing in repository path.</p>`;
        return;
    }
    targetNode.innerHTML = KAIROS_BLOG_DATABASE.map(post => `
        <article onclick="compileAndOpenDocument('blog', '${post.id}')" class="bg-[#08080c] border border-zinc-900 hover:border-zinc-800 transition-all rounded-xl p-6 flex flex-col justify-between cursor-pointer group">
            <div class="space-y-3">
                <div class="flex justify-between items-center font-mono text-[10px]">
                    <span class="text-amber-500 font-bold tracking-wider">${post.category}</span>
                    <span class="text-zinc-500">${post.readTime}</span>
                </div>
                <h3 class="text-base font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight font-mono">${post.title}</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">${post.summary}</p>
            </div>
            <div class="flex items-center justify-between font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-3 mt-4">
                <span>KAIROS OBSERVER</span>
                <span>${post.date}</span>
            </div>
        </article>
    `).join('');
}

function renderAcademyDomElements() {
    const targetNode = document.getElementById('academy-modules-stack');
    if(!targetNode) return;
    if (typeof KAIROS_ACADEMY_DATABASE === 'undefined') {
        targetNode.innerHTML = `<p class="text-xs font-mono text-zinc-600">// WARNING: data.js file missing in repository path.</p>`;
        return;
    }
    targetNode.innerHTML = KAIROS_ACADEMY_DATABASE.map(mod => {
        const isFinished = completedModules.includes(mod.id);
        return `
            <div onclick="compileAndOpenDocument('academy', '${mod.id}')" class="bg-[#08080c] border border-zinc-900 hover:border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all cursor-pointer group">
                <div class="space-y-1.5">
                    <div class="flex items-center gap-3 font-mono text-[10px]">
                        <span class="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 font-bold">${mod.moduleCode}</span>
                        <span class="text-emerald-500 uppercase tracking-wider font-semibold">${mod.track}</span>
                    </div>
                    <h4 class="text-sm font-bold text-white tracking-tight font-mono group-hover:text-emerald-400 transition-colors">${mod.title}</h4>
                    <p class="text-xs text-zinc-400 max-w-3xl">${mod.description}</p>
                </div>
                <button onclick="toggleModuleMilestone('${mod.id}', event)" class="px-3 py-1.5 border font-mono text-[10px] rounded-lg transition-all cursor-pointer ${
                    isFinished 
                    ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/30 font-bold' 
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                }">
                    ${isFinished ? '✓ SECURED' : 'MARK COMPLETE'}
                </button>
            </div>
        `;
    }).join('');
}

// ================= SAFE LIFECYCLE INITIALIZATION =================
window.addEventListener('DOMContentLoaded', () => {
    // Fire clock loops immediately first to prevent script execution blockages
    updateForexClocks();
    setInterval(updateForexClocks, 1000);

    // Populate remaining interface views
    renderPublicationsFeed();
    renderAcademyDomElements();
    calculateProgressMetrics();
    if(document.getElementById('workspace-single')) setLayout(activeLayout);
});

window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeReader(); });
