 import _ from 'lodash';

    var questions = [
              { 
                id: 1,
                query : 'How many champions league Trophies have Real Madrid won this season?',
                subject : 'Gavin Fennelly',  
                questions : [],
                upvotes : 4
			  },
              
			  
			  {
                id: 2,
                query : 'What position are Real Madrid in the league this season?',
                subject : 'John Part',  
                questions : [],
                upvotes : 1

              }
			  
			  
          ] ;
		  


     var stubAPI = {
         getAll : function() {
            return questions ;
          },
         add : function(t,l) {
              var id = 1 ;
              var last = _.last(questions) ;
              if (last) {
                 id = last.id + 1 ;
              }
              var len = questions.length ;
              var newL_len = questions.push({ 
                  'id': id,  
                 query: t, subject : l, questions: [],upvotes: 0 }) ;
               return newL_len > len ;
              },
         upvote : function(id) {
             var index = _.findIndex(questions, 
                   function(question) {
                    return question.id === id;
                  } );      
             if (index !== -1) {                 
                  questions[index].upvotes = questions[index].upvotes + 1 ;
                  return true ;
                }
              return false ;
           }
		   
          }
    export default stubAPI ;