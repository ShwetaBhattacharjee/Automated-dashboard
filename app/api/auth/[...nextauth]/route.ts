import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // This callback is triggered after the user signs in
    async signIn({ user }) {
      // Allow @rougevc.com, @RLSCLUB.com, and specific email addresses
      const allowedEmails = ["desmond.marshall@gmail.com"];
      const allowedDomains = ["rougevc.com", "RLSCLUB.com"];

      // Check if the email ends with the allowed domains or is in the allowed list
      if (
        allowedEmails.includes(user.email!) ||
        allowedDomains.some((domain) => user.email?.endsWith(`@${domain}`))
      ) {
        return true; // Allow access
      }
      
      // If email doesn't match, redirect to the unauthorized page
      return "/unauthorized";
    },
  },
});

export { handler as GET, handler as POST };
