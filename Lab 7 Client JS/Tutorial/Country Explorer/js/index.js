// 1. URLS
const regionURL = 'https://restcountries.com/v3.1/region/'
const countryURL = 'https://restcountries.com/v3.1/name/'
// 2. The reference to the dom elements
const regionDL = document.querySelector("#region")
const countryDD = document.querySelector("#country")
const factsArea = document.querySelector("#facts-area")

async function handleRegionChange() {
    const url = `${regionURL}${regionDL.value}`
    const data = await fetch(url)
    const countries = await data.json()

    countryDD.innerHTML = countries
        .map(country => `<option value="${country.name.common}">${country.name.common}</option>`)
        .join(' ')
}

async function handleCountryChange() {

    const url = `${countryURL}${countryDD.value}`
    const data = await fetch(url)
    const country = await data.json()
    const htmlContent = changeCountryToFacts(country[0])
    factsArea.innerHTML = htmlContent
}

function changeCountryToFacts(country) {
    return `
        <h2> Facts About ${country.name.common}</h2>
        <img src="" alt="">
    `
}