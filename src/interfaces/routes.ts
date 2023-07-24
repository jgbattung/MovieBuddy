import { ComponentType } from 'react';
import { RouteProps } from 'react-router-dom';

export default interface IRoute extends RouteProps {
  path: string;
  name: string;
  exact: boolean;
  component:  ComponentType<any>;
}