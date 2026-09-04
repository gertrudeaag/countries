const urlParams = new URLSearchParams(window.location.search);
 const selectedCountryName = urlParams.get("country");
 const countryDetailsContainer = document.querySelector(".container");

 async function loadCountryDetails() {
   if (!countryDetailsContainer) return;

   if (!selectedCountryName) {
     countryDetailsContainer.innerHTML = `
       <p class="btnn" onclick="document.location='./index.html'">&#8592 Back</p>
       <p>No country selected.</p>
     `;
     return;
   }

   try {
     const response = await fetch("./countries.json");

     if (!response.ok) {
       throw new Error("Could not load countries.json");
     }

     const countries = await response.json();

     const country = countries.find((item) => {
       const countryName =
         typeof item.name === "object" ? item.name.common : item.name;

       return (
         countryName?.trim().toLowerCase() ===
         selectedCountryName.trim().toLowerCase()
       );
     });

     if (!country) {
       countryDetailsContainer.innerHTML = `
         <p class="btnn" onclick="document.location='./index.html'">&#8592 Back</p>
         <p>Country details not found.</p>
       `;
       return;
     }

     const name =
       typeof country.name === "object"
         ? country.name.common
         : country.name || "N/A";

     const flag =
      country.flags?.png ||
       country.flags?.svg ||
       country.flag ||
       "";
     const population = Number(country.population || 0).toLocaleString();
     const region = country.region || "N/A";
     const subregion = country.subregion || "N/A";
     const capital = Array.isArray(country.capital)
       ? country.capital.join(", ")
       : country.capital || "N/A";
     const nativeName = country.nativeName || "N/A";
     const topLevelDomain = Array.isArray(country.topLevelDomain)
       ? country.topLevelDomain.join(", ")
       : country.topLevelDomain || "N/A";
     const currencies = Array.isArray(country.currencies)
       ? country.currencies.map((currency) => currency.name).join(", ")
       : "N/A";
     const languages = Array.isArray(country.languages)
       ? country.languages.map((language) => language.name).join(", ")
       : "N/A";
     const borders = Array.isArray(country.borders)
       ? country.borders.join(", ")
       : "None";

     countryDetailsContainer.innerHTML = `
       <p class="btnn" onclick="document.location='./index.html'">&#8592 Back</p>
       <div class="flag">
         <img
           class="image"
           src="${flag}"
           alt="${name} flag"
         />

         <div class="col2">
           <h1>${name}</h1>
           <p><strong>Native Name:</strong> ${nativeName}</p>
           <p><strong>Population:</strong> ${population}</p>
           <p><strong>Region:</strong> ${region}</p>
           <p><strong>Sub Region:</strong> ${subregion}</p>
           <p><strong>Capital:</strong> ${capital}</p>
           <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
           <p><strong>Currencies:</strong> ${currencies}</p>
           <p><strong>Languages:</strong> ${languages}</p>
         </div>
       </div>
       <div class="last">
         <p><strong>Border Countries:</strong> ${borders}</p>
       </div>
     `;
   } catch (error) {
     console.error("Error loading country details:", error);
     countryDetailsContainer.innerHTML =
       "<p>Error loading country details.</p>";
   }
 }

 loadCountryDetails();
