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
import remarkToc from 'remark-toc'

const components = {  Button, SyntaxHighlighter }



const Post = ({ frontMatter: { title, description }, mdxSource }) => {
  // const contentString = renderToString({mdxSource});

  const getHeadings = (source) => {
    const regex = /<h2>(.*?)<\/h2>/g;

    if (source.match(regex)) {
      return source.match(regex).map((heading) => {
        const headingText = heading.replace("<h2>", "").replace("</h2>", "");

        const link = "#" + headingText.replace(/ /g, "_").toLowerCase();

        return {
          text: headingText,
          link,
        };
      });
    }

    return [];
  };
  // const headings = getHeadings(contentString);
 
  return (
    <>
     <Head>
       <title>{title}</title>
       <meta name="description" content={description} />
    </Head>
    <div >
      <h1>{title}</h1>
      <Divider/>
      <MDXRemote {...mdxSource} components={components}/>
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