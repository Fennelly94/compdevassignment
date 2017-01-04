    import React from 'react';
    import ReactDOM from 'react-dom';
    import PlayerCatalogueApp from './App';
	import QuestionItem from './questionPage';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
	import { Router, Route, IndexRoute, browserHistory } from 
'react-router';
	import PlayerDetail from './PlayerDetail';
	import Players from  './Data';
	import './index.css';
	
	var App = React.createClass({
      render : function() {
        return (
          <div>
            <h1><b>Real Madrid Football Team</b></h1>
			
			<p> </p>
			<p> </p>
            {this.props.children}
          </div>
        )
      }
    });
	var Question = React.createClass({
      render : function() {
        return (
          <div>
            <h2><b>Real Madrid Fan Community Questions Page</b></h2>
			
			
			
			<p> </p>
            {this.props.children}
          </div>
        )
      }
    });
	
    ReactDOM.render( (
	
	<Router history={browserHistory} >
	
	<Route path="/" component={App}>
	<IndexRoute component={PlayerCatalogueApp} />
	<Route path="players/:id" component={PlayerDetail} />
	</Route>
	
	<Route path="/players/" component={App}>
	<IndexRoute component={PlayerCatalogueApp} />
	<Route path="/players/" />
	</Route>
	
	<Route path="/questionPage/" component={Question}>
	<IndexRoute component={QuestionItem} />
	<Route path="/questionPage/" />
	</Route>
	
	
	</Router>
	),
      document.getElementById('root')
    );