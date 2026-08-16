import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TagCluster = ({ tags }) => {
  const finalTags = tags || [];

  return (
    <div className="sans-serif f7">
      <span className="b">Tagged with: </span>
      {finalTags.map(tag => (
        <Link
          key={tag.realname}
          to={`/tags/${slugify(tag.realname)}`}
          className="f7 br2 ph2 ph2-m ph3-ns pv0 pv0-m pv1-ns ma1 dib white bg-blue no-underline"
        >
          {tag.realname}
        </Link>
      ))}
    </div>
  );
};

TagCluster.propTypes = {
  tags: PropTypes.array
};

export default TagCluster;
