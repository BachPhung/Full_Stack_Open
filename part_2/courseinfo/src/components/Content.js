import React from 'react';
import { Part } from './Part';

export const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} n={part.name} e={part.exercises} />)}
        </div>
    )
};
