import React, { useState, useEffect, useRef } from "react"
import axios from "axios";
import Card from "./Card"
import "./Card.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const DeckCards = () => {
    const cardsId = useRef()
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState(null)
    const [isShuffling, setIsShuffling] = useState(false);


    async function draw() {
        try {
            const newCard = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`)
            if (newCard.data.remaining === 0) throw new Error("Deck empty!");
            setCards(cards => [...cards, newCard])

        } catch (err) {
            alert(err);
        }
    }

    async function shuffleDeck() {
        await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`)
        setCards([])
    }

    useEffect(() => {
        async function drawNewDeck() {
            const newDeck = await axios.get(`${BASE_URL}/new/shuffle/`)
            setDeck(newDeck.data)
        }
        drawNewDeck();
    }, [])

    /** Return draw button (disabled if shuffling) */
    function renderDrawBtnIfOk() {
        if (!deck) return null;

        return (
            <button
                onClick={draw}
                disabled={isShuffling}>
                DRAW
            </button>
        );
    }

    /** Return shuffle button (disabled if already is) */
    function renderShuffleBtnIfOk() {
        if (!deck) return null;
        return (
            <button
                onClick={shuffleDeck}
                disabled={isShuffling}>
                SHUFFLE DECK
            </button>
        );
    }

    return (
        <div>
            {renderDrawBtnIfOk()}
            {renderShuffleBtnIfOk()}
            <div className="card-area">
                {cards.map(card =>
                    <Card key={card.data.cards[0].code} cardInfo={card} />
                )} </div>
        </div>
    )
}

export default DeckCards