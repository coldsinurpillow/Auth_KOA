class User {
    id: string;
    fio: string;
    username: string;
    password: string;

    constructor(id: string, fio: string, username: string, password: string) {
        this.id = id;
        this.fio = fio;
        this.username = username;
        this.password = password;
    }
}

export { User };