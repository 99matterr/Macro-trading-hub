// ================= CONSOLIDATED CORE DATABASES =================
const KAIROS_BLOG_DATABASE = [
    {
        id: "blog-01",
        title: "G10 Swap Lines & Cross-Border Dollar Divergence",
        category: "LIQUIDITY CORRIDORS",
        readTime: "6 MIN READ",
        date: "JUN 26, 2026",
        summary: "An in-depth tracking analysis of Federal Reserve swap line balances and sovereign currency pricing anomalies.",
        markdown: `# G10 Swap Lines & Cross-Border Dollar Divergence\n\n### Structural Risk Parameters Overview\nWhen foreign institutional money managers experience severe dollar sourcing pressure, standard cross-currency basis swaps fall past historical standard deviation models.\n\n## The Core Divergence Equation\nTo identify pricing gaps across money market pipelines, we map the **Cross-Currency Basis Swap Spread** using standard structural constraints:\n\n\`\`\`text\nBasis Spread = Implied Foreign Rate - Actual Foreign Rate\n\`\`\`\n\n* When this spread dips deeply negative, it reveals high dollar demand inside overseas wholesale banking hubs.\n* Central bank swap interventions act as structural safety valves, capping potential volatility spikes before they bleed into spot asset exchange mechanisms.\n\n### Tactical Trading Takeaway\nTrack negative basin movements across major currency pairs. Sudden spikes signals near-term upside exhaustion loops for higher-yielding cross-assets.`
    },
    {
        id: "blog-02",
        title: "Asymmetric Volatility Modeling Across Central Bank Pivots",
        category: "CENTRAL BANKS",
        readTime: "9 MIN READ",
        date: "JUN 22, 2026",
        summary: "Isolating asymmetric trading bands ahead of macroeconomic policy shifts using option volatility metrics.",
        markdown: `# Asymmetric Volatility Modeling Across Central Bank Pivots\n\n## Regime Parameterization\nOptions matrices pricing distributions often show heavy skew variations prior to high-impact economic prints or policy updates.\n\n### Volatility Smile Dynamics\nBy extracting data across multi-strike setups, we can accurately track directional biases inside the institutional workspace:\n\n1.  **Call Skew Superiority:** Signals speculative spot accumulation plays across primary dealers.\n2.  **Put Implied Dominance:** Indicates massive macro delta hedging configurations are locking in asset baselines.\n\nUse this information alongside macroeconomic data lines to position risk ahead of major market moves.`
    },
    {
        id: "blog-03",
        title: "The Q3 Global Liquidity Crux: Re-anchoring G10 Expectations",
        category: "LIQUIDITY RECON",
        readTime: "4 MIN READ",
        date: "JUN 20, 2026",
        summary: "Systemic tightening pressures easing across major cross-border corridors. Exploring reverse-repo adjustments and yield curves.",
        markdown: `# The Q3 Global Liquidity Crux: Re-anchoring G10 Expectations\n\nCentral bank metrics indicate systemic tightening pressures easing across major cross-border corridors. As global yield shifts align, trade structures must recalculate the true risk premium across FX safe-havens.`
    },
    {
        id: "blog-04",
        title: "Asymmetric Setups in G3 Yield Divergence Models",
        category: "CENTRAL BANKS",
        readTime: "7 MIN READ",
        date: "JUN 18, 2026",
        summary: "A structural breakdown mapping policy trajectories across European and Federal Reserve financial models.",
        markdown: `# Asymmetric Setups in G3 Yield Divergence Models\n\nA structural breakdown mapping the policy trajectories between the Federal Reserve and European institutions. We isolate specific technical execution bands where volatility curves present help with heavy pricing asymmetries.`
    }
];

