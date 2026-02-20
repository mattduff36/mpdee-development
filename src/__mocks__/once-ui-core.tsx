import React from 'react';

const domProps = ['className', 'style', 'id', 'data-testid'];
const filterProps = (p: Record<string, unknown>) => {
  const filtered: Record<string, unknown> = {};
  for (const k of Object.keys(p)) {
    if (domProps.includes(k) || k.startsWith('data-') || k.startsWith('aria'))
      filtered[k] = p[k];
  }
  return filtered;
};
const mockComponent = (name: string) => {
  const Component = (
    props: Record<string, unknown> & { children?: React.ReactNode }
  ) => (
    <div data-testid={`once-ui-${name}`} {...filterProps(props)}>
      {props.children}
    </div>
  );
  Component.displayName = name;
  return Component;
};

export const Column = mockComponent('Column');
export const Row = mockComponent('Row');
export const Flex = mockComponent('Flex');
export const Card = mockComponent('Card');
export const Grid = mockComponent('Grid');
export const Line = mockComponent('Line');
export const Button = (
  props: Record<string, unknown> & { children?: React.ReactNode; type?: string }
) => (
  <button type={(props.type as string) || 'button'}>{props.children}</button>
);
export const Input = (
  props: Record<string, unknown> & {
    id?: string;
    name?: string;
    label?: string;
    errorMessage?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
) => (
  <div>
    {props.label && <label htmlFor={props.id as string}>{props.label}</label>}
    <input
      id={props.id as string}
      name={props.name as string}
      aria-label={props.label as string}
      value={props.value as string}
      onChange={props.onChange}
    />
    {props.errorMessage && <span role="alert">{props.errorMessage}</span>}
  </div>
);
export const Textarea = (
  props: Record<string, unknown> & {
    id?: string;
    name?: string;
    label?: string;
    errorMessage?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
) => (
  <div>
    {props.label && <label htmlFor={props.id as string}>{props.label}</label>}
    <textarea
      id={props.id as string}
      name={props.name as string}
      aria-label={props.label as string}
      value={props.value as string}
      onChange={props.onChange}
    />
    {props.errorMessage && <span role="alert">{props.errorMessage}</span>}
  </div>
);
export const Text = mockComponent('Text');
export const Heading = mockComponent('Heading');
export const Tag = mockComponent('Tag');
export const Icon = mockComponent('Icon');
export const IconButton = mockComponent('IconButton');
export const SmartLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => <a href={href || '#'}>{children}</a>;
export const RevealFx = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const Carousel = ({
  items,
}: {
  items: Array<{ slide: string; alt: string }>;
}) => <div data-testid="carousel">{items?.length ?? 0} items</div>;
export const ToggleButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => <a href={href || '#'}>{children}</a>;
