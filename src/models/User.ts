export class User {
    constructor(
      public token?: string | null,
      public username?: string | null,
      public avatar?: string | null,
    ) { }
  }