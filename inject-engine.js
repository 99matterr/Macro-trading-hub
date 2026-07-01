/**
 * Kairos Global Layout Ingestion Core Engine
 * Processes isolated header/footer markup and syncs active navigational classes.
 */
async function loadLayoutComponents() {
    try {
        // 1. Fetch and inject global header component layout mapping parameters
        const headerResponse = await fetch('/header.html');
        document.getElementById('global-header').innerHTML = await headerResponse.text();

        // 2. Fetch and inject global footer component layout mapping parameters
        const footerResponse = await fetch('/footer.html');
        document.getElementById('global-footer').innerHTML = await footerResponse.text();

        // 3. Extract the terminal namespace of the current location pointer
        const currentFileName = window.location.pathname.split("/").pop() || "index.html";
        
        // 4. Trace across active navigation attributes and highlight matched pages
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === currentFileName) {
                link.classList.add('active-tab');
                link.classList.remove('text-zinc-400');
            }
        });

        // 5. Initialize the high-performance 4-clock engine sequence loop
        initClockEngine();

    } catch (error) {
        console.error("Layout engine allocation synchronization execution error:", error);
    }
}

function initClockEngine() {
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    setInterval(() => {
        try {
            const nyTime = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'America/New_York' }).format(new Date());
            const lonTime = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Europe/London' }).format(new Date());
            const tyoTime = new Intl.DateTimeFormat('ja-JP', { ...timeOptions, timeZone: 'Asia/Tokyo' }).format(new Date());
            const utcTime = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'UTC' }).format(new Date());

            if(document.getElementById('clock-ny')) document.getElementById('clock-ny').textContent = nyTime;
            if(document.getElementById('clock-lon')) document.getElementById('clock-lon').textContent = lonTime;
            if(document.getElementById('clock-tyo')) document.getElementById('clock-tyo').textContent = tyoTime;
            if(document.getElementById('clock-utc')) document.getElementById('clock-utc').textContent = utcTime;
            if(document.getElementById('live-time-mobile')) document.getElementById('live-time-mobile').textContent = utcTime + ' UTC';
        } catch (e) {
            // Suppress clock rendering anomalies if specific DOM fields are missing
        }
    }, 1000);
}

// Trigger initial composition loops on page loading complete
window.addEventListener('DOMContentLoaded', loadLayoutComponents);
