module.exports = {
  reactStrictMode: true,
  headers:
    process.env.NODE_ENV === "development"
      ? () => [
          {
            source: "/_next/static/css/_app-client_src_app_globals_css.css",
            headers: [{ key: "Vary", value: "*" }],
          },
          {
            source: "/tasks/complete",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "https://api.notion.com",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "POST",
              },
            ],
          },
        ]
      : () => [
          {
            source: "/calendar",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "https://api.notion.com",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "POST",
              },
            ],
          },
          {
            source: "/todo",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "https://api.notion.com",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "POST",
              },
            ],
          },
        ],
};
