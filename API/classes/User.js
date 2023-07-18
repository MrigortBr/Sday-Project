const bcrypt = require("bcrypt")

class User {
    //Construtor da classe User
    constructor(id, name, surname, picture, email, birth, password) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.picture = picture;
      this.email = email;
      this.birth = birth;
      //Tenta encriptar a senha se caso uma senha for enviada
      try {
        this.password = bcrypt.hashSync(password, 10)
      } catch (error) {  
      }
    }
  
    // Getters
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getSurname() {
        return this.surname;
    }

    getPicture() {
        return this.picture;
    }

    getEmail() {
        return this.email;
    }

    getBirth() {
        return this.birth;
    }

    getPassword() {
        return this.password;
    }

    // Setters
    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setSurname(surname) {
        this.surname = surname;
    }

    setPicture(picture) {
        this.picture = picture;
    }

    setEmail(email) {
        this.email = email;
    }

    setBirth(birth) {
        this.birth = birth;
    }

    setPassword(password) {
        //pega o password enviado e ja encripta ele usando o bcrypt.hashSync()
        try {
            this.password = bcrypt.hashSync(password, 10)
        } catch (error) {
            
        }
    }

    setPermission(permission){
        this.permission = permission;
    }

    getPermission(){
        return this.permission;
    }

    //Metodos

    //Compara a senha informada com uma senha encriptada e retorna se é igual ou não
    validatePassword(password, passwordEnCrypted){
        const result = bcrypt.compareSync(password, passwordEnCrypted)
        return result
    }
}

module.exports = User
  