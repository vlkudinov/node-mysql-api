export default buffer => `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(buffer)))}`;
