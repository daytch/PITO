import React, { Component } from 'react';
import { FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button } from 'reactstrap';
import axios from "./../../../services/axios.config";
// import moment from 'moment';
import Swal from 'sweetalert2';
import InfiniteScroll from "react-infinite-scroller";

class Support extends Component {
  _isMounted = false;
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=200",
    pokemon: [],
    itemsCountPerPage: 20,
    activePage: 1
  };

  loadPokemon = () => {
    axios
      .get(this.state.url)
      .then(res => {
        this.setState(prevState => {
          const pokemons = prevState.pokemon;
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
        <Col>
          <Card>

            <CardHeader><i className="fa fa-align-justify"></i> Support List</CardHeader>

            <CardBody>
              {/* <React.Fragment> */}
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>URL</th>
                  </tr>
                </thead>
                
                  {this.state.pokemon ? (
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={this.loadPokemon}
                      hasMore={true}//{this.state.url}
                      element={'tbody'}
                      // loader={
                      //   <span className="loader" key={0}>
                      //     Loading ...
                      //   </span>
                      // }
                    >
                      {this.state.pokemon.map((pokemon, i) => (
                        <tr key={pokemon.name + i}>
                          <td>{pokemon.name}</td>
                          <td>{pokemon.url}</td>
                        </tr>
                      ))}
                    </InfiniteScroll>
                  ) : (
                      <h1>Loading Data</h1>
                    )}
                    
              </Table>
              {/* </React.Fragment> */}

            </CardBody>
          </Card>
        </Col>
      </Row>

    );
  }
}

export default Support;
