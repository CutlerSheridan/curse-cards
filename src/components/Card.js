import '../styles/Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <div>{props.text}</div>
    </div>
  );
};

export default Card;
