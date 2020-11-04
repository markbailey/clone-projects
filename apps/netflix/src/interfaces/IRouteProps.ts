import { ComponentClass, FunctionComponent } from 'react';

export default interface IRouteProps {
  path: string | string[];
  component?: ComponentClass<any, any> | FunctionComponent<any>;
  render?: FunctionComponent<any>;
  isAuthenticated?: boolean;
}
