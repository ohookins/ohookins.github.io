module.exports = {
  pathPrefix: "/paperairoplane.net", // Set to your repo name if not using username.github.io
  siteMetadata: {
    title: "adrift on a cosmic ocean",
    siteUrl: "https://paperairoplane.net",
    description:
      "Writings on various topics (mostly technical) from Oliver Hookins and Angela Collins"
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN
      }
    },
    {
      resolve: "gatsby-plugin-feed",
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
            title: "paperairoplane.net RSS feed",
            serialize: ({ query: { site, allContentfulPost } }) => {
              return allContentfulPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  title: edge.node.title,
                  description: edge.node.body.childMarkdownRemark.excerpt,
                  author:
                    edge.node.author.firstName +
                    " " +
                    edge.node.author.lastName,
                  date: edge.node.published,
                  url: site.siteMetadata.siteUrl + "/posts/" + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + "/posts/" + edge.node.slug
                });
              });
            },
            query: `
              {
                allContentfulPost (limit: 1000) {
                    edges {
                        node {
                            id
                            slug
                            title
                            published
                            category {
                                realname
                            }
                            author {
                                firstName
                                lastName
                            }
                            body {
                                childMarkdownRemark {
                                    excerpt(pruneLength: 400)
                                }
                            }
                        }
                    }
                }
              }
			`,
            output: "/rss.xml"
          }
        ]
      }
    }
  ]
};
