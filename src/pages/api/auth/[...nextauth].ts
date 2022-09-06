import KeycloakProvider from 'next-auth/providers/keycloak'
import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: 'dev',
      clientSecret: 'atp3Xce20wI9un4ywmPV4NdUwv9dZJtV',
      issuer: 'http://localhost:8080/realms/bte-dev'
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
