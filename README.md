# Cifrador Clásico - Actividad 4

## Descripción

Aplicación web interactiva que implementa **4 algoritmos de cifrado clásico**. Permite cifrar y descifrar mensajes usando diferentes métodos criptográficos. Desarrollada con HTML, CSS y JavaScript vanilla (sin frameworks).

## 🌐 URL Pública (Vercel)

**[Cifrador Clásico - Ver aplicación en vivo](https://cifrado-web-actividad-4-7zenog3gb-alexfugi567s-projects.vercel.app/)**

```
https://cifrado-web-actividad-4-7zenog3gb-alexfugi567s-projects.vercel.app
```

## 🖒 Algoritmos Implementados

### 1. **César (Desplazamiento)**

- **Descripción**: Desplaza cada letra del alfabeto un número fijo de posiciones.
- **Fórmula**: `C = (P + K) mod 26` (cifrado), `P = (C - K) mod 26` (descifrado)
- **Clave**: Número entero (3-5 es común). Positivo o negativo.
- **Ejemplo**: Texto "HOLA" con clave 3 = "KROC"
- **Seguridad**: Muy baja. Solo 26 combinaciones posibles.
- **Archivo**: `cipher.js` - Funciones `encryptCaesar()` / `decryptCaesar()`

### 2. **Vigenère (Cifrado Polialfabético)**

- **Descripción**: Usa una clave de texto repetida para desplazar cada letra. Más seguro que César.
- **Fórmula**: `C = (P + K) mod 26` (por cada letra de la clave repetida)
- **Clave**: Palabra o frase (ej: "CLAVE", "MUJER")
- **Ejemplo**: Texto "holatesa" con clave "mundo" = "bxmfbmjq"
- **Seguridad**: Baja-media. Vulnerable al análisis de frecuencia.
- **Archivo**: `cipher.js` - Funciones `encryptVigenere()` / `decryptVigenere()`

### 3. **Transposición Columnar**

- **Descripción**: Reorganiza el texto en columnas según un orden de clave numérica.
- **Proceso**: Escribe en filas, lee en columnas ordenadas por la clave.
- **Clave**: Secuencia de dígitos (ej: "3142", "4231") que define el orden de lectura.
- **Ejemplo**: "HOLA MUNDO" con clave "3142" reorganiza columnas.
- **Seguridad**: Media. Requiere conocer el orden de transposición.
- **Archivo**: `cipher.js` - Funciones `encryptColumnar()` / `decryptColumnar()`

### 4. **XOR (Operación Lógica Binaria)**

- **Descripción**: Aplica la operación XOR (exclusiva O) a cada byte del texto con bytes de la clave.
- **Fórmula**: `Cifrado[i] = Texto[i] XOR Clave[i % clave.length]`
- **Clave**: Cualquier texto (string). Se repite para cubrir el largo del mensaje.
- **Salida**: Hexadecimal (más fácil de transmitir/almacenar que bytes raw)
- **Ejemplo**: "Hola123!" con clave "secret" genera cadena hex cifrada.
- **Seguridad**: Baja (stream cipher simple). En producción usar AES/ChaCha20.
- **Archivo**: `cipher.js` - Funciones `encryptXor()` / `decryptXor()`

## 📋 Archivos del Proyecto

```
Cifrado-web-Actividad-4/
├─ index.html              # HTML principal (interfaz)
├─ cipher.js               # Lógica de todos los algoritmos
├─ styles.css              # Estilos CSS
├─ README.md               # Este archivo
├─ test_vigenere.js        # Pruebas unitarias (Node.js)
└─ LICENSE                 # Licencia MIT (opcional)
```

## 🚀 Cómo Usar

### En el navegador (Vercel):

1. Abre la [URL pública](https://cifrado-web-actividad-4-7zenog3gb-alexfugi567s-projects.vercel.app/)
2. Ingresa el texto a cifrar en el área de "Texto plano"
3. Selecciona un algoritmo del dropdown
4. Ingresa la clave (número para César, palabra para Vigenère, dígitos para Transposición, texto para XOR)
5. Haz clic en "Cifrar" o "Descifrar"
6. El resultado aparece en la caja "Resultado:"
7. Botón "Copiar resultado" para copiar al portapapeles

### Localmente (desarrollo):

```bash
# Clonar
git clone https://github.com/Alexfugi567/Cifrado-web-Actividad-4.git
cd Cifrado-web-Actividad-4

# Abrir con Live Server en VS Code o cualquier servidor HTTP
python -m http.server 8000

# Luego abre http://localhost:8000
```

## 🧪 Pruebas Unitarias

Para probar Vigenère en Node.js:

```bash
node test_vigenere.js
```

## 📄 Detalles Técnicos

- **Lenguaje**: HTML5 + CSS3 + JavaScript (ES6+)
- **Ambiente**: Frontend 100% (navegador)
- **Servidor**: Vercel (hosting)
- **Control de versiones**: Git + GitHub
- **Sin dependencias externas**: Vanilla JS puro

## 🚫 Limitaciones y Consideraciones

1. **Seguridad**: Estos son algoritmos clásicos criptográficamente débiles.
   - NO usar en producción para datos sensibles.
   - Solo educacional y demostrativo.

2. **XOR en navegador**: Óptimo para demostrar stream ciphers. En realidad usar AES-256 / TweetNaCl.js.

3. **Más de 1000 caracteres**: Las pruebas son funcionales pero no optimizadas para textos muy largos.

## 👥 Autor

**Alexfugi567** - Estudiante de Ciberseguridad

## 📜 Licencia

MIT License - Libre para usar, modificar y distribuir.

**Última actualización**: Diciembre 2025  
**Versión**: 1.0

**Nota de acceso:** La protección de Vercel ha sido desactivada para permitir acceso público sin login desde cualquier navegador.
