import React from 'react';
import { Card } from '../card/card';
import { CardBg } from '../card/card-bg';

import './card-list.scss';

export const CardList = ({ cards, editing, onEdit, onAddNewCard }) => {
    return (
        <div className="card-list">
            <h1 className="card-list__title">My cards</h1>
            <div className="card-list__cards">
                {cards.map((card, index) => (
                    <Card
                        userName={card.userName}
                        date={card.date}
                        card={card.card}
                        cardType={card.type}
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(index);
                        }}
                        highlight={editing === index}
                    />
                ))}

                <div className="card" onClick={onAddNewCard}>
                    <CardBg dashed={true} />
                    <svg
                        viewBox="0 0 24 24"
                        style={{
                            opacity: 1,
                            mixBlendMode: 'normal',
                            fill: 'rgb(18, 18, 18)',
                            width: '100px',
                            height: '100px',
                            pointerEvents: 'all',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <g>
                            <path
                                id="plus"
                                d="M19.33,11c0-0.55-0.45-1-1-1H14V5.67c0-0.55-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1V10H5.67c-0.55,0-1,0.45-1,1v2  c0,0.55,0.45,1,1,1H10v4.33c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1V14h4.33c0.55,0,1-0.45,1-1V11L19.33,11z"
                                style={{ fill: 'rgb(18, 18, 18)' }}
                            ></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};
