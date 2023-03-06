import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import AxiosMock from "axios";
import * as axios from "./Stores/thunks/fetchBlogs"
import { renderWithProviders } from "./utils/test-utils";
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';

test('renders learn react link', () => {
  renderWithProviders(<App />);
});