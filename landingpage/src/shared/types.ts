export interface ResponsiveLayoutProps {
  isMobile: boolean;
}

export interface StyledHrefLinkProps {
  color?: string;
}

export type TContactUsForm = {
  name: string;
  email: string;
  message: string;
  isSigningUpForNewsLetter: boolean;
};
