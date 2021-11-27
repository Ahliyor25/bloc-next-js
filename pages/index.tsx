import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/Link'
import client  from '../contentful/index'
import {IArticle, IArticleFields, IHome, IHomeFields} from '../contentful';
import styles from '../styles/Home.module.css'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import  {Container, Row,Col, Card, CardTitle, CardText, Button} from 'reactstrap'




export default function Home({home,articles}: {title:string, home:IHome, articles:IArticle[]}) {

  
  console.log(articles)
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
        <meta name="description" content="Simple Bloc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
        <div className='text-center p-5 text-white'
          style={{
            background: `url("https:${home.fields.background?.fields.file.url}") center no-repeat`,
            backgroundSize: 'cover',
            minHeight: '300px',
          }}>

                    
       <h1 className='mt-5'>
         {home.fields.title}
       </h1>
       <div className='mb-5'>
         {documentToReactComponents(home.fields.description!)}
         </div>
        
        </div>
        <Container className="pt-5">
           
           <Row>
             {articles.map( article => {
                return (
                  <Col  sm='4' md='4' lg='3' xl='2' key={article.fields.slug}>
                    <Card body className='p-3'>
                      <CardTitle tag='h5' >
                        {article.fields.title}
                      </CardTitle>
                      <CardText >
                      {article.fields.description}
                      </CardText>
                      <Link href={`/article/${article.fields.slug}`}>
                       <Button>
                        <a > {article.fields.action}</a>
                        </Button>
                        </Link>

                      
                    </Card>
                  </Col>
                )
             })} 
             </Row>
         </Container>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}


export const getStaticProps: GetStaticProps  = async () => {

  const home  = await client.getEntries<IHomeFields>({
    content_type: 'Home',
    limit:1
  })
  
  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
  })

  const [homeData] = home.items

  return {
    props: {
      title: 'Simple Bloc',
      home: homeData,
      articles: articleEntries.items
    },
    revalidate: 3600,
  }
}
