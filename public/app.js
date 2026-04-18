// --- 1. THE MOVING BLOCKS BACKGROUND ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let blocks = [];

function initBlocks() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blocks = [];
    for(let i=0; i<35; i++) {
        blocks.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 40 + 20,
            speedX: Math.random() * 0.16 - 0.08,
            speedY: Math.random() * 0.16 - 0.08,
            rot: Math.random() * Math.PI,
            rotSpeed: Math.random() * 0.005
        });
    }
}

function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 1;
    blocks.forEach(b => {
        b.x += b.speedX; b.y += b.speedY; b.rot += b.rotSpeed;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.strokeRect(-b.size/2, -b.size/2, b.size, b.size);
        ctx.restore();
    });
    requestAnimationFrame(drawBlocks);
}
initBlocks(); drawBlocks();
window.onresize = initBlocks;

// --- 2. THE MAP ENGINE ---
const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([0.00005, 0.00005], 18);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { className: 'dark-map' }).addTo(map);

L.polygon([[0, 0], [0, 0.0001], [0.0001, 0.0001], [0.0001, 0], [0, 0]], { color: '#10b981', weight: 1, fillOpacity: 0.2 }).addTo(map);
L.polygon([[0, 0.0001], [0, 0.0002], [0.0001, 0.0002], [0.0001, 0.0001], [0, 0.0001]], { color: '#3b82f6', weight: 1, fillOpacity: 0.2 }).addTo(map);

// --- 3. VIEW SWITCHER ---
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById('view-' + viewId).classList.add('active');
    document.getElementById('nav-' + viewId).classList.add('active');
    
    if(viewId === 'map-view') {
        setTimeout(() => { map.invalidateSize(true); }, 200);
    }
}

// --- 4. TRADING LOGIC ---
const terminal = document.getElementById('terminal');
function sysLog(msg, type = 'info') {
    const div = document.createElement('div');
    const color = type === 'error' ? 'text-red-500' : type === 'success' ? 'text-emerald-400' : 'text-slate-600';
    div.innerHTML = `<span class="text-slate-800">[${new Date().toLocaleTimeString()}]</span> <span class="${color}">>> ${msg}</span>`;
    terminal.prepend(div);
}

async function tradeEnergy() {
    sysLog("INSPECTING SPATIAL PROXIMITY...");
    try {
        const res = await fetch('/api/green/trade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seller_parcel_id: "381cb099-0ba9-43ca-acda-a2e1b5828790",
                buyer_parcel_id: "9be4a7da-bad8-4f53-820e-88a35820f4a0",
                credits_to_trade: 5
            })
        });
        const data = await res.json();
        if (res.ok) sysLog("SPATIAL COMMITTED: " + data.message, 'success');
        else throw new Error(data.error);
    } catch (err) { sysLog("CONSTRAINT REJECTION: " + err.message, 'error'); }
}

async function tradeWater() {
    sysLog("REQUESTING AQUA LOCK (SERIALIZABLE)...");
    try {
        const res = await fetch('/api/water/trade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seller_parcel_id: "381cb099-0ba9-43ca-acda-a2e1b5828790",
                buyer_parcel_id: "9be4a7da-bad8-4f53-820e-88a35820f4a0",
                gallons: 100,
                season_year: 2026
            })
        });
        const data = await res.json();
        if (res.ok) sysLog("COMMIT SUCCESS: " + data.message, 'success');
        else throw new Error(data.error);
    } catch (err) { sysLog("CONCURRENCY BLOCKED: " + err.message, 'error'); }
}