var knex = require('./knex');

function Scores() {
  return knex('high_scores');
}

module.exports = {
  getHighScores: function(){
    return Scores().select()
                   .where('score', '!=', 0)
                   .limit(10)
                   .orderBy('score', 'desc');
  },
  addScore: function(input){
    return Scores().insert(input);
  }
}