import Layout from '../../components/Layout';
import Head from 'next/head';

import Date from '../../components/Date';

import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyle from '../../styles/utils.module.css';

interface IPostData {
  title: string;
  id: string;
  date: Date;
  contentHtml: string;
}

interface IProps {
  postData: IPostData;
}

export default function Post({ postData }: IProps) {
  const { title, id, date, contentHtml } = postData;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingX1}>{title}</h1>
        <div className={utilStyle.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData
    }
  }
}