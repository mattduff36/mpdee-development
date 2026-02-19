import {
  BorderStyle,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  Theme,
  TransitionStyle,
} from '@once-ui-system/core';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

export interface DisplayConfig {
  location: boolean;
  time: boolean;
  themeSwitcher: boolean;
}

export type RoutesConfig = Record<`/${string}`, boolean>;

export interface FontsConfig {
  heading: NextFontWithVariable;
  body: NextFontWithVariable;
  label: NextFontWithVariable;
  code: NextFontWithVariable;
}

export interface StyleConfig {
  theme: Theme;
  neutral: NeutralColor;
  brand: Schemes;
  accent: Schemes;
  solid: SolidType;
  solidStyle: SolidStyle;
  border: BorderStyle;
  surface: SurfaceStyle;
  transition: TransitionStyle;
  scaling: ScalingSize;
}

export interface EffectsConfig {
  mask: {
    cursor: boolean;
    x: number;
    y: number;
    radius: number;
  };
  gradient: {
    display: boolean;
    opacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
  };
  dots: {
    display: boolean;
    opacity: number;
    size: string;
    color: string;
  };
  grid: {
    display: boolean;
    opacity: number;
    color: string;
    width: string;
    height: string;
  };
  lines: {
    display: boolean;
    opacity: number;
    color: string;
    size: string;
    thickness: number;
    angle: number;
  };
}

export interface SchemaConfig {
  logo: string;
  type: string;
  name: string;
  description: string;
  email: string;
}

export interface SameAsConfig {
  [key: string]: string;
}
