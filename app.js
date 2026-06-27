// ================= SYSTEM DATA PIPELINE CONFIGURATIONS =================
// Active authentication credential bound to account matrix
const POLYGON_API_KEY = "No0EnBLyugPby70zmXCA0tpUjazFKKcg";

let activeLayout = localStorage.getItem('kairos_layout') || 'single';
let completedModules = JSON.parse(localStorage.getItem('kairos_completed_modules')) || [];
const apiCache = {}; // Prevents rate-limiting block failures on mobile browsers

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
        } catch (e) { return { string: "00:00:00", hourNumeric: 0 }; }
    };

    const timeUTC = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const liveTimeEl = document.getElementById('live-time');
    if (liveTimeEl) liveTimeEl.textContent = timeUTC;

    const tokyo = getZoneTimeValues('Asia/Tokyo');
    const london = getZoneTimeValues('Europe/London');
    const newyork = getZoneTimeValues('America/New_York');

    if(document.getElementById('clock-tokyo')) document.getElementById('clock-tokyo').textContent = tokyo.string;
    if(document.getElementById('clock-london')) document.getElementById('clock-london').textContent = london.string;
    if(document.getElementById('clock-newyork')) document.getElementById('clock-newyork').textContent = newyork.string;
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
    if (!targetNode || typeof KAIROS_ACADEMY_DATABASE === 'undefined') return;
    const totalModules = KAIROS_ACADEMY_DATABASE.length;
    const ratio = Math.round((completedModules.length / totalModules) * 100);
    targetNode.textContent = `${ratio}% COMPLETE`;
}

// ================= RENDER DOM CONTENT CHANNELS =================
function renderPublicationsFeed() {
    const targetNode = document.getElementById('blog-posts-grid');
    if(!targetNode || typeof KAIROS_BLOG_DATABASE === 'undefined') return;
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
                <span>KAIROS OBSERVER</span><span>${post.date}</span>
            </div>
        </article>
    `).join('');
}

function renderAcademyDomElements() {
    const targetNode = document.getElementById('academy-modules-stack');
    if(!targetNode || typeof KAIROS_ACADEMY_DATABASE === 'undefined') return;
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

// ================= LIVE QUANTITATIVE FINANCIAL DATA ENGINE =================
function initializeVolatilityControls() {
    const selector = document.getElementById('asset-selector');
    if (!selector || typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined') return;

    const targetMajors = document.getElementById('opt-majors');
    const targetEuro = document.getElementById('opt-euro');
    const targetPound = document.getElementById('opt-pound');
    const targetMinors = document.getElementById('opt-minors');

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

// PREMIUM TOUCH-FOCUS OVERRIDES FOR IPAD BROWSERS
function tapHourlyBar(hourIdx, pipValue) {
    const container = document.getElementById('hour-chart-container');
    if (!container) return;
    container.querySelectorAll('.hourly-bar-node').forEach(item => {
        const tip = item.querySelector('.tooltip-bubble');
        const fill = item.querySelector('.bar-fill-element');
        if (tip) tip.className = "absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all";
        if (fill) fill.className = "absolute inset-0 bg-gradient-to-t from-cyan-600 to-cyan-400 bar-fill-element";
    });

    const targetWrapper = document.getElementById(`h-bar-wrapper-${hourIdx}`);
    if (targetWrapper) {
        const activeTip = targetWrapper.querySelector('.tooltip-bubble');
        const activeFill = targetWrapper.querySelector('.bar-fill-element');
        if (activeTip) activeTip.className = "absolute -top-7 bg-cyan-950 border border-cyan-500 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded opacity-100 pointer-events-none text-cyan-400 font-extrabold z-10 tabular-nums tooltip-bubble scale-105 shadow-md";
        if (activeFill) activeFill.className = "absolute inset-0 bg-gradient-to-t from-cyan-400 to-cyan-300 shadow-[0_0_12px_#06b6d4] bar-fill-element";
    }

    const banner = document.getElementById('hourly-focus-readout');
    if (banner) banner.textContent = `${hourIdx < 10 ? '0'+hourIdx : hourIdx}:00 GMT // Volatility: ${pipValue} Pips`;
}

function tapWeekdayBar(dayIdx, dayLabel, percentage, computedPips) {
    const container = document.getElementById('weekday-chart-container');
    if (!container) return;
    container.querySelectorAll('.weekday-bar-node').forEach(el => {
        const tip = el.querySelector('.tooltip-bubble');
        const fill = el.querySelector('.bar-fill-element');
        if (tip) tip.className = "absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all";
        if (fill) fill.className = "absolute inset-0 bg-gradient-to-t from-cyan-600 to-cyan-400 bar-fill-element";
    });

    const targetCard = document.getElementById(`w-bar-wrapper-${dayIdx}`);
    if (targetCard) {
        const activeTip = targetCard.querySelector('.tooltip-bubble');
        const activeFill = targetCard.querySelector('.bar-fill-element');
        if (activeTip) activeTip.className = "absolute -top-7 bg-emerald-950 border border-emerald-500 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded opacity-100 pointer-events-none text-emerald-400 font-extrabold z-10 tabular-nums tooltip-bubble scale-105 shadow-md";
        if (activeFill) activeFill.className = "absolute inset-0 bg-gradient-to-t from-emerald-400 to-emerald-300 shadow-[0_0_12px_#10b981] bar-fill-element";
    }

    const banner = document.getElementById('weekday-focus-readout');
    if (banner) banner.textContent = `${dayLabel} // Mean: ${computedPips} Pips (${percentage}% Weight)`;
}

// ASYNC CORE MARKET ENGINE
async function handleAssetChange(pairKey) {
    if (typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined' || !KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey]) return;
    const fallbackData = KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey];

    let livePips = parseInt(fallbackData.dailyPips, 10);
    let weekdayWeights = [...fallbackData.days];

    // Live execution route utilizing newly mapped endpoints
    if (POLYGON_API_KEY) {
        try {
            if (apiCache[pairKey]) {
                livePips = apiCache[pairKey].livePips;
                weekdayWeights = apiCache[pairKey].weekdayWeights;
            } else {
                const toDate = new Date().toISOString().split('T')[0];
                const fromDate = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                const ticker = `C:${pairKey}`;
                
                // Mapped to secure parallel massive.com server pipelines
                const response = await fetch(`https://api.massive.com/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=desc&limit=30&apiKey=${POLYGON_API_KEY}`);
                const data = await response.json();

                if (data && data.results) {
                    const pipMultiplier = pairKey.includes("JPY") ? 100 : 10000;
                    let totalPipsSum = 0;
                    let dayRanges = { 1: [], 2: [], 3: [], 4: [], 5: [] };

                    data.results.forEach(candle => {
                        const range = (candle.h - candle.l) * pipMultiplier;
                        totalPipsSum += range;
                        
                        const candleDate = new Date(candle.t);
                        const dayOfWeek = candleDate.getUTCDay();
                        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                            dayRanges[dayOfWeek].push(range);
                        }
                    });

                    livePips = Math.round(totalPipsSum / data.results.length);

                    const avgDayRanges = Object.keys(dayRanges).map(d => {
                        if (dayRanges[d].length === 0) return 0;
                        return dayRanges[d].reduce((a, b) => a + b, 0) / dayRanges[d].length;
                    });
                    const sumOfAvgs = avgDayRanges.reduce((a, b) => a + b, 0);
                    weekdayWeights = avgDayRanges.map(val => sumOfAvgs > 0 ? Math.round((val / sumOfAvgs) * 100) : 20);
                    
                    apiCache[pairKey] = { livePips, weekdayWeights };
                }
            }
        } catch (error) {
            console.log("API pipeline throttle caught. Relying on baseline mapping.", error);
        }
    }

    // Print text updates directly to DOM elements
    document.getElementById('target-asset-display').textContent = pairKey.substring(0,3) + " / " + pairKey.substring(3) + " VOLATILITY PROFILE";
    document.getElementById('metric-daily-pips').textContent = livePips;
    document.getElementById('metric-percentage-range').textContent = fallbackData.percentageRange;
    
    const badge = document.getElementById('metric-regime-badge');
    if(badge) {
        badge.textContent = fallbackData.regime;
        badge.className = `px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${fallbackData.badgeClass}`;
    }

    // Dynamic Hourly Render with active Touch Hooks
    const hourChartContainer = document.getElementById('hour-chart-container');
    if (hourChartContainer && fallbackData.hourly) {
        const staticHourlyProfile = [...fallbackData.hourly];
        const staticTotalHours = staticHourlyProfile.reduce((a, b) => a + b, 0);
        
        const realHourlyPipsArray = staticHourlyProfile.map(val => {
            return Math.max(1, Math.round((val / staticTotalHours) * livePips * 24));
        });
        const maxHourlyVal = Math.max(...realHourlyPipsArray);

        hourChartContainer.innerHTML = realHourlyPipsArray.map((pips, hour) => {
            const pct = Math.max(8, Math.round((pips / maxHourlyVal) * 100));
            const hourString = hour < 10 ? `0${hour}` : hour;
            const barColorClass = (hour >= 8 && hour <= 16) ? 'from-emerald-600 to-emerald-400' : 'from-cyan-600 to-cyan-400';
            return `
                <div id="h-bar-wrapper-${hour}" onclick="tapHourlyBar(${hour}, ${pips})" class="flex flex-col items-center justify-end h-full w-full cursor-pointer relative hourly-bar-node group">
                    <span class="absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all">${pips}p</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900/60 rounded-t relative" style="height: ${pct}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColorClass} bar-fill-element group-hover:brightness-125"></div>
                    </div>
                    <span class="font-mono text-[8px] text-zinc-600 mt-1.5 select-none font-medium group-hover:text-cyan-400">${hourString}</span>
                </div>
            `;
        }).join('');
    }

    // Dynamic Weekday Render with active Touch Hooks
    const weekdayContainer = document.getElementById('weekday-chart-container');
    if (weekdayContainer) {
        const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const maxWeight = Math.max(...weekdayWeights);

        weekdayContainer.innerHTML = weekdayWeights.map((weight, idx) => {
            const calculatedPips = Math.round((livePips * weight) / 100);
            const heightPct = Math.max(12, Math.round((weight / maxWeight) * 100));
            const barColor = idx === 3 ? 'from-emerald-600 to-emerald-400' : 'from-cyan-600 to-cyan-400';
            return `
                <div id="w-bar-wrapper-${idx}" onclick="tapWeekdayBar(${idx}, '${dayLabels[idx]}', ${weight}, ${calculatedPips})" class="flex flex-col items-center justify-end h-full space-y-2 cursor-pointer relative weekday-bar-node group">
                    <span class="font-mono text-[10px] text-zinc-400 font-semibold tabular-nums select-none group-hover:text-cyan-400">${weight}%</span>
                    <span class="absolute -top-7 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 pointer-events-none text-white z-10 tabular-nums tooltip-bubble transition-all">${calculatedPips} pips</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900 rounded-t-md overflow-hidden relative" style="height: ${heightPct}%;">
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
    if (document.getElementById('portal-progress-metric')) calculateProgressMetrics();
    if (document.getElementById('asset-selector')) initializeVolatilityControls();
    if (document.getElementById('workspace-single')) setLayout(activeLayout);
});
