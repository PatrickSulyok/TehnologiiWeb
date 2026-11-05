
const API_URL = "http://universities.hipolabs.com/search?country=Romania";

const statusElement = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");

let all = [];
let filteredData = [];

function setStatus(text) {
    statusElement.textContent = text;
}

function render(data) {
    tbody.innerHTML = "";

    data.forEach(u => {
        const tr = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = u.name || "";

        const countryCell = document.createElement("td");
        countryCell.textContent = u.country || "";

        const siteCell = document.createElement("td");
        const site = u.web_pages?.[0];

        if (site) {
            const link = document.createElement("a");
            link.href = site;
            link.textContent = site;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            siteCell.appendChild(link);
        }

        tr.appendChild(nameCell);
        tr.appendChild(countryCell);
        tr.appendChild(siteCell);

        tbody.appendChild(tr);
    });
}

function applyFilter() {
    const q = qInput.value.trim().toLowerCase();

    filteredData = q
        ? all.filter(u =>
            (u.name || "").toLowerCase().includes(q)
        )
        : [...all];

    render(filteredData);
    setStatus(`Filtrate: ${filteredData.length} din ${all.length}.`);
    exportBtn.disabled = filteredData.length === 0;
}

async function loadUniversities() {
    setStatus("Se încarcă universitățile...");
    tbody.innerHTML = "";
    exportBtn.disabled = true;

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Eroare HTTP: " + res.status);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            throw new Error("Format de date invalid");
        }

        all = data;
        applyFilter();
    } catch (error) {
        all = [];
        filteredData = [];
        tbody.innerHTML = "";
        exportBtn.disabled = true;
        setStatus("Eroare la încărcare. Încearcă din nou.");
        console.error(error);
    }
}

function exportCSV(data) {
    if (!data.length) {
        alert("Nu există date de exportat.");
        return;
    }

    const header = ["Nume", "Țara", "Site"];

    const rows = data.map(u => [
        u.name || "",
        u.country || "",
        u.web_pages?.[0] || ""
    ]);

    const csvContent = [header, ...rows]
        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\r\n");

    const blob = new Blob(
        ["\uFEFF", csvContent],
        { type: "text/csv;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "universitati_romania.csv";

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
}

qInput.addEventListener("input", applyFilter);

exportBtn.addEventListener("click", () => {
    exportCSV(filteredData);
});

loadUniversities();
