import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  const total = course.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total number={total} />
    </>
  );
};

const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part name={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => <p>{props.number}</p>;

ReactDOM.render(<App />, document.getElementById('root'));
