import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const json = JSON.parse(jsonInput);
      const response = await axios.post('https://your-backend-url/bfhl', json);
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or error from API');
      console.error(error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const selectedValues = selectedOptions.map(option => option.value);

    return (
      <div>
        {selectedValues.includes('alphabets') && (
          <div>
            <strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}
          </div>
        )}
        {selectedValues.includes('numbers') && (
          <div>
            <strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}
          </div>
        )}
        {selectedValues.includes('highest_alphabet') && (
          <div>
            <strong>Highest Alphabet:</strong> {JSON.stringify(responseData.highest_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here'
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {responseData && (
        <>
          <Select
            isMulti
            name="filters"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default App;
