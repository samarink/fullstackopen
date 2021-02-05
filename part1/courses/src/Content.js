import Part from './Part';

const Content = ({ parts, total }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
    <b>Total of {total} exercises</b>
  </>
);

export default Content;
