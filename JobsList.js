import React from 'react';
import Job from "./Job";


class JobsList extends React.Component
{

	constructor(props) {
		super(props);
		this.state = {
			search: '',
			locationSearch: '',
			jobs: props.jobs, 
			show: false,
			searchLimit: 6,
			jobButton: 'Load jobs',
			order: true,
			alternativeOrder: "Sort date ascending",
			reachedEndOfJobs: 0,
		};
	}

	// Fetches data from the API
	displayJobs = (event) => {
		let currentOrder = (this.state.order === true) ? "DESC" : "ASC";
		fetch('https://chamberscreative.co.uk/job_board/backend/endpoint.php?order='+currentOrder+'&request='+this.state.searchLimit, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				key: 'test',
			})
		})
		.then((response) => response.json())
		.then((res) => {
			if(event === "change_order")
			{
				this.setState({jobs: res});
			}

			else if(event === "display_jobs")
			{
				// Check the length of both the received JSON array and the current JSON array
				let newCount = Object.keys(res).length;
				let currentCount = Object.keys(this.state.jobs).length;

				// If the new received array is more than the current array, display extra jobs
				if (newCount >= currentCount)
				{
					this.setState({jobs: res});
					this.setState({searchLimit: this.state.searchLimit + 3});
					this.setState({jobButton: "Load more jobs"});
				}				

				// If the length of both the current array and the recieved array are the same, then the end of the DB has been reached.
				if (newCount === currentCount)
				{
					this.setState({reachedEndOfJobs: this.state.reachedEndOfJobs + 1});

					// If this happens more than once, display an error message (if it happened just once it could just be that the page has loaded).
					if(this.state.reachedEndOfJobs > 1)
					{
						this.setState({jobButton: "Sorry, no more jobs!"});
					}
				}

			}
		})
		.done();
	}
	

// Function for handling change of date ordering
handleOrder = () => {
	this.setState({order: !this.state.order});
	this.setState({alternativeOrder: this.state.order === true ? "Sort date ascending" : "Sort date descending"});
	this.displayJobs("change_order");
}

// Function for handling the search facility
updateSearch = (event) => {
	if (event.target.name === "nameSearch")
	{
		this.setState({search: event.target.value.substr(0,20)});
	}	
	if (event.target.name === "locationSearch")
	{
		this.setState({locationSearch: event.target.value.substr(0,20)});
	}	


}





render()

{
			//Simple search filter for job location and job name  
			let filteredJobs = this.state.jobs.filter(
				(job) => {
					return job.location.toLowerCase().indexOf(this.state.locationSearch.toLowerCase()) !== -1 && job.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
				}
				);

			return (
				<div className="row">
				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-sm-12">
				<div className="job_input_panel">
				<input type="input" 
				value={this.state.search}
				onChange={this.updateSearch.bind(this)}
				placeholder="search by job title"
				className="job_input"
				name="nameSearch"
				/>
				<input type="input" 
				value={this.state.locationSearch}
				onChange={this.updateSearch.bind(this)}
				placeholder="search by location"
				className="job_input"
				name="locationSearch"
				/>
				<button className="job_button" onClick={this.handleOrder}>{this.state.alternativeOrder}</button>
				</div>
				</div>
				<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-sm-12">
				<div className="jobs_list_container">
				{filteredJobs.map((job)=> {
					return <Job job={job} key={job.id} description={job.description}/>
				})}
				</div>
				<div className="jobs_page_bottom">
				<button className="job_button" onClick={() => this.displayJobs("display_jobs")}>{this.state.jobButton}</button>
				</div>
				</div>
				</div>
				)
		}


	}

	export default JobsList;