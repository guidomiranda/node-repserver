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
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe'
// } else {
//     urlDB = 'mongodb://strider:strider@cluster0.mteem.gcp.mongodb.net/cafe'
// }
urlDB = 'mongodb+srv://strider:strider@cluster0.mteem.gcp.mongodb.net/cafe'
process.env.URLDB = urlDB