package db

import "golang.org/x/crypto/bcrypt"

/*EncryptPass is the function that converts a string pass into random bytes */
func EncryptPass(pass string) (string, error) {
	// 2 ** 8 = 256 loops to encrypt the password, this is for strong security
	cost := 8
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), cost)
	return string(bytes), err
}
