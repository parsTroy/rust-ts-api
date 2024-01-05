import React from 'react'

interface Card {
    id: number;
    name: string;
    email: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {

    return (
        <div className='bg-gray-300 shadow-lg rounded p-2 hover:bg-gray-100 w-full'>
            <p className='text-sm text-gray-900'>ID: {card.id}</p>
            <p className='text-lg font-semibold text-gray-700'>{card.name}</p>
            <p className='text-md text-gray-700'>{card.email}</p>
        </div>
    )
}

export default CardComponent