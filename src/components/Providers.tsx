'use client';

import {
  DataThemeProvider,
  DialogProvider,
  IconProvider,
  LayoutProvider,
  ThemeProvider,
  ToastProvider,
} from '@once-ui-system/core';
import { style } from '@/resources';
import { iconLibrary } from '@/resources/icons';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        theme={style.theme}
        brand={style.brand}
        accent={style.accent}
        neutral={style.neutral}
        solid={style.solid}
        solidStyle={style.solidStyle}
        border={style.border}
        surface={style.surface}
        transition={style.transition}
        scaling={style.scaling}
      >
        <DataThemeProvider>
          <DialogProvider>
            <ToastProvider>
              <IconProvider icons={iconLibrary}>{children}</IconProvider>
            </ToastProvider>
          </DialogProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
