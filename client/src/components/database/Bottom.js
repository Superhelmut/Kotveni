import React, { useState, useEffect } from 'react';


const Bottom = (props) => {
	const [isChecked, setIsChecked] = useState([]);

	const handleCheckboxChange = (event) => {
		const value = event.target.value;
		if (isChecked.includes(value)) {
			setIsChecked(isChecked.filter(val => val !== value));
		} else {
			setIsChecked([...isChecked, value]);
		}
	};

	useEffect(() => {
	}, [isChecked]);

	props.onSelectedItemIdBottom(isChecked)

	return (
		<div>
			<label>Sand </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.sand} onChange={handleCheckboxChange} />
			<p></p>
			<label>Stone </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.stone} onChange={handleCheckboxChange} />
			<p></p>
			<label>Grass </label>
			<input type="checkbox" value="3" name='checkbox' checked={isChecked.grass} onChange={handleCheckboxChange} />
			<p></p>
			<label> Mud </label>
			<input type="checkbox" value="4" name='checkbox' checked={isChecked.mud} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Bottom