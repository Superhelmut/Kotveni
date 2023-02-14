import React, { useRef, useState } from 'react';
import "./Button.css"
import Axios from "axios"

function Button() {
	const [showInfo, setShowInfo] = useState(false);
	const [name, setName] = useState("");

	const addInfo = () => {
		Axios.post("http://localhost:3001/create", {
			name: name,
		}).then(() => console.log("úspěch"))
	}


	const info = () => {
		return (
			<div className='info'>
				<label>Název</label>
				<input type="text" onChange={(event) => setName(event.target.value)} />
				<button onClick={addInfo}>Přidat info</button>
			</div>
		)
	}

	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);

		return (
			<div
				ref={buttonRef}
				style={{
					position: 'absolute',
					top: position[0],
					left: position[1],
					zIndex: 1000
				}}
			>
				<button onClick={() => setShowInfo(!showInfo)}>Tlačítko</button>
				{showInfo && info()}
			</div>
		);
	};


	return (
		<div>
			<CustomControl position={[300, 100]}>
			</CustomControl>

		</div>


	)
}

export default Button
