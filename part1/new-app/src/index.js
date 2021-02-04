import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];
  const total = parts.reduce((a, b) => a + b, 0);

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total number={total} />
    </>
  );
};

const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => (
  <>
    {props.parts.map(part => <Part name={part.name} exercises={part.exercises} />)}
  </>
);

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => <p>{props.number}</p>;

ReactDOM.render(<App />, document.getElementById('root'));
