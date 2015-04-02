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
}
else if ( Meteor.isServer )
{
    console.log("hello server");
}
