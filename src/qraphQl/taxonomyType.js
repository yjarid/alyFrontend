import  gql  from 'graphql-tag'

export const LOCATION = gql` query Location( $name: String, $neigh: String){ 
  location( name: $name , neigh: $neigh ) { _id name neigh cat group lat lng } 
    }`

export const LOCATIONS = gql` query Locations($query: String, $group: String, $cat: String) { 
    locations(query: $query, group: $group , cat: $cat ) { _id name neigh cat group lat lng } 
     }`


export const CATEGORIES = gql` query Categories( $group: String, $cat: String) { 
  categories( group: $group , cat: $cat ) { _id name desc cat group } 
   }`

export const UPDATE_LOCATION = gql`
mutation UpdateLocation( $id: ID! , $neigh: String, $name: String, $desc: String, $cat: String, $group: String, $lat: String, $lng: String)  {
  updateLocation(id: $id, data : { name: $name, neigh: $neigh, desc: $desc, cat: $cat, group: $group, lat: $lat,  lng: $lng}) {
    name
  }
}
`

export const CREATE_LOCATION = gql`
mutation CreateLocation(  $name: String!, $neigh: String!, $desc: String, $cat: String!, $group: String!, $lat: String!, $lng: String!)  {
  createLocation( data : { name: $name, desc: $desc, neigh: $neigh, cat: $cat, group: $group, lat: $lat, 
    lng: $lng}) {
    name
  }
}
`

export const DELETE_LOCATION = gql`
mutation DeleteLocation( $id: ID! )  {
  deleteLocation( id : $id) {
    _id
  }
}
`

// mutation Categories

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory( $id: ID! ,  $name: String, $desc: String, $cat: String, $group: String)  {
  updateCategory(id: $id, data : { name: $name,  desc: $desc, cat: $cat, group: $group}) {
    name
  }
}
`

export const CREATE_CATEGORY = gql`
mutation CreateCategory(  $name: String!, $desc: String, $cat: String!, $group: String!)  {
  createCategory( data : { name: $name, desc: $desc,  cat: $cat, group: $group}) {
    name
  }
}
`

export const DELETE_CATEGORY = gql`
mutation DeleteCategory( $id: ID! )  {
  deleteCategory( id : $id) {
    _id
  }
}
`