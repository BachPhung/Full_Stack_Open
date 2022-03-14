import React from 'react'
import { Courses } from '../types'

const Content = ({ infos }: Courses) => (
    <>
        {infos.map(course => {
            switch (course.type) {
                case 'normal': {
                    return <div key={course.name}>
                        <h4>{course.name + " " + course.exerciseCount}</h4>
                        <div>{course.description}</div>
                    </div>
                }
                case 'groupProject': {
                    return <div key={course.exerciseCount}>
                        <h4>{course.name + " " + course.exerciseCount}</h4>
                        <div>group exercises ${course.groupProjectCount}</div>
                    </div>
                }
                case 'submission': {
                    return <div key={course.name}>
                        <h4>{course.name + " " + course.exerciseCount}</h4>
                        <div>{course.description}</div>
                        <div>submit to {course.exerciseSubmissionLink}</div>
                    </div>
                }
                case 'special': {
                    return <div key={course.name}>
                        <h4>{course.name + " " + course.exerciseCount}</h4>
                        <div>{course.description}</div>
                        <div>required skills: {course.requirements.map(skill=><span key={skill}> {skill}</span>)}</div>
                    </div>
                }
            }
        })}
    </>
)


export default Content