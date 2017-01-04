     import React from 'react';
    import _ from 'lodash';
    import api from './test/stubAPI';
	import { Link } from 'react-router'; 



  var Form = React.createClass({

       getInitialState: function() {
           return { query: '', subject: ''};
        },
		
       handleQueryChange: function(e) {
           this.setState({query: e.target.value});
       },
	   
       handleSubjectChange: function(e) {
           this.setState({subject: e.target.value});
       },
	   
	    handleSubmit: function(e) { {/* submit is the add button! */}
        e.preventDefault();
        var query = this.state.query.trim();
        var subject = this.state.subject.trim();
        if (!query ) {
          return;
        }
        this.props.addHandler(query,subject);
        this.setState({query: '', subject: ''});
       }, 
  
  render : function() {
           return (
		   
             <form style={{marginTop: '30px'}}>
			 
                <u><b><h3>Send a comment to the Real Madrid Fan 
Community Page here:</h3></b></u>
				
				<p>
				
				</p>
				
				
                <div className="form-group">
				
                  <input type="text" className="form-control" 
placeholder="Enter your comment here?" 
value={this.state.query} 
onChange={this.handleQueryChange}>
				  
				  </input>
				</div>
                <div className="form-group">
                  <input type="text" className="form-control" 
placeholder="Enter your name here?" 
value={this.state.subject} 
onChange={this.handleSubjectChange}>
				  </input>  
                </div>
                <button type="submit" className="btn btn-primary" 
onClick={this.handleSubmit}>Submit Question</button>
				
              </form>
			  
			    );
			
          }
		  
       });
  
   var QuestionItem = React.createClass({
		
			getInitialState : function() {
               return {
				   
                status : '',
                query: this.props.question.query,
                subject: this.props.question.subjectaddress,
               } ;
            },
			
			handleVote : function() {
          this.props.upvoteHandler(this.props.question.id);
        },
		
        render : function() {
			
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            var cursor = { cursor: 'pointer' } ;

			var line ;
			
              
			   
            return (
              <div >
			  
			   <span style={lineStyle} >{line}<span>
  
                  </span>
                </span>
<dl>
 <dt><span className="glyphicon glyphicon-thumbs-up"
                        onClick={this.handleVote}></span>
                   <b>{this.props.question.upvotes} - by {this.props.question.subject}</b></dt>
                  <dd><span style={lineStyle} >
                    {this.props.question.query}
                  </span>
				  </dd>
				  </dl>
              </div>  
        );
        }
       }) ;
	   
	  var QuestionsList = React.createClass({
        render : function() {
			
          var items = this.props.questions.map(function(question,index) {
             return <QuestionItem key={index} question={question} 
						upvoteHandler={this.props.upvoteHandler} /> ;
            }.bind(this) )
          return (
		  
		  
            <div>
			<br>
			</br>
			  
				 <b><u><Link to={'/players/'}>Go back to home 
page.</Link></u></b>
				 
				 
	


				 
				 
                  {items}
                  </div>
            );
        }
    }) ; 
	
    var ImagesSection = React.createClass({
		
      render: function(){
		  
            var thumbImages = 
this.props.player.images.map(function(img,index) {
              return (
                  <li>
                   <img key={index} src={"/playerSpecs/" + img}
                       alt="missing" />
                </li>
                ) ;
                } );
				
            var mainImage = (
              <div className="player-images">
             
                   
                   
            </div>
            ) ;
			
              return (
                  <div>
                   {mainImage}
                   <h2><i>{this.props.player.name}</i></h2>
                   <p>{this.props.player.description}</p> 
				   
                   <ul className="player-thumbs">
                       {thumbImages}
					   
                   </ul>
                  </div>
				  
                  );
          }
    })

    var PlayerDetail = React.createClass({
		
       getInitialState: function() {
           return { player: null };
       },
	   
	    addQuestion : function(t,l) {
            if (api.add(t,l)) {
             this.setState({});
			}
          },
	    incrementUpvote : function(questionId) {
            api.upvote(questionId) ;
           this.setState({});
      },    
      componentDidMount: function() {
		   
		   var url = '/playerSpecs/players/players/' + 
this.props.params.id + '.json';
		   console.log(url);   
          request.get(
             url, function(err, res) {
                 window.resp = res;
				 
				 
				 var json = JSON.parse(res.text);
                if (this.isMounted()) {
                    this.setState({ player : json});
          }
        }.bind(this));
      } ,
	  
      render: function(){
		  
		   var questions = _.sortBy(api.getAll(), function(question) {
         return - question;
             }
          );
		  
var display;

            var player = this.state.player ;
			
          if (player)
		  {
           display =  (
                <div>
                   <ImagesSection player={player} />
                   <Specification  player={player} />       
                </div>
                ) ;
             }
			 else
			 {
			display = <p></p> ; 
			 }
			 
            return (
                <div>
				
               {display}
			   
			 <QuestionsList questions={questions} 
                   upvoteHandler={this.incrementUpvote } />
            <li> <Form addHandler={this.addQuestion}  /> </li>
            </div>
            );
      }
    });

	
    export default PlayerDetail;