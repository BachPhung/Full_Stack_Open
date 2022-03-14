import { Courses } from '../types';

const Total = ({infos}: Courses) => {
    const total = infos.reduce((preV, curV) => preV + curV.exerciseCount, 0)
    return (
        <div>Number of exercises: {total}</div>
    )
};

export default Total