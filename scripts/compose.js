const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const getAuthors = () =>
  fs.readdirSync(path.join(root, 'data', 'authors')).map((filename) => path.parse(filename).name)

const getLayouts = () =>
  fs
    .readdirSync(path.join(root, 'layouts'))
    .map(path.parse)
    .map((parsed) => parsed.name)
    .filter((file) => file.toLowerCase().includes('post'))

const genFrontMatter = (answers) => {
  let d = new Date()
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, i) => (tagArray[i] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"

  let frontMatter = dedent`---
  title: ${answers.title ?? 'Untitled'}
  date: '${[
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-')}'
  tags: [${answers.tags ? tags : ''}]
  draft: ${answers.draft === 'yes'}
  summary: ${answers.summary ?? ' '}
  images: []
  layout: ${answers.layout}
  `

  if (answers.authors.length > 0) {
    frontMatter =
      frontMatter +
      '\n' +
      `authors: [${answers.authors.length > 0 ? "'" + answers.authors.join("','") + "'" : ''}]`
  }

  return frontMatter + '\n---'
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'authors',
      message: 'Choose authors:',
      type: 'checkbox',
      choices: getAuthors,
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no'],
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      choices: getLayouts,
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)
    if (!fs.existsSync('data/blog')) fs.mkdirSync('data/blog', { recursive: true })
    const filePath = `data/blog/${fileName ?? 'untitled'}.${answers.extension ?? 'md'}`
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) throw err

      console.log(`Blog post generated successfully at ${filePath}`)
    })
  })
  .catch((error) => {
    if (error.isTtyError)
      return console.log("Prompt couldn't be rendered in the current environment")

    console.log('Something went wrong, sorry!')
  })
