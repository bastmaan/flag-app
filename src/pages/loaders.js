// // loaders/homeLoader.js
export const homeLoader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error("Failed to fetch country data");

    const data = await response.json();

    // Plocka ut och formatera det du behöver
    const countries = data.map((country) => ({
        name: country.name.common,
        flag: country.flags.svg,
        population: country.population,
        region: country.region,
        capital: country.capital ? country.capital[0] : 'N/A',
    }));

    return countries;
};