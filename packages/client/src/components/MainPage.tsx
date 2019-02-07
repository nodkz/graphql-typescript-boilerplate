import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function MainPage() {
  return (
    <div>
      <Jumbotron>
        <div className="row">
          <div className="col-sm-9">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2>
                Northwind data explorer via GraphQL
                <br />
              </h2>
            </div>
            <p>
              This is a true story. The events depicted took place in <b>Northwind company</b> in{' '}
              <b>1996-1998</b>. At the request of the survivors, the names have been changed. Out of
              respect for the dead, the rest has been told exactly as it occurred.
            </p>
            <p style={{ textAlign: 'right', fontWeight: 'bold' }}>© Fargo</p>
          </div>
          <div className="col-sm-3 hidden-xs">
            <img width="185" src="./fargo500.jpg" alt="Fargo poster" />
          </div>
        </div>
      </Jumbotron>

      <div>
        <h4>Source code of this client app</h4>
        <a
          href="https://github.com/nodkz/graphql-typescript-boilerplate/tree/master/client"
          target="_blank"
        >
          https://github.com/nodkz/graphql-typescript-boilerplate/tree/master/client
        </a>
      </div>
      <br />
      <div>
        <h4>Source code of server-side ( Apollo Server )</h4>
        <a
          href="https://github.com/nodkz/graphql-typescript-boilerplate/tree/master/server"
          target="_blank"
        >
          https://github.com/nodkz/graphql-typescript-boilerplate/tree/master/server
        </a>
      </div>
    </div>
  );
}
