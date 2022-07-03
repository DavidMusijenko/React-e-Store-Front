import { gql } from "@apollo/client";

export const LOAD_CURRENCIES = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

export const LOAD_CATEGORIES = gql`
  query Categories {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query LoadProductsQuery($input: String!) {
    category(input: { title: $input }) {
      products {
        id
        name
        inStock
        attributes {
          name
          type
          id
          items {
            id
            value
            displayValue
          }
        }
        gallery
        description
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
        category
      }
    }
  }
`;
