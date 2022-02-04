import React from 'react';

export const Persons = ({ result }) => {
    return (
        <div>
            {result.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}
