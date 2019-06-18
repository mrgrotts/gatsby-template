const fs = require("fs")
const path = require("path")

const toKebabCase = string =>
  string &&
  string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-")

const createSlug = value => {
  // const filename = path.basename(value, ".md")
  const parsed = path.parse(value)
  const dir = parsed.dir.split("/")
  // console.log("slug stuff: ", parsed, dir)

  return `${dir.slice(dir.findIndex(x => x === "content") + 1).join("/")}/${
    parsed.name
  }`
}

const createTagSlug = tag => `/blog/tags/${toKebabCase(tag)}/`

const checkForCategory = filepath => {
  try {
    return fs.lstatSync(filepath.replace(/.md/, "")).isDirectory()
  } catch (error) {
    // console.error(error)
    return false
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // pretty print the node
  // console.log(JSON.stringify(node, undefined, 4))
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createSlug(node.fileAbsolutePath)
    createNodeField({ node, name: "slug", value: slug })

    const parent = getNode(node.parent)
    // console.log(parent.name, parent)
    createNodeField({ node, name: "category", value: parent.name })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(createTagSlug)
      createNodeField({ node, value: tagSlugs, name: `tagSlugs` })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve(`${__dirname}/src/templates/blog.js`)
  const tagTemplate = path.resolve(`${__dirname}/src/templates/tag.js`)
  const categoryTemplate = path.resolve(
    `${__dirname}/src/templates/category.js`
  )

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

    query.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const filename = path.basename(node.fileAbsolutePath, ".md")
      const isCategory = checkForCategory(node.fileAbsolutePath)
      // console.log("category? ", isCategory, filename, node.fields.slug)

      if (isCategory) {
        return Promise.all([
          createPage({
            component: categoryTemplate,
            path: `/blog/categories/${filename}`,
            context: {
              category: filename,
              slug: `/blog/categories/${filename}`,
              highlight: node.frontmatter.highlight,
              shadow: node.frontmatter.shadow
            }
          }),
          createPage({
            component: categoryTemplate,
            path: `/${node.fields.slug}`,
            context: {
              category: filename,
              slug: node.fields.slug,
              highlight: node.frontmatter.highlight,
              shadow: node.frontmatter.shadow
            }
          })
        ])
      } else {
        return createPage({
          component: blogTemplate,
          // path: `/blog/${node.fields.slug}`,
          path: `/${node.fields.slug}`,
          context: {
            slug: node.fields.slug,
            highlight: node.frontmatter.highlight,
            shadow: node.frontmatter.shadow
          }
        })
      }
    })

    let tags = []
    query.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node && node.frontmatter && node.frontmatter.tags) {
        tags = tags.concat(node.frontmatter.tags)
      }
    })

    tags.forEach(tag =>
      createPage({
        path: createTagSlug(tag),
        component: tagTemplate,
        context: { tag }
      })
    )
  } catch (error) {
    console.error(error)
  }
}
