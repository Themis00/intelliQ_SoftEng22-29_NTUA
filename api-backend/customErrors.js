// Here, we define custom error classes

class Error {
    constructor(message) {
      this.name = "Error";
      this.message = message;
    }
  }

module.exports = {
    WrongDataError: class extends Error{
        constructor(message) {
            super(message);
            this.name = "WrongDataError";
        }
    }
} 

