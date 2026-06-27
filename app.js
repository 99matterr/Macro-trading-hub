// ================= INTERACTIVE VOLATILITY ENGINE GRAPH MATRIX GENERATOR =================
function initializeVolatilityControls() {
    const selector = document.getElementById('asset-selector');
    if (!selector || typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined') return;

    // Direct Target Placement Nodes
    const targetMajors = document.getElementById('opt-majors');
    const targetEuro = document.getElementById('opt-euro');
    const targetPound = document.getElementById('opt-pound');
    const targetMinors = document.getElementById('opt-minors');

    // Reset Containers Cleanly
    targetMajors.innerHTML = ""; targetEuro.innerHTML = ""; targetPound.innerHTML = ""; targetMinors.innerHTML = "";

    // Sort and Populate All 28 Unique Pairs Into Target Slots
    for (const [key, obj] of Object.entries(KAIROS_INTERACTIVE_VOLATILITY_DB)) {
        const optionNode = `<option value="${key}">${obj.label}</option>`;
        if (obj.cat === 'major') targetMajors.innerHTML += optionNode;
        else if (obj.cat === 'euro') targetEuro.innerHTML += optionNode;
        else if (obj.cat === 'pound') targetPound.innerHTML += optionNode;
        else if (obj.cat === 'minors') targetMinors.innerHTML += optionNode;
    }
    
    // Fire Initial Default Focus State Render
    selector.value = "GBPJPY";
    handleAssetChange("GBPJPY");
}

function handleAssetChange(pairKey) {
    if (typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined' || !KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey]) return;
    
    const data = KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey];

    // 1. Swap Structural String Badges
    document.getElementById('target-asset-display').textContent = data.pairDisplay;
    document.getElementById('metric-daily-pips').textContent = data.dailyPips;
    document.getElementById('metric-percentage-range').textContent = data.percentageRange;
    
    const badge = document.getElementById('metric-regime-badge');
    badge.textContent = data.regime;
    badge.className = `px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${data.badgeClass} ml-1.5`;

    // 2. Build and Animate the 24 Hourly Session Vertical Bars
    const hourContainer = document.getElementById('hour-container');
    if (hourContainer) {
        const maxVal = Math.max(...data.hourly);
        hourContainer.parentElement.innerHTML = data.hourly.map((pips, hour) => {
            const pct = Math.max(8, Math.round((pips / maxVal) * 100)); // Keeps tiny volume visible
            const hourString = hour < 10 ? `0${hour}` : hour;
            const barColorClass = (hour >= 8 && hour <= 16) ? 'from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'from-cyan-600 to-cyan-400';
            return `
                <div class="flex flex-col items-center justify-end h-full w-full group relative">
                    <span class="absolute -top-6 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none text-white z-10 tabular-nums">${pips}p</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900/60 rounded-t transition-all duration-500 ease-out relative" style="height: ${pct}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColorClass}"></div>
                    </div>
                    <span class="font-mono text-[8px] text-zinc-600 mt-1.5 group-hover:text-cyan-400 select-none">${hourString}</span>
                </div>
            `;
        }).join('');
    }

    // 3. Render the 5 Weekday Distribution Heights
    const updateDayBar = (dayId, val) => {
        const bar = document.getElementById(`bar-day-${dayId}`);
        const txt = document.getElementById(`txt-day-${dayId}`);
        if(bar && txt) {
            bar.style.height = `${val}%`;
            txt.textContent = `${val}%`;
        }
    };
    updateDayBar('mon', parseInt(data.days[0], 10));
    updateDayBar('tue', parseInt(data.days[1], 10));
    updateDayBar('wed', parseInt(data.days[2], 10));
    updateDayBar('thu', parseInt(data.days[3], 10));
    updateDayBar('fri', parseInt(data.days[4], 10));

    // 4. Render Multi-Year Vector Trend Coordinates (Mataf Trend Polyline)
    const linePath = document.getElementById('historical-line-path');
    const areaPath = document.getElementById('historical-area-path');
    if (linePath && areaPath) {
        const coordinates = data.historical; // Example format: "0,85 15,70 30,72..."
        linePath.setAttribute('d', `M ${coordinates}`);
        areaPath.setAttribute('d', `M 0,100 L ${coordinates} L 100,100 Z`);
    }
}

// Seamlessly hook core operations into the unified DOM loader chain
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('asset-selector')) {
        initializeVolatilityControls();
    }
});
