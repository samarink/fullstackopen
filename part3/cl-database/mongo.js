const mongoose = require('mongoose');

const passedArgs = process.argv.slice(2);
const argLen = passedArgs.length;

const [password, name, number] = passedArgs;

if (!argLen) {
  console.log('not enough arguments');
  process.exit(1);
}

const url = `mongodb+srv://tonisean:${password}@cluster0.v3twf.mongodb.net/fullstack?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (argLen === 3) {
  const person = new Person({ name, number });

  person.save().then((res) => {
    console.log(res);
    mongoose.connection.close();
  });
} else if (argLen === 1) {
  Person.find({}).then((res) => {
    res.forEach((c) => console.log(c));
    mongoose.connection.close();
  });
}
