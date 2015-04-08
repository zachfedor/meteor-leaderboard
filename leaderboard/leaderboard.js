/**
 * Leaderboard
 *
 * author: zachfedor
 * url: https://github.com/zachfedor/meteor-leaderboard
 */

/**
 * MongoDB
 */
PlayersList = new Mongo.Collection( 'players' );

if( Meteor.isClient )
{
    console.log( "hello client" );

    Template.leaderboard.helpers({
        'player': function()
        {
            var currentUserId = Meteor.userId();

            return PlayersList.find({ 
                createdBy: currentUserId },
                {sort: {score: -1, name: 1}
            });
        },
        'selectedClass': function()
        {
            var playerId = this._id;
            var selectedPlayer = Session.get( 'selectedPlayer' );
            if ( playerId == selectedPlayer ) {
                return "selected";
            }
        },
        'showSelectedPlayer': function()
        {
            var selectedPlayer = Session.get( 'selectedPlayer' );
            return PlayersList.findOne( selectedPlayer );
        }
    });

    Template.leaderboard.events({
        'click .player': function()
        {
            var playerId = this._id;
            Session.set( 'selectedPlayer', playerId );
        },
        'click .increment': function()
        {
            var selectedPlayer = Session.get( 'selectedPlayer' );
            if( selectedPlayer != null )
            {
                PlayersList.update( selectedPlayer, {$inc: {score: 5} });
            }
        },
        'click .decrement': function()
        {
            var selectedPlayer = Session.get( 'selectedPlayer' );
            if( selectedPlayer != null )
            {
                PlayersList.update( selectedPlayer, {$inc: {score: -5} });
            }
        },
        'click .remove': function()
        {
            var selectedPlayer = Session.get( 'selectedPlayer' );
            if( selectedPlayer != null )
            {
                var playerName = PlayersList.findOne( selectedPlayer ).name;
                if( confirm( "Do you really want to delete " + playerName + "?" ))
                {
                    PlayersList.remove( selectedPlayer );
                }
            }
        }
    });

    Template.addPlayerForm.events({
        'submit form': function( event )
        {
            event.preventDefault();
            //console.log( event.type );

            var playerNameVar = event.target.playerName.value;

            var playerScoreVar = event.target.playerScore.value;
            if( playerScoreVar % 1 === 0 )
            {
                playerScoreVar = parseInt( playerScoreVar, 10 );
            }
            else
            {
                playerScoreVar = 0;
            }

            var currentUserId = Meteor.userId();

            PlayersList.insert({
                name: playerNameVar,
                score: playerScoreVar,
                createdBy: currentUserId
            });

            event.target.playerName.value = '';
            event.target.playerScore.value = '';
        }
    });
}
else if ( Meteor.isServer )
{
    console.log( "hello server" );
}
