export class Student {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    class: {
        year: number;
        section: string;
    };

    constructor(fn, ln, e, p, y, s) {
        this.firstname = fn;
        this.lastname = ln;
        this.email = e;
        this.password = p;
        this.class = {
            year: y,
            section: s
        };
    }
}
