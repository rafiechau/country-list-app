import axios from "axios";

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountry = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/all`);

        return response.data
    }catch(error){
        console.log(error)
    }
}

export const getCountryByName = async (countryName) => {
    try{
        const response = await axios.get(`${BASE_URL}/name/${countryName}`);
        // console.log(response)
        return response.data[0];
    }catch(error){
        console.log(error)
    }
}
