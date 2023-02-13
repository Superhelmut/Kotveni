import React, { useRef, useState } from 'react';
import "./Button.css"
function Button() {
	const [showInfo, setShowInfo] = useState(false);

	const CustomControl = ({ position }) => {
		const buttonRef = useRef(null);

		const info = () => {
			return (
				<div className='info'>
					<label>Název</label>
					<input type="text" />

				</div>
			)
		}

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
