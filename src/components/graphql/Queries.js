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

export const LOAD_SPECIFIC_PRODUCT = gql`
  query SpecificProduct($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      brand
    }
  }
`;

export const GET_PRODUCTS = gql`
  query LoadProductsQuery($input: String!) {
    category(input: { title: $input }) {
      name
      products {
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
        id
        name
        inStock
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
