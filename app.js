import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import session from 'express-session';
import sessionConfig from './config/session';
import fileUpload from 'express-fileupload';
import flash from './app/middlewares/flash';
import cors from 'cors';
import appRoutes from './app/router';
import apiRoutes from './api/routes';
import passport from 'passport';
import passportConfig from './config/passport';
import aws from 'aws-sdk';

passportConfig(passport);

const app = express();

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use('/assets', express.static(path.join(__dirname, './app/assets')));
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());
app.use(flash());

app.use('/', appRoutes);
app.use('/api', apiRoutes);

aws.config.region = 'eu-west-1';

export default app;