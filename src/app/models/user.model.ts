export class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string
  ) { }

  static fromFirebase({ email, name, uid }) {
    return new User(uid, name, email);
  }
}
