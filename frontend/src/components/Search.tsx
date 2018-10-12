import axios from 'axios';
import * as React from 'react';
import './ProductList.css';

export const Search = ({
      value,
         onChange,
         onSubmit,
         children
         }) =><form onSubmit={onSubmit}>
              <input
              type="text"
              value={value}
              onChange={onChange}
              />
              <button type="submit">
              {children}
              </button>
              </form>

    


