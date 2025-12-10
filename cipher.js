console.log("JS cargado");

// =================== CÉSAR ===================
function encryptCaesar(texto, desplazamiento) {
  desplazamiento = parseInt(desplazamiento) || 0;
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    let c = texto[i];
    if (c >= "A" && c <= "Z") {
      let code = ((c.charCodeAt(0) - 65 + desplazamiento) % 26 + 26) % 26 + 65;
      resultado += String.fromCharCode(code);
    } else if (c >= "a" && c <= "z") {
      let code = ((c.charCodeAt(0) - 97 + desplazamiento) % 26 + 26) % 26 + 97;
      resultado += String.fromCharCode(code);
    } else {
      resultado += c;
    }
  }
  return resultado;
}

function decryptCaesar(texto, desplazamiento) {
  return encryptCaesar(texto, -desplazamiento);
}

// =================== VIGENÈRE ===================
function normalizeKey(key, length) {
  let k = key.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (k.length === 0) return "A".repeat(length);
  let result = "";
  let i = 0;
  while (result.length < length) {
    result += k[i % k.length];
    i++;
  }
  return result;
}

function encryptVigenere(texto, clave) {
  let resultado = "";
  const lettersCount = (texto.match(/[A-Za-z]/g) || []).length;
  let key = normalizeKey(clave, lettersCount);
  let j = 0;

  for (let i = 0; i < texto.length; i++) {
    let c = texto[i];
    if (c.match(/[A-Za-z]/)) {
      let isUpper = c === c.toUpperCase();
      let base = isUpper ? 65 : 97;
      let p = c.toUpperCase().charCodeAt(0) - 65;
      let k = key[j].charCodeAt(0) - 65;
      let code = (p + k) % 26 + base;
      resultado += String.fromCharCode(code);
      j++;
    } else {
      resultado += c;
    }
  }
  return resultado;
}

function decryptVigenere(texto, clave) {
  let resultado = "";
  const lettersCount = (texto.match(/[A-Za-z]/g) || []).length;
  let key = normalizeKey(clave, lettersCount);
  let j = 0;

  for (let i = 0; i < texto.length; i++) {
    let c = texto[i];
    if (c.match(/[A-Za-z]/)) {
      let isUpper = c === c.toUpperCase();
      let base = isUpper ? 65 : 97;
      let p = c.toUpperCase().charCodeAt(0) - 65;
      let k = key[j].charCodeAt(0) - 65;
      let code = (p - k + 26) % 26 + base;
      resultado += String.fromCharCode(code);
      j++;
    } else {
      resultado += c;
    }
  }
  return resultado;
}

// =================== TRANSPOSICIÓN COLUMNAR ===================
// Clave: números que forman una permutación, por ejemplo "3142"
function encryptColumnar(texto, clave) {
  if (!clave || clave.length === 0) return texto;

  const cols = clave.length;
  const rows = Math.ceil(texto.length / cols);

  // Rellenar con 'X' hasta completar la matriz
  let padded = texto;
  while (padded.length < rows * cols) {
    padded += "X";
  }

  // Construir matriz por filas
  const matrix = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(padded[idx++]);
    }
    matrix.push(row);
  }

  // Orden de columnas según la clave (1..n)
  const order = [];
  for (let i = 0; i < cols; i++) {
    order.push({ digit: parseInt(clave[i]), index: i });
  }
  order.sort((a, b) => a.digit - b.digit);

  // Leer columnas en el orden indicado
  let resultado = "";
  for (const col of order) {
    for (let r = 0; r < rows; r++) {
      resultado += matrix[r][col.index];
    }
  }

  return resultado;
}

function decryptColumnar(texto, clave) {
  if (!clave || clave.length === 0) return texto;

  const cols = clave.length;
  const rows = Math.ceil(texto.length / cols);

  // Orden de columnas según la clave
  const order = [];
  for (let i = 0; i < cols; i++) {
    order.push({ digit: parseInt(clave[i]), index: i });
  }
  order.sort((a, b) => a.digit - b.digit);

  // Matriz vacía
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(""));

  // Rellenar por columnas en el orden cifrado
  let idx = 0;
  for (const col of order) {
    for (let r = 0; r < rows; r++) {
      matrix[r][col.index] = texto[idx++] || "X";
    }
  }

  // Leer por filas
  let resultado = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      resultado += matrix[r][c];
    }
  }

  // Quitar posibles 'X' de padding al final
  return resultado.replace(/X+$/g, "");
}

// =================== XOR (SALIDA EN HEX) ===================
// Acepta cualquier carácter; la salida es una cadena hex.
function encryptXor(texto, clave) {
  if (!clave || clave.length === 0) return texto;

  let resultadoHex = "";
  for (let i = 0; i < texto.length; i++) {
    const charCode = texto.charCodeAt(i);
    const keyCode = clave.charCodeAt(i % clave.length);
    const xorCode = charCode ^ keyCode; // XOR byte a byte
    let hex = xorCode.toString(16);
    if (hex.length < 2) hex = "0" + hex;
    resultadoHex += hex;
  }
  return resultadoHex;
}

function decryptXor(hexTexto, clave) {
  if (!clave || clave.length === 0) return hexTexto;

  let resultado = "";
  for (let i = 0; i < hexTexto.length; i += 2) {
    const byteHex = hexTexto.substr(i, 2);
    const byte = parseInt(byteHex, 16);
    const keyCode = clave.charCodeAt((i / 2) % clave.length);
    const originalCode = byte ^ keyCode; // mismo XOR para descifrar
    resultado += String.fromCharCode(originalCode);
  }
  return resultado;
}

// =================== UTILIDADES UI ===================
function displayResult(text, isError = false) {
  const el = document.getElementById('resultado');
  if (!el) return;
  el.textContent = text;
  if (isError) {
    el.classList.add('error');
  } else {
    el.classList.remove('error');
  }
}

// =================== FUNCIONES GENERALES ===================
function cifrar() {
  const texto = document.getElementById("texto").value;
  const clave = document.getElementById("clave").value;
  const algoritmo = document.getElementById("algoritmo").value;

  let salida = "";
  // Validaciones y selección
  if (algoritmo === "cesar") {
    if (clave.trim() === "") {
      displayResult('Clave para César vacía: introduce un número (ej. 3).', true);
      return;
    }
    if (isNaN(parseInt(clave))) {
      displayResult('Clave para César debe ser un número entero.', true);
      return;
    }
    salida = encryptCaesar(texto, clave);
  } else if (algoritmo === "vigenere") {
    const clean = (clave || '').replace(/[^A-Za-z]/g, '');
    if (clean.length === 0) {
      displayResult('Clave para Vigenère inválida: usa solo letras (ej. "clave").', true);
      return;
    }
    salida = encryptVigenere(texto, clave);
  } else if (algoritmo === "columnar") {
    // acepta formatos: '3142', '3,1,4,2', '3 1 4 2'
    const nums = parseColumnarKey(clave);
    const n = nums.length;
    if (n === 0 || nums.some(isNaN)) {
      displayResult('Clave para Columnar inválida: usa dígitos (ej. "3142" o "3,1,4,2").', true);
      return;
    }
    const set = new Set(nums);
    if (set.size !== n || Math.min(...nums) < 1 || Math.max(...nums) > n) {
      displayResult('Clave para Columnar debe contener una permutación de 1..n (ej. "3142").', true);
      return;
    }
    salida = encryptColumnar(texto, nums.join(''));
  } else if (algoritmo === "xor") {
    if (!clave || clave.length === 0) {
      displayResult('Clave para XOR vacía: introduce una cadena como clave.', true);
      return;
    }
    salida = encryptXor(texto, clave);
  }

  displayResult(salida, false);
}

function descifrar() {
  const texto = document.getElementById("texto").value;
  const clave = document.getElementById("clave").value;
  const algoritmo = document.getElementById("algoritmo").value;

  let salida = "";
  if (algoritmo === "cesar") {
    if (clave.trim() === "") {
      displayResult('Clave para César vacía: introduce un número (ej. 3).', true);
      return;
    }
    if (isNaN(parseInt(clave))) {
      displayResult('Clave para César debe ser un número entero.', true);
      return;
    }
    salida = decryptCaesar(texto, clave);
  } else if (algoritmo === "vigenere") {
    const clean = (clave || '').replace(/[^A-Za-z]/g, '');
    if (clean.length === 0) {
      displayResult('Clave para Vigenère inválida: usa solo letras (ej. "clave").', true);
      return;
    }
    salida = decryptVigenere(texto, clave);
  } else if (algoritmo === "columnar") {
    const nums = parseColumnarKey(clave);
    const n = nums.length;
    if (n === 0 || nums.some(isNaN)) {
      displayResult('Clave para Columnar inválida: usa dígitos (ej. "3142" o "3,1,4,2").', true);
      return;
    }
    const set = new Set(nums);
    if (set.size !== n || Math.min(...nums) < 1 || Math.max(...nums) > n) {
      displayResult('Clave para Columnar debe contener una permutación de 1..n (ej. "3142").', true);
      return;
    }
    salida = decryptColumnar(texto, nums.join(''));
  } else if (algoritmo === "xor") {
    if (!clave || clave.length === 0) {
      displayResult('Clave para XOR vacía: introduce una cadena como clave.', true);
      return;
    }
    // verificar hex pares para descifrar
    if (texto.length % 2 !== 0 || /[^0-9a-fA-F]/.test(texto)) {
      displayResult('Texto XOR inválido para descifrar: debe ser hex pares (ej. "0f1a").', true);
      return;
    }
    salida = decryptXor(texto, clave);
  }

  displayResult(salida, false);
}

// =================== UI Helpers & Initialization ===================
function updateHelp() {
  const alg = document.getElementById('algoritmo').value;
  const helpEl = document.getElementById('clave-help');
  const claveInput = document.getElementById('clave');
  if (!helpEl || !claveInput) return;
  if (alg === 'cesar') {
    claveInput.placeholder = 'César: número entero (ej. 3 ó -5)';
    helpEl.textContent = 'César desplaza letras por un número (positivo o negativo).';
  } else if (alg === 'vigenere') {
    claveInput.placeholder = 'Vigenère: solo letras (espacios permitidos, serán ignorados)';
    helpEl.textContent = 'Vigenère usa una clave alfabética; se ignoran caracteres no alfabéticos en la clave.';
  } else if (alg === 'columnar') {
    claveInput.placeholder = 'Columnar: permutación 1..n (ej. 3142) o "3,1,4,2"';
    helpEl.textContent = 'Transposición columnar: la clave indica el orden de lectura de columnas (n dígitos).';
  } else if (alg === 'xor') {
    claveInput.placeholder = 'XOR: texto clave (ej. secreto)';
    helpEl.textContent = 'XOR produce salida hex al cifrar. Para descifrar pega hex válido.';
  } else {
    claveInput.placeholder = '';
    helpEl.textContent = '';
  }
}

function copyResult() {
  const el = document.getElementById('resultado');
  if (!el) return;
  const text = el.textContent || '';
  if (!navigator.clipboard) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    displayResult('Resultado copiado.', false);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    displayResult('Resultado copiado al portapapeles.', false);
  }).catch(() => {
    displayResult('No se pudo copiar al portapapeles.', true);
  });
}

function clearAll() {
  const t = document.getElementById('texto');
  const k = document.getElementById('clave');
  const r = document.getElementById('resultado');
  if (t) t.value = '';
  if (k) k.value = '';
  if (r) r.textContent = '';
  const helpEl = document.getElementById('clave-help');
  if (helpEl) helpEl.textContent = '';
}

function parseColumnarKey(raw) {
  // Accept formats: '3142', '3,1,4,2', '3 1 4 2'
  if (!raw) return [];
  if (/^[0-9]+$/.test(raw)) {
    return raw.split('').map(d => parseInt(d, 10));
  }
  const parts = raw.split(/[,\s]+/).filter(Boolean);
  return parts.map(p => parseInt(p, 10));
}

function loadExample(which) {
  const texto = document.getElementById('texto');
  const clave = document.getElementById('clave');
  const alg = document.getElementById('algoritmo');
  if (!texto || !clave || !alg) return;
  if (which === 'cesar') {
    texto.value = 'abc xyz';
    clave.value = '3';
    alg.value = 'cesar';
  } else if (which === 'vigenere') {
    texto.value = 'Hola, Mundo!';
    clave.value = 'clave ejemplo';
    alg.value = 'vigenere';
  } else if (which === 'columnar') {
    texto.value = 'esteesuntextoparaejemplo';
    clave.value = '3142';
    alg.value = 'columnar';
  } else if (which === 'xor') {
    texto.value = 'secret';
    clave.value = 'k';
    alg.value = 'xor';
  }
  updateHelp();
}

// Export functions for Node.js testing without affecting browser behavior
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    encryptCaesar,
    decryptCaesar,
    encryptVigenere,
    decryptVigenere,
    encryptColumnar,
    decryptColumnar,
    encryptXor,
    decryptXor,
    normalizeKey,
    parseColumnarKey
  };
}

// Initialize listeners when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const alg = document.getElementById('algoritmo');
  if (alg) {
    alg.addEventListener('change', updateHelp);
  }
  updateHelp();
});
