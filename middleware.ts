import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const allowedEmails = ["desmond.marshall@gmail.com"];
      const allowedDomains = ["rougevc.com", "RLSCLUB.com"];
      
      // Ensure token?.email is a string before using endsWith
      const email = token?.email ?? ''; // Default to empty string if null or undefined

      // Allow access if email is in the allowed list or ends with allowed domain
      return (
        allowedEmails.includes(email) ||
        allowedDomains.some((domain) => email.endsWith(`@${domain}`))
      );
    },
  },
});

export const config = {
  matcher: ["/dashboard", "/br", "/influencer", "/about", "/contact"],
};
