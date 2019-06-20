const fs = require("fs")
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

  return `${dir.slice(dir.findIndex(x => x === "content") + 1).join("/")}`
}

const createTagSlug = tag => `/resources/tags/${toKebabCase(tag)}/`

const isCollection = filepath => {
  try {
    return fs.lstatSync(filepath.replace(/.md/, "")).isDirectory()
  } catch (error) {
    return false
  }
}

const createBlogPage = (node, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/resource.js`)

  return createPage({
    component,
    path: `/${node.fields.slug}`,
    context: {
      slug: node.fields.slug,
      highlight: node.frontmatter.highlight,
      shadow: node.frontmatter.shadow
    }
  })
}

const createCollectionPages = (node, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/collection.js`)
  const filename = path.basename(node.fileAbsolutePath, ".md")

  return Promise.all([
    createPage({
      component,
      path: `/resources/collections/${filename}`,
      context: {
        collection: filename,
        slug: `/resources/collections/${filename}`,
        highlight: node.frontmatter.highlight,
        shadow: node.frontmatter.shadow
      }
    }),
    createPage({
      component,
      path: `/${node.fields.slug}`,
      context: {
        collection: filename,
        slug: node.fields.slug,
        highlight: node.frontmatter.highlight,
        shadow: node.frontmatter.shadow
      }
    })
  ])
}

const createTagPages = (tags, createPage) => {
  const component = path.resolve(`${__dirname}/src/templates/tag.js`)

  tags.forEach(tag =>
    createPage({
      path: createTagSlug(tag),
      component,
      context: { tag }
    })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createSlug(node.fileAbsolutePath)
    createNodeField({ node, name: "slug", value: slug })

    const parent = getNode(node.parent)
    createNodeField({ node, name: "collection", value: parent.name })

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
                collection
                slug
              }
              frontmatter {
                collection
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

    edges.forEach(({ node }) => {
      if (isCollection(node.fileAbsolutePath)) {
        createCollectionPages(node, createPage)
      } else {
        createBlogPage(node, createPage)
      }
    })

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
