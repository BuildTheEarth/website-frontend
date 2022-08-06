import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: 'dev',
      clientSecret: 'x9L192bczfjQqK8gts7ofQCn3AUuMBWX',
      issuer: 'https://auth.bte-germany.de/realms/bte'
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
})
