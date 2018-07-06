import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {JobsList} from "./JobsList";



class App extends React.Component
{



	render()

	{

		return (
			<JobsList />
			)
	}


}

ReactDOM.render(<App />, document.getElementById('root'));
