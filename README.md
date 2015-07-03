## Assemble.io + Twitter Bootstrap website starter

### WIP: no release

### Features

- HTML5 base template
- HTML5 structures (header, footer, aside, article, section)
- jQuery (latest)
- jQuery for > IE 8 selection
- Modernizr.js shims
- Bootstrap (latest)
- Pretty urls (domain.com/page-basename/)
- Canonical link rel
- Open Graph tags
- Twitter Card tags
- Description meta tags
- Google analytics
- Schema.org stuctured data via ld+json
- Social media integration (Twitter, Github, Google+, LinkedIn, Instagram, Facebook)
- Privacy Policy (generic)
- Terms of Service (generic)
- (TODO) LESS auto-compile
- Stylus auto-compile
- 100+ Handlebars helpers
- Sample helpers
- Blog setup with sample posts
- Template elements broken into partials
- s3_website sample for uploading to AWS S3 + CloudFront
- Utility scripts for building and livewatching
- Grunt build pipeline
- Image minification and optimization
- Javascript compression
- HTML minification
- CSS minification
- CSS optimization (remove unreferenced selectors)
- Livereload
- Sitemap generation (auto)
- Feed (rss) generation (auto)
- One .css and one .js file for entire site
- (TODO) Cache busting via filename id

### To Do

- Upgrade assemble and grunt, reinstall everything
- Drop in clean bootstrap (full), latest, including LESS source
- Add build targets for compiling Bootstrap, watch it
- Build a simple website, break up template into partials
- Introduce grunt-rev and grunt-usemin: https://github.com/cbas/grunt-rev (usemin already in use? first, just try grunr-rev of filerev)
- Create sample templates and pages
- Re-organize Assemble with different subtargets for blogs, site pages, etc...
- Drop in free bootstrap themes
- Elaborate on what this setup accomplishes
- upgrade jquery and bootstrap, modernizr
- Introduce Jade
- Move menu to menu.json
- Do first commit
- Add tags and categories to blog
- Explore and use the helpers: http://assemble.io/helpers/
- Move seo stuff to seo.json
- Introduce an Markdown blog page, as well as jade
- Elaborate on the build process
- Fix: feed.xml urls
- not-found.html -> error404.html, also change in s3_website
- Create some content for the notes section
- Fix sizes of technology icons
- Build # for cache invalidation
- make a demo website: assemblebootstrap.info: embed this readme in the front-page, put a fork me on github
- try a clean install
- Make a yeoman builder
- Structured Data: https://developers.google.com/structured-data/testing-tool/
- HTML validation
- Environment integration: Twitter Cards, OpenGraph/Facebook, Windows 8/Windows Phone, Apple iOS
- Check Mobile and X-browser
- PageSpeed
- sitemap.xml: autogen
- Separate layouts by build targets, like so: http://assemble.io/docs/Layouts.html > assign blog post template to each blog entry
- HTML5 Outline
- HTML5 markup: articles, sections, etc...
- https://css-tricks.com/snippets/html/html5-page-structure/
- http://stackoverflow.com/questions/7191348/preventing-nav-to-appear-as-untitled-section-on-html5-websites
- auto pull and link to Gists
- Add Disqus comments
- Add LinkedIn and other Social Profiles, RSS
- structured data for articles: https://developers.google.com/structured-data/rich-snippets/articles

### Getting Started

1. `npm install`
2. If using s3_website: `gem install s3_website`

### Notes

- Privacy and TOS generated from: http://www.bennadel.com/coldfusion/privacy-policy-generator.htm#primary-navigation

Grunt tasks
==================

1. Production build: `./build.sh` or `grunt build:prod`
2. Preview production site: `./preview-prod` or `grunt watch:prod`
3. Live watch website + livereload in development: `./watch-dev.sh` or `grunt watch:dev`

TODO Next
=========

- https://github.com/assemble/assemble-middleware-permalinks
- Set up data structure
- https://github.com/assemble/assemble-middleware-anchors
- https://github.com/assemble/assemble-middleware-drafts

Useful Links
============

- Template helpers: https://github.com/assemble/handlebars-helpers
- https://github.com/assemble/boilerplates
- http://gruntjs.com/getting-started
- http://assemble.io/docs/External-Libraries.html   Handlebars and helpers, underscore

## [Assemble](http://assemble.io/)

* Documentation
* Plugins - Plugins extend the core functionality of Assemble.
* Helpers - Documentation for the helpers in the [handlebars-helpers](http://github.com/assemble/handlebars-helpers) library.