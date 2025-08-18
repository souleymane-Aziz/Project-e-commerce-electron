const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const EmployeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: 'role'
  }
});

EmployeSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

EmployeSchema.statics.login = async function (email, password) {
  const employe = await this.findOne({ email });
  if (employe) {
    const auth = await bcrypt.compare(password, employe.password);
    if (auth) {
      return employe;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

EmployeSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err.message);
  }
};

const EmployeModel = mongoose.model('employe', EmployeSchema);

module.exports = EmployeModel;