import React from "react";
import { Link } from "gatsby";
import Background from "./header.jpg";

const Header = () => (
  <div
    className="vh-10 dt w-100 tc bg-dark-gray cover"
    data-pagefind-ignore
    style={{
      background: `url(${Background}) no-repeat center`
    }}
  >
    <h1 className="f-headline-m fw8 quattrocento f3 f3-m f1-ns">
      <Link
        to="/"
        className="black-50 dim"
        style={{
          textDecoration: "none",
          textShadow: "1px 1px #555555"
        }}
      >
        adrift on a cosmic ocean
      </Link>
    </h1>

    <blockquote className="ph0 mh0 measure-wide f7 f7-m f5-ns lh-copy center cabin">
      <p
        className="washed-blue"
        style={{
          textShadow: "1px 1px #555555"
        }}
      >
        Writings on various topics (mostly technical) from Oliver Hookins and Angela Collins. We currently reside in Sydney after almost a decade in Berlin, have three kids, and have far too little time to really justify having a blog.
      </p>
    </blockquote>
  </div>
);

export default Header;
