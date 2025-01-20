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
        let article = document.createElement("article")
        let paragraph = document.createElement("p")
        let div = document.createElement("div")
        let iconLink = document.createElement("a")
        let titleContainer = document.createElement("p")
        let icon = document.createElement("img")
        let mainTitle = document.createElement("h2")
        let secondaryTitle = document.createElement("h3")
        let detailsParagraph = document.createElement("p")

        // Ajouter le contenu de chaque tag
        icon.src = "images/icon-ellipsis.svg";
        secondaryTitle.innerText = card.title
        mainTitle.innerText =  `${card.timeframes.weekly.current}hrs`
        detailsParagraph.innerText = `Last week - ${card.timeframes.weekly.previous}hrs`
        article.style.backgroundColor = card.color
        article.style.backgroundImage = "url(" + `${card.image}` + ")"
        iconLink.href = "#"

        // Écouteurs d'événement pour définir la timeframe [daily, weekly, monthly]
        btnDaily.addEventListener("click", () => {
            mainTitle.innerText =  `${card.timeframes.daily.current}hrs`
            detailsParagraph.innerText = `Last day - ${card.timeframes.daily.previous}hrs`

            // Changer la couleur du lien
            btnDaily.classList.add("white")
            btnWeekly.classList.remove("white")
            btnMonthly.classList.remove("white")
        })
        btnWeekly.addEventListener("click", () => {
            mainTitle.innerText =  `${card.timeframes.weekly.current}hrs`
            detailsParagraph.innerText = `Last week - ${card.timeframes.weekly.previous}hrs`

            // Changer la couleur du lien
            btnDaily.classList.remove("white")
            btnWeekly.classList.add("white")
            btnMonthly.classList.remove("white")
        })
        btnMonthly.addEventListener("click", () => {
            mainTitle.innerText =  `${card.timeframes.monthly.current}hrs`
            detailsParagraph.innerText = `Last month - ${card.timeframes.monthly.previous}hrs`

            // Changer la couleur du lien
            btnDaily.classList.remove("white")
            btnWeekly.classList.remove("white")
            btnMonthly.classList.add("white")
        })

        // Attribuer à chaque parent l'enfant correspondant la première ligne "flex : row" de la carte
        iconLink.appendChild(icon)
        titleContainer.appendChild(secondaryTitle)
        titleContainer.appendChild(iconLink)

        // Mettre tous les tags dans un tableau et les ajouter un à un dans la div de la carte
        let arrayElement = [titleContainer, mainTitle, detailsParagraph]
        arrayElement.forEach((element) => {
            div.appendChild(element)
        })

        // Ajouter tous les élements à l'article
        article.appendChild(paragraph)
        article.appendChild(div)

        // Ajouter chaque article à la zone d'affichage des cartes
        zoneCard.appendChild(article);
    })
}