//console.log(navigator.appVersion);

//****************  Basic Object Literal  ***********************
const book1 = {
    title: 'Book One',
    author: 'John Doe',
    year: '2013',
    getSummary: function() {
        return `${this.title} was written by ${this.author} in ${this.year} year`;//if we define them without this. keyword we get an error (just like contructor)
    }
};
console.log(book1.getSummary());
console.log(Object.keys(book1));
console.log(Object.values(book1));

//***************  Object With Constructor ES-5  ***************************
function Book() {
    console.log('Book Initialized..');
}

//Instantiate an object
const book2 = new Book();//when we instantiate from an object it is gonna run the method inside the constructor -->console.log('Book Initialized..');

function Book2(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function() {
        return `${this.title} was written by ${this.author} in ${this.year} year`;//if we define them without this. keyword we get an error (just like contructor)
    }
}

const book3 = new Book2('Book Three', 'Jane Doe', '2016');
console.log(book3.title);
console.log(book3.getSummary());

//It Should be better to define getSummary function in the Book2 prototype method so

function Book3(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

//Get Summary
Book3.prototype.getSummary = function() {
    return `${this.title} was written by ${this.author} in ${this.year} year`;
};

//Get Age
Book3.prototype.getAge = function() {
    const instantYear = new Date().getFullYear() - this.year;
    return `${this.title} is ${instantYear} year(s) old`;
};

//Revise / Change Year
Book3.prototype.revise = function(newYear) {
    this.year = newYear;
    this.revised = true;//Here we are manupilate the data. there is no actually revised property in constructor, we define new property here 
};

const book4 = new Book3('Book Four', 'Janet Doe', '2009');
console.log(book4.title);
console.log(book4.getSummary());
console.log(book4.getAge());
console.log(book4);
book4.revise('2018');
console.log(book4);//revise property comes in

//Inheritance
//magazine constructor
function Magazine (title, author, year, month) {
    Book3.call(this, title, author, year);
    this.month = month;
}
//Initiate magazine object
const mag1 = new Magazine('Mag One', 'Joe Doe', '2015', 'Jan');
console.log(mag1);
//console.log(mag1.getSummary());//this return error becouse we didn't inherit the prototype yet

//inherit the prototype
Magazine.prototype = Object.create(Book3.prototype);

const mag2 = new Magazine('Mag Two', 'Jane Doe', '2016', 'Feb');
console.log(mag2);
console.log(mag2.getSummary());
//Now its using Book3 constructor to change this to Magazine
Magazine.prototype.constructor = Magazine;
console.log(mag2);

//****************  Different Ways Of Creating Objects  ************************

//Object of Protos
const bookProtos = {
    getSummary: function() {
        return `${this.title} was written by ${this.author} in ${this.year} year`;
    },
    getAge: function() {
        const instantYear = new Date().getFullYear() - this.year;
        return `${this.title} is ${instantYear} year(s) old`;
    }
}

//Create Object
const book5 = Object.create(bookProtos);//we paste in the prototypes
//and then add properties
book5.title = 'Book Five';
book5.author = 'Janet Doe';
book5.year = '2005';

console.log(book5);
//or

const book6 = Object.create(bookProtos, {
    title:{value:'Book Six'},
    author:{value:'James Doe'},
    year:{value:'2006'}
});

console.log(book6);

//***************  Object With ES-6 - Classes ************************************

class Book4 {
    constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    }
    getSummary() {
        return `${this.title} was written by ${this.author} in ${this.year} year`;
    }
    getAge() {
        const instantYear = new Date().getFullYear() - this.year;
        return `${this.title} is ${instantYear} year(s) old`;
    }
    revise(newYear) {
        this.year = newYear;
        this.revised = true;//Here we are manupilate the data. there is no actually revised property in constructor, we define new property here 
    }
    static topBookStore() {
        console.log('Barnes & Noble');
    }//This is a static method we can't call them from instances
}

//Initiate the object
const book7 = new Book4('Book Seven', 'James Dane', '2010')
book7.revise('2019');
console.log(book7);

//book7.topBookStore(); //--> it gives error
Book4.topBookStore();

//Let's look at creating Magazine sub classes
class Magazine1 extends Book4 {
    constructor(title, author, year, month) {
        super(title, author, year);
        this.month = month;
    }
}

const mag3 = new Magazine1('Magazine Three', 'Elliott', '2019', 'Dec');
console.log(mag3);
console.log(mag3.getSummary()); //it returns the result as you see we inherited the prototype also
//We do not need to make --> Magazine1.prototype = Object.create(Book4.prototype);