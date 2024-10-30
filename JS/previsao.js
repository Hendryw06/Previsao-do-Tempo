document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'ef986857ddae528343c147e9a20fc5ec'; // Insira sua chave API aqui

    const weatherImages = {
        "clear sky": [
            "Imagens/sunny.jpg",
            "svg/Ceulimpo.svg"
        ],
        "few clouds": [
            "Imagens/few_clouds.png",
            "svg/PoucasNuvens.svg"
        ],
        "scattered clouds": [
            "Imagens/scattered_clouds.png",
            "svg/NuvensdespersaseFragmentadas.svg"
        ],
        "broken clouds": [
            "Imagens/broken_clouds.png",
            "svg/NuvensdispersaseFragmentadas.svg"
        ],
        "shower rain": [
            "Imagens/shower_rain.png",
            "svg/ChuvadeChuvisco.svg"
        ],
        "rain": [
            "Imagens/rainy.png",
            "svg/Chuva.svg"
        ],
        "thunderstorm": [
            "Imagens/thunderstorm.png",
            "svg/Tempestade.svg"
        ],
        "snow": [
            "Imagens/snowy.png",
            "svg/Neve.svg"
        ],
        "mist": [
            "Imagens/mist.png",
            "svg/Nevoa.svg"
        ],
        "moderate rain": [
            "Imagens/moderate_rain.jpg",
            "svg/ChuvaModerada.svg"
        ],
        "light rain": [
            "Imagens/shower_rain.png",
            "svg/ChuvaLeve.svg"
        ],
        "overcast clouds": [
            "Imagens/overcast.png",
            "svg/NuvensNubladas.svg"
        ]
    };

    // Traduções das descrições do clima
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

    // Função para buscar a previsão do tempo
    function getWeatherForecast(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Cidade não encontrada ou chave API inválida.');
                }
                return response.json();
            })
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                alert(error.message);
            });
    }

    // Função para exibir a previsão do tempo
    function displayForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; // Limpa a previsão anterior

        // Apenas os dados dos próximos 5 dias
        const fiveDayForecast = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getHours() === 12; // Exibe a previsão do meio-dia
        });

        fiveDayForecast.forEach(item => {
            const date = new Date(item.dt * 1000); // Converte timestamp para data
            const day = date.toLocaleDateString('pt-BR', { weekday: 'long' });
            const temp = item.main.temp;
            const description = item.weather[0].description;
            const translatedDescription = translations[description.toLowerCase()] || description;
            const imageFiles = weatherImages[description.toLowerCase()] || ["Imagens/sunny.jpg"]; // Imagem padrão

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <h5>${day}</h5>
                <p>Temperatura: ${temp}°C</p>
                <p>Descrição: ${translatedDescription}</p>
            `;

            // Adiciona as imagens correspondentes
            imageFiles.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Imagem do clima: ${description}`;
                img.style.width = '100%'; // Ajuste de largura para as imagens
                img.onerror = () => {
                    console.error(`Erro ao carregar a imagem: ${imageUrl}`);
                    img.style.display = 'none'; // Oculta se a imagem não existir
                };
                forecastItem.appendChild(img);
            });

            forecastContainer.appendChild(forecastItem);
        });
    }

    // Exponha a função para ser chamada de index.js
    window.getWeatherForecast = getWeatherForecast;
});
