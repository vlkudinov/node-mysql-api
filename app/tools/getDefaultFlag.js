import fs from 'fs';
import path from 'path';

export default () => {
  const defaultFlag = fs.readFileSync(path.join(__dirname, '../../images', 'default.jpg'));
  return ({ data: defaultFlag});
}