import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';
import '../components/home/home.css';
import './archive.css';

import headerImg from '../images/general-header-image.jpg';

const Food = (props) => {

    const blogContent = props.data.allContentfulBlog
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/category/food' : `/category/food/${currentPage - 1}`
    const nextPage = `/category/food/${currentPage + 1}`

    return (
        <Layout>
        <SEO title='Blog' keywords={['travel', 'travel blog', 'travel photography']} />
        <Nav />

        <header>
            <div className='archive__section'>
                <div className='archive__hero' style={{backgroundImage: `url(${headerImg})`}}></div>
                <div className='archive__nav'>
                    <Link to='/blog' className={window.location.href.indexOf('/blog') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>All</Link>
                    <Link to='/category/guide' className={window.location.href.indexOf('category/guide') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Guide</Link>
                    <Link to='/category/tickets' className={window.location.href.indexOf('category/tickets') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Tickets</Link>
                    <Link to='/category/directions' className={window.location.href.indexOf('category/directions') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Directions</Link>
                    <Link to='/category/food' className={window.location.href.indexOf('category/food') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Food</Link>
                </div>
            </div>
        </header>

        <div className='feed'>
            {blogContent.edges.map(edge => (
                <div key={edge.node.id} className='card'
                style={{
                    backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(10,10,10,0) 0%,
                    rgba(10,10,10,0) 50%,
                    rgba(10,10,10,0.7) 100%),
                    url(${edge.node.featuredImage.fluid.src})`  
                }}
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
            >
            {edge.node.category.map(categories => (
            <p className='card__category'>{categories.title}</p>
            ))}
            <p className='card__title'>{edge.node.title}</p>
            </div>
            ))}
        </div>

        <div className='pagination'>
            <div className='pagination__item'>
                {!isFirst && (
                    <Link to={prevPage} rel='prev'>
                        <div className='arrow__back'></div>
                    </Link>
                )}
            </div>
            <div className='pagination__item'>
                {!isLast && (
                    <Link to={nextPage} rel='next'>
                        <div className='arrow__next'></div>
                    </Link>
                )}
            </div>
        </div>

        </Layout>
    )
}

export default Food

export const pageQuery = graphql` 
 query FoodQuery ($skip: Int!, $limit: Int!) {
   allContentfulBlog(
       sort: { fields: [createdAt], order: DESC }
       filter: {
       node_locale: {eq: "en-US",}
       category: {elemMatch: {title: {eq: "Food"}}}
    }
       skip: $skip
       limit: $limit
     ) {
     edges {
       node {
         id
         slug
         title
         createdAt
         category {
           title
           id
         }
         featuredImage {
           fluid(maxWidth: 1200, quality: 85) {
             src
             ...GatsbyContentfulFluid
           }
         }
       }
     }
   }
 }
`