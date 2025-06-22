const bcrypt = require("bcrypt");

const motDePasseEnClair = "Password"; // Change ceci si nécessaire
const hashDansLaBase = "$2b$10$bn6KGCGFodss/f7hBfA1a.9TfPLvwKshqv9jxfthMNARdGdfiq7FW"; // Ton hash actuel

bcrypt.compare(motDePasseEnClair, hashDansLaBase).then(result => {
  console.log("Résultat comparaison :", result);
});
