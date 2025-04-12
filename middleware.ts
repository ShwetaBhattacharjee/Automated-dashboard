import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const allowedEmails = ["desmond.marshall@gmail.com"];
      const allowedDomains = ["rougevc.com", "RLSCLUB.com"];
      
      // Allow access if email is in the allowed list or ends with allowed domain
      return (
        allowedEmails.includes(token?.email) ||
        allowedDomains.some((domain) => token?.email?.endsWith(`@${domain}`))
      );
    },
  },
});

export const config = {
  matcher: ["/dashboard", "/br", "/influencer", "/about", "/contact"],
};
