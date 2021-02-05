import Header from './Header';
import Content from './Content';

const Course = ({ courses }) => {
  const calcTotal = (parts) => parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <>
      {courses.map(({ name, parts, id }) => (
        <div key={id}>
          <Header text={name} />
          <Content parts={parts} total={calcTotal(parts)} />
        </div>
      ))}
    </>
  );
};

export default Course;