const KAIROS_ACADEMY_DATABASE = [
    {
        id: "acad-01",
        moduleCode: "VOL_01",
        track: "FOUNDATIONS",
        title: "Systematic Capital Allocation & Variance Positioning Models",
        description: "A complete framework for managing risk parameters, size controls, and portfolio variance parameters.",
        markdown: `# Systematic Capital Allocation Models\n\n## Core Position Sizing Methodology\nTo preserve risk allocation parameters under heavy tail-risk conditions, we use fixed variance controls across our positions.\n\n### The Position Dimension Formulation\nPosition sizes are mathematically determined by scaling target portfolio risk allocations against asset historical rolling variance:\n\n\`\`\`text\nPosition Size = (Target Portfolio Risk Coefficient) / (Asset Historical Rolling Variance)\n\`\`\`\n\n* This approach automatically scales back exposure sizes when market conditions turn highly volatile.\n* It preserves performance metrics and prevents catastrophic losses during unexpected regime shifts.\n\n### Milestone Checklist\n* Identify rolling 22-day historical standard deviation levels.\n* Set absolute portfolio failure thresholds at 1.5% max capital impact.\n* Execute structural position adjustments across changing volatility environments.`
    },
    {
        id: "acad-02",
        moduleCode: "VOL_02",
        track: "ADVANCED STRATEGY",
        title: "Cross-Market Yield Correlations & Interest Rate Pipeline Mapping",
        description: "Master tracking methods for analyzing inter-market bond spread frameworks to anticipate major equity index movements.",
        markdown: `# Interest Rate Pipeline Mapping\n\n## Inter-Market Treasury Spread Analysis\nSovereign bond yield differentials serve as a primary macro driver for cross-border capital reallocation patterns.\n\n### Yield Curves as Forward Indicators\nWhen short-term bond yields exceed long-term payouts, the resulting inversion signals cooling macro conditions. Track these adjustments closely to help structure risk management plans ahead of structural market realignments.`
    }
];

