import Header from './Header';
import Content from './Content';

const Course = ({ course: { name, parts } }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <>
      <Header text={name} />
      <Content parts={parts} total={total} />
    </>
  );
};

export default Course;
