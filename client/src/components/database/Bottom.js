import React, { useState, useEffect } from 'react';


const Bottom = (props) => {
	const [isChecked, setIsChecked] = useState(props.bottom ? props.bottom : []);

	const handleCheckboxChange = (event) => {
		const value = event.target.value;
		if (isChecked.includes(value)) {
			setIsChecked(isChecked.filter(val => val !== value));
		} else {
			setIsChecked([...isChecked, value]);
		}
	};

	useEffect(() => {
		props.onSelectedItemIdBottom(isChecked)

	}, [isChecked]);

	props.onSelectedItemIdBottom(isChecked)

	return (
		<div>
			<label>Sand </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.includes('1')} onChange={handleCheckboxChange} />
			<p></p>
			<label>Stone </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.includes('2')} onChange={handleCheckboxChange} />
			<p></p>
			<label>Grass </label>
			<input type="checkbox" value="3" name='checkbox' checked={isChecked.includes('3')} onChange={handleCheckboxChange} />
			<p></p>
			<label> Mud </label>
			<input type="checkbox" value="4" name='checkbox' checked={isChecked.includes('4')} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Bottom