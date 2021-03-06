import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import Button from "@mui/material/Button";
import Head from "next/head";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import H2 from "../src/heading2";
import H3 from "../src/heading3";
import Router from "next/router";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Image from "next/image";
import Notes from "../src/Notes";
import img from "../src/img";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import YouTube from "../src/Youtube";
import Ads from "../src/Ads";
import Share from "../src/Share";
const components = {
  Button,
  Link,
  Image,
  img,
  SyntaxHighlighter,
  h2: H2,
  h3: H3,
  Notes,
  YouTube,
  Ads,
};
const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const Post = ({ frontMatter: { title, description }, mdxSource }) => {
  const [toc, setToc] = useState([]);
  const { asPath, pathname } = useRouter();

  const [opensnackbar, setOpenSnakbar] = React.useState(false);

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnakbar(false);
  };

  const feedback = () => {
    setOpenSnakbar(true);
  };

  const generateTOC = () => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    const newNestedHeadings = getNestedHeadings(headingElements);
    setToc(newNestedHeadings);
  };
  Router.onRouteChangeComplete = () => {
    generateTOC();
  };
  useEffect(() => {
    generateTOC();
  }, []);

  return (
    <>
      <Head>
        <title>{title} - GeM Portal Course</title>
        <meta name="description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://gpc.edafter.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: { title },
                  item: `https://gpc.edafter.com${asPath}`,
                },
              ],
            }),
          }}
        />
      </Head>

      <div>
        <Grid
          container
          spacing={2}
          direction="row-reverse"
          justifyContent="flex-start"
          alignItems="flex-start"
          className="main-content"
        >
          <Grid item xs={12} sm={2.5}>
            <Grid sx={{ position: { sm: "absolute" } }}>
              <Paper
                elevation={3}
                sx={{ p: 2, position: { sm: "fixed" }, top: "90px" }}
              >
                <div className="table-of-content">
                  <b>On this page</b>
                  <ul>
                    {toc.map((heading) => (
                      <li key={heading.id}>
                        <a href={`#${heading.id}`}>{heading.title}</a>
                        {heading.items.length > 0 ? (
                          <ul className="submenu">
                            {heading.items.map((child) => (
                              <li key={child.id}>
                                <a href={`#${child.id}`}>{child.title}</a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9.5}>
            <Paper elevation={3} sx={{ p: "20px" }}>
              <Breadcrumbs aria-label="breadcrumb" separator="???">
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href={asPath}>
                  {title}
                </Link>
              </Breadcrumbs>
              <h1>{title}</h1>
              <Share title={title} text={description} url={asPath} />
              <Divider />
              <MDXRemote {...mdxSource} components={components} />
              Was this helpful:
              <Tooltip title="Helpful">
                <IconButton onClick={feedback}>
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Not helpful">
                <IconButton onClick={feedback}>
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
        <Ads />
        <Snackbar
          open={opensnackbar}
          autoHideDuration={4000}
          onClose={handleClosesnackbar}
          message="Thanks for your Feedback"
        />
      </div>
    </>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default Post;
