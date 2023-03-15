import Axios from "axios"


const addAnchorage = (props) => {

	const latitude = props.position.lat
	const longitude = props.position.lng
	const getName = props.getName
	const capacityId = props.capacityId
	const waterDeepId = props.waterDeepId
	const windId = props.windId
	const bottomId = props.bottomId

	console.log(latitude, "latitude")
	console.log(longitude, "longitude")
	console.log(getName, "name")
	console.log(capacityId, "capacity")
	console.log(waterDeepId, "water")
	console.log(windId, "wind")
	console.log(bottomId, "bottom")

	Axios.post("http://localhost:3001/createAnchor", {
		name: getName,
		latitude: latitude,
		longitude: longitude,
		capacity: capacityId,
		waterDeep: waterDeepId,
		wind: windId,
		bottom: bottomId
	}).then(() => console.log("úspěch"))

}




export default addAnchorage