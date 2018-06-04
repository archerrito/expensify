const person = {
    name: 'Archer',
    age: 33,
    location: {
        city: 'Dallas',
        temp: 94
    }
};

//default with renaming
const {name: firstNAme = 'Anonymous', age } = person;
//renaming
const {city, temp: temperature } = person.location;
// const name = person.name;
// const age = person.age;

console.log(`${person.name} is ${person.age}`);

console.log()

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holliday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = "Self-Published"} = book.publisher;

console.log(publisherName);

//

const address = ['1299 S Juniper Street',  'Philadelphia', 'Pennsylanvania', '19427'];

const [ , cityName, state = 'New York'] = address;

console.log(`You are in ${cityName} ${state}.`)

//

const item = ['Coffee (hot)', '$2.00', '$2.50','$2.75'];
const [coffee, smallPrice, mediumPrice, largePrice] = item;

console.log(`A medium ${coffee} costs ${mediumPrice}`);