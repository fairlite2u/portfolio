/// Dice example from Ch 5 rewritten as a constructor function:
const Dice = function(sides=6){
    this.sides = sides;
    this.roll = function() {
        return Math.floor(this.sides * Math.random() + 1)
    }
}

const redDice = new Dice();
const whiteDice = new Dice(4);

// Dice example rewritten using a class declaration (preferred method):
class Dice {
    constructor(sides=6) {
        this.sides = sides;
    }

    roll() {
        return Math.floor(this.sides * Math.random() + 1)
    }
    // add a static method
    static description() {
        return 'A way of choosing random numbers'
    }
}

const blueDice = new Dice(20);

// Prototypal Inheritance
class Turtle {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
}

const leo = new Turtle('Leonardo');

// Add new properties by assignment:
Turtle.prototype.weapon = 'Hands';

// Add a method:
Turtle.prototype.attack = function() {
    return `Feel the power of my ${this.weapon}!`;
}

const raph = new Turtle('Raphael');

const don = new Turtle('Donatello');

// Change the value of a prototype property:
Turtle.prototype.weapon = 'Feet';

// Set own weapon properties for individuals:
leo.weapon = 'Katana Blades';
raph.weapon = 'Sai';
don.weapon = 'Bo Staff';

// The prototype can be used to add any new properties and methods after the class has been declared. 
// It should be used to define any properties that will remain the same for every instance of the class. 
Turtle.prototype.food = 'Pizza';

Turtle.prototype.eat = function() {
    return `Mmm, this ${this.food} tastes great!`;
}

const mike = new Turtle('Michelangelo');


// Demonstrating Private vs Public
class Turtle {
    constructor(name, color) {
        this.name = name;
        // _color is now private and not accessible outside of the class
        let _color = color;
        // The getColor and setColor methods control access to _color
        this.setColor = color => { 
            // make sure color property is a string
            if(typeof color === 'string'){
                return _color = color;
            } else {
                throw new Error('Color must be a string');
            }
         }
        this.getColor = () => _color;
    }
}

// Inheritance using extends
// Class for normal turtle
class Turtle {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    swim() {
        return `${this.name} paddles in the water`;
    }
}

// Sub-class or child class for Ninja Turtle
class NinjaTurtle extends Turtle {
    constructor(name) {
        super(name);
        this.weapon = 'hands';
    }
    attack() { return `Feel the power of my ${this.weapon}`};
}

// Using Getters and Setters
class Dice {
    constructor(sides=6) {
        Object.defineProperty(this, 'sides', {
            get() {
                return `This dice has ${sides} sides`;
            },
            set(value) {
                if (value > 0) {
                    sides = value;
                    return sides;
                } else {
                    throw new Error('The number of sides must be positive');
                }
            }
        });
        this.roll = function() {
            return Math.floor(side * Math.random() +1)
        }
    }
}

// Creating Objects from other Objects
const Human = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('Walking');
    }
}

const lois = Object.create(Human);
lois.name = 'Lois Lane';
lois.job = 'Reporter';

// Done at once but unwieldly
const jimmy = Object.create(Human, {name: {value: 'Jimmy Olsen', enumerable: true }, job: {value: 'Photographer', enumerable: true} });

// Object-based inheritance
const Superhuman = Object.create(Human);
Superhuman.change = function() {
    return `${this.realName} goes into a phone box and comes out as ${this.name}!`;
};
// create the default values in the prototype so the method will still work
Superhuman.name = 'Name needed';
Superhuman.realName = 'Real name needed';

const superman = Object.create(Superhuman);
superman.name = 'Superman';
superman.realName = 'Clark Kent';
superman.change();

// Add an init() method to the object to accept initialization properties
Superhuman.init = function(name, realName) {
    this.name = name;
    this.realName = realName;
    this.init = undefined; // this line removes the init function so it can only be called once
    return this;
}

const batman = Object.create(Superhuman);
batman.init('Batman', 'Bruce Wayne');

// Chaining the init() method call to the new object
const aquaman = Object.create(Superhuman).init('Aquaman', 'Arthur Curry');


// Mixin function to create deep copies of objects instead of shallow
function mixin(target, ...objects) {
    for (const object of objects) {
        if(typeof object === 'object') {
            for (const key of Object.keys(object)) {
                if (typeof object[key] === 'object') {
                    target[key] = Array.isArray(object[key]) ? [] : {};
                    mixin(target[key], object[key]);
                } else {
                    Object.assign(target, object);
                }
            }
        }
    }
    return target;
}

const a = {}, b = { foo: 'bar' }, c = { numbers: [1,2,3] };
mixin(a,b,c);
c.numbers.push(4);
a.numbers; // [1,2,3]
c.numbers; // [1,2,3,4]

// Using mixins to add properties
const wonderWoman = Object.create(Superhuman);
mixin(wonderWoman, { name: 'Wonder Woman', realName: 'Diana Prince' });

// You can also use the mixin() function to create a copy() method that can be used to make an exact, deep copy of an object.
function copy(target) {
    const object = Object.create(Object.getPrototypeOf(target));
    mixin(object, target);
    return object;
}
// create a clone of the superman object
const bizarro = copy(superman); // Since this is a deep copy and changes to the superman or bizarro objects will not affect each other

// Factory functions are functions that can be used to return objects
function createSuperhuman(...mixins) {
    const object = copy(Superhuman);
    return mixin(object,...mixins);
}

const hulk = createSuperhuman({name: 'Hulk', realName: 'Bruce Banner'});
hulk.change(); // 'Bruce Banner goes into a phone box and comes out as Hulk!'

// Using the mixin function to add modular functionality
const flight = {
    fly() {
        console.log(`Up, up and away! ${this.name} soars through the air!`);
        return this;
    }
}

const superSpeed = {
    move() {
        console.log(`${this.name} can move faster than a speeding bullet!`);
        return this;
    }
}

const xRayVision = {
    xray() {
        console.log(`${this.name} can see right through you!`);
        return this;
    }
}

mixin(superman, flight, superSpeed, xRayVision);
mixin(wonderWoman, flight, superSpeed);

// Add the mixins as an argument to the createSuperhero() factory function
const flash = createSuperhuman({name: 'Flash', realName: 'Barry Allen'}, superSpeed);

// Chaining functions with return value of 'this'
superman.fly().move().xray(); // Drawback to this is can make code difficult to debug


// Binding this - 'this' can lose scope when functions are nested inside of other functions, as shown below:
superman.friends = [batman, wonderWoman, aquaman];
superman.findFriends = function() {
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${this.name}`);
    });
}
superman.findFriends();
// Batman is friends with undefined
// Wonder Woman is friends with undefined
// Aquaman is friends with undefined

// To fix the problem try one of these solution:
// Use that=this, and refer to that in the nested function:
superman.findFriends = function() {
    const that = this;
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${that.name}`);
    });
}
superman.findFriends();
// Batman is friends with Superman
// Wonder Woman is friends with Superman
// Aquaman is friends with Superman

// Use bind(this) to set the value of this in the function: 
superman.findFriends = function() {
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${this.name}`);
    }.bind(this))
}
superman.findFriends();

// Use for-of instead of forEach():
superman.findFriends = function() {
    for(const friend of this.friends) {
        console.log(`${friend.name} is friends with ${this.name}`);
    };
}
superman.findFriends();

// Use Arrow functions:
superman.findFriends = function() {
    this.friends.forEach((friend) => {
        console.log(`${friend.name} is friends with ${this.name}`);
    });
}
superman.findFriends();

// Borrow methods from prototypes by making a reference to the function that you want to borrow from
const fly = superman.fly;
fly.call(batman); // Up, up and away! Batman soars through the air!
