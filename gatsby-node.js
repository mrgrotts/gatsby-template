const path = require("path")

const toKebabCase = string =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-")

const createSlug = value => {
  const parsed = path.parse(value)
  const dir = parsed.dir.split("/")

  return `${dir.slice(dir.findIndex(x => x === "content") + 1).join("/")}/${
    parsed.name
  }`
}

const createTagSlug = tag => `/blog/tags/${toKebabCase(tag)}/`

const createBlogPage = (node, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/blog.js`)

  return createPage({
    component,
    path: `/${node.fields.slug}`,
    context: {
      highlight: node.frontmatter.highlight,
      shadow: node.frontmatter.shadow,
      slug: node.fields.slug
    }
  })
}

const createTagPages = (tags, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/tag.js`)

  tags.forEach(tag =>
    createPage({
      component,
      path: createTagSlug(tag),
      context: { tag }
    })
  )
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createSlug(node.fileAbsolutePath)
    createNodeField({ node, name: "slug", value: slug })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(createTagSlug)
      createNodeField({ node, value: tagSlugs, name: `tagSlugs` })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  try {
    const query = await graphql(`
      query {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `)

    const {
      data: {
        allMarkdownRemark: { edges }
      }
    } = query

    edges.forEach(({ node }) => createBlogPage(node, createPage))

    let tags = []
    edges.forEach(({ node }) => {
      if (node && node.frontmatter && node.frontmatter.tags) {
        tags = [...tags, ...node.frontmatter.tags]
      }
    })

    createTagPages(tags, createPage)
  } catch (error) {
    console.error(error)
  }
}
