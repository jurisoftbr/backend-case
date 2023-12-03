export class AuthorizationData {
  constructor(
    private id: string,
    private role: string
  ) {}

  getData() {
    return {
      id: this.id,
      role: this.role,
    };
  }
}
