export default base64 => Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
