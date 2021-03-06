import React, { Component } from 'react';
import './Stylesheet.css';
import DonorService from '../services/DonorService';
import { withRouter } from 'react-router-dom';


const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
	let valid = true;

	Object.values(formErrors).forEach(element => {
		element.length > 0 && (valid = false);
	});
	return valid;
};

class DonorRegister extends Component {


	constructor(props) {
		super(props)
		
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
		this.inputRef = React.createRef();
		DonorService.getDonor(window.localStorage.getItem("emailId")).then( (res) => {
			this.setState({donor: res.data.result});
		})
		
	}

	initialState = {
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		password: "",
		stateName: "",
		age: "",
		bloodGroup: "",
		labConfirmedCovid: "",
		vaccineReceived: "",
		availability: "",
		followUpNegReport: "",
		lastSymptomDate: "",
		past14Days: "",
		registrationDate: "",
		formErrors: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			password: "",
			stateName: "",
			age: "",
			bloodGroup: "",
			labConfirmedCovid: "",
			vaccineReceived: "",
			availability: "",
			followUpNegReport: "",
			lastSymptomDate: "",
			past14Days: "",
			registrationDate: ""
		}


	}

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = this.state.formErrors;

		switch (name) {
			case 'firstName':
				formErrors.firstName = value.length < 3 ? "Minimum 3 characters required" : "";
				break;
			case 'lastName':
				formErrors.lastName = value.length < 3 ? "Minimum 3 characters required" : "";
				break;
			case 'phoneNumber':
				formErrors.phoneNumber = value.length < 10 ? "Minimum 10 digits required" : "";
				break;
			case 'age':
				formErrors.age = value.length < 2 ? "Minimum 2 digits required" : "";
				break;
			case 'bloodGroup':
				formErrors.bloodGroup = value.length < 1 ? "minimum 1 character required" : "";
				break;
			case 'stateName':
				formErrors.stateName = value.length < 2 ? "minimum 2 characters required" : "";
				break;
			case 'email':
				formErrors.email = emailRegex.test(value) ? "" : "Invalid Email";
				break;
			case 'password':
				formErrors.password = value.length < 6 ? "minimum 6 characters required" : "";
				break;
			case 'labConfirmedCovid':
				formErrors.labConfirmedCovid = value === "no" ? "You are not eligible to donate" : "";
				break;  
			case 'followUpNegReport':
				formErrors.followUpNegReport = value === "no" ? "You are not eligible to donate" : "";
				break;
			case 'past14Days':
				formErrors.past14Days = value === "no" ? "You are not eligible to donate" : "";
				break; 
			case 'lastSymptomDate':
				formErrors.lastSymptomDate = value ===  this.state.currentDate  ? "You are not eligible to donate" : "";
				break;
			
			default:
				break;
		}


		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};


	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.selectedOption })
	}


	handleSubmit = submit => {
		submit.preventDefault();
		if (formValid(this.state.formErrors)) {
			 
			let info = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				phoneNumber: this.state.phoneNumber,
				age: this.state.age,
				bloodGroup: this.bloodGroup.value,
				email: this.state.email,
				password: this.state.password,
				labConfirmedCovid: this.menu.value,
				vaccineReceived: this.vaccine.value,
				availability: this.availability.value,
				followUpNegReport: this.followUpNegReport.value,
				lastSymptomDate: this.state.lastSymptomDate,
				past14Days: this.past14Days.value,
				stateName: this.state.stateName
			};
			console.log('Donor-JSON', info);
			DonorService.editDonorDetails(this.state).then(res => {
				if (res.data.body === false){
					alert("Password Incorrect");
				}
				else{
					alert("Profile updated successfully.")
					this.props.history.goBack();
				}
			});
		}
		else {
			alert("Please fill the form correctly!");
			console.error("Form Invalid");
		}
		
	};

	handleCancel = () =>{
		this.props.history.goBack();

	};
	componentDidMount() {
		this.inputRef.current.focus();
		DonorService.getDonor(window.localStorage.getItem("emailId")).then( (res) => {
			
			// console.log("donor ",res.data.result);
			this.setState({firstName: res.data.result.firstName,
			lastName: res.data.result.lastName,
			phoneNumber: res.data.result.phoneNumber,
			email: res.data.result.email,
			stateName: res.data.result.stateName,
			age: res.data.result.age,
			bloodGroup: res.data.result.bloodGroup,
			labConfirmedCovid: res.data.result.labConfirmedCovid,
			vaccineReceived: res.data.result.vaccineReceived,
			availability: res.data.result.availability,
			followUpNegReport: res.data.result.followUpNegReport,
			lastSymptomDate: res.data.result.lastSymptomDate,
			past14Days: res.data.result.past14Days});
			console.log(this.state.firstName)
		});
		
	}


	render() {
		const { formErrors } = this.state;
		return (
			<div>
				<section id="banner">
					<p style={{fontSize: 'x-large', fontWeight: 325}}>Donate, Find Convalescent Plasma Across The Nation</p>
            	</section>
				<div className="wrappers2">
					<div className="form-wrappers">
						<br />
					<h2 style={{fontWeight: 'bold', textAlign: 'center'}}>Edit Your Details<br /></h2>
						<form onSubmit={this.handleSubmit} autoComplete="off">
							<div className="name">
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									className={formErrors.firstName.length > 0 ? "error" : null}
									placeholder="First Name"
									name="firstName"
									required
									value={this.state.firstName}
									onChange={this.handleChange}
								/>
								{formErrors.firstName.length > 0 && (
									<span className="errorMessage">{formErrors.firstName}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="lastName">Last Name</label>
								<input
									type="text"
									className={formErrors.lastName.length > 0 ? "error" : null}
									placeholder="Last Name"
									name="lastName"
									required
									ref={this.inputRef}
									value={this.state.lastName}
									onChange={this.handleChange}
								/>
								{formErrors.lastName.length > 0 && (
									<span className="errorMessage">{formErrors.lastName}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="phoneNumber">Phone No</label>
								<input
									className={formErrors.phoneNumber.length > 0 ? "error" : null}
									placeholder="Phone Number"
									type="tel"
									name="phoneNumber"
									pattern="[0-9]{10}"
									required
									ref={this.inputRef}
									value={this.state.phoneNumber}
									onChange={this.handleChange}
								/>
								{formErrors.phoneNumber.length > 0 && (
									<span className="errorMessage">{formErrors.phoneNumber}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="age">Your Age</label>
								<input
									type="number"
									min = "18"
									max = "60"
									size = "2"
									className={formErrors.age.length > 0 ? "error" : null}
									placeholder="Age"
									name="age"
									required
									ref={this.inputRef}
									value={this.state.age}
									onChange={this.handleChange}
								/>
								{formErrors.age.length > 2 && (
									<span className="errorMessage">{formErrors.age}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="email">Email Id</label>
								<input
									className={formErrors.email.length > 0 ? "error" : null}
									placeholder="Email"
									type="email"
									name="email"
									required
									ref={this.inputRef}
									value={this.state.email}
									onChange={this.handleChange}
									disabled
								/>
								{formErrors.email.length > 0 && (
									<span className="errorMessage">{formErrors.email}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="password">Confirm Password</label>
								<input
									className={formErrors.password.length > 0 ? "error" : null}
									placeholder="Password"
									type="password"
									name="password"
									required
									noValidate
									ref={this.inputRef}
									onChange={this.handleChange}
								/>
								{formErrors.password.length > 0 && (
									<span className="errorMessage">{formErrors.password}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="stateName">Select a state from where you would like to donate</label>
								<select ref={(input) => this.stateName = input} value={this.state.stateName} required onChange={this.handleChange.bind(this)} name='stateName'>
									<option value="" selected disabled>Select</option>
									<option value="Andhra Pradesh">Andhra Pradesh</option>
									<option value="Arunachal Pradesh">Arunachal Pradesh</option>
									<option value="Assam">Assam</option>
									<option value="Bihar">Bihar</option>
									<option value="Chhattisgarh">Chhattisgarh</option>
									<option value="Goa">Goa</option>
									<option value="Gujarat">Gujarat</option>
									<option value="Haryana">Haryana</option>
									<option value="Himachal Pradesh">Himachal Pradesh</option>
									<option value="Jammu and Kashmir">Jammu and Kashmir</option>
									<option value="Jharkhand">Jharkhand</option>
									<option value="Karnataka">Karnataka</option>
									<option value="Kerala">Kerala</option>
									<option value="Madhya Pradesh">Madhya Pradesh</option>
									<option value="Maharashtra">Maharashtra</option>
									<option value="Manipur">Manipur</option>
									<option value="Meghalaya">Meghalaya</option>
									<option value="Mizoram">Mizoram</option>
									<option value="Nagaland">Nagaland</option>
									<option value="Odisha">Odisha</option>
									<option value="Punjab">Punjab</option>
									<option value="Rajasthan">Rajasthan</option>
									<option value="Sikkim">Sikkim</option>
									<option value="Tamil Nadu">Tamil Nadu</option>
									<option value="Telangana">Telangana</option>
									<option value="Tripura">Tripura</option>
									<option value="Uttarakhand">Uttarakhand</option>
									<option value="Uttar Pradesh">Uttar Pradesh</option>
									<option value="West Bengal">West Bengal</option>
									<option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
									<option value="Chandigarh">Chandigarh</option>
									<option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
									<option value="Daman and Diu">Daman and Diu</option>
									<option value="Delhi">Delhi</option>
									<option value="Lakshadweep">Lakshadweep</option>
									<option value="Puducherry">Puducherry</option>	
								</select>
								{formErrors.stateName.length > 0 && (
									<span className="errorMessage">{formErrors.stateName}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="bloodGroup">Your Blood Group</label>
								<select required ref={(input) => this.bloodGroup = input} value={this.state.bloodGroup} onChange={this.handleChange.bind(this)} name='bloodGroup'>
									<option value="" selected disabled>Select</option>
									<option value="O+">O+</option>
									<option value="O-">O-</option>
									<option value="A-">A-</option>
									<option value="A+">A+</option>
									<option value="B-">B-</option>
									<option value="B+">B+</option>
									<option value="AB+">AB+</option>
									<option value="AB-">AB-</option>
								</select>
								{formErrors.bloodGroup.length > 0 && (
									<span className="errorMessage">{formErrors.bloodGroup}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="labConfirmedCovid">Covid confirmed by an authorized lab previously?</label>
								<select required ref={(input) => this.menu = input} value={this.state.labConfirmedCovid} name="labConfirmedCovid" onChange={this.handleChange.bind(this)}>
								<option value="" selected disabled>Select</option>
									<option value="1" >YES</option>
									<option value="0">NO</option>
								</select>
								{formErrors.labConfirmedCovid.length > 0 && (
									<span className="errorMessage">{formErrors.labConfirmedCovid}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="followUpNegReport">Have you received your follow up negative report?</label>
								<select required ref={(input) => this.followUpNegReport = input} value={this.state.followUpNegReport} name="followUpNegReport" onChange={this.handleChange.bind(this)}>
								<option value="" selected disabled>Select</option>
									<option value="1">YES</option>
									<option value="0">NO</option>
								</select>
								{formErrors.followUpNegReport.length > 0 && (
									<span className="errorMessage">{formErrors.followUpNegReport}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="vaccineReceived">Are you vaccinated against Covid?</label>
								<select required ref={(input) => this.vaccine = input} value={this.state.vaccineReceived} name="vaccineReceived" onChange={this.handleChange.bind(this)}>
								<option value="" selected disabled>Select</option>
									<option value="1">YES</option>
									<option value="0">NO</option>
								</select>
								{formErrors.vaccineReceived.length > 0 && (
									<span className="errorMessage">{formErrors.vaccineReceived}</span>
								)}
							</div>
								 <div className="name">
									<label htmlFor="availability">Are you available to donate right now?</label>
									<select required ref={(input) => this.availability = input} value={this.state.availability} name="availability" onChange={this.handleChange.bind(this)}>
										<option value="" selected disabled>Select</option>
										<option value="1">YES</option>
										<option value="0">NO</option>
									</select>
									{formErrors.availability.length > 0 && (
										<span className="errorMessage">{formErrors.availability}</span>
									)}
							</div>
							<div className="name">
								<label htmlFor="lastSymptomDate">Last date of any symptom</label>
								<input
									type="date"
									className={formErrors.lastSymptomDate.length > 0 ? "error" : null}
									placeholder="Last Symptom Date"
									name="lastSymptomDate"
									required
									value={this.state.lastSymptomDate}
									onChange={this.handleChange}
								/>
								{formErrors.lastSymptomDate.length > 0 && (
									<span className="errorMessage">{formErrors.lastSymptomDate}</span>
								)}
							</div>
							<div className="name">
								<label htmlFor="past14Days">Has is it been 14 days since you last observed any symptom?</label>
								<select required ref={(input) => this.past14Days = input} value={this.state.past14Days} name="past14Days" onChange={this.handleChange.bind(this)}>
									<option value="" selected disabled>Select</option>
									<option value="1">YES</option>
									<option value="0">NO</option>
								</select>
								{formErrors.past14Days.length > 0 && (
									<span className="errorMessage">{formErrors.past14Days}</span>
								)}
							</div>
							
							<div className="editpage">
								<button type="submit">Submit</button>
							</div>
							
							<div className="editpage">
								<button type="submit" onClick={this.handleCancel.bind(this)}>Cancel</button>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		)
	}
}
export default withRouter(DonorRegister);