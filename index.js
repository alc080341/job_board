import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import JobsList from "./JobsList";

let jobs = [
];

class App extends React.Component
{



	render()

	{


		return (
			<div className="container-fluid">
			<div className="row">
			<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
			<div className="job_page_logo"><h3>Job Board</h3></div>
			</div>
			<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
			<div className="job_page_header_text">
			<h4>Recently posted jobs:</h4>
			</div>
			</div>
			</div>			
			<JobsList jobs={this.props.jobs} />
			</div>
			)
	}


}

ReactDOM.render(<App jobs={jobs}/>, document.getElementById('root'));
