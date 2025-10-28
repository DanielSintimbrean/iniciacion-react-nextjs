import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   * No se recomienda desactivar reactStrictMode, ya que ayuda a React a detectar
   * errores en el desarrollo, especialmente aquellos relacionados con un uso incorrecto de useEffect.
   *
   * Sin embargo, para comprender mejor el funcionamiento de useEffect, desactivaremos reactStrictMode temporalmente.
   */
  reactStrictMode: false
};

export default nextConfig;
