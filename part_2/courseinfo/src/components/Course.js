import React from 'react';
import { Content } from './Content';
import { Header } from './Header';
import { Total } from './Total';

export const Course = ({ courses }) => {
    return (
        <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => {
            return (
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )
        })}
        </div>
    )
}
