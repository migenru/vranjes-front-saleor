import gql from "graphql-tag";

export const BASIC_PRODUCT_FRAGMENT = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnailUrl
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    name
    stockQuantity
    price {
      currency
      amount
    }
    attributes {
      attribute {
        id
        name
      }
      value {
        id
        name
        value: name
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query ProductDetails($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      description
      category {
        id
        name
        products(first: 4) {
          edges {
            node {
              ...BasicProductFields
              category {
                id
                name
              }
              price {
                amount
                currency
              }
            }
          }
        }
      }
      price {
        amount
        currency
      }
      images {
        edges {
          node {
            id
            url
          }
        }
      }
      variants {
        edges {
          node {
            ...ProductVariantFields
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_VARIANT_DETAILS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query ProductVariantDetails($id: ID!) {
    productVariant(id: $id) {
      ...ProductVariantFields
      product {
        ...BasicProductFields
      }
    }
  }
`;

export const GET_PRODUCTS_VARIANTS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids) {
      edges {
        node {
          ...ProductVariantFields
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;