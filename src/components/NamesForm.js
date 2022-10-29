import '../styles/NamesForm.css';

const NamesForm = (props) => {
  const { playerNames, handleChange, resetNames, toggleForm } = props;
  return (
    <div className="namesForm-container namesForm-hidden">
      <div className="namesForm">
        <h2 className="namesForm-heading">Player Names</h2>
        {playerNames.map((name, index) => (
          <div className="namesForm-item" key={`name-${index}`}>
            <label htmlFor={`name${index}`}>Player {index + 1}</label>
            <input
              onChange={(e) => handleChange(e, index)}
              id={`name${index}`}
              value={name}
            ></input>
          </div>
        ))}
        <div className="formControls">
          <button className="gameControl gameControl-form" onClick={toggleForm}>
            Submit
          </button>
          <button className="gameControl gameControl-form" onClick={resetNames}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamesForm;
