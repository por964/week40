let url = 'http://restcountries.eu/rest/v1/alpha?codes=';

const showCountry = async () => {
                let countries = document.getElementsByTagName("path");
            for (let state of countries) {
                state.setAttribute('style', 'fill:#c0c0c0;stroke:#ffffff;stroke-width:0.40000001;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none');
            }
    let country = event.target.id;
    event.target.setAttribute('style', 'fill: blue');
    let url2 = url + country;
    
    const userResponse = await fetch(`${url2}`);
    const userData = await fetchWithErrorCheck(userResponse);

    const data = userData.map((country) => {
        var obj = country.translations;
        console.log(obj);
        const obj2 = Object.values(obj);
        //let result = country.translations.map(a => a.foo);

        return `Name: ${country.name} \n Population: ${country.population} \n Capital: ${country.capital} 
                        \n Alternative names: ${country.altSpellings} \n Borders: ${country.borders} 
                        \n Translations: ` + obj2;
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

