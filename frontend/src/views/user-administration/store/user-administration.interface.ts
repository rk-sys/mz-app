export interface IUserAdministration {
  isOpen: boolean;
  menuLinks: IMenuAdministration[];
}

export interface IMenuAdministration {
  title: string;
  icon: string;
  activeName: string;
  links: IMenuAdministrationLinks[];
}

export interface IMenuAdministrationLinks {
  name: string;
  label: string;
}
