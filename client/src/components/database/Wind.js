import React, { useState, useEffect } from 'react';

const Wind = (props) => {
  const [isChecked, setIsChecked] = useState(props.wind ? props.wind : []);
  const { onSelectedItemIdWind } = props;

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (isChecked.includes(value)) {
      setIsChecked(isChecked.filter(val => val !== value));
    } else {
      setIsChecked([...isChecked, value]);
    }
  };

  useEffect(() => {
    onSelectedItemIdWind(isChecked);
  }, [isChecked, onSelectedItemIdWind]);

  return (
    <div>
      <label>North </label>
      <input type="checkbox" value="1" name='checkbox' checked={isChecked.includes('1')} onChange={handleCheckboxChange} />
      <p></p>
      <label> Northeast </label>
      <input type="checkbox" value="2" name='checkbox' checked={isChecked.includes('2')} onChange={handleCheckboxChange} />
      <p></p>
      <label>East </label>
      <input type="checkbox" value="3" name='checkbox' checked={isChecked.includes('3')} onChange={handleCheckboxChange} />
      <p></p>
      <label> Southeast </label>
      <input type="checkbox" value="4" name='checkbox' checked={isChecked.includes('4')} onChange={handleCheckboxChange} />
      <p></p>
      <label>South </label>
      <input type="checkbox" value="5" name='checkbox' checked={isChecked.includes('5')} onChange={handleCheckboxChange} />
      <p></p>
      <label> Southwest </label>
      <input type="checkbox" value="6" name='checkbox' checked={isChecked.includes('6')} onChange={handleCheckboxChange} />
      <p></p>
      <label>West </label>
      <input type="checkbox" value="7" name='checkbox' checked={isChecked.includes('7')} onChange={handleCheckboxChange} />
      <p></p>
      <label> Northwest </label>
      <input type="checkbox" value="8" name='checkbox' checked={isChecked.includes('8')} onChange={handleCheckboxChange} />
      <p></p>
    </div>
  )
}

export default Wind
