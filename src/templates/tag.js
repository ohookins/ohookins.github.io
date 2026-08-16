import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PublishLine from "../components/PublishLine";

const BlogPost = ({ node }) => {
  const excerpt = node.body.childMarkdownRemark.excerpt
    .replace(/<img[^>]*>/g, "");

  return (
    <li>
      <Link
        to={"/posts/" + node.slug}
        className="indexLink b cabin f4 f4-m f3-ns"
      >
        {node.title}
      </Link>
      <PublishLine
        author={node.author.firstName}
        published={node.published}
        category={node.category.realname}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: excerpt
        }}
        className="indexSummary"
      />
    </li>
  );
};

const TagPage = ({ pageContext, data }) => {
  const { tagName } = pageContext;
  const posts = data.allContentfulPost.edges;

  return (
    <Layout>
      <div>
        <h2 className="cabin f4 f3-ns">
          Posts tagged with{" "}
          <span className="br2 ph2 pv1 white bg-blue">{tagName}</span>
        </h2>
        <ul className="list pl0">
          {posts.map(edge => (
            <BlogPost key={edge.node.slug} node={edge.node} />
          ))}
        </ul>
        <div className="cabin tc ma4">
          <Link to="/" className="b">← Back to all posts</Link>
        </div>
      </div>
    </Layout>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query tagPageQuery($tagName: String!) {
    allContentfulPost(
      filter: {
        node_locale: { eq: "en-US" }
        tags: { elemMatch: { realname: { eq: $tagName } } }
      }
      sort: { fields: [published], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          author {
            firstName
          }
          category {
            realname
          }
          published
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 400, format: HTML)
            }
          }
        }
      }
    }
  }
`;
