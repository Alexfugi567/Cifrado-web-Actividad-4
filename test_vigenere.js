const { encryptCaesar, decryptCaesar, encryptVigenere, decryptVigenere, encryptColumnar, decryptColumnar, encryptXor, decryptXor } = require('./cipher.js');

function assertEqual(a, b, msg) {
  if (a !== b) {
    console.error('FAIL:', msg, '\n expected:', b, '\n got:', a);
    process.exitCode = 1;
  } else {
    console.log('OK:', msg);
  }
}

// Vigenere test
const plain = 'Hola, Mundo!';
const key = 'clave';
const enc = encryptVigenere(plain, key);
const dec = decryptVigenere(enc, key);
console.log('Plain:', plain);
console.log('Enc Vigenere:', enc);
console.log('Dec Vigenere:', dec);
assertEqual(dec, plain, 'Vigenere roundtrip');

// Caesar test
const p2 = 'abcXYZ';
const encC = encryptCaesar(p2, 3);
const decC = decryptCaesar(encC, 3);
console.log('Plain2:', p2);
console.log('Enc Caesar:', encC);
console.log('Dec Caesar:', decC);
assertEqual(decC, p2, 'Caesar roundtrip');

// Columnar test
const p3 = 'esteesuntexto';
const colKey = '3142';
const encCol = encryptColumnar(p3, colKey);
const decCol = decryptColumnar(encCol, colKey);
console.log('Plain3:', p3);
console.log('Enc Columnar:', encCol);
console.log('Dec Columnar:', decCol);
assertEqual(decCol, p3, 'Columnar roundtrip');

// XOR test
const p4 = 'secret';
const xorKey = 'k';
const encX = encryptXor(p4, xorKey);
const decX = decryptXor(encX, xorKey);
console.log('Plain4:', p4);
console.log('Enc XOR (hex):', encX);
console.log('Dec XOR:', decX);
assertEqual(decX, p4, 'XOR roundtrip');

console.log('Tests finished.');
