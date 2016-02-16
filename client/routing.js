Router.route('/', function(){
    this.layout('unloggedLayout');
    this.render('home');
});

Router.route('/register', function(){
    this.layout('unloggedLayout');
    this.render('register');
});

Router.route('/login', function(){
    this.layout('unloggedLayout');
    this.render('login');
});

Router.route('/dashboard', function(){
    this.wait(Meteor.subscribe('spells'));
    this.layout('loggedLayout');
    if(this.ready()){
        this.render('dashboard');
    } else {
        this.render('loading');
    }

});

Router.route('/characters', function(){
    this.wait(Meteor.subscribe('spells'));
    this.layout('loggedLayout');
    if(this.ready()){
        this.render('characters');
    } else {
        this.render('loading');
    }
});

Router.route('/spell/:_id', function(){
    this.layout('loggedLayout');
    this.render('spellPage', {
        data: function(){
            return Spells.findOne({ _id: this.params._id });
        }
    });
});
