import {MongoClient, ObjectId} from 'mongodb';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const MONGO_URL = 'mongodb://localhost:27017/quip'

const typeDefs = `
type Coordinate {
  xyarr: [Float]
}

type Coordinates {
  coordinateArr: [Coordinate]
}

type Geometry {
  type: String
  coordinates: [Coordinates]
}

type NV {
  name: String
  value: Float
}

type Scalar_Features {
  ns: String
  nv: [NV]
}

type Properties {
  scalar_features: [Scalar_Features]
}

type Analysis {
  execution_id: String
  study_id: String
  source: String
  computation: String
}

type Image {
  case_id: String
  subject_id: String
}

type Provenance {
  image: Image
  analysis: Analysis
  data_loader: String
  batch_id: String
  tag_id: String
}

type Object {
  _id: ID
  type: String
  parent_id: String
  randval: Float
  creation_date: String
  object_type: String
  x: Float
  y: Float
  normalized: Boolean
  bbox: [Float]
  geometry: Geometry
  footprint: Int
  properties: Properties
  provenance: Provenance
  submit_date: String
}

type Query {
  
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;
