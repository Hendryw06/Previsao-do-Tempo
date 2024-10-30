document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'ef986857ddae528343c147e9a20fc5ec'; // Insira sua chave API aqui

    document.getElementById('search-button').addEventListener('click', function() {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            getWeatherByCity(city);
        } else {
            alert('Por favor, digite o nome da cidade.');
        }
    });

    document.getElementById('city-input').addEventListener('input', function() {
        const value = this.value;
        if (value) {
            fetchSuggestions(value);
        } else {
            document.getElementById('suggestions').style.display = 'none'; // Esconde se não houver entrada
        }
    });

    function fetchSuggestions(value) {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKey}&count=5`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const suggestionsContainer = document.getElementById('suggestions');
                suggestionsContainer.innerHTML = ''; // Limpa sugestões antigas
                if (data.list) { // Verifica se data.list existe
                    data.list.forEach(city => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.innerText = city.name;
                        suggestionItem.onclick = () => {
                            document.getElementById('city-input').value = city.name;
                            suggestionsContainer.style.display = 'none';
                            getWeatherByCity(city.name);
                        };
                        suggestionsContainer.appendChild(suggestionItem);
                    });
                    suggestionsContainer.style.display = suggestionsContainer.innerHTML ? 'block' : 'none'; // Exibe ou esconde
                }
            })
            .catch(error => {
                console.error("Erro ao buscar sugestões:", error);
            });
    }

    function getWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Cidade não encontrada');
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
                displayWeatherImage(data.weather[0].description); // Chama a função para exibir a imagem
                getWeatherForecast(city); // Chama a função para buscar a previsão do tempo
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function translateWeatherDescription(description) {
        const translations = {
            "clear sky": "Céu Limpo",
            "few clouds": "Poucas Nuvens",
            "scattered clouds": "Nuvens Dispersas",
            "broken clouds": "Nuvens Fragmentadas",
            "shower rain": "Chuva de Chuvisco",
            "rain": "Chuva",
            "thunderstorm": "Tempestade",
            "snow": "Neve",
            "mist": "Névoa",
            "moderate rain": "Chuva Moderada",
            "light rain": "Chuva Leve",
            "overcast clouds": "Nuvens Nubladas",
        };
        return translations[description.toLowerCase()] || description; // Retorna a tradução ou a descrição original
    }

    function displayWeatherData(data) {
        document.getElementById('temperature').innerText = `Temperatura: ${data.main.temp}°C`;
        const translatedDescription = translateWeatherDescription(data.weather[0].description);
        document.getElementById('description').innerText = `Descrição: ${translatedDescription}`;
        document.getElementById('humidity').innerText = `Umidade: ${data.main.humidity}%`;

        document.getElementById('weather-info').style.display = 'block'; // Exibe as informações do tempo
        document.getElementById('suggestions').style.display = 'none'; // Esconde as sugestões
    }

    // Lidar com localização atual
    function getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCity(`${lat},${lon}`); // Para fins de simplicidade
            });
        }
    }

    getCurrentLocationWeather();
    setInterval(getCurrentLocationWeather, 1800000); // Atualiza a cada 30 minutos
});
