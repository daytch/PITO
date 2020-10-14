import React, { Component } from 'react';
import { FormGroup, Label, Input, Table, Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import axios from "./../../../services/axios.config";
import InfiniteScroll from "react-infinite-scroller";

class Category extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=200",
      pokemon: [],
      itemsCountPerPage: 20,
      activePage: 1,
      activeTab: new Array(4).fill('1')
    };

  }

  loadPokemon = () => {
    axios
      .get(this.state.url)
      .then(res => {
        this.setState(prevState => {
          // const pokemons = prevState.pokemon;
          return {
            pokemon: [...prevState.pokemon, ...res.data.results],
            url: res.data.next
          };
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  render() {
    return (
      <Row>
        <Col xs="12" md="4" xl="4">
          <Card>
            <CardHeader>Input Category</CardHeader>
            <CardBody>
              <FormGroup>
                <Label htmlFor="category">Category</Label>
                <Input type="text" id="category" placeholder="Category" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="slug">SLUG</Label>
                <Input type="text" id="slug" placeholder="SLUG" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="textarea" name="description" id="description" rows="9"
                  placeholder="Description" />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="8" xl="8">
          <Card>
            <CardHeader>
              Category List
              </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {this.state.pokemon ? (
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadPokemon}
                    hasMore={true}
                    element={'tbody'}
                  >
                    {this.state.pokemon.map((pokemon, i) => (
                      <tr key={pokemon.name + i}>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.url}</td>
                        <td><Button color="info">Edit</Button> | <Button color="danger">Delete</Button></td>
                      </tr>
                    ))}
                  </InfiniteScroll>
                ) : (
                    <h1>Loading Data</h1>
                  )}

              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Category;
