import { useState } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/fitlerReducer'
const Filter = (props) => {
    const [filter, set_Filter] = useState('')
    const handleChange = (e) => {
        set_Filter(e.target.value)
        props.setFilter(e.target.value)
    }
    return (
        <div style={{ marginTop: '5px', marginBottom: '5px' }}>
            filter:
            <input value={filter} onChange={handleChange} />
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
      state: state
    }
  }
const mapDispatchToProps = {
    setFilter
}
const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter