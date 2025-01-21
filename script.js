// Importation des données du fichier .json
let fetchedElements = await fetch("data.json")
let allArticles = await fetchedElements.json()

// Récupération des tags HTML
let zoneCard = document.querySelector(".card")
let btnDaily = document.querySelector(".daily")
let btnWeekly = document.querySelector(".weekly")
let btnMonthly = document.querySelector(".monthly")

// Générer les cartes de la page
generateCard()


function generateCard() {

    // Boucle générative des différentes cartes
    allArticles.forEach((card) => {

        // Création des Tags HTML
        let mainTitle = document.createElement("h1")
        let secondaryTitle = document.createElement("h2")
        let detailsParagraph = document.createElement("p")
        let titleContainer = document.createElement("p")
        let paragraph = document.createElement("p")
        let buttonLink = document.createElement("button")
        let article = document.createElement("article")
        let div = document.createElement("div")
        let icon = document.createElement("img")

        // Ajouter le contenu de chaque tag
        icon.src = "images/icon-ellipsis.svg";
        icon.alt = "ellipsis";
        secondaryTitle.innerText = card.title
        mainTitle.innerText =  `${card.timeframes.weekly.current}hrs`
        detailsParagraph.innerText = `Last week - ${card.timeframes.weekly.previous}hrs`
        article.style.backgroundColor = card.color
        article.style.backgroundImage = "url(" + `${card.image}` + ")"

        // Écouteurs d'événement pour définir la timeframe [daily, weekly, monthly]
        listenBtnTimeframe(btnDaily, card.timeframes.daily.current, card.timeframes.weekly.current, mainTitle, detailsParagraph)
        listenBtnTimeframe(btnWeekly, card.timeframes.weekly.current, card.timeframes.weekly.previous, mainTitle, detailsParagraph)
        listenBtnTimeframe(btnMonthly, card.timeframes.monthly.current, card.timeframes.monthly.previous, mainTitle, detailsParagraph)

        // Attribuer à chaque parent l'enfant correspondant (première ligne "flex : row" de la carte)
        buttonLink.appendChild(icon)
        titleContainer.appendChild(secondaryTitle)
        titleContainer.appendChild(buttonLink)

        // Mettre tous les tags dans un tableau et les ajouter un à un dans la div de la carte
        let arrayElement = [titleContainer, mainTitle, detailsParagraph]
        arrayElement.forEach(element=> div.appendChild(element))

        // Ajouter tous les élements à l'article
        article.appendChild(paragraph)
        article.appendChild(div)

        // Ajouter chaque article à la zone d'affichage des cartes
        zoneCard.appendChild(article);
    })
}

function listenBtnTimeframe(button, currentTimeframe, previousTimeFrame, mainTitle, detailsParagraph) {
    button.addEventListener("click", () => {
        mainTitle.innerText =  `${currentTimeframe}hrs`
        detailsParagraph.innerText = `Last day - ${previousTimeFrame}hrs`

        btnColor(button, btnDaily, btnWeekly, btnMonthly )
    })
}

function btnColor(button, button1, button2, button3 ) {
    let arrayBtn = [button1, button2, button3]
    arrayBtn.forEach((btn) => {
        if (btn === button)
            btn.classList.add("white")
        else
            btn.classList.remove("white")
    })
}