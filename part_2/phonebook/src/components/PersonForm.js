import React from 'react';

export const PersonForm = ({handleAdd, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <div>
            <form onSubmit={handleAdd}>
                <div>
                    <div>name: <input className='input' value={newName} onChange={e => setNewName(e.target.value)} required /></div>
                    <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} required /></div>
                </div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}
