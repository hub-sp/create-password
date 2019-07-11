function create(len, charset) {
  if (isNaN(Number(len))) throw new TypeError('Number required for length!');
  const length = round(Number(len));
  if (!length || typeof length !== 'number' || length < 1) {
    console.log(length, typeof length);
    throw new TypeError('Number required for length!');
  }

  const MAX = 100000;

  if (length > MAX) return create(length - (length - MAX), charset);

  const CHAR_TABLE = {
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    alphanum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    special:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_+={}[]./\\,<>?\'":;'
  };

  const chars = CHAR_TABLE[charset] || CHAR_TABLE.alphanum;

  let pass = '';

  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  return pass;
}

function round(num) {
  return typeof num === 'number' && Math.round(num);
}

create.round = round;

module.exports = create;
