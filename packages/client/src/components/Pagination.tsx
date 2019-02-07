import React, { Component } from 'react';
import { Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

interface Props {
  pageInfo: any;
}

export default class Pagination extends Component<Props> {
  public static fragment = gql`
    fragment PaginationFragment on PaginationInfo {
      hasNextPage
      hasPreviousPage
      page
    }
  `;

  public render() {
    const { page, hasPreviousPage, hasNextPage } = this.props.pageInfo;
    return (
      <Pager>
        <LinkContainer to={{ search: `?page=${page - 1}` }}>
          <Pager.Item disabled={!hasPreviousPage}>Previous</Pager.Item>
        </LinkContainer>{' '}
        <LinkContainer to={{ search: `?page=${page + 1}` }}>
          <Pager.Item disabled={!hasNextPage}>Next</Pager.Item>
        </LinkContainer>{' '}
      </Pager>
    );
  }
}
