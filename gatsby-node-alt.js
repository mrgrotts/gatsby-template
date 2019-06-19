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

  return `${dir.slice(dir.findIndex(x => x === "content") + 1).join("/")}/${
    parsed.name
  }`
}

const createTagSlug = tag => `/blog/tags/${toKebabCase(tag)}/`

const isCategory = filepath => {
  try {
    return fs.lstatSync(filepath.replace(/.md/, "")).isDirectory()
  } catch (error) {
    return false
  }
}

const createBlogPage = (node, createPage) => {
  const template = path.resolve(`${__dirname}/src/templates/blog.js`)

  return createPage({
    component: template,
    path: `/${node.fields.slug}`,
    context: {
      slug: node.fields.slug,
      highlight: node.frontmatter.highlight,
      shadow: node.frontmatter.shadow
    }
  })
}

const createCategoryPages = (node, createPage) => {
  const template = path.resolve(`${__dirname}/src/templates/category.js`)
  const filename = path.basename(node.fileAbsolutePath, ".md")

  return Promise.all([
    createPage({
      component: template,
      path: `/blog/categories/${filename}`,
      context: {
        category: filename,
        slug: `/blog/categories/${filename}`,
        highlight: node.frontmatter.highlight,
        shadow: node.frontmatter.shadow
      }
    }),
    createPage({
      component: template,
      path: `/${node.fields.slug}`,
      context: {
        category: filename,
        slug: node.fields.slug,
        highlight: node.frontmatter.highlight,
        shadow: node.frontmatter.shadow
      }
    })
  ])
}

const createTagPages = (tags, createPage) => {
  const template = path.resolve(`${__dirname}/src/templates/tag.js`)

  tags.forEach(tag =>
    createPage({
      path: createTagSlug(tag),
      component: template,
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
    createNodeField({ node, name: "category", value: parent.name })

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
                category
                slug
              }
              frontmatter {
                category
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
      if (isCategory(node.fileAbsolutePath)) {
        createCategoryPages(node, createPage)
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
