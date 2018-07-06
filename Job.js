import React from 'react';
import JobDetailsModal from './JobDetailsModal';




class Job extends React.Component
{

	constructor(props) {
		super(props);
		this.state = {
			search: '',
			jobs: props.jobs, 
			show: false

		};
	}



//Handle opening and closing of more details modal
handleClose = () => {
	this.setState({ show: false });
}
handleShow = () => {
	this.setState({ show: true });
}



render()

{

	return (
		<div className="job">
		<div className="job_info">
		<p><strong>{this.props.job.name} based in {this.props.job.location}</strong></p> 
		<p>{this.props.job.description.substring(0,160) + "..."}</p>
		<JobDetailsModal show={this.state.show} handleClose={this.handleClose} jobName={this.props.job.name} jobDescription={this.props.job.description} jobDate={this.props.job.date} jobLocation={this.props.job.location}/>
		</div>
		<div className="job_info_bottom">
		<button className="job_button" onClick={this.handleShow}>
		More details
		</button>
		</div>
		</div>
		)
}


}

export default Job;