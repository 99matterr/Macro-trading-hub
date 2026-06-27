// ================= RETRIEVED STATE STORAGE HOOKS =================
let activeLayout = localStorage.getItem('kairos_layout') || 'single';
let completedModules = JSON.parse(localStorage.getItem('kairos_completed_modules')) || [];

// ================= AUTOMATED FOREX MULTI-ZONE CLOCK SYSTEM =================
function updateForexClocks() {
    const now = new Date();

    const getZoneTimeValues = (tz) => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
            });
            const timeString = formatter.format(now).replace(/[^0-9:]/g, '');
            const currentHour = parseInt(timeString.split(':')[0], 10);
            return { string: timeString, hourNumeric: isNaN(currentHour) ? 0 : currentHour };
        } catch (e) {
            return { string: "00:00:00", hourNumeric: 0 };
        }
    };

    const timeUTC = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const tokyoData = getZoneTimeValues('Asia/Tokyo');
    const londonData = getZoneTimeValues('Europe/London');
    const newyorkData = getZoneTimeValues('America/New_York');

    const nodes = {
        'live-time': timeUTC, 'clock-tokyo': tokyoData.string, 'clock-london': londonData.string, 'clock-newyork': newyorkData.string
    };

    for (const [id, val] of Object.entries(nodes)) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    const toggleStatus = (id, hour) => {
        const indicator = document.getElementById(`status-${id}`);
        if (!indicator) return;
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
    
    if (!singleView || !splitView || !btnSingle || !btnSplit) return;

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

    const badge = document.getElementById('modal-badge');
    const target = document.getElementById('markdown-reader-target');
    const reader = document.getElementById('immersive-reader');

    if (badge && target && reader) {
        badge.textContent = type === 'blog' ? `RESEARCH // ${doc.category}` : `ACADEMY // ${doc.moduleCode}`;
        target.innerHTML = marked.parse(doc.markdown);
        reader.style.display = 'flex';
    }
}

function closeReader() {
    const reader = document.getElementById('immersive-reader');
    if (reader) reader.style.display = 'none';
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

// ================= RENDER DOM CONTENT CHANNELS =================
function renderPublicationsFeed() {
    const targetNode = document.getElementById('blog-posts-grid');
    if(!targetNode) return;
    if (typeof KAIROS_BLOG_DATABASE === 'undefined') return;
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
    if (typeof KAIROS_ACADEMY_DATABASE === 'undefined') return;
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
                    isFinished ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/30 font-bold' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                }">
                    ${isFinished ? '✓ SECURED' : 'MARK COMPLETE'}
                </button>
            </div>
        `;
    }).join('');
}

// ================= DROPDOWN MULTI-ASSET INTERACTIVE LINKAGE ENGINE =================
function initializeVolatilityControls() {
    const selector = document.getElementById('asset-selector');
    if (!selector || typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined') return;

    const targetMajors = document.getElementById('opt-majors');
    const targetEuro = document.getElementById('opt-euro');
    const targetPound = document.getElementById('opt-pound');
    const targetMinors = document.getElementById('opt-minors');

    if (!targetMajors || !targetEuro || !targetPound || !targetMinors) return;

    targetMajors.innerHTML = ""; targetEuro.innerHTML = ""; targetPound.innerHTML = ""; targetMinors.innerHTML = "";

    for (const [key, obj] of Object.entries(KAIROS_INTERACTIVE_VOLATILITY_DB)) {
        const optionNode = `<option value="${key}">${obj.label}</option>`;
        if (obj.cat === 'major') targetMajors.innerHTML += optionNode;
        else if (obj.cat === 'euro') targetEuro.innerHTML += optionNode;
        else if (obj.cat === 'pound') targetPound.innerHTML += optionNode;
        else if (obj.cat === 'minors') targetMinors.innerHTML += optionNode;
    }
    
    selector.value = "GBPJPY";
    handleAssetChange("GBPJPY");
}

// PREMIUM IPAD TOUCH INTERACTION ROUTINES
function tapHourlyBar(hourIdx, pipValue) {
    // 1. Reset all hourly bars to secondary opacity states
    const container = document.getElementById('hour-chart-container');
    if (!container) return;
    const items = container.querySelectorAll('.hourly-bar-node');
    items.forEach(item => {
        const tip = item.querySelector('.tooltip-bubble');
        const fill = item.querySelector('.bar-fill-element');
        if (tip) tip.className = "absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all";
        if (fill) fill.classList.remove('brightness-150', 'shadow-[0_0_12px_#06b6d4]');
    });

    // 2. Explode the selected element's visibility parameters
    const targetWrapper = document.getElementById(`h-bar-wrapper-${hourIdx}`);
    if (targetWrapper) {
        const activeTip = targetWrapper.querySelector('.tooltip-bubble');
        const activeFill = targetWrapper.querySelector('.bar-fill-element');
        if (activeTip) activeTip.className = "absolute -top-7 bg-cyan-950 border border-cyan-500 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded opacity-100 pointer-events-none text-cyan-400 font-extrabold z-10 tabular-nums tooltip-bubble scale-105 shadow-md shadow-cyan-950/50";
        if (activeFill) activeFill.classList.add('brightness-150', 'shadow-[0_0_12px_#06b6d4]');
    }

    // 3. Update Title Strip Tracker Header
    const banner = document.getElementById('hourly-focus-readout');
    if (banner) {
        const pad = hourIdx < 10 ? `0${hourIdx}` : hourIdx;
        banner.textContent = `Selected: ${pad}:00 GMT Matrix // Volatility: ${pipValue} Pips`;
    }
}

