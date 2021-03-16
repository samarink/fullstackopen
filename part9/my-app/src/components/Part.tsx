import React from 'react';
import { CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <em>project exercise count: {part.groupProjectCount}</em>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em>
          <p>submit to: {part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
