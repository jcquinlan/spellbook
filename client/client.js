Meteor.subscribe('spells');
Meteor.subscribe('characters');



// Logged Layout ----------------------- Logged Layout
Template.loggedLayout.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout(function(err){
            if(err){
                console.log(err);
            } else {
                console.log('Logging out.');
                Router.go('login');
            }
        });
    }
});

// Register ---------------------------- Register
Template.register.events({
    'click [type="submit"]': function(event){
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var verify_password = $('#verify-password').val();
        var email = $('#email').val();

        if(password === verify_password){
            Accounts.createUser({ email: email, username: username, password: password }, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Account created.');
                    username = $('#username').val('');
                    password = $('#password').val('');
                    verify_password = $('#verify-password').val('');
                    email = $('#email').val('');
                    Router.go('dashboard');
                }
            });
        }
    }
});

// Login ------------------------------- Login
Template.login.events({
    'click [type="submit"]': function(event){
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                console.log(err);
                Session.set('loginErr', err.reason);
                $('#username').val('');
                $('#password').val('');
            } else {
                console.log('Logging in.');
                Session.set('loginErr', '');
                Router.go('dashboard');
            }
        });
    }
});
Template.login.helpers({
    error: function(){
        return Session.get('loginErr');
    }
});

// Home -------------------------------- Home
Template.loggedLayout.onRendered(function(){
    $(".button-collapse").sideNav();
});
Template.dashboard.helpers({
    'spells': function(){
        return Spells.find();
    }
});

// Characters ------------------------- Characters
Template.characters.onRendered(function(){
    $('.modal-trigger').leanModal();
    $('select').material_select();
});

Template.characters.helpers({
    characters: function(){
        return Characters.find({ createdBy: Meteor.userId() });
    }

});

Template.characters.events({
    'click [type="submit"]': function(event){
        event.preventDefault();

        var name = $('#new-character-name').val();

        if(name != ''){
            Meteor.call('addCharacter', name, function(err){
                if(err){
                    console.log(err);
                    Session.set('newCharacterError', err.error);
                } else {
                    console.log('New character added.');
                    $('#new-character-name').val('');
                    $('#new-character').closeModal();
                }
            });
        }
    }
});
