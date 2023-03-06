import React, { createContext, PropsWithChildren, useState } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {store} from "../Stores";

// As a basic setup, import your same slice reducers
import {blogReducer} from "../Stores/Slices/blogSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>
//   store?: AppStore
// }

export const ThemeContext = createContext<any>(null);



export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    mockStore = store,
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={mockStore}>
        {children}
        </Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { mockStore, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}