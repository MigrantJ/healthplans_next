/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    redirects: () => {
        return [
            { source: "/", destination: "/plans", permanent: true },
            process.env.MAINTENANCE_MODE === "1"
            ? { source: "/((?!maintenance).*)", destination: "/maintenance", permanent: false }
            : null,
            ].filter(Boolean);
    }
};

module.exports = nextConfig;