function tapWeekdayBar(dayIndex, dayLabel, percentageWeight, basePipsValue) {
    // 1. Reset all weekday columns
    const container = document.getElementById('weekday-chart-container');
    if (!container) return;
    const elements = container.querySelectorAll('.weekday-bar-node');
    elements.forEach(el => {
        const tip = el.querySelector('.tooltip-bubble');
        const fill = el.querySelector('.bar-fill-element');
        if (tip) tip.className = "absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all";
        if (fill) fill.classList.remove('brightness-150', 'shadow-[0_0_12px_#10b981]');
    });

    // 2. Apply active state variables to target card
    const targetCard = document.getElementById(`w-bar-wrapper-${dayIndex}`);
    if (targetCard) {
        const activeTip = targetCard.querySelector('.tooltip-bubble');
        const activeFill = targetCard.querySelector('.bar-fill-element');
        if (activeTip) activeTip.className = "absolute -top-7 bg-emerald-950 border border-emerald-500 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded opacity-100 pointer-events-none text-emerald-400 font-extrabold z-10 tabular-nums tooltip-bubble scale-105 shadow-md";
        if (activeFill) activeFill.classList.add('brightness-150', 'shadow-[0_0_12px_#10b981]');
    }

    // 3. Calculate absolute layout weights against primary daily parameters
    const variancePips = Math.round((basePipsValue * percentageWeight) / 100);
    const banner = document.getElementById('weekday-focus-readout');
    if (banner) {
        banner.textContent = `Selected: ${dayLabel} // Realized Target: ${variancePips} Absolute Pips (${percentageWeight} Vol)`;
    }
}

function handleAssetChange(pairKey) {
    if (typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined' || !KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey]) return;
    const data = KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey];

    // Reset headers status indicators to clean prompts
    const hb = document.getElementById('hourly-focus-readout'); if (hb) hb.textContent = "TAP A COLUMN BAR";
    const wb = document.getElementById('weekday-focus-readout'); if (wb) wb.textContent = "TAP A WEEKDAY BAR";

    const displayNode = document.getElementById('target-asset-display');
    const pipsNode = document.getElementById('metric-daily-pips');
    const rangeNode = document.getElementById('metric-percentage-range');
    const badgeNode = document.getElementById('metric-regime-badge');

    if (displayNode) displayNode.textContent = data.pairDisplay;
    if (pipsNode) pipsNode.textContent = data.dailyPips;
    if (rangeNode) rangeNode.textContent = data.percentageRange;
    if (badgeNode) {
        badgeNode.textContent = data.regime;
        badgeNode.className = `px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${data.badgeClass}`;
    }

    // Build and Draw Dynamic Hourly Distribution Graph
    const hourChartContainer = document.getElementById('hour-chart-container');
    if (hourChartContainer && data.hourly) {
        const maxVal = Math.max(...data.hourly);
        hourChartContainer.innerHTML = data.hourly.map((pips, hour) => {
            const pct = Math.max(8, Math.round((pips / maxVal) * 100));
            const hourString = hour < 10 ? `0${hour}` : hour;
            const barColorClass = (hour >= 8 && hour <= 16) ? 'from-emerald-600 to-emerald-400' : 'from-cyan-600 to-cyan-400';
            return `
                <div id="h-bar-wrapper-${hour}" onclick="tapHourlyBar(${hour}, '${pips}')" class="flex flex-col items-center justify-end h-full w-full cursor-pointer relative hourly-bar-node group">
                    <span class="absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all">${pips}p</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900/60 rounded-t transition-all duration-300 ease-out relative" style="height: ${pct}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColorClass} bar-fill-element group-hover:brightness-125"></div>
                    </div>
                    <span class="font-mono text-[8px] text-zinc-600 mt-1.5 select-none font-medium group-hover:text-cyan-400">${hourString}</span>
                </div>
            `;
        }).join('');
    }

    // Build and Draw Dynamic Weekday Distribution Graph
    const weekdayContainer = document.getElementById('weekday-chart-container');
    if (weekdayContainer && data.days) {
        const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        weekdayContainer.innerHTML = data.days.map((val, idx) => {
            const pctWeight = parseInt(val, 10);
            const calculatedPips = Math.round((data.dailyPips * pctWeight) / 100);
            const barColor = idx === 3 ? 'from-emerald-600 to-emerald-400' : 'from-cyan-600 to-cyan-400';
            return `
                <div id="w-bar-wrapper-${idx}" onclick="tapWeekdayBar(${idx}, '${dayLabels[idx]}', ${pctWeight}, ${data.dailyPips})" class="flex flex-col items-center justify-end h-full space-y-2 cursor-pointer relative weekday-bar-node group">
                    <span id="txt-day-node-${idx}" class="font-mono text-[10px] text-zinc-400 font-semibold tabular-nums select-none group-hover:text-cyan-400">${val}</span>
                    <span class="absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all">${calculatedPips} pips</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900 rounded-t-md overflow-hidden relative h-full transition-all duration-300" style="height: ${pctWeight}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColor} bar-fill-element group-hover:brightness-125"></div>
                    </div>
                    <span class="font-mono text-[9px] text-zinc-500 font-bold tracking-wider pt-1 select-none uppercase group-hover:text-cyan-400">${dayLabels[idx].substring(0,3)}</span>
                </div>
            `;
        }).join('');
    }
}

// ================= LIFE CYCLE INITIALIZATION =================
window.addEventListener('DOMContentLoaded', () => {
    updateForexClocks();
    setInterval(updateForexClocks, 1000);

    renderPublicationsFeed();
    renderAcademyDomElements();
    calculateProgressMetrics();
    if (document.getElementById('asset-selector')) initializeVolatilityControls();
    if (document.getElementById('workspace-single')) setLayout(activeLayout);
});

window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeReader(); });
