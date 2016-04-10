import React from "react";
import { Row, Col, Input, Thumbnail, Button } from "react-bootstrap";
import { WithContext as ReactTags } from "react-tag-input";
import thumb from "static/thumbnail.png";

function removeButton(props) {
	return <span {...props} className="ReactTags__remove-button">×</span>;
}

function Add() {
	return (
		<Row>
			<Col sm={4} smPush={8}>
				<Thumbnail alt="Image" src={thumb} className="full-width-image">
					<Button bsStyle="primary">Add</Button>&nbsp;
					<Button bsStyle="danger">Remove</Button>
				</Thumbnail>
				<ReactTags
					tags={[{ id: 1, text: "Jed Watson" }, { id: 2, text: "Chris Henderson" }]}
					suggestions={["Three", "Threesome"]}
					removeComponent={removeButton} />

			</Col>
			<Col sm={8} smPull={4}>
				<form>
					<Row>
						<Col xs={12}><h3>Basic Information</h3></Col>
						<Col sm={4}>
							<Input type="text" label="First Name" placeholder="First name" />
						</Col>
						<Col sm={2}>
							<Input type="text" label="MI" placeholder="MI" />
						</Col>
						<Col sm={6}>
							<Input type="text" label="Last Name" placeholder="Last name" />
						</Col>
						<Col sm={6}>
							<Input type="text" label="Alias" placeholder="Alias" />
						</Col>
						<Col sm={6}>
							<Input type="select" label="Gender">
								<option value="">Select one</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</Input>
						</Col>
						<Col sm={6}>
							<Input type="date" label="Date of Birth" />
						</Col>
						<Col sm={3}>
							<Input type="text" label="SSN" placeholder="SSN" />
						</Col>
						<Col sm={3}>
							<Input type="text" label="OLN" placeholder="OLN" />
						</Col>
						<Col xs={12}><h3>Identifying Information</h3></Col>
						<Col sm={4}>
							<Input type="text" label="Height" placeholder="Height" addonAfter="in" />
						</Col>
						<Col sm={4}>
							<Input type="text" label="Weight" placeholder="Weight" addonAfter="lbs" />
						</Col>
						<Col sm={4}>
							<Input type="select" label="Ethnicity">
								<option value="">Select one</option>
								<option value="white">White/Caucasian</option>
								<option value="black">Black</option>
								<option value="hispanic">Hispanic</option>
								<option value="asian">Asian/Pacific Islander</option>
								<option value="other">Other</option>
							</Input>
						</Col>
						<Col xs={12}>
							<Input type="textarea" label="Identifying marks" placeholder="Scars, marks, tattoos..." />
						</Col>
						<Col xs={12}><h3>Notes</h3></Col>
						<Col xs={12}>
							<Input type="textarea" label="Other Notes" placeholder="Important information, etc." />
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	);
}

Add.displayName = "Add";
Add.propTypes = {};

export default Add;
