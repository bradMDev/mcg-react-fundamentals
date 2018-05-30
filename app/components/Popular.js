var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// If all your component has is a render method, you can use a different syntax,
// ...it's called a 'stateless functional component'
// We no longer have access to 'this' - it'll be undefined
function SelectLanguage (props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
    <ul className='languages'>
			{languages.map(function(lang) {
	      // Need the parentheses if returning JSX. If parentheses are not used,
	 		 	// ...JavaScript will insert a semi-colon after return.
			 	// ...You could also put the opening tag on the same line as the return
		  	// ...instead but that does not look as good.
		    return (
		      <li 
			      style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
			     	onClick={props.onSelect.bind(null, lang)}
			     	key={lang}>
			   		{lang}
			    </li>
		    )
		  // Set the context that the function should be invoked in
	    }, this)}
		</ul>
	)
}

function RepoGrid (props) {
  return (
		<ul className='popular-list'>
			{props.repos.map(function(repo, index) {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor(props) {
  	// Always call super when creating a constructor in React
  	super(props);
  	this.state = {
			 selectedLanguage: 'All',
			 repos: null
  	};
  	// bind the updateLanguage function to the 'this',
  	// ...bind it to the component instance
  	this.updateLanguage = this.updateLanguage.bind(this);
	}
	
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

  updateLanguage(lang) {
  	// 'this' is not known until the function is called,
  	// ...bind it in the constructor above
  	this.setState(function () {
  		return {
				selectedLanguage: lang,
				repos: null
  		}
		});
		
		api.fetchPopularRepos(lang)
			.then(function(repos) {
				console.log(repos);
				this.setState(function() {
					return {
						repos: repos
				  }
				})
			}.bind(this));
  }

	render() {
		return (
	    <div>
	    	<SelectLanguage
	    		selectedLanguage={this.state.selectedLanguage}
	    		onSelect={this.updateLanguage}
	    	/>
				{!this.state.repos
					? <p>LOADING</p>
					: <RepoGrid repos={this.state.repos} />}
	    </div>
	  )
	}
}

module.exports = Popular;






/*class SelectLanguage extends React.Component {
	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

		return (
		  <ul className='languages'>
			  {languages.map(function(lang) {
			  	// Need the parentheses if returning JSX. If parentheses are not used,
			  	// ...JavaScript will insert a semi-colon after return.
			  	// ...You could also put the opening tag on the same line as the return
			  	// ...instead but that does not look as good.
			    return (
			      <li 
			       	style={lang === this.props.selectedLanguage ? { color: '#d0021b' } : null}
			      	onClick={this.props.onSelect.bind(null, lang)}
			      	key={lang}>
			    		{lang}
			      </li>
			    )
			  // Set the context that the function should be invoked in
		    }, this)}
		  </ul>
		)
	}
}*/