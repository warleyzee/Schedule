const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  suname:    { type: String, required: false, default: '' },
  email:     { type: String, required: false, default: '' },
  phone:     { type: String, required: false, default: '' },
  creadedIn: {type: Date, default: Date.now},
});

const contactModel = mongoose.model('contact', contactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.searchId = async function(id){
  if(typeof id !== 'string') return;
  const user = await contactModel.findById(id);
  return user;
}

Contact.prototype.register = async function () { 
  this.validation();

  if(this.errors.length > 0) return;
  this.contact = await contactModel.create(this.body);
};

Contact.prototype.validation = function() {
  this.cleanUp();

  // Validação
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.name) this.errors.push('Complete input Name, please!');
  if(!this.body.email && !this.body.phone){
    this.errors.push('Insert phone or email this contact');
  } 
}; 

Contact.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    suname: this.body.suname,
    email: this.body.email,
    phone: this.body.phone,
  };
}

Contact.prototype.edit = async function (id){
  if(typeof id !== 'string') return;
  this.validation();
  if(this.errors.length > 0) return;
  this.contact = await contactModel.findByIdAndUpdate(id, this.body, {new: true});
}

module.exports = Contact;
