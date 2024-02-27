const Contact = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('contact', {
    contact: {}
  });
};

exports.register = async (req,res) =>{
    try{
        const contact = new Contact(req.body);
        await contact.register();
    
        if(contact.errors.length > 0){
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contact Save with Success');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
        return;
    }
};

exports.editIndex = async function(req, res){
  if(!req.params.id) return res.render('404');

  const contact = await Contact.searchId(req.params.id);
  if(!contact)  return res.render('404');

  res.render('contact', { contact });
};

exports.edit = async function(req, res){

  try{
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);
    
    if(contact.errors.length > 0){
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
  }
  
  req.flash('success', 'Contact Edit with Success');
  req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
  return;
    
  } catch(e) {
    console.log(e);
    req.render('404');
  }
}
