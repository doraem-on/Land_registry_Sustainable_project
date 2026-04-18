const terminal = document.getElementById('terminal');

function log(message, type = 'info') {
    const div = document.createElement('div');
    div.className = type === 'error' ? 'text-red-400' : 'text-emerald-400';
    div.innerHTML = `<span class="text-slate-600">[${new Date().toLocaleTimeString()}]</span> > ${message}`;
    terminal.prepend(div);
}

async function tradeEnergy() {
    log("Initiating Spatial Verification...");
    try {
        const res = await fetch('/api/green/trade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seller_parcel_id: "381cb099-0ba9-43ca-acda-a2e1b5828790",
                buyer_parcel_id: "9be4a7da-bad8-4f53-820e-88a35820f4a0",
                credits_to_trade: 50
            })
        });
        const data = await res.json();
        if (res.ok) log(data.message, 'success');
        else throw new Error(data.error);
    } catch (err) {
        log(err.message, 'error');
    }
}

async function tradeWater() {
    log("Locking Water Quota Rows (SERIALIZABLE)...");
    try {
        const res = await fetch('/api/water/trade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seller_parcel_id: "381cb099-0ba9-43ca-acda-a2e1b5828790",
                buyer_parcel_id: "9be4a7da-bad8-4f53-820e-88a35820f4a0",
                gallons: 1000,
                season_year: 2026
            })
        });
        const data = await res.json();
        if (res.ok) log(data.message, 'success');
        else throw new Error(data.error);
    } catch (err) {
        log(err.message, 'error');
    }
}