import Typesense from 'typesense'
import {TypesenseConfig as config} from './config'

export const typeClient = new Typesense.Client({
  nodes: config.typesenseHosts.map((h: string) => {
    return {
      host: h,
      port: config.typesensePort,
      protocol: config.typesenseProtocol
    }
  }),
  apiKey: config.typesenseAPIKey,
  connectionTimeoutSeconds: 120,
  retryIntervalSeconds: 120
})
