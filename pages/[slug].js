import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Button from '@mui/material/Button';
import Head from "next/head";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import H2 from "../src/heading2";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Router from 'next/router';
import { useRouter } from 'next/router'

const components = { Button, SyntaxHighlighter, h2: H2, h3: H2 }
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

  const generateTOC = () =>{
    const headingElements = Array.from(
      document.querySelectorAll("h2, h3")
    );
    const newNestedHeadings = getNestedHeadings(headingElements);
    setToc(newNestedHeadings);
  }
  Router.onRouteChangeComplete = () => {
    generateTOC();
  };
  useEffect(() => {
    generateTOC();
    var ads = document.getElementsByClassName("adsbygoogle");
    var adsLenght = ads.length;
    for (var i = 0; i < adsLenght; i++) {
      ads[i].innerHTML = "";
    }
    for (var i = 0; i < adsLenght; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div >
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1680355976010606"
          data-ad-slot="1672653056"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="on-this-page"
            id="table-of-content"
          >
            <span>On this page</span>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="table-of-content">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                  {
                    heading.items.length > 0 ?
                      <ul>
                        {heading.items.map((child) => (
                          <li key={child.id}>
                            <a href={`#${child.id}`}>{child.title}</a>
                          </li>
                        )
                        )}
                      </ul> : null
                  }
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <h1>{title}</h1>
        <Divider />
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </>
  )
}

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export { getStaticProps, getStaticPaths }
export default Post