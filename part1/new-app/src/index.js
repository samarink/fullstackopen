import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };
  const total = part1.exercises + part2.exercises + part3.exercises;

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total number={total} />
    </>
  );
};

const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Content = (props) => (
  <>
    <Part name={props.part1.name} exercises={props.part1.exercises} />
    <Part name={props.part2.name} exercises={props.part2.exercises} />
    <Part name={props.part3.name} exercises={props.part3.exercises} />
  </>
);

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Total = (props) => <p>{props.number}</p>;

ReactDOM.render(<App />, document.getElementById('root'));
