import React from 'react';

export const Total = ({parts}) => {
    const total = parts.reduce((preV,curV)=>preV+curV.exercises,0)
    return (
        <div>
            <strong>total of {total}</strong>
        </div>
    )
}
