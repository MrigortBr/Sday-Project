module.exports = class Task {
    constructor(name,color,description) {
      this.name = name;
      this.color = color;
      this.description = description;
    }
  
    // Getter e Setter para o campo "id"
    getid() {
      return this.id;
    }
  
    setid(value) {
      this.id = value;
    }
  
    // Getter e Setter para o campo "name"
    getname() {
      return this.name;
    }
  
    setname(value) {
      this.name = value;
    }
  
    // Getter e Setter para o campo "color"
    getcolor() {
      return this.color;
    }
  
    setcolor(value) {
      this.color = value;
    }
  
    // Getter e Setter para o campo "description"
    getdescription() {
      return this.description;
    }
  
    setdescription(value) {
      this.description = value;
    }

    // Getter e Setter project
    getIdProject(){
      return this.idProject
    }

    setidProject(value){
      this.idProject = value
    }
  }