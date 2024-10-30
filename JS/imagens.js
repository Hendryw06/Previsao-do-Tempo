function displayWeatherImage(description) {
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
            "Trabalho CLIMA/Imagens/snowy.png",
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

    const formattedDescription = description.toLowerCase();
    const imageFiles = weatherImages[formattedDescription] || ["Imagens/sunny.jpg"]; // Imagem padrão

    const imageContainer = document.getElementById('weather-image');
    imageContainer.innerHTML = ''; // Limpa a imagem anterior

    // Adiciona todas as imagens correspondentes
    imageFiles.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl; // Referencia a imagem local
        img.alt = `Imagem do clima: ${description}`;

        // Ajusta tamanho para SVG
        if (imageUrl.endsWith('.svg')) {
            img.style.width = '80%'; // Ajuste de largura para SVG
            img.style.height = 'auto';
        } else {
            img.style.width = '100%'; // Ajuste de largura para imagens
            img.style.height = 'auto';
        }

        img.onerror = () => {
            img.style.display = 'none'; // Oculta se a imagem não existir
        };

        imageContainer.appendChild(img);
    });
}
