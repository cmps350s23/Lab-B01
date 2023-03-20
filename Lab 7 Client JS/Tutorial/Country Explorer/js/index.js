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

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common))

    countryDD.innerHTML = countries
        .map(country => `<option value="${country.name.common}">${country.name.common}</option>`)
        .join(' ')
    handleCountryChange()
}

async function handleCountryChange() {

    const url = `${countryURL}${countryDD.value}`
    const data = await fetch(url)
    const country = await data.json()
    const htmlContent = changeCountryToFacts(country[0])
    factsArea.innerHTML = htmlContent
}

function changeCountryToFacts(country) {

    const currKey = Object.keys(country.currencies)[0]
    const languageKeys = Object.keys(country.languages)
    const languages = languageKeys.map(key => country.languages[key]).join(' ')

    return `
        <h2> Facts About ${country.name.common}</h2>
        <img src="${country.flags.png}" alt="${country.flags.alt}">
        <br>
        <table>
            <tr>
                <th>Official Country name</th>
                <td>${country.name.official}</td>
            </tr>
            <tr>
                <th>Capital City</th>
                <td>${country.capital[0]}</td >
            </tr >
            <tr>
                <th>Currency</th>
                <td>${country.currencies[currKey].name}</td>
            </tr>
            <tr>
                <th>Population</th>
                <td>${country.population}</td>
            </tr>
            <tr>
                <th>Language</th>
                <td>${languages}</td>
            </tr>
        </table >
        `
}

