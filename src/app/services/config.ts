import {Injectable} from '@angular/core';
@Injectable()
export class Config {
    static isCreating = false;
    static instance : Config;
    private username : string;

    constructor() {
        if (!Config.isCreating)
    {
        throw new Error('No se puede llamar a esta clase con \'new\' - Utiliza getInstance()');
    }
    }
    static getInstance(): Config
    {
     if (Config.instance == null)
     {
         Config.isCreating = true;
         Config.instance = new Config();
         Config.isCreating = false;
     }
     return Config.instance;
     }
  public getUsername(): string {
      return this.username;
  }
  public setUsername(username: string): void {
      this.username = username;
  }
}
