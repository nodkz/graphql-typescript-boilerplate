import gql from 'graphql-tag';

const ArticlePage = {
  fragments: {
    article: gql`
      fragment ArticlePageArticle on Article {
        title
        desc
      }
    `,
  },
};

export default ArticlePage;
