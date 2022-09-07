import KeycloakProvider from 'next-auth/providers/keycloak'
import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || '',
      clientSecret: process.env.KEYCLOAK_SECRET || '',
      issuer: process.env.KEYCLOAK_URL || ''
    })
  ],
  callbacks: {
    jwt: async ({token, account}) => {
      if (account) {
        token.apiToken = account.access_token
      }

      return token
    },
    session: async ({session, token}) => {
      session.apiToken = token.apiToken

      return session
    }
  }
})
