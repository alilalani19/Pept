import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join(__dirname, 'schema.prisma'),
  datasource: {
    url: 'postgresql://alilalani@localhost:5432/pept?schema=public',
  },
})
