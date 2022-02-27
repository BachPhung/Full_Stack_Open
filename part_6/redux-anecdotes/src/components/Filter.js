import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/fitlerReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const [filter, set_Filter] = useState('')
    const handleChange = (e) => {
        set_Filter(e.target.value)
        dispatch(setFilter(e.target.value))
    }
    return (
        <div style={{ marginTop: '5px', marginBottom: '5px' }}>
            filter:
            <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter