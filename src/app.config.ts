import { AppConfigProps } from "./types/app.config";


const config = {
  // REQUIRED
  appName: "iLaunchApp",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    'A powerful Next.js boilerplate equipped with everything you need to launch your product quickly. Go from concept to live production in just 5 minutes!',
  // REQUIRED: (no https://, not trialing slash at the end, just the naked domain)
  domainName: "demo.ilaunch.app",
  // REQUIRED: improve your SEO by adding keywords in your app
  keywords: ["iLaunchApp", "NextJS starter", "NextJS boilerplate", "NextJS template", "NextJS", "ReactJS", "TailwindCSS", "TypeScript", "JavaScript", "Shadcn UI"],
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
          ? "<price_id-dev>"
          : "<price_id-prod>",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Basic Plan",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Basic plan for beginners",
        // The price you want to display, the one user will be charged on Stripe.
        price: 29.9,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        // priceAnchor: 29,
        features: [
          { name: "Feature 1" },
          { name: "Feature 2" },
          { name: "Feature 3" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
          ? "<price_id-dev>"
          : "<price_id-prod>",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Advanced Plan",
        description: "Advanced plan for professionals",
        price: 39.9,
        // priceAnchor: 49,
        features: [
          { name: "Feature 1" },
          { name: "Feature 2" },
          { name: "Feature 3" },
          { name: "Feature 4" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "<price_id-dev>"
            : "<price_id-prod>",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        name: "Premium Plan",
        description: "Premium plan for experts",
        price: 59.9,
        features: [
          { name: "Feature 1" },
          { name: "Feature 2" },
          { name: "Feature 3" },
          { name: "Feature 4" },
          { name: "Feature 5" },
          { name: "Feature 6" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `iLaunchApp <noreply@mail.ilaunch.app>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Leo At iLaunchApp <leo@mail.ilaunch.app>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "official@ilaunch.app",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "leo.phibonacci@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    //main: themes[`[data-theme=dark]`]["aqua"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    signInUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignIn.js
    callbackUrl: "/home",
  },
} as AppConfigProps;

export default config;
