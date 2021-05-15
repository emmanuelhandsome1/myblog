module.exports = {
  siteMetadata: {
    title: `Emeruche Ikenna`,
    author: `Emeruche Ikenna`,
    description: `Blog post started by Emeruche "Cole" Ikenna to share about stuff I learn about programming and everything related to it.`,
    siteUrl: `https://coleruche.com/`,
    keywords: [
      "Emeruche",
      "Cole",
      "Ikenna",
      "Frontend web developer",
      "React developer Nigeria",
      "React developer",
      "Front-end Engineer",
      "Frontend engineer",
      "Top frontend web developers in Nigeria",
    ],
    social: {
      twitter: `cole_ruche`,
      github: `kingingcole`,
      email: `emeruchecole@gmail.com`,
      linkedin: `emeruche`,
    },
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-twitter`,
    "gatsby-plugin-netlify-cache",
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{
          userAgent: "*", allow: "/",
        }],
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: "https://gmail.us3.list-manage.com/subscribe/post?u=7d7dcd8b82703a15f9dcb8977&amp;id=ba6223fb99", // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#00baba`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `@weknow/gatsby-remark-twitter`,
            options: {
              debug: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 970,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-copy-images`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-105405908-2`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cole Ruche`,
        short_name: `Cole`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00baba`,
        display: `standalone`,
        icon: `content/assets/icon.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `colesblog-netlify-com`,
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                if (edge.node.frontmatter.type === "work" || (edge.node.frontmatter.type === "post" && !edge.node.frontmatter.published) ) return; // do no include WORK markdown and unpublished article to rss
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/post/' + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/post/' + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        type
                        published
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },

  ],
}
