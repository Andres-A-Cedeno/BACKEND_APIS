export class MenuModel {
  private _pathMenu: string;
  private _titleScreen: string;
  private _iconMenu: string;

  constructor(pathMenu: string, titleScreen: string, iconMenu: string) {
    this._pathMenu = pathMenu;
    this._titleScreen = titleScreen;
    this._iconMenu = iconMenu;
  }

  get pathMenu() {
    return this._pathMenu;
  }
  get titleScreen() {
    return this._titleScreen;
  }
  get iconMenu() {
    return this._iconMenu;
  }

  set pathMenu(pathMenu: string) {
    this._pathMenu = pathMenu;
  }
  set titleScreen(titleScreen: string) {
    this._titleScreen = titleScreen;
  }
  set iconMenu(iconMenu: string) {
    this._iconMenu = iconMenu;
  }

  toJSON() {
    return {
      pathMenu: this._pathMenu,
      titleScreen: this._titleScreen,
      iconMenu: this._iconMenu,
    };
  }
}
