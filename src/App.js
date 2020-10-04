import React, { useState, useRef, useEffect } from 'react';
import { parse, isDate, isAfter } from 'date-fns';
import { Card } from './components/card';
import { CardList } from './components/card-list';

import './app.scss';

let initialCards = [];

if (localStorage.getItem('cards')) {
    initialCards = JSON.parse(localStorage.getItem('cards'));
}

function App() {
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [card, changeCard] = useState(['', '', '', '']);
    const [cardType, setCardType] = useState(4);
    const [visaError, setVisaError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const cardRefs = [useRef(), useRef(), useRef(), useRef()];
    const [existingCards, changeExistingCards] = useState(initialCards);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(existingCards));
    }, [existingCards]);

    const setCardNumber = (i, value) => {
        if (value.length > 4) {
            return;
        }
        if (i === 0) {
            const firstDigit = value[0];
            if (!firstDigit) {
                setVisaError(false);
            } else {
                if (
                    firstDigit === '4' ||
                    firstDigit === '5' ||
                    firstDigit === '6'
                ) {
                    setCardType(firstDigit);
                    setVisaError(false);
                } else {
                    setVisaError(true);
                }
            }
        }
        const newCard = [...card];
        newCard[i] = value;
        changeCard(newCard);
        if (value.length === 4) {
            const next = cardRefs[i + 1];
            if (next) {
                next.current.focus();
            }
        }
    };

    const updateDate = (e) => {
        if (
            e.target.value === '' ||
            (e.target.value.match(/^(\d|\/)+$/g) && e.target.value.length < 6)
        ) {
            setDate(e.target.value);
        }

        setDateError(false);
        if (e.target.value.length === 5) {
            const currentDate = new Date();
            const enteredDate = parse(e.target.value, 'mm/yy', new Date());

            if (isDate(enteredDate)) {
                if (isAfter(new Date(currentDate), new Date(enteredDate))) {
                    setDateError(true);
                } else {
                    setDateError(false);
                }
            }
        }
    };

    const saveCard = () => {
        let newCards = [...existingCards];
        if (editing != null) {
            newCards = newCards.map((existing, index) => {
                if (editing === index) {
                    return {
                        card,
                        userName,
                        cardType,
                        date,
                    };
                }
                return existing;
            });
        } else {
            newCards.push({
                card,
                userName,
                cardType,
                date,
            });
        }
        changeExistingCards(newCards);
        setDate('');
        setUserName('');
        setCardType('');
        changeCard(['', '', '', '']);
        setEditing(null);
    };

    const editCard = (index) => {
        setEditing(index);
        setDate(existingCards[index].date);
        setUserName(existingCards[index].userName);
        changeCard(existingCards[index].card);
        setCardType(existingCards[index].cardType);
        window.scrollTo(0, 0);
    };

    const addNewCard = () => {
        setDate('');
        setUserName('');
        setCardType('');
        changeCard(['', '', '', '']);
        window.scrollTo(0, 0);
    };

    return (
        <div className="app">
            <h1 className="app__title">
                Edit current card / Add card to account
            </h1>
            <Card
                userName={userName}
                date={date}
                card={card}
                cardType={cardType}
            />
            <div className="card-update">
                <div className="input-wrapper">
                    <label className="input-wrapper__label" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="input-wrapper__input"
                        id="name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="input-wrapper">
                    <label className="input-wrapper__label" htmlFor="card[0]">
                        Name
                    </label>
                    <div className="input-wrapper__multiple">
                        <input
                            className="input-wrapper__input"
                            id="card[0]"
                            type="number"
                            value={card[0]}
                            onChange={(e) => setCardNumber(0, e.target.value)}
                            ref={cardRefs[0]}
                        />
                        <input
                            className="input-wrapper__input"
                            id="card[1]"
                            type="number"
                            value={card[1]}
                            onChange={(e) => setCardNumber(1, e.target.value)}
                            ref={cardRefs[1]}
                        />
                        <input
                            className="input-wrapper__input"
                            id="card[2]"
                            type="number"
                            value={card[2]}
                            onChange={(e) => setCardNumber(2, e.target.value)}
                            ref={cardRefs[2]}
                        />
                        <input
                            className="input-wrapper__input"
                            id="card[3]"
                            type="number"
                            value={card[3]}
                            onChange={(e) => setCardNumber(3, e.target.value)}
                            ref={cardRefs[3]}
                        />
                    </div>
                    {visaError && (
                        <span className="input-wrapper__error">
                            Wrong card number
                        </span>
                    )}
                </div>

                <div className="input-wrapper">
                    <label className="input-wrapper__label" htmlFor="date">
                        Date
                    </label>
                    <input
                        className="input-wrapper__input"
                        id="date"
                        type="text"
                        value={date}
                        onChange={updateDate}
                    />
                    {dateError && (
                        <span className="input-wrapper__error">Wrong date</span>
                    )}
                </div>

                <button
                    onClick={saveCard}
                    className="card-update__btn"
                    disabled={dateError || visaError}
                >
                    Save
                </button>
            </div>

            <CardList
                cards={existingCards}
                editing={editing}
                onEdit={editCard}
                onAddNewCard={addNewCard}
            />
        </div>
    );
}

export default App;
