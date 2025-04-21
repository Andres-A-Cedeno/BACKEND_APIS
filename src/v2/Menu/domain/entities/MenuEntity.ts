export class MenuModel {
  private _pathMenu: string;
  private _titleScreen: string;
  private _iconMenu: string;
  private _component: string;

  constructor(pathMenu: string, titleScreen: string, iconMenu: string, component: string) {
    this._pathMenu = pathMenu;
    this._titleScreen = titleScreen;
    this._iconMenu = iconMenu;
    this._component = component;
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

  get component() {
    return this._component;
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

  set component(component: string) {
    this._component = component;
  }

  toJSON() {
    return {
      pathMenu: this._pathMenu,
      titleScreen: this._titleScreen,
      iconMenu: this._iconMenu,
      component: this._component,
    };
  }
}
