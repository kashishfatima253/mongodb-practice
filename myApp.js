require('dotenv').config();
let mongoose = require('mongoose')
let mongoURI = process.env['MONGO_URI']
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
let Person;
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
Person = mongoose.model('Person', personSchema);

let createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
let arrayOfPeople = [
  {name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
  {name: "Kashish Fatima", age: 23, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
  {name: "Aafia Azhar", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function (err,data){
    if(err){
      return console.error(err);
    }
      done(null /*, data*/);
  })
};

// let personName = "Kashish Fatima"
const findPeopleByName = (personName, done) => {
  
  Person.find({
    name:personName
    },function (err,data){
    if(err){
      return console.error(err)
    }
  done(null ,data);
  })
};

const findOneByFood = (food, done) => {

  Person.findOne({
    favoriteFoods:food
  }, function (err,data){
    if(err){
      return console.error(err)
    }
  done(null , data);
  })
};

const findPersonById = (personId, done) => {

  Person.findById({
    _id: personId
  }, function (err,data){
    if(err){
      return console.error(err)
    }
  done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id:personId}, function(err,data){
    data.favoriteFoods.push(foodToAdd)

    data.save((err,data) => {
      if(err){
        return console.error(err)
      }
      done(null , data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name: personName
  },{
    age: ageToSet
  }, { new: true }, (err,data)=>{
    if(err){
      return console.error(err)
    }
  done(null , data);
  })

};

const removeById = (personId, done) => {

  Person.findByIdAndRemove({
    _id : personId
  },(err,data)=>{
    if(err) return console.error(err)
    done(null , data);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  },(err,data)=>{
    if(err) return console.error(err)
    done(null , data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  const findPerson = 
    Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if(!err) {
      done(null, data);
      console.log(`Chained  Successfully. Results: ${data}`)
      } else {
        console.log(err);
      };
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
