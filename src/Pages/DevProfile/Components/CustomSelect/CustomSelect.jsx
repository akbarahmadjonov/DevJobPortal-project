import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "../../DevProfile.scss";

export const CustomSelect = () => {
  const [selectData, setSelectData] = useState([]);
  const [backendData, setBackendData] = useState([]);

  const years = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
  ]

 const yearsList =  years.map(opt => ({ label: opt, value: opt }));


const skills = [
  ".NET", "ABAP", "Android", "ReactJs", "ReactNative", "Flutter"
]

const skillsList =  skills.map(opt => ({ label: opt, value: opt }));

const competencyOptions = [
  {value: "Beginner", label: "Beginner"},
  {value: "Experienced", label: "Experienced"},
  {value: "Advanced", label: "Advanced"},
  {value: "Expert", label: "Expert"},
]






  useEffect(() => {
    // Simulating fetching data from the backend
    const fetchData = async () => {
      const response = await fetch('your-backend-url');
      const data = await response.json();
      setBackendData(data);
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption, index) => {
    const updatedData = [...selectData];
    updatedData[index] = selectedOption;
    if (backendData.length > 0) {
      updatedData[index + 3] = backendData[index];
    }
    setSelectData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = selectData.filter((_, i) => i !== index);
    setSelectData(updatedData);
  };

  useEffect(() => {
    // Add three initial selects with empty options
    setSelectData([skillsList, yearsList, competencyOptions]);
  }, );

  return (
    <div>
      {selectData.map((options, index) => (
        <div key={index}>
          <Select
          classNamePrefix="mySelect"
          className="select"
            options={options}
            value={selectData[index]}
            onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
          />
          {index >= 3 && (
            <button onClick={() => handleDelete(index)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};