import {GetStaticPaths, GetStaticProps} from 'next';
import client from '../../contentful/index';
import {IArticle, IArticleFields} from '../../contentful';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Head from "next/head";
import {Container} from "reactstrap";


export default function Article({article}: { article: IArticle }) {
    return (
        <main>
            <Head>
                <title>{article.fields.title}</title>
            </Head>
            <Container>
                <h1 className='py-3'>
                    {article.fields.title}
                </h1>
                {article.fields.description}
                <div className='mt-3'>
                    {documentToReactComponents(article.fields.content!)}
                </div>
            </Container>
        </main>
    )
}

export const getStaticPaths: GetStaticPaths = async (args) => {
    
    const articlesEntries = await client.getEntries<IArticleFields>({
        content_type: 'article'
    });

    return {
        paths: articlesEntries.items.map(item => {
            return {
                params: {
                    article: item.fields.slug
                }
            }
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (args) => {
    
    


    const articlesEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        'fields.slug': args.params!.article!,
        limit: 1
    });

    const [article] = articlesEntries.items;
    return {
        props: {
            article

        }
    }
}