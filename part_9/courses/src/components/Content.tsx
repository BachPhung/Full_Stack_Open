import React from 'react'
import { Courses } from '../types'

const Content = ({ infos }: Courses) => (
    <>
        {infos.map(course => {
            return <div key={course.name}>{course.name} {course.exerciseCount}</div>
        })}
    </>
)


export default Content