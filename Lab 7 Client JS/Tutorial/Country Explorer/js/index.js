// 1. URLS
const regionURL = 'https://restcountries.com/v3.1/region/'
const countryURL = 'https://restcountries.com/v3.1/name/'
// 2. The reference to the dom elements
const regionDL = document.querySelector("#region")
const countryDD = document.querySelector("#country")

function handleRegionChange() {
    console.log(`${regionURL}${regionDL.value}`)
}