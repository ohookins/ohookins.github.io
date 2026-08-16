const path = require("path");
const paginate = require("./utils/paginate");

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulPost(limit: 1000) {
            edges {
              node {
                id
                slug
                title
                published
                category {
                  realname
                }
                tags {
                  realname
                }
                author {
                  firstName
                }
                body {
                  body
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const blogPostTemplate = path.resolve("src/templates/blog-post.js");
        const indexTemplate = path.resolve("src/templates/index.js");
        const tagTemplate = path.resolve("src/templates/tag.js");
        const posts = result.data?.allContentfulPost?.edges || [];

        if (posts.length === 0) {
          return;
        }

        paginate(createPage, indexTemplate, "/page", posts.length, 10);

        // Collect all unique tags
        const tags = new Set();
        posts.forEach(edge => {
          if (edge.node.tags) {
            edge.node.tags.forEach(tag => tags.add(tag.realname));
          }
        });

        // Create a page for each tag
        tags.forEach(tagName => {
          createPage({
            path: `/tags/${slugify(tagName)}`,
            component: tagTemplate,
            context: {
              tagName: tagName,
              tagSlug: slugify(tagName),
            }
          });
        });

        posts.forEach(edge => {
          createPage({
            path: "/posts/" + edge.node.slug,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug,
              title: edge.node.title,
              author: edge.node.author.firstName,
              published: edge.node.published,
              category: edge.node.category.realname,
              tags: edge.node.tags,
              body: edge.node.body
            }
          });
        });

        return;
      })
    );
  });
};
