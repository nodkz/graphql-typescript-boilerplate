import React, { Component } from 'react';
import gql from 'graphql-tag';
import MyQuery from './MyQuery';
// import ArticlePage from './ArticlePage';

interface UserProps {
  data: any;
}
class User extends Component<UserProps> {
  public render() {
    return (
      <div>
        <h1>User: </h1>
        <p>{JSON.stringify(this.props)}</p>
      </div>
    );
  }
}

// export const UserQuery = gql-demo`
//   qu-ery User($id: Int!) {
//     user(id: $id) {
//       name
//       friends {
//         friends {
//           friends {
//             friends {
//               name
//               ip
//             }
//           }
//         }
//       }
//       articles {
//         ...ArticlePageArticle
//       }
//     }
//   }
//   ${ArticlePage.fragments.article}
// `;

// export default () => <MyQuery component={User} query={UserQuery} variables={{ id: 123 }} />;

export default () => <div>user data mock</div>;
