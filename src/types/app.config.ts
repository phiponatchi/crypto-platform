export type Theme =
  | "light"
  | "dark";


export interface PricingPlan{
    isFeatured?: boolean;
    priceId: string;
    name: string;
    description?: string;
    price: number;
    priceAnchor?: number;
    features: {
      name: string;
    }[];
};

export interface CrispConfig {
    bucket?: string;
    bucketUrl?: string;
    cdn?: string;
}

export interface ResendConfig {
    subdomain: string;
    fromNoReply: string;
    fromAdmin: string;
    supportEmail?: string;
    forwardRepliesTo?: string;
}

export interface AuthProvider {
    name: string;
    url: string;
    icon: string;
}

export interface AuthConfig {
    signInUrl: string;
    callbackUrl: string;
    providers?: AuthProvider[];
}

export interface AppConfigProps {
  appName: string;
  appIcon: string;
  appDescription: string;
  domainName: string;
  keywords: string[];
  crisp: {
    id?: string;
    onlyShowOnRoutes?: string[];
  };
  stripe: {
    plans: PricingPlan[]
  };
  aws?: CrispConfig;
  resend: ResendConfig;
  colors: {
    theme: Theme;
    main: string;
  };
  auth: AuthConfig;
}
