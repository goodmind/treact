import { schema } from 'normalizr'

export const fileLocations  = new schema.Entity('fileLocations', {}, {
  idAttribute: 'local_id',
})
