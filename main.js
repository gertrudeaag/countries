const containerBtn = document.getElementById("container");
const searchInput = document.getElementById("search");
let countries = [];
async function loadData() {
    try {
        const reponse = await fetch('./countries.json');
        countries = await reponse.json();
        console.log(countries);
        displayCountries(countries);

        console.log(countries[0].name);
    } catch (error) {
        console.error("Error loading JSON;", error);
    }
}

function displayCountries(data) {
    containerBtn.innerHTML = "";
    if (data.length === 0) {
        containerBtn.innerHTML = "<p>No countries found.</p>"
        return;
    }
    data.forEach((country) => {

        const countryName = country.name?.common || country.name || "N/A";
        const population = country.population?.toLocaleString() || "N/A";
        const region = country.region || "N/A";
        const capital = Array.isArray(country.capital) ? country.capital.join(", ") : (country.capital || "N/A");
        const flag = country.flags?.png || country.flags?.svg || country.flag || "flags.svg";

        const item = document.createElement("div");
        item.className = "item1";
        item.innerHTML = `
        <a href="page.html?country=${encodeURIComponent(countryName)}" style="text-decoration: none; color: inherit;">
      <img class="image" src="${flag}" alt="${countryName} flag">
      <div class="card">
        <h2>${countryName}</h2>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Capital:</strong> ${capital}</p>
      </div>
      </a>
      `;
        containerBtn.appendChild(item);
    });
};
function filterCountries(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!Array.isArray(countries)) return;
    console.log(searchTerm);
    const filtered = countries.filter((country) => {
        // Check match across name, region, capital, subregion, or languages
        const name = (country.name?.common || country.name || "").toLowerCase();
        const region = (country.region || "").toLowerCase();
        const subregion = (country.subregion || "").toLowerCase();
        const capital = Array.isArray(country.capital)
            ? country.capital.join(" ").toLowerCase()
            : (country.capital || "").toLowerCase();

        return (
            name.includes(searchTerm) ||
            region.includes(searchTerm) ||
            subregion.includes(searchTerm) ||
            capital.includes(searchTerm)
        );
    });

    displayCountries(filtered);
}

// Event listener for user search input
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        filterCountries(e.target.value);
    });
}
// 1. Get the select element from the DOM
const regionSelect = document.querySelector("select"); // Replace with your select element's ID or selector

// 2. Function to filter countries by selected dropdown value
function filterByRegion(selectedRegion) {
    const selectedValue = selectedRegion.toLowerCase();

    // If "all" or default empty value is selected, show all countries
    if (!selectedValue || selectedValue === "all") {
        displayCountries(countries);
        return;
    }

    const filtered = countries.filter((country) => {
        const region = (country.region || "").toLowerCase();
        const subregion = (country.subregion || "").toLowerCase();

        return region === selectedValue || subregion === selectedValue;
    });

    displayCountries(filtered);
}

// 3. Event listener for the dropdown select element
if (regionSelect) {
    regionSelect.addEventListener("change", (e) => {

        filterByRegion(e.target.value);

 });
}

loadData();
