import React from 'react';
import { CardBg } from './card-bg';

import './card.scss';
import Chip from '../../assets/images/chip.png';
import Visa from '../../assets/images/visa.png';
import MasterCard from '../../assets/images/master-card.png';
import Discover from '../../assets/images/discover.png';

export const Card = ({
    userName,
    date,
    card,
    cardType,
    highlight,
    onClick,
}) => {
    let cardTypeImage;
    switch (cardType) {
        case '4':
            cardTypeImage = Visa;
            break;
        case '5':
            cardTypeImage = MasterCard;
            break;
        case '6':
            cardTypeImage = Discover;
            break;
        default:
            cardTypeImage = Visa;
            break;
    }

    return (
        <div className="card" onClick={onClick}>
            <CardBg highlight={highlight} />
            <div className="card__data">
                <img className="card__chip" src={Chip} alt="chip" />
                <p className="card__number">
                    <label className="card__number__label" htmlFor="card[0]">
                        {card[0] || '1456'}
                    </label>
                    <label className="card__number__label" htmlFor="card[1]">
                        {card[1] || '1298'}
                    </label>
                    <label className="card__number__label" htmlFor="card[2]">
                        {card[2] || '6574'}
                    </label>
                    <label className="card__number__label" htmlFor="card[3]">
                        {card[3] || '1287'}
                    </label>
                </p>
                <div className="card__user">
                    <label htmlFor="name" className="card__user__name">
                        {userName || 'Username'}
                    </label>
                    <label htmlFor="date" className="card__user__date">
                        {date || '02/22'}
                    </label>
                </div>
                <img
                    src={cardTypeImage}
                    alt="Card type"
                    className="card__type"
                />
            </div>
        </div>
    );
};
