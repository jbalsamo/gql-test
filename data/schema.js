import {MongoClient, ObjectId} from 'mongodb';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import {prepare} from '../util';

const MONGO_URL = 'mongodb://nexi-bmi.uhmc.sunysb.edu:27017/quip';
const db = MongoClient.connect(MONGO_URL);
const Objects = db.objects;

const typeDefs = [`
type Query {
  objectsByExecID(execution_id: String): [Object]
  allObjects: [Object]
}

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

schema {
  query: Query
}
`];

const resolvers = {
  Query: {
    objectsByExecID: async (execution_id) => {
      return prepare(await Objects.find({ 'provenance.analysis.execution_id' : execution_id }));
    },
    allObjects: async () => {
      return (await Objects.find({}).toArray()).map(prepare);
    }
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
