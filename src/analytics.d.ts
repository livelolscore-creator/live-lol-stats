declare module '@vercel/analytics/dist/react' {
  export const Analytics: React.FC<{
    beforeSend?: (event: any) => any | null;
    debug?: boolean;
    mode?: 'auto' | 'development' | 'production';
  }>;
  export function track(name: string, properties?: Record<string, any>): void;
}
