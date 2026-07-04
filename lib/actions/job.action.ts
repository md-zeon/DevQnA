import { JobFilterParams } from "@/types/action";

export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    const result = await response.json();
    if (result.error === false && Array.isArray(result.data)) {
      return result.data.map((country: { name: string }) => ({
        name: { common: country.name },
      }));
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`, {
    headers,
  });

  const result = await response.json();

  return result.data;
};
