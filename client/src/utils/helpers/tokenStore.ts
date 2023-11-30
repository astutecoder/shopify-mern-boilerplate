class Token {
  private token: string | null = null;

  getToken() {
    return this.token;
  }

  setToken(token: string | null) {
    return (this.token = token);
  }
}

export const tokenStore = new Token();
