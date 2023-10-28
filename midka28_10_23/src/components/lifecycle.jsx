import React, { Component } from 'react';

//just example

class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://0.0.0.0:4000/api/posts/')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          isLoading: false,
        });
      });
  }



  render() {
    const { data, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FetchData;