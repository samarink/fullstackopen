import Header from './Header';
import Content from './Content';

const Course = ({ course: { name, parts } }) => (
  <>
    <Header text={name} />
    <Content parts={parts} />
  </>
);

export default Course;