// ================= COMPREHENSIVE G8 INTERACTIVE VOLATILITY DATABASE MACHINE (28 PAIRS) =================
const KAIROS_INTERACTIVE_VOLATILITY_DB = {
    "EURUSD": { pairDisplay: "EUR/USD CORE METRICS", dailyPips: "78", percentageRange: "0.71%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "major", label: "EUR / USD (Euro / US Dollar)", hourly: [12,10,9,8,11,15,35,68,74,70,62,58,84,92,88,72,54,42,30,24,20,18,15,13], days: [72,95,100,105,78], historical: "0,85 15,80 30,72 45,78 60,65 75,58 90,68 100,72" },
    "GBPUSD": { pairDisplay: "GBP/USD CORE METRICS", dailyPips: "96", percentageRange: "0.79%", regime: "ELEVATED", badgeClass: "text-amber-500 bg-amber-950/20 border-amber-900/40", cat: "major", label: "GBP / USD (British Pound / US Dollar)", hourly: [15,12,11,10,14,22,42,82,90,88,78,74,102,114,108,90,68,52,38,30,25,22,18,16], days: [70,100,102,110,80], historical: "0,75 15,70 30,85 45,90 60,78 75,72 90,84 100,90" },
    "USDJPY": { pairDisplay: "USD/JPY CORE METRICS", dailyPips: "112", percentageRange: "0.84%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "major", label: "USD / JPY (US Dollar / Japanese Yen)", hourly: [45,55,62,58,48,42,38,52,58,54,48,46,88,98,92,82,64,48,35,32,38,42,48,46], days: [76,96,102,112,78], historical: "0,60 15,68 30,75 45,82 60,95 75,88 90,102 100,108" },
    "USDCAD": { pairDisplay: "USD/CAD CORE METRICS", dailyPips: "74", percentageRange: "0.58%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "major", label: "USD / Canadian Dollar", hourly: [12,10,9,8,10,14,28,54,58,52,46,44,72,82,78,66,48,34,24,20,16,14,13,12], days: [62,90,98,104,82], historical: "0,90 15,84 30,78 45,72 60,64 75,58 90,62 100,70" },
    "USDCHF": { pairDisplay: "USD/CHF CORE METRICS", dailyPips: "62", percentageRange: "0.64%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "major", label: "USD / Swiss Franc", hourly: [8,7,6,5,7,10,25,52,56,50,44,40,68,74,70,58,42,28,18,15,12,11,9,8], days: [65,92,96,100,72], historical: "0,80 15,75 30,68 45,62 60,55 75,52 90,58 100,59" },
    "AUDUSD": { pairDisplay: "AUD/USD CORE METRICS", dailyPips: "70", percentageRange: "0.86%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "major", label: "AUD / US Dollar", hourly: [52,58,64,60,50,38,28,34,42,40,36,34,62,70,66,58,44,32,24,22,28,34,42,46], days: [74,98,100,106,80], historical: "0,70 15,74 30,82 45,78 60,68 75,62 90,66 100,68" },
    "NZDUSD": { pairDisplay: "NZD/USD CORE METRICS", dailyPips: "66", percentageRange: "0.89%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "major", label: "NZD / US Dollar", hourly: [58,62,68,54,44,32,24,28,36,34,32,30,56,64,60,52,38,28,20,18,24,32,44,50], days: [75,96,102,108,82], historical: "0,72 15,70 30,78 45,74 60,62 75,59 90,63 100,64" },
    
    "EURGBP": { pairDisplay: "EUR/GBP CORE METRICS", dailyPips: "46", percentageRange: "0.44%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "euro", label: "EUR / GBP (Euro / British Pound)", hourly: [6,5,4,4,5,8,22,44,48,42,36,34,46,52,48,40,32,24,16,12,10,8,7,6], days: [68,92,96,102,76], historical: "0,55 15,58 30,62 45,50 60,46 75,42 90,44 100,45" },
    "EURJPY": { pairDisplay: "EUR/JPY CORE METRICS", dailyPips: "106", percentageRange: "0.76%", regime: "ELEVATED", badgeClass: "text-amber-500 bg-amber-950/20 border-amber-900/40", cat: "euro", label: "EUR / JPY (Euro / Japanese Yen)", hourly: [35,42,48,44,36,32,38,58,64,60,54,52,82,92,86,76,58,44,32,28,30,34,38,36], days: [72,96,104,112,80], historical: "0,62 15,66 30,74 45,80 60,88 75,84 90,98 100,104" },
    "EURAUD": { pairDisplay: "EUR/AUD CORE METRICS", dailyPips: "98", percentageRange: "0.73%", regime: "ELEVATED", badgeClass: "text-amber-500 bg-amber-950/20 border-amber-900/40", cat: "euro", label: "EUR / AUD (Euro / Australian Dollar)", hourly: [42,46,52,48,40,32,28,52,60,56,50,48,74,84,80,70,54,40,28,24,28,34,38,40], days: [75,98,102,110,82], historical: "0,85 15,80 30,88 45,82 60,76 75,70 90,88 100,94" },
    "EURCAD": { pairDisplay: "EUR/CAD CORE METRICS", dailyPips: "84", percentageRange: "0.66%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "euro", label: "EUR / CAD (Euro / Canadian Dollar)", hourly: [12,10,9,8,10,14,28,54,58,52,46,44,72,82,78,66,48,34,24,20,16,14,13,12], days: [70,94,100,106,80], historical: "0,80 15,76 30,72 45,68 60,64 75,60 90,74 100,82" },
    "EURCHF": { pairDisplay: "EUR/CHF CORE METRICS", dailyPips: "54", percentageRange: "0.59%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "euro", label: "EUR / CHF (Euro / Swiss Franc)", hourly: [7,6,5,4,6,8,22,48,52,46,40,38,56,62,58,48,36,24,16,12,10,9,8,7], days: [66,94,98,102,74], historical: "0,75 15,70 30,64 45,58 60,52 75,48 90,52 100,53" },
    "EURNZD": { pairDisplay: "EURNZD CORE METRICS", dailyPips: "114", percentageRange: "0.93%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "euro", label: "EUR / NZD (Euro / New Zealand Dollar)", hourly: [48,54,60,52,42,30,24,48,56,52,48,46,84,94,88,78,56,42,26,22,28,36,44,46], days: [74,96,104,114,84], historical: "0,88 15,82 30,90 45,86 60,80 75,76 90,94 100,110" },

    "GBPJPY": { pairDisplay: "GBP/JPY CORE METRICS", dailyPips: "146", percentageRange: "1.12%", regime: "VOLATILE", badgeClass: "text-red-400 bg-red-950/20 border-red-900/50", cat: "pound", label: "GBP / JPY (British Pound / Japanese Yen)", hourly: [42,52,58,54,44,38,42,78,86,82,72,68,114,126,118,102,78,58,44,38,40,44,48,44], days: [65,100,105,115,80], historical: "0,55 15,62 30,70 45,84 60,112 75,98 90,132 100,142" },
    "GBPAUD": { pairDisplay: "GBPAUD CORE METRICS", dailyPips: "124", percentageRange: "0.94%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "pound", label: "GBP / AUD (British Pound / Australian Dollar)", hourly: [48,52,58,54,44,36,32,68,76,72,64,60,94,106,100,88,68,50,36,32,36,42,46,48], days: [72,98,104,112,82], historical: "0,80 15,76 30,84 45,92 60,86 75,80 90,104 100,120" },
    "GBPCAD": { pairDisplay: "GBPCAD CORE METRICS", dailyPips: "112", percentageRange: "0.81%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "pound", label: "GBP / CAD (British Pound / Canadian Dollar)", hourly: [18,14,12,11,14,18,32,74,80,74,66,62,96,108,102,88,64,46,32,28,24,22,20,18], days: [68,96,102,108,82], historical: "0,85 15,78 30,74 45,70 60,76 75,72 90,94 100,108" },
    "GBPCHF": { pairDisplay: "GBPCHF CORE METRICS", dailyPips: "82", percentageRange: "0.72%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "pound", label: "GBP / Swiss Franc", hourly: [12,10,9,8,11,15,28,62,68,60,54,50,72,82,76,64,48,34,24,20,16,14,13,12], days: [66,94,98,104,76], historical: "0,78 15,72 30,68 45,60 60,64 75,58 90,74 100,80" },
    "GBPNZD": { pairDisplay: "GBPNZD CORE METRICS", dailyPips: "138", percentageRange: "1.04%", regime: "VOLATILE", badgeClass: "text-red-400 bg-red-950/20 border-red-900/50", cat: "pound", label: "GBP / NZD (British Pound / New Zealand Dollar)", hourly: [54,60,66,58,48,36,30,62,72,68,62,58,104,116,108,96,72,52,34,30,36,44,52,54], days: [72,96,105,114,84], historical: "0,82 15,78 30,86 45,94 60,88 75,84 90,118 100,134" },

    "AUDJPY": { pairDisplay: "AUD/JPY CORE METRICS", dailyPips: "104", percentageRange: "1.01%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "minors", label: "AUD / JPY (Australian Dollar / Japanese Yen)", hourly: [48,54,60,56,46,38,32,44,50,48,42,40,78,88,82,72,56,42,32,30,36,42,46,46], days: [72,98,102,112,80], historical: "0,65 15,72 30,78 45,82 60,74 75,68 90,92 100,100" },
    "AUDCAD": { pairDisplay: "AUD/CAD CORE METRICS", dailyPips: "62", percentageRange: "0.64%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "minors", label: "AUD / CAD (Australian Dollar / Canadian Dollar)", hourly: [32,36,40,38,32,24,18,24,28,26,24,22,46,54,50,44,34,24,18,16,20,24,28,30], days: [70,95,100,105,78], historical: "0,72 15,68 30,64 45,58 60,62 75,56 90,58 100,60" },
    "AUDCHF": { pairDisplay: "AUD/CHF CORE METRICS", dailyPips: "52", percentageRange: "0.68%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "minors", label: "AUD / Swiss Franc", hourly: [30,34,38,36,30,22,18,28,32,30,26,24,40,48,44,38,28,18,12,11,15,20,24,26], days: [68,94,98,102,74], historical: "0,65 15,60 30,55 45,52 60,48 75,44 90,48 100,50" },
    "AUDNZD": { pairDisplay: "AUD/NZD CORE METRICS", dailyPips: "56", percentageRange: "0.52%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "minors", label: "AUD / NZD (Australian Dollar / New Zealand Dollar)", hourly: [42,46,50,44,36,26,20,22,26,24,22,20,38,46,42,36,28,20,15,14,22,28,36,40], days: [74,96,102,106,82], historical: "0,58 15,55 30,52 45,48 60,50 75,46 90,52 100,54" },
    "CADJPY": { pairDisplay: "CAD/JPY CORE METRICS", dailyPips: "94", percentageRange: "0.78%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "minors", label: "CAD / JPY (Canadian Dollar / Japanese Yen)", hourly: [22,18,16,14,16,20,24,38,42,38,34,32,74,84,80,70,52,38,28,24,22,20,20,22], days: [74,94,100,108,82], historical: "0,60 15,64 30,70 45,76 60,72 75,66 90,84 100,90" },
    "CADCHF": { pairDisplay: "CAD/CHF CORE METRICS", dailyPips: "48", percentageRange: "0.54%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "minors", label: "CAD / Swiss Franc", hourly: [8,7,6,5,6,8,18,36,40,36,32,30,52,58,54,46,34,22,16,13,11,10,9,8], days: [64,90,96,102,78], historical: "0,68 15,62 30,58 45,54 60,50 75,46 90,47 100,48" },
    "CHFJPY": { pairDisplay: "CHF/JPY CORE METRICS", dailyPips: "116", percentageRange: "0.81%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "minors", label: "CHF / JPY (Swiss Franc / Japanese Yen)", hourly: [25,28,32,30,26,22,25,48,54,48,42,40,84,94,88,78,60,44,32,28,26,24,24,25], days: [70,95,102,110,76], historical: "0,58 15,62 30,68 45,74 60,82 75,78 90,104 100,112" },
    "NZDJPY": { pairDisplay: "NZD/JPY CORE METRICS", dailyPips: "96", percentageRange: "0.98%", regime: "HIGH", badgeClass: "text-orange-400 bg-orange-950/20 border-orange-900/40", cat: "minors", label: "NZD / JPY (New Zealand Dollar / Japanese Yen)", hourly: [52,56,62,50,40,30,24,36,44,42,38,36,72,82,76,66,48,34,24,22,28,36,44,48], days: [72,96,102,110,80], historical: "0,64 15,68 30,74 45,78 60,70 75,64 90,88 100,92" },
    "NZDCAD": { pairDisplay: "NZD/CAD CORE METRICS", dailyPips: "60", percentageRange: "0.62%", regime: "STABLE", badgeClass: "text-zinc-400 bg-zinc-900 border-zinc-800", cat: "minors", label: "NZD / CAD (New Zealand Dollar / Canadian Dollar)", hourly: [36,40,44,36,30,22,16,20,26,24,22,20,44,52,48,40,30,20,15,13,18,24,30,34], days: [70,94,100,104,80], historical: "0,70 15,66 30,62 45,56 60,58 75,54 90,57 100,58" },
    "NZDCHF": { pairDisplay: "NZD/CHF CORE METRICS", dailyPips: "50", percentageRange: "0.66%", regime: "MUTED", badgeClass: "text-zinc-500 bg-zinc-950 border-zinc-900", cat: "minors", label: "NZD / Swiss Franc", hourly: [34,38,42,34,28,20,15,24,28,26,22,20,38,46,42,36,25,16,11,10,14,18,24,28], days: [66,92,96,100,74], historical: "0,64 15,59 30,54 45,50 60,46 75,42 90,45 100,48" }
};
