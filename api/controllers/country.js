import * as s3 from '../tools/s3';
import * as Country from '../../model/country';
import * as Image from '../../model/image';
import getDefaultFlag from '../tools/getDefaultFlag';
import base64ToBuffer from '../tools/base64ToBuffer';

export async function list(req, res) {
  try {
    const countries = await Country.list();

    res.status(200).json(countries);
  } catch (e) {
    res.status(404).json(e);
  }
}

export async function create(req, res) {
  try {
    const {body} = await req;
    const countryId = await Country.create(body);
    const image = body.image ? await {data: base64ToBuffer(body.image)} : await getDefaultFlag();

    const {link} = await s3.upload(image, countryId);
    await Image.add(countryId, link);

    res.status(200).json({id: countryId});
  } catch (e) {
    res.status(404).json(e);
  }
}

export async function load(req, res) {
  try {
    const id = req.params.id;
    const country = await Country.load(id);

    res.status(200).json(country);
  } catch (e) {
    res.status(404).json(e);
  }
}

export async function update(req, res) {
  try {
    const {id} = req.params;
    const {body} = req;
    await Country.update(body, id);

    if (body.image) {
      await s3.remove(id);
      const image = await {data: base64ToBuffer(body.image)};
      const {link} = await s3.upload(image, id);
      await Image.update(id, link);
    }
    res.status(200).json({});
  } catch (e) {
    res.status(404).json(e);
  }
}

export async function remove(req, res) {
  try {
    const id = req.params.id;

    await s3.remove(id);
    await Country.remove(id);

    res.status(200).json({});
  } catch (e) {
    res.status(404).json(e);
  }
}
