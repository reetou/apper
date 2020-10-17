class Styleguide {
  public bgColor: string;
  public primaryColor: string;
  public secondaryColor: string;
  public infoColor: string;
  public inputBgColor: string;
  public buttonTextColor: string;
  public pageItemHeaderBgColor: string;
  public pageItemHeaderTextColor: string;
  public pageItemTabbarCircleColor: string;
  public pageItemTabbarBgColor: string;
  public componentItemContainerBgColor: string;
  public componentItemBgColor: string;

  constructor() {
    this.bgColor = '#EFF2F5'
    this.primaryColor = '#252B52'
    this.secondaryColor = '#5168E9'
    this.infoColor = '#F7F8FA'
    this.inputBgColor = '#EAEDF1'
    this.buttonTextColor = '#EFF2F5'
    this.pageItemHeaderBgColor = '#EAEDF1'
    this.pageItemHeaderTextColor = '#5168E9'
    this.pageItemTabbarCircleColor = '#EAEDF1'
    this.pageItemTabbarBgColor = '#5168E9'
    this.componentItemContainerBgColor = '#252B52'
    this.componentItemBgColor = '#EAEDF1'
  }
}

export default new Styleguide()
