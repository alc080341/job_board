import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';



class JobDetailsModal extends React.Component
{

	render()

	{
		return (
			<Modal show={this.props.show} onHide={this.props.handleClose}>
			<Modal.Header closeButton>
			<Modal.Title className="job_modal_text"><h3>{this.props.jobName} based in {this.props.jobLocation}</h3></Modal.Title>
			</Modal.Header>	
			<Modal.Body>
			<div className="job_modal_text">
				<p><strong>This position closes on: {this.props.jobDate}</strong></p>
				<p>{this.props.jobDescription}</p>
			</div>
			</Modal.Body>
			<Modal.Footer>
			<button className="job_modal_button" onClick={this.props.handleClose}>Close</button>
			</Modal.Footer>
			</Modal>

			)
	}


}

export default JobDetailsModal;