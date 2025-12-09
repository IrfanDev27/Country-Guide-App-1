let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

// Button Click
searchBtn.addEventListener("click", startSearch);

// Enter key
countryInp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startSearch();
});

function startSearch() {
    let countryName = countryInp.value.trim();

    if (countryName.length === 0) {
        result.innerHTML = "<p style='color:#ffaaaa'>Pencarian wajib diisi!</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {

            if (data.status === 404) {
                result.innerHTML = "<p>Keyword tidak valid!</p>";
                return;
            }

            render(data);
        })
        .catch(() => {
            result.innerHTML = "<p>Terjadi kesalahan koneksi.</p>";
        });
}

function render(data) {
    result.innerHTML = `
        <div class="content">
            <img src="${data[0].flags.svg}" class="img-flags">
            <h1>${data[0].name.common}</h1>
        </div>
        
        <div class="info-details">
            <h2>Capital: ${data[0].capital?.[0] || "Unknown"}</h2>
            <h3>Continent: ${data[0].continents?.[0] || "Unknown"}</h3>
            <p>Currency: ${Object.keys(data[0].currencies || {})[0] || "Unknown"}</p>
            <p>Languages: ${Object.values(data[0].languages || {}).join(", ")}</p>
        </div>
    `;
}
