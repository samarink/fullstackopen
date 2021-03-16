import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  courseParts: CoursePart[];
}

const Parts = ({ courseParts }: CourseProps) => (
  <ul>
    {courseParts.map(({ name, exerciseCount }) => (
      <li key={name}>
        {name} {exerciseCount}
      </li>
    ))}
  </ul>
);

export default Parts;
