import React, { Component } from 'react';
import './Stylesheet.css';
import DonorService from '../services/DonorService';


class PatientRegister extends Component {


	constructor(props) {
		super(props)
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
		this.saveDonor = this.saveDonor.bind(this);
	}

	initialState = {
		firstName: "",
		lastName: "",
		phoneNumber: "",
		age: "",
		bloodGroup: "",
		recoveryDays: "",
		city: "",
		email: "",
		password: ""
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}


	saveDonor = (e) => {
		e.preventDefault();

		const donor = {
			firstname: this.state.firstName,
			lastname: this.state.lastName,
			phone: this.state.phoneNumber,
			age: this.state.age,
			bloodGroup: this.state.bloodGroup,
			days: this.state.recoveryDays,
			city: this.state.city,
			email: this.state.email,
			password: this.state.password
		};

		// console.log('donor => '+ JSON.stringify(donor)); 
		console.log(donor);

		DonorService.createDonor(this.state).then(res => {
			this.props.history.push("/login");
			console.log(res.data);
		});
	}

	cancel() {
		this.props.history.push('/login');
	}


	render() {

		const { firstName, lastName, phoneNumber, age, bloodGroup, recoveryDays, city, email, password } = this.state;

		return (
			<div>

				<div className="wrappers2">
					<div className="form-wrappers">
						<h2>Patient Registration</h2>
						<form autoComplete="off">
							<div className="firstName">
								<label>First Name: </label>
								<input type="text" placeholder="First Name" name="firstName" className="form-control"
									value={firstName} onChange={this.onChange} />
							</div>
							<div className="lastName">
								<label>Last Name: </label>
								<input type="text" placeholder="Last Name" name="lastName" className="form-control"
									value={lastName} onChange={this.onChange} />
							</div>
							<div className="phoneNumber">
								<label>Phone Number: </label>
								<input type="text" placeholder="Phone Number" name="phoneNumber" className="form-control"
									value={phoneNumber} onChange={this.onChange} />
							</div>
							<div className="age">
								<label>Age: </label>
								<input type="text" placeholder="Age" name="age" className="form-control"
									value={age} onChange={this.onChange} />
							</div>
							<div className="bloodGroup">
								<label>Blood Group: </label>
								<input type="text" placeholder="Blood Group" name="bloodGroup" className="form-control"
									value={bloodGroup} onChange={this.onChange} />
							</div>
							<div className="recoveryDays">
								<label>Recovery Days: </label>
								<input type="text" placeholder="Recovery Days" name="recoveryDays" className="form-control"
									value={recoveryDays} onChange={this.onChange} />
							</div>
							<div className="city">
								<label>City: </label>
								<input type="text" placeholder="City" name="city" className="form-control"
									value={city} onChange={this.onChange} />
							</div>
							<div className="email1">
								<label>Email Id: </label>
								<input type="text" placeholder="Email Id" name="email" className="form-control"
									value={email} onChange={this.onChange} />
							</div>
							<div className="password1">
								<label>Password: </label>
								<input type="password" placeholder="Password" name="password" className="form-control"
									value={password} onChange={this.onChange} />
							</div>

							<div className="createAccount">
								<button className="btn btn-success" onClick={this.saveDonor}>Save</button>
								<button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>



		)


	}
}
export default PatientRegister;