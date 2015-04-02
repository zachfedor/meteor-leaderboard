/**
 * Leaderboard
 *
 * author: zachfedor
 * url: https://github.com/zachfedor/meteor-leaderboard
 * license: MIT
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
        'otherHelper': function()
        {
            return "other helper text";
        }
    });

    Template.leaderboard.events({
        'click .player': function()
        {
            console.log("you clicked a player");
        }
    });
}
else if ( Meteor.isServer )
{
    console.log("hello server");
}
