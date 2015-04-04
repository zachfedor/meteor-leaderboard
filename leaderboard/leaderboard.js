/**
 * Leaderboard
 *
 * author: zachfedor
 * url: https://github.com/zachfedor/meteor-leaderboard
 */

/**
 * MongoDB
 */
PlayersList = new Mongo.Collection('players');

if( Meteor.isClient )
{
    console.log("hello client");

    Template.leaderboard.helpers({
        'player': function()
        {
            return PlayersList.find();
        },
        'selectedClass': function()
        {
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if ( playerId == selectedPlayer ) {
                return "selected";
            }
        }
    });

    Template.leaderboard.events({
        'click .player': function()
        {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        }
    });
}
else if ( Meteor.isServer )
{
    console.log("hello server");
}
