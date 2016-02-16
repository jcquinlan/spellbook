Meteor.startup(function(){
    if( Spells.find().count() === 0){
        spells.forEach(function(spell){
            Spells.insert(spell);
        });
    }
});

Meteor.publish('spells', function(){
    return Spells.find();
});

Meteor.methods({
    'addCharacter': function(name){
        Characters.insert({ createdBy: Meteor.userId(), name: name, createdAt: new Date(), spells: [] });
    }
});
