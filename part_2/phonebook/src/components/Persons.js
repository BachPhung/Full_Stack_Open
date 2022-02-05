import React from 'react';
export const Persons = ({ result, handleDelete }) => {
    return (
        <div>
            {result.map(person =>
                <div id={person.id} key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </div>)}
        </div>
    )
}
