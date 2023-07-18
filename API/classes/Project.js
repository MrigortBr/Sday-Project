module.exports =
class Project {
    constructor(id, name, picture, description) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
    }
    getid() {
        return this.id;
    }
    setid(id) {
        this.id = id;
    }
      
    getname() {
        return this.name;
    }
      
    setname(name) {
        this.name = name;
    }
      
    getpicture() {
        return this.picture;
    }
      
    setpicture(picture) {
        this.picture = picture;
    }
      
    getdescription() {
        return this.description;
    }
      
    setdescription(description) {
        this.description = description;
    }     
}

  