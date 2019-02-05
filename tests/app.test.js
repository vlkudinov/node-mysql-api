import request from 'supertest';
import path from 'path';
import fs from 'fs';
import bufferToBase64 from '../app/tools/bufferToBase64'
import app  from '../app';
import {pool} from '../config/db';
import countries from './fixtures/countries'
import spain from './fixtures/spain'

describe('Test database connection',  () => {
  
  test('select rows', async() => {
    const users = await pool.query('SELECT * FROM users');
    expect(users[0].username).toBe('admin');
  });
});

describe('Test authentification', function() {
  test('redirect to login page on unrecognised login', async function() {
    const response = await request(app).post('/login').query({ username: 'user', password: '12345' });
    expect(response.headers.location).toBe('/')
  });
  test('redirect to login page on wrong password', async function() {
    const response = await request(app).post('/login').query({ username: 'admin', password: '1234' });
    expect(response.headers.location).toBe('/')
  });
  test('redirect to countries page on success auth', async function() {
    const response = await request(app).post('/login').query({ username: 'admin', password: '12345' });
    expect(response.headers.location).toBe('/countries');
    });
  test('redirect from restricted page', async function() {
    const response = await request(app).post('/countries').query({ username: 'admin', password: '1234' });
    expect(response.headers.location).toBe('/')
  });
});


describe('CRUD api', () => {
  let id;
  afterAll(async() => {
    pool.release();
  });
  test('get countries',  async () => {
    const response = await request(app).get('/api/countries').set('Accept', 'application/json');
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(countries);
  });
  test('get country',  async () => {
    const response = await request(app).get('/api/countries/1').set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(spain);
  });
  test('add country',  async () => {
    const brazilFlag = fs.readFileSync(path.join(__dirname, '../images', 'brazil.jpg'));
    const brazilFlagBase64 = bufferToBase64(brazilFlag);
    const response = await request(app).post('/api/countries').set('Accept', 'application/json')
      .field( 'name', 'Brazil')
      .field( 'capital', 'Brasília',)
      .field('area', 8515767,)
      .field('population', 210147125,)
      .field('language', 'Portuguese',)
      .field( 'gdp', '$2.139 trillion',)
      .field('gini', 51.3,)
      .field( 'hdi', 0.759)
      .field( 'image', brazilFlagBase64);
    id = response.body.id;
    expect(response.statusCode).toBe(200);
  });
  test('edit country',  async () => {
    const MexicoFlag = fs.readFileSync(path.join(__dirname, '../images', 'mexico.jpg'));
    const MexicoFlagBase64 = bufferToBase64(MexicoFlag);
    const response = await request(app).patch(`/api/countries/${id}`).set('Accept', 'application/json')
    .field( 'name', 'Mexico')
    .field( 'capital', 'Mexico City')
    .field('area', 1972550)
    .field('population', 123675325)
    .field('language', 'Spanish')
    .field( 'gdp', '$2.498 trillion')
    .field('gini', 48.2)
    .field( 'hdi', 0.774)
    .field( 'image', MexicoFlagBase64);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
  test('delete country',  async () => {
    const response = await request(app).delete(`/api/countries/${id}`).set('Accept', 'application.json');
    expect(response.statusCode).toBe(200);
  });
});