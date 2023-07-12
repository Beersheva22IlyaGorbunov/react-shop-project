import { ReactElement } from "react";

type MenuPoint = {
  title: string;
  path: string;
  element: ReactElement;
  order?: number;
  hasChilds?: boolean;
  forRoles: Array<string | null>;
}

export default MenuPoint