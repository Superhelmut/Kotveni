const Wind = () => {
	return (
		<div>
			<label>North </label>
			<input type="checkbox" value="1" name='checkbox' checked={isChecked.north} onChange={handleCheckboxChange} />
			<p></p>
			<label> Northeast </label>
			<input type="checkbox" value="2" name='checkbox' checked={isChecked.northeast} onChange={handleCheckboxChange} />
			<p></p>
			<label>East </label>
			<input type="checkbox" value="3" name='checkbox' checked={isChecked.east} onChange={handleCheckboxChange} />
			<p></p>
			<label> Southeast </label>
			<input type="checkbox" value="4" name='checkbox' checked={isChecked.southeast} onChange={handleCheckboxChange} />
			<p></p>
			<label>South </label>
			<input type="checkbox" value="5" name='checkbox' checked={isChecked.south} onChange={handleCheckboxChange} />
			<p></p>
			<label> Southwest </label>
			<input type="checkbox" value="6" name='checkbox' checked={isChecked.southwest} onChange={handleCheckboxChange} />
			<p></p>
			<label>West </label>
			<input type="checkbox" value="7" name='checkbox' checked={isChecked.west} onChange={handleCheckboxChange} />
			<p></p>
			<label> Northwest </label>
			<input type="checkbox" value="8" name='checkbox' checked={isChecked.northwest} onChange={handleCheckboxChange} />
			<p></p>
		</div>
	)
}

export default Wind