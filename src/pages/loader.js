// loaders/homeLoader.js
export const homeLoader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error("Failed to fetch country data");
    return response.json();
  };
  