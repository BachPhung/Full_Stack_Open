import React from 'react';

export const Total = ({ parts }) => {
    const total = parts.reduce((sum, a) => sum + a.exercises, 0)
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
};
