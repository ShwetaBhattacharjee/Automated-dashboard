import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      const allowedEmails = ["desmond.marshall@gmail.com"];
      const allowedDomains = ["rougevc.com", "rlsclub.com"];
      const allowedEmailPatterns = [/\.rouge@gmail\.com$/]; // Regex pattern

      const email = token?.email?.toLowerCase().trim() ?? "";

      const isAllowedEmail = allowedEmails.includes(email);

      const isAllowedDomain = allowedDomains.some((domain) =>
        email.endsWith(`@${domain}`)
      );

      const matchesPattern = allowedEmailPatterns.some((pattern) =>
        pattern.test(email)
      );

      return isAllowedEmail || isAllowedDomain || matchesPattern;
    },
  },
});

export const config = {
  matcher: ["/dashboard", "/br", "/influencer", "/about", "/contact"],
};
