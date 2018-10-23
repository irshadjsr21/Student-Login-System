class Clas {
    year: number;
    section: string;
}

export class Teacher {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    classes: Clas[];

    constructor(fn, ln, e, p, c) {
        this.firstname = fn;
        this.lastname = ln;
        this.email = e;
        this.password = p;
        this.classes = c;
    }
}
