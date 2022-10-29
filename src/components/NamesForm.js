import '../styles/NamesForm.css';

const NamesForm = (props) => {
  const { playerNames } = props;
  return (
    <div className="namesForm-container">
      <div className="namesForm namesForm-hidden">
        {playerNames.map((name, index) => (
          <div className="namesForm-item">
            <label htmlFor={`name${index}`}>Player {index + 1}</label>
            <input id={`name${index}`} value={playerNames[index]}></input>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NamesForm;
