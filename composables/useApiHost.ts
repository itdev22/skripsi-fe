export const useApiHost = () => {
  const config = useRuntimeConfig();
  const api = config.public.API_HOST;

  if (!api) {
    console.warn('⚠️ NUXT_PUBLIC_API_HOST is not defined in .env');
  }

  return api;
};