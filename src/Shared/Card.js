export function checkCardsArr(cardsArr) {
    if (!Array.isArray(cardsArr)) return false
    else if (cardsArr.length === 0) return true
    else {
        cardsArr.forEach((card) => {
            if (typeof card !== "object") return false
            else if (!checkCard(card)) return false
        })
        return true
    }
}

const checkCard = (card) => {
    return (
        (typeof card.id === "number" || typeof card.id === "string") && !isNaN(card.id) &&
        typeof card.name === "string" &&
        typeof card.completed === "boolean" &&
        typeof card.text === "string" &&
        card instanceof Card
    )
}

export class Card {
    constructor({ id, name, completed, text }) {
        this.id = Number(id)
        this.name = String(name)
        this.completed = Boolean(completed)
        this.text = String(text)
    }
}

export default Card
