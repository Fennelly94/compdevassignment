    import React from 'react';
	import _ from 'lodash';
	import './App.css';
	import AllPlayers from  './Data';
	import { Link } from 'react-router'; 
	
	

  var SelectBox = React.createClass({
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
      render: function(){
          return (
		  
		  
                <div className="col-md-10">
				
				 <h4> Click below to buy tickets to see Real Madrid 
play! </h4>
					<p> <u><b><a 
href="http://www.realmadrid.com/en/tickets">Real 
Madrid Tickets!</a></b></u>
					</p>
					 <h4> Press on the link below to see the Madrid 
players in action last season! </h4>
					<p> <u><b><a 
href="https://www.youtube.com/watch?v=8pXtRXavA2s">Last Season highlights!</a></b></u>
					</p>
				<p><b><u>Enter a players name here: </u></b></p>
               <input type="text" placeholder="Type here to search..." 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
				 <p>              </p>
                 <p><b><u>   Search by: </u></b></p>
					
                  <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                       <option value="name">Alphabetical</option>
                       <option value="age">Youngest First</option>
                     </select>
					 
					 <p>
					 </p>
					 
					 
					
             </div>
               );
          }
       });
	   
	   
	   
	   
	var Player = React.createClass({
		
      render: function(){
		  
           return (
		   
                <li className="thumbnail player-listing">
				
                  <Link to={'/players/' + this.props.player.id} 
className="thumb"></Link>
				  
				  
				  <h2><Link to={'/players/' + this.props.player.id}> 
{this.props.player.name} <u><p><h4> Additional info 
</h4></p></u></Link></h2>
				  
				 

                  
				  <Link to={'/players/' + this.props.player.id} 
className="thumb2"><img 
src={"/playerSpecs/img/images/images/players/" + 
this.props.player.imageUrl} 
alt={this.props.player.name}  /> </Link>
				  
                <b> <h2> Player info: </h2></b>
				  
                 <b><p>{this.props.player.snippet}</p></b>
				  
                </li>
               ) ;
         }
     }) ;
	 
	 
	   
       var FilteredPlayerList = React.createClass({
            render: function(){
                var displayedPlayers = 
this.props.players.map(function(player) {
                  return <Player key={player.id} player={player} /> ;
                }) ;
                return (
                        <div className="col-md-10">
                          <ul className="players">
                              {displayedPlayers}
                          </ul>
                        </div>
                  ) ;
            }
        });

    var PlayerCatalogueApp = React.createClass({
		getInitialState: function() {
           return { search: '', sort: 'name' } ;
      },
      handleChange : function(type,value) {
        if ( type === 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
           render: function(){
               var list = AllPlayers.filter(function(p) {
                      return p.name.toLowerCase().search(
                             this.state.search.toLowerCase() ) !== -1 ;
                        }.bind(this) );  
               var filteredList = _.sortBy(list, this.state.sort) ;
         return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                 <div className="row">
                    <SelectBox onUserInput={this.handleChange } 
                           filterText={this.state.search} 
                           sort={this.state.sort} />
                     <FilteredPlayerList players={filteredList} />
                </div> 
                </div>                   
              </div>
            </div>
        );
      }
  });

    export default PlayerCatalogueApp;