import defaultOptions from './defaultOptions';
import logError from './logError';
import path from 'path';
import getMarkdownPage from './getMarkdownPage';
import R from 'ramda';

// Test git

const createPages = (_, pluginOptions) => {
  if (!pluginOptions.markdownRemark) {
    return null;
  }

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { graphql, actions } = _;
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve(options.markdownRemark.postPage);

    graphql(options.markdownRemark.query).then(result => {
      try {

        if (result.errors) {
          throw result.errors;
        }

        result.data.allMarkdownRemark ? result.data.allMarkdownRemark.edges.filter(_ramda2.default.path(['node', 'fields', 'slug'])).map((0, _getMarkdownPage2.default)(options, postPage)).map(function (page) {
          return createPage(page);
        }) : null;

        result.data.allMdx ? result.data.allMdx.edges.filter(_ramda2.default.path(['node', 'fields', 'slug'])).map((0, _getMarkdownPage2.default)(options, postPage)).map(function (page) {
          return createPage(page);
        }) : null;

        resolve();

      } catch (e) {
        logError(e);
        reject(e);
      }
    });
  });
};

export {
  createPages
};
