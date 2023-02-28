import React, { useState, useEffect } from 'react';


const Equipment = (props) => {
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

	props.onSelectedItemIdEquipment(isChecked)

	return (
		<div>
			<label>WC </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.wc} onChange={handleCheckboxChange} />
			<p></p>
			<label> Hot shower </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.hotShower} onChange={handleCheckboxChange} />
			<p></p>
			<label>Cold shower </label>
			<input type="checkbox" value="3" name='checkbox' checked={isChecked.coldShower} onChange={handleCheckboxChange} />
			<p></p>
			<label> Restaurant </label>
			<input type="checkbox" value="4" name='checkbox' checked={isChecked.restaurant} onChange={handleCheckboxChange} />
			<p></p>
			<label>Water </label>
			<input type="checkbox" value="5" name='checkbox' checked={isChecked.water} onChange={handleCheckboxChange} />
			<p></p>
			<label>Elektricity </label>
			<input type="checkbox" value="6" name='checkbox' checked={isChecked.elektricity} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Equipment