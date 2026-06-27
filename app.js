// ================= MATAF-STYLE INTERACTIVE VOLATILITY LIST LINK ENGINE =================
function initializeVolatilityControls() {
    const matrixContainer = document.getElementById('matrix-interactive-list');
    if (!matrixContainer || typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined') return;

    // Categorized Structural Separation Queues
    const categories = {
        'major': '// G8 DOLLAR MAJORS',
        'euro': '// EURO CROSS RATES',
        'pound': '// POUND CROSS RATES',
        'minors': '// SECONDARY CROSS CORRIDORS'
    };

    let completeHtmlString = "";

    // Loop systematically through categories to group them cleanly
    for (const [catKey, catLabel] of Object.entries(categories)) {
        completeHtmlString += `
            <div class="bg-[#050507]/60 px-4 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest border-y border-zinc-900 shrink-0 sticky top-0 backdrop-blur-sm z-10">
                ${catLabel}
            </div>
            <div class="divide-y divide-zinc-900/30">
        `;

        for (const [key, obj] of Object.entries(KAIROS_INTERACTIVE_VOLATILITY_DB)) {
            if (obj.cat !== catKey) continue;
            
            // Reformat raw pair string into clean spacing representation (e.g. "EURUSD" -> "EUR / USD")
            const spaceFormattedPair = key.substring(0, 3) + " / " + key.substring(3);

            completeHtmlString += `
                <div id="row-asset-${key}" onclick="handleAssetChange('${key}')" class="px-4 py-3 flex justify-between items-center hover:bg-[#040406]/50 transition-all cursor-pointer group select-none">
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight text-xs">${spaceFormattedPair}</span>
                        <span class="text-[9px] text-zinc-600 font-medium tracking-wide uppercase hidden sm:inline">${obj.label.split('(')[0]}</span>
                    </div>
                    <div class="flex items-center gap-4 font-mono tabular-nums text-right">
                        <div>
                            <span class="text-zinc-300 font-semibold text-xs">${obj.dailyPips}</span>
                            <span class="text-[9px] text-zinc-600 ml-0.5">pips</span>
                        </div>
                        <span class="text-zinc-500 font-medium text-[11px] w-12 hidden xs:inline">${obj.percentageRange}</span>
                    </div>
                </div>
            `;
        }
        completeHtmlString += `</div>`;
    }

    matrixContainer.innerHTML = completeHtmlString;
    
    // Set absolute initial default pair state on boot layout calculation
    handleAssetChange("GBPJPY");
}

function handleAssetChange(pairKey) {
    if (typeof KAIROS_INTERACTIVE_VOLATILITY_DB === 'undefined' || !KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey]) return;
    const data = KAIROS_INTERACTIVE_VOLATILITY_DB[pairKey];

    // 1. Toggle Active Visual Highlights across list rows
    for (const key of Object.keys(KAIROS_INTERACTIVE_VOLATILITY_DB)) {
        const row = document.getElementById(`row-asset-${key}`);
        if (row) {
            if (key === pairKey) {
                row.className = "px-4 py-3 flex justify-between items-center bg-cyan-950/10 border-l-2 border-cyan-500 transition-all cursor-pointer select-none";
                row.querySelector('span').className = "font-bold text-cyan-400 tracking-tight text-xs";
            } else {
                row.className = "px-4 py-3 flex justify-between items-center hover:bg-[#040406]/50 transition-all border-l-2 border-transparent cursor-pointer group select-none";
                row.querySelector('span').className = "font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight text-xs";
            }
        }
    }

    // 2. Direct Placement Text Field Substitutions
    document.getElementById('target-asset-display').textContent = data.pairDisplay;
    document.getElementById('metric-daily-pips').textContent = data.dailyPips;
    document.getElementById('metric-percentage-range').textContent = data.percentageRange;
    
    const badge = document.getElementById('metric-regime-badge');
    badge.textContent = data.regime;
    badge.className = `px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${data.badgeClass}`;

    // 3. Populate and Animate 24 Vertical Intraday Velocity Bars
    const hourChartContainer = document.getElementById('hour-chart-container');
    if (hourChartContainer) {
        const maxVal = Math.max(...data.hourly);
        hourChartContainer.innerHTML = data.hourly.map((pips, hour) => {
            const pct = Math.max(8, Math.round((pips / maxVal) * 100));
            const hourString = hour < 10 ? `0${hour}` : hour;
            const barColorClass = (hour >= 8 && hour <= 16) ? 'from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'from-cyan-600 to-cyan-400';
            return `
                <div class="flex flex-col items-center justify-end h-full w-full group relative">
                    <span class="absolute -top-6 bg-zinc-950 border border-zinc-800 text-[9px] font-mono font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none text-white z-10 tabular-nums">${pips}p</span>
                    <div class="w-full bg-zinc-950 border border-zinc-900/60 rounded-t transition-all duration-500 ease-out relative" style="height: ${pct}%;">
                        <div class="absolute inset-0 bg-gradient-to-t ${barColorClass}"></div>
                    </div>
                    <span class="font-mono text-[8px] text-zinc-600 mt-1.5">${hourString}</span>
                </div>
            `;
        }).join('');
    }

    // 4. Update Weekday Height Dimensions
    const updateDayBar = (dayId, val) => {
        const bar = document.getElementById(`bar-day-${dayId}`);
        const txt = document.getElementById(`txt-day-${dayId}`);
        if(bar && txt) { bar.style.height = `${val}%`; txt.textContent = `${val}%`; }
    };
    updateDayBar('mon', parseInt(data.days[0], 10));
    updateDayBar('tue', parseInt(data.days[1], 10));
    updateDayBar('wed', parseInt(data.days[2], 10));
    updateDayBar('thu', parseInt(data.days[3], 10));
    updateDayBar('fri', parseInt(data.days[4], 10));

    // 5. Draw Trend Vector Coordinates
    const linePath = document.getElementById('historical-line-path');
    const areaPath = document.getElementById('historical-area-path');
    if (linePath && areaPath) {
        linePath.setAttribute('d', `M ${data.historical}`);
        areaPath.setAttribute('d', `M 0,100 L ${data.historical} L 100,100 Z`);
    }
}

// Ensure execution flow connects properly at core lifecycle initialization
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('matrix-interactive-list')) {
        initializeVolatilityControls();
    }
});
