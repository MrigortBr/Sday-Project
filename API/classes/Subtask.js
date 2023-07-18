module.exports = class Subtask {
  //Constructor subtask
    constructor(name, description, created, finished) {
      this.name = name;
      this.description = description;
      this.created = new Date(created);
      this.finished = new Date(finished);
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
  
    // Getter e Setter para o campo "description"
    getdescription() {
      return this.description;
    }
  
    setdescription(value) {
      this.description = value;
    }
  
    // Getter e Setter para o campo "idTask"
    getidTask() {
      return this.idTask;
    }
  
    setidTask(value) {
      this.idTask = value;
    }
  
    // Getter e Setter para o campo "created"
    getcreated() {
      return this.created;
    }
  
    setcreated(value) {
      this.created = new Date(value);
    }
  
    // Getter e Setter para o campo "finished"
    getfinished() {
      return this.finished;
    }
  
    setfinished(value) {
      this.finished = new Date(value);
    }

    // Getter e Setter para o campo "idTask"

    getidTask(){
      return this.idTask
    }

    setidTask(value){
      this.idTask = value
    }
  }