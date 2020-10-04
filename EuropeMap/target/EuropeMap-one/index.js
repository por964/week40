let url = 'http://restcountries.eu/rest/v1/alpha?codes=';

const showCountry = async () => {
    let country = event.target.id;
    event.target.setAttribute('style', 'fill: blue');
    let url2 = url + country;
    
    const userResponse = await fetch(`${url2}`);
    const userData = await fetchWithErrorCheck(userResponse);

    const data = userData.map((country) => {
        var obj = country.translations;
        console.log(obj);
        return `Name: ${country.name} \n Population: ${country.population} \n Capital: ${country.capital} 
                        \n Alternative names: ${country.altSpellings} \n Borders: ${country.borders} 
                        \n Translations: ` + JSON.stringify(obj);
    });
    console.log(data);
    alert (data);
};

document.getElementById("svg2").addEventListener("click", showCountry, false);

function fetchWithErrorCheck(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()});
    }
    return res.json();
}
;

