const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
 // Query for nodes to use in creating pages.
 resolve(
   graphql(request).then(result => {
     if (result.errors) {
       reject(result.errors)
     }
     return result;
   })
 )
});

// Implement the Gatsby API "createPages". This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
 const { createPage } = actions;

// Create pages for each blog.
 const getBlog = makeRequest(graphql, `
   {
     allContentfulBlog (
       sort: { fields: [createdAt], order: DESC }
       filter: {
         node_locale: {eq: "en-US"}},)
     {
       edges {
         node {
           id
           slug
         }
       }
     }
   }
   `).then(result => {
   result.data.allContentfulBlog.edges.forEach(({ node }) => {
     createPage({
       path: `blog/${node.slug}`,
       component: path.resolve(`src/templates/blog.js`),
       context: {
         id: node.id,
       },
     })
   })
});

// Archive page for all blogs, including pagination
const getArchive = makeRequest(graphql, `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}},)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`).then(result => {
  const blogs = result.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/Archive.js"),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      },
    })
  })
});

// Create guide category page, including pagination
const getGuide = makeRequest(graphql, `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: {elemMatch: {title: {eq: "Guide"}}}
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`).then(result => {
  const blogs = result.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/category/guide` : `/category/guide/${i + 1}`,
      component: path.resolve("./src/templates/Guide.js"),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      },
    })
  })
});

// Create tickets category page, including pagination
const getTickets = makeRequest(graphql, `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: {elemMatch: {title: {eq: "Tickets"}}}
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`).then(result => {
  const blogs = result.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/category/tickets` : `/category/tickets/${i + 1}`,
      component: path.resolve("./src/templates/Tickets.js"),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      },
    })
  })
});

// Create directions category page, including pagination
const getDirections = makeRequest(graphql, `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: {elemMatch: {title: {eq: "Directions"}}}
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`).then(result => {
  const blogs = result.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/category/directions` : `/category/directions/${i + 1}`,
      component: path.resolve("./src/templates/Directions.js"),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      },
    })
  })
});

// Create food category page, including pagination
const getFood = makeRequest(graphql, `
{
  allContentfulBlog (
    sort: { fields: [createdAt], order: DESC }
    filter: {
      node_locale: {eq: "en-US"}
      category: {elemMatch: {title: {eq: "Food"}}}
    },)
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`).then(result => {
  const blogs = result.data.allContentfulBlog.edges
  const blogsPerPage = 9
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/category/food` : `/category/food/${i + 1}`,
      component: path.resolve("./src/templates/Food.js"),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      },
    })
  })
});


 return Promise.all([
   getBlog,
   getArchive,
   getGuide,
   getTickets,
   getDirections,
   getFood
  ])
};

