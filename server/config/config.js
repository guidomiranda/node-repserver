// ============================================
// PUERTO
// ============================================
process.env.PORT = process.env.PORT || 3000;
// ============================================
// ENTORNO
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ============================================
// BASE DE DATOS
// ============================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

// ============================================
// EXPIRACION DEL TOCKEN
// ============================================
process.env.CADUCIDAD_TOKEN = '48h';
// ============================================
// SEED DEL TOKEN
// ============================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
// ============================================
// SEED DEL TOKEN
// ============================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '846846258505-1or07gro05l4utvg2qdid7oba3e5hil6.apps.googleusercontent.com';