    function buttonClicked() {
        var country = document.getElementById("SearchData").value;
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const selectedCountry = data.find(countryData => countryData.name.common.toLowerCase() === country.toLowerCase());
                if (selectedCountry) {
                    
                    const {
                        name,
                        capital,
                        currencies,
                        region,
                        languages,
                        population,
                        flags,
                        location,
                        continents,
                        maps
                    } = selectedCountry;

                    let countryInfoHTML = `
                    <div class="container">
                        <div class="country-info">
                            <h2>${name.common}</h2>
                            <img src="${flags.svg}" alt="Flag" class="country-flag">
                            <p><strong>Official Name:</strong> ${name.official}</p>
                            <p><strong>Capital:</strong> ${capital}</p>
                            <p><strong>Currencies:</strong> ${currencies[Object.keys(currencies)[0]].name}</p>
                            <p><strong>Region:</strong> ${region}</p>
                            <p><strong>Languages:</strong> ${Object.values(languages).join(', ')}</p>
                            <p><strong>Population:</strong> ${population}</p>
                            <p><strong>Continent:</strong> ${continents}</p>
                            <a href='${maps.googleMaps}'><strong>Google Maps</strong> </a>

                            
                        </div>
                    </div>
                    `;

                    if (location && location.lat && location.lng) {
                        countryInfoHTML += `
                            <div class="country-info">
                                <p><strong>Location:</strong> Latitude ${location.lat}, Longitude ${location.lng}</p>
                                <div class="map-container">
                                    <iframe src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${name.common}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                                </div>
                            </div>
                        `;
                    }

                    document.getElementById("countryInfo").innerHTML = countryInfoHTML;
                } else {
                    document.getElementById("countryInfo").innerHTML = "Country not found";
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
