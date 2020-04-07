// TODO: Write code to define and export the Employee class
// ✕ Can instantiate Employee instance (3ms)
// ✕ Can set name via constructor arguments
// ✕ Can set id via constructor argument
// ✕ Can set email via constructor argument
// ✕ Can get name via getName()
// ✕ Can get id via getId() (1ms)
// ✕ Can get email via getEmail()
// ✕ getRole() should return "Employee"

class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;