import * as s3 from '../tools/s3';
import * as Country from '../../model/country'
import * as Image from '../../model/image'
import getDefaultFlag from '../tools/getDefaultFlag';


export async function list(req, res) {
  try {
    const countries = await Country.list();
    res.render('countries/index', {countries});
  }
  catch(e) {
    res.flash('danger', e.message);
    res.redirect('/');
  }
}

export async function load(req, res) {
  try {
    const id = req.params.id;
    const countries = await Country.list();
    const country = await Country.load(id);
    
    res.render('countries/index', {
      countries,
      country,
      isEditForm: true,
    });
  }
  catch(e) {
    res.flash('danger', `Error: ${e.message}`);
    res.redirect('/countries');
  }
}

export async function create(req, res) {
  try {
    const { body, files} = await req;
    const countryId = await Country.create(body);
    const image = files.image || getDefaultFlag();
    const { link } = await s3.upload(image,  countryId);
    await Image.add(countryId, link);
    
    res.flash('success', `${body.name} added`);
    res.redirect('/countries');
    
  }
  catch (e) {
    res.flash('danger', `Error: ${e.message}`);
    res.redirect('/countries');
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { body, files } = req;
    await Country.update(body, id);
    
    if (files.image) {
      await s3.remove(id);
      const { link } = await s3.upload(files.image, id);
      await Image.update(id, link);
    }
    res.flash('success', `${body.name} updated`);
    res.redirect('/countries');
  }
  catch (e) {
    res.flash('danger', `Error: ${e.message}`);
    res.redirect('/countries');
  }
}

export async function remove(req, res)  {
  try {
    const id = req.params.id;
    
    await s3.remove(id);
    await Country.remove(id);
    
    res.flash('success', `Country deleted`);
    res.redirect('/countries');
  }
  catch (e) {
    res.flash('danger', `Error: ${e.message}`);
    return res.redirect('/countries');
  }
}