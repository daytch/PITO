import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, FormText, Table, Input, Alert, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Card, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios';
const config = require('../../../services/config');
const currency = require('../../../helpers/currency');

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      jumlahEmas: 0,
      jumlahPerak: 0,
      jumlahEmasRp: 0,
      jumlahPerakRp: 0,
      jumlahZakatEmasPerak: 0,

      emas: "",
      perak: ""
    };

    this.handleChangeEmas = this.handleChangeEmas.bind(this);
    this.handleChangePerak = this.handleChangePerak.bind(this);
  }

  handleChangeEmas(event) {
    if (event.target.value > 85) {
      let angkawithcomma = this.state.emas.replace('.', '');
      let angka = angkawithcomma.replace(',', '.');
      let ze = 0.025 * parseFloat(event.target.value);
      let s = ze * parseFloat(angka);
      let rp = s.toString().substring(0, s.toString().indexOf('.'));
      console.warn(this.state.jumlahZakatEmasPerak);
      console.warn(rp);
      let total = currency.ConvertToAngka(this.state.jumlahZakatEmasPerak) + Number(rp);
      this.setState({
        jumlahEmasRp: rp, // currency.ConvertToRupiah(rp),
        jumlahEmas: ze,
        jumlahZakatEmasPerak: total //currency.ConvertToRupiah(total)
      });
    } else {
      this.setState({
        jumlahEmasRp: 0,
        jumlahEmas: 0
      });
    }
  }

  handleChangePerak(event) {
    if (event.target.value > 595) {
      let angkawithcomma = this.state.perak.replace('.', '');
      let angka = angkawithcomma.replace(',', '.');
      let zp = 0.025 * parseFloat(event.target.value);
      let s = zp * parseFloat(angka);
      let rp = s.toString().substring(0, s.toString().indexOf('.'));
      let total = currency.ConvertToAngka(this.state.jumlahZakatEmasPerak) + Number(rp);
      this.setState({
        jumlahPerakRp: rp, // currency.ConvertToRupiah(rp),
        jumlahPerak: zp,
        jumlahZakatEmasPerak: total//currency.ConvertToRupiah(total)
      });
    } else {
      this.setState({ jumlahPerakRp: 0, jumlahPerak: 0 });
    }
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  componentDidMount() {
    axios.get(config.API_URL + "calculator/all")
      .then(function (response) {
        this.setState({ emas: response.data.emas, perak: response.data.perak });
      }.bind(this))
      .catch(function (error) {
        console.error(error);
      });
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
          <blockquote>
            Zakat yang dikenakan atas emas atau perak yang telah mencapai nisab dan haul. Zakat emas wajib dikenakan atas kepemilikan emas yang telah mencapai nisab 85 gram emas.
            Zakat perak wajib dikenakan atas kepemilikan perak yang telah mencapai nisab 595 gram perak. Kadar zakat atas emas ataupun perak sebesar 2,5%.
          </blockquote><br>
          </br>
          <Table striped responsive size="sm">
            <tbody>
              <tr><th colSpan="2">Zakat Emas dan Perak</th></tr>
              <tr><td>Emas</td><td><InputGroup className="input-prepend">
                <Input type="number" id="my-gold" onChange={this.handleChangeEmas} />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>gram</InputGroupText>
                </InputGroupAddon></InputGroup></td></tr>
              <tr><td>Perak</td><td><InputGroup className="input-prepend">
                <Input type="number" id="my-silver" onChange={this.handleChangePerak} />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>gram</InputGroupText>
                </InputGroupAddon></InputGroup></td></tr>
              <tr><td>Jumlah zakat emas</td><td><InputGroup className="input-prepend">
                <Input type="number" id="jml-zakat-gold" value={this.state.jumlahEmas} disabled />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>gram</InputGroupText>
                </InputGroupAddon></InputGroup></td></tr>
              <tr><td>Jumlah zakat perak</td><td><InputGroup className="input-prepend">
                <Input type="number" id="jml-zakat-silver" value={this.state.jumlahPerak} disabled />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>gram</InputGroupText>
                </InputGroupAddon></InputGroup></td></tr>
              <tr><td colSpan="2"><strong>Zakat Emas dan Perak (jika dibayar dengan uang)</strong></td></tr>
              <tr><td>Harga 1 gram emas</td><td><InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Rp.</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={this.state.emas} disabled id="HargaEmas" /></InputGroup><FormText className="help-block">source : <a href="https://harga-emas.org/1-gram/">https://harga-emas.org/1-gram/</a></FormText></td></tr>
              <tr><td>Harga 1 gram perak</td><td><InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Rp.</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={this.state.perak} disabled id="HargaPerak" /></InputGroup><FormText className="help-block">source : <a href="https://harga-emas.org/perak/-">https://harga-emas.org/perak/-</a></FormText></td></tr>
              <tr><td>Jumlah zakat emas yang dikeluarkan</td><td><InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Rp.</InputGroupText>
                </InputGroupAddon><Input type="text" id="jml-zakat-gold-rp" value={this.state.jumlahEmasRp} onChange={this.handleChangeEmas} /></InputGroup></td></tr>
              <tr><td>Jumlah zakat perak yang dikeluarkan</td><td><InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Rp.</InputGroupText>
                </InputGroupAddon><Input type="text" id="jml-zakat-silver-rp" value={this.state.jumlahPerakRp} onChange={this.handleChangeEmas} /></InputGroup></td></tr>
              <tr><td>Total zakat emas dan perak yang dikeluarkan</td><td><InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Rp.</InputGroupText>
                </InputGroupAddon><Input type="text" id="total-zakat-all-rp" value={this.state.jumlahZakatEmasPerak} onChange={this.handleChangeEmas} /><Input type="text" /></InputGroup></td></tr>
            </tbody>
          </Table>

        </TabPane>
        <TabPane tabId="2">
          {`2. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="3">
          {`3. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="4">
          {`4. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="5">
          {`5. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="6">
          {`6. ${this.lorem()}`}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Card>
              <CardHeader>
                Calculator Zakat
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '1'}
                      onClick={() => { this.toggle(0, '1'); }}
                    >
                      Emas & Perak
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '2'}
                      onClick={() => { this.toggle(0, '2'); }}
                    >
                      Uang
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '3'}
                      onClick={() => { this.toggle(0, '3'); }}
                    >
                      Perniagaan
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '4'}
                      onClick={() => { this.toggle(0, '4'); }}
                    >
                      Peternakan
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '5'}
                      onClick={() => { this.toggle(0, '5'); }}
                    >
                      Pendapatan & Jasa
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '6'}
                      onClick={() => { this.toggle(0, '6'); }}
                    >
                      Rikaz(Temuan)
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                  {this.tabPane()}
                </TabContent>
              </CardBody>
              <Col xs='12' md='12'>
                <Alert>
                  1. Perhitungan Zakat ini didasarkan pada : <blockquote>
                    <a href="http://simbi.kemenag.go.id/simzat/download/files/syarat_dan_tata_cara_penghitungan_zakat.pdf">
                      <strong>PERATURAN MENTERI AGAMA (PMA) NOMOR 52 TAHUN 2014 </strong> <em>tentang</em> "SYARAT DAN TATA CARA PERHITUNGAN ZAKAT MAL DAN ZAKAT FITRAH SERTA PENDAYAGUNAAN ZAKAT UNTUK USAHA PRODUKTIF".
                </a>
                  </blockquote>
            2. <strong>Nisab</strong> <em>adalah</em> batasan minimal harta yang wajib dikenakan zakat.<br></br>
            3. <strong>Haul</strong> <em>adalah</em> batasan waktu satu tahun hijriyah atau 12(dua belas) bulan qomariyah kepemilikan harta yang wajib dikeluarkan zakat.
                </Alert>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tabs;
