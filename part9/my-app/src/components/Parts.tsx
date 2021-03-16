import React from 'react';
import Part from './Part';
import { CoursePart } from '../App';

const Parts = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

export default Parts;
