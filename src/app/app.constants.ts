export class Constants {

  public static get BASE_URL(): string { return "http://localhost:8080/presta"; }; //Adresse de l'api
  //public static get BASE_URL(): string { return "http://localhost:8080/Mai.Presta.Api"; };
  public static get AUTH_PATH(): string { return "/auth/login" };
  public static get USER_LOCALSTORE_KEY(): string { return "currentUser" };

}