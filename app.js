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

// Global Touch Handlers for Tablet Displays
function tapHourlyBar(hourString, pipValue) {
    const banner = document.getElementById('hourly-focus-readout');
    if (banner) {
        banner.textContent = `Selected Focus: ${hourString}:00 GMT // Realized Mean: ${pipValue} Pips`;
        banner.classList.remove('hidden');
    }
}

function tapWeekdayBar(dayName, barId) {
    const banner = document.getElementById('weekday-focus-readout');
    const valueText = document.getElementById(`txt-${barId.replace('bar-', '')}`).textContent;
    if (banner) {
        banner.textContent = `Selected Day: ${dayName} // Volatility Profile Weight: ${valueText}`;
        banner.classList.remove('hidden');
    }
}

function handleAssetChange(pairKey) {
    if (typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined' || !KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey]) return;
    const data = KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey];

    // Hide old banner readouts on currency swap
    const hb = document.getElementById('hourly-focus-readout'); if (hb) hb.classList.add('hidden');
    const wb = document.getElementById('weekday-focus-readout'); if (wb) wb.classList.add('hidden');

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

    // Build Hourly Bars with Interactive Click/Tap Events
    const hourChartContainer = document.getElementById('hour-chart-container');
    if (hourChartContainer && data.hourly) {
        const maxVal = Math.max(...data.hourly);
        hourChartContainer.innerHTML = data.hourly.map((pips, hour) => {
            const pct = Math.max(8, Math.round((pips / maxVal) * 100));
            const hourString = hour < 10 ? `0${hour}` : hour;
            const barColorClass = (hour >= 8 && hour <= 16) ? 'from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'from-cyan-600 to-cyan-400';
            return `
                <div onclick="tapHourlyBar('${hourString}', '${pips}')" class="flex flex-col items-center justify-end h-full w-full cursor-pointer group relative">
                    <span class="absolute -top-6 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none text-white z-10 tabular-nums">${pips}p</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900/60 rounded-t transition-all duration-300 ease-out relative" style="height: ${pct}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColorClass} group-hover:brightness-125"></div>
                    </div>
                    <span class="font-mono text-[8px] text-zinc-600 mt-1.5 group-hover:text-cyan-400">${hourString}</span>
                </div>
            `;
        }).join('');
    }

    const updateDayBar = (dayId, val) => {
        const bar = document.getElementById(`bar-day-${dayId}`);
        const txt = document.getElementById(`txt-day-${dayId}`);
        if(bar && txt) { bar.style.height = `${val}%`; txt.textContent = `${val}%`; }
    };
    if (data.days) {
        updateDayBar('mon', parseInt(data.days[0], 10));
        updateDayBar('tue', parseInt(data.days[1], 10));
        updateDayBar('wed', parseInt(data.days[2], 10));
        updateDayBar('thu', parseInt(data.days[3], 10));
        updateDayBar('fri', parseInt(data.days[4], 10));
    }

    const linePath = document.getElementById('historical-line-path');
    const areaPath = document.getElementById('historical-area-path');
    if (linePath && areaPath && data.historical) {
        linePath.setAttribute('d', `M ${data.historical}`);
        areaPath.setAttribute('d', `M 0,100 L ${data.historical} L 100,100 Z`);
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
