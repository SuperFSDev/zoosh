const bcrypt = require("bcryptjs");

export function HashPassword(password) {

    var salt = 10;

    bcrypt.hash(password, salt, (err, hash) => {
        return hash;
    })
}

export function ComparePassword(newPassword, currentPassword) {

    return bcrypt.compareSync(newPassword, currentPassword);

}