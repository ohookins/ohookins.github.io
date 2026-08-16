import React, { Component } from "react";
import PropTypes from "prop-types";
import PublishLine from "../components/PublishLine";
import TagCluster from "../components/TagCluster";
import Layout from "../components/Layout"
import { DiscussionEmbed } from "disqus-react";
import { graphql } from "gatsby";

class BlogPost extends Component {
  render() {
    const {
      title,
      slug,
      body,
      author,
      published,
      category,
      tags
    } = this.props.data.contentfulPost;
    const disqusShortname = "paperairoplane";
    const disqusConfig = {
      url: "https://paperairoplane.net/posts/" + slug,
      identifier: slug,
      title: title
    };

    return (
      <Layout>
        <div data-pagefind-body>
          <h1 className="f4 f4-m f3-ns" data-pagefind-meta="title">{title}</h1>
          <PublishLine
            author={author.firstName}
            published={published}
            category={category.realname}
          />
          <TagCluster tags={tags} />
          <div
            dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
          />
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </Layout>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      author {
        firstName
      }
      published
      category {
        realname
      }
      tags {
        realname
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
