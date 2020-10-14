import React, { Component } from 'react';
import { TabContent, NavLink, NavItem, Nav, TabPane, Table, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import axios from "./../../../services/axios.config";
import InfiniteScroll from "react-infinite-scroller";

class Support extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
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

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    ;
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <h1>Tab 1</h1>
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
                hasMore={true}
                element={'tbody'}
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
        </TabPane>
        <TabPane tabId="2">
          <h1>Tab 2</h1>
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
                hasMore={true}
                element={'tbody'}
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
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Support List
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '1'}
                      onClick={() => { this.toggle(0, '1'); }}
                    >
                      Merchant Tickets
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '2'}
                      onClick={() => { this.toggle(0, '2'); }}
                    >
                      User Tickets
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                  {this.tabPane()}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Support;
