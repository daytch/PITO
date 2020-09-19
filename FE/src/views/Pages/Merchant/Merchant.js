import React, { Component } from 'react';
import { Table, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button } from 'reactstrap';
import axios from "./../../../services/axios.config";


class Merchant extends Component {
  constructor(props) {
    super(props);
    this.disableMerchant = this.handleDisableMerchant(this);
    this.viewMerchant = this.handleViewMerchant(this);
    this.addLivestream = this.handleAddLivestream(this);
    this.editMerchant = this.handleEditMerchant(this);
    this.state = {
      data: [],
      merchants: []
    };
  }

  handleDisableMerchant(e) {
    // e.preventDefault();
    console.log("handleDisableMerchant");
  }

  handleViewMerchant(e) {
    // e.preventDefault();
    console.log("handleViewMerchant");
  }

  handleAddLivestream(e) {
    // e.preventDefault();
    console.log("handleAddLivestream");
  }

  handleEditMerchant(e) {
    // e.preventDefault();
    console.log("handleEditMerchant");
  }

  componentDidMount() {
    axios.get('merchant').then(res => {
      this.setState({
        merchants: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    let headerElement = ['id', 'username', 'email', 'action'];
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Merchant List
              </CardHeader>
              <CardBody>

                <Table id='employee' className='table table-sm table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      {headerElement.map((key, index) => {
                        return <th key={index}><center>{key.toUpperCase()}</center></th>
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.merchants && this.state.merchants.map(({ id, username, email }) => {
                      return <tr key={id}>
                        <td><center>{id}</center></td>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td className='opration'>
                          <center>
                            <div class="btn-group" role="group" aria-label="Basic example">
                              <Button size="sm" color="success" className="btn-pill" onClick={this.handleViewMerchant}>View</Button>
                              <Button size="sm" color="warning" className="btn-pill" onClick={this.handleEditMerchant}>Edit</Button>
                              <Button size="sm" color="primary" className="btn-pill" onClick={this.handleAddLivestream}>Add</Button>
                              <Button size="sm" color="danger" className="btn-pill" onClick={this.handleDisableMerchant}>Disable</Button>
                            </div>
                          </center>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>

                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Merchant;
