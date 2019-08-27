import React, { createRef } from 'react';
import store from 'store'
import isLoggedIn from '../helper/isLoggedIn'
import { Label, FormGroup, Input, Container, Button, Form, Col, Row } from 'reactstrap';
import AppHeader from '../common/AppHeader'
import { Redirect } from 'react-router-dom'
import axios from "axios";
import Dropzone from 'react-dropzone'
import AppFooter from '../common/AppFooter'
import {BackEndUrl} from '../config/BackEnd'




const dropzoneRef = createRef()


// axios.defaults.baseURL = 'http://localhost:8080'
class InvestasiForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:'',
            invId: '',
            nama: '',
            nilaiInvestasi: 1000000,
            jumlahSlot: 1,
            returnLow: 0,
            returnHigh: 0,
            risiko: 'Sangat Tinggi',
            periodeBagiHasil: 0,
            periodeKontrak: 0,
            rincian: '',
            gambarArray: [],
            // alamat:{
            //     provinsi:'',
            //     kabupaten:'',
            //     desa:'',
            //     alamat:''
            // },

            gambar: '',
            gambar2: '',
            gambar3: '',
            gambar4: '',
            gambar5: '',

            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com',

            datasWithImg: [],
            success: false

        }
        this.changeOnNama = this.changeOnNama.bind(this)
        this.changeOnNilai = this.changeOnNilai.bind(this)
        this.changeOnSlot = this.changeOnSlot.bind(this)
        this.changeOnReturnLow = this.changeOnReturnLow.bind(this)
        this.changeOnReturnHigh = this.changeOnReturnHigh.bind(this)
        this.changeOnPeriode = this.changeOnPeriode.bind(this)
        this.changeOnRincian = this.changeOnRincian.bind(this)
        this.changeOnRisiko = this.changeOnRisiko.bind(this)
        // this.changeOnProvinsi = this.changeOnProvinsi.bind(this)
        // this.changeOnKabupaten = this.changeOnKabupaten.bind(this)
        // this.changeOnDesa = this.changeOnDesa.bind(this)
        this.changeOnAlamat = this.changeOnAlamat.bind(this)
        this.changeOnPeriodeBagiHasil = this.changeOnPeriodeBagiHasil.bind(this)
        this.onAddGambarArr = this.onAddGambarArr.bind(this)
        this.sendData = this.sendData.bind(this)
    }

    changeOnAlamat(event){
        this.setState({
            alamat:{
                alamat: event.target.value
            }
        })
    }
    changeOnPeriodeBagiHasil(event) {
        this.setState({
            periodeBagiHasil: event.target.value
        })
    }
    changeOnRisiko(event) {

        this.setState({
            risiko: event.target.value
        })
    }
    changeOnNama(event) {
        this.setState({
            nama: event.target.value
        })
    }
    changeOnNilai(event) {
        this.setState({
            nilaiInvestasi: event.target.value
        })
    }
    changeOnPeriode(event) {
        this.setState({
            periodeKontrak: event.target.value
        })
    }
    changeOnReturnHigh(event) {
        this.setState({
            returnHigh: event.target.value
        })
    }
    changeOnReturnLow(event) {
        this.setState({
            returnLow: event.target.value
        })
    }
    changeOnRincian(event) {
        this.setState({
            rincian: event.target.value
        })
    }

    changeOnSlot(event) {
        this.setState({
            jumlahSlot: event.target.value
        })
    }


    // This function does the uploading to cloudinary
    handleUploadImageOne = images => {
        let image = images[0]

        const formData = new FormData();
        formData.append("file", image);
        formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
        formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
        formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Replace cloudinary upload URL with yours
        axios.post(
            "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
            formData,
            { headers: { "X-Requested-With": "XMLHttpRequest" } })
            .then(response => {
                if (this.state.gambar !== response.data.url) {
                    this.setState({
                        gambar: response.data.url
                    })

                }

                this.onAddGambarArr()
                console.log('ini gambar 1', this.state.gambar)
            })

    }
    handleUploadImageTwo = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        let image = images[0]            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
            formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
            formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Replace cloudinary upload URL with yours
            axios.post(
                "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => {
                    this.setState({
                        gambar2: response.data.url
                    })
                    this.onAddGambarArr()
                    console.log('ini gambar 2', this.state.gambar2)
                })
    }
    handleUploadImageThree = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        let image = images[0]            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
            formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
            formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Replace cloudinary upload URL with yours
            axios.post(
                "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => {
                    this.setState({
                        gambar3: response.data.url
                    })
                    this.onAddGambarArr()
                    console.log('ini gambar 3', this.state.gambar3)
                })
    }
    handleUploadImageFour = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        let image = images[0]            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
            formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
            formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Replace cloudinary upload URL with yours
            axios.post(
                "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => {
                    this.setState({
                        gambar4: response.data.url
                    })
                    this.onAddGambarArr()
                    console.log('ini gambar 4', this.state.gambar4)
                })
    }
    handleUploadImageFive = images => {
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        let image = images[0]            // our formdata
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
            formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
            formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Replace cloudinary upload URL with yours
            axios.post(
                "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
                formData,
                { headers: { "X-Requested-With": "XMLHttpRequest" } })
                .then(response => {                    
                    this.onAddGambarArr()
                    this.setState({
                        gambar5: response.data.url
                    })
                    console.log('ini gambar 5', this.state.gambar5)
                })
    }


    onAddGambarArr = () => {
        let gambarArray = []
        if (this.state.gambar !== '') {
            gambarArray.push(this.state.gambar)
        }
        if (this.state.gambar2 !== '') {
            gambarArray.push(this.state.gambar2)
        }
        if (this.state.gambar3 !== '') {
            gambarArray.push(this.state.gambar3)
        }
        if (this.state.gambar4 !== '') {
            gambarArray.push(this.state.gambar4)
        }
        if (this.state.gambar5 !== '') {
            gambarArray.push(this.state.gambar5)
        }
        console.log('ini array send', gambarArray)
        this.setState({
            gambarArray: gambarArray
        })
        console.log('ini array state', this.state.gambarArray)
    }

    sendData() {
        const data ={
            nama: this.state.nama,
            nilaiInvestasi: this.state.nilaiInvestasi,
            jumlahSlot: this.state.jumlahSlot,
            returnLow: this.state.returnLow,
            returnHigh: this.state.returnHigh,
            periodeBagiHasil: this.state.periodeBagiHasil,
            periodeKontrak: this.state.periodeKontrak,
            rincian: this.state.rincian,
            gambar: this.state.gambarArray,
            userId: localStorage.getItem('USER_ID')
        }
        if (this.state.gambarArray.length < 1) {
            alert('gambar tidak boleh kosong')
        } else {
            axios.post(`${BackEndUrl}/v1/api/investment`, data, { headers: { "Authorization": localStorage.getItem('JWT_TOKEN')} })
            .then(res => {
    
                axios.put(`${BackEndUrl}/v1/api/user`, {invId: res.data.data._id}, {headers:{"Authorization": localStorage.getItem('JWT_TOKEN')}})
                .then(()=>{
                    this.setState({
                    
                        invId: res.data.data._id,
                        success:true
    
                    }) 
                }).catch(errUser=>{
                    console.log(errUser)
                })
            }).catch(err=>{
                console.log(err)
            })
        }

    }

    render() {
        // const alert = useAlert()
        if (!isLoggedIn()) {
            return (
                <Redirect to='/login' />
            )

        }
        else if (this.state.success) {
            alert(`Anda berhail membuat Investasi ${this.state.nama}. Investasi anda harus kami validasi terlebih dahulu sebelum resmi kami upload`)
            return (

                <Redirect to={'/investasi/'+this.state.invId} />
            )
        }else{

        let imageUploadOne
        let imageUploadTwo
        let imageUploadThree
        let imageUploadFour
        let imageUploadFive
        if (this.state.gambar === '') {
            imageUploadOne =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageOne}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            imageUploadOne =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageOne}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '100px' }} src={this.state.gambar} alt="" />
                        </div>
                    )}
                </Dropzone>


        }
        if (this.state.gambar2 === '') {
            imageUploadTwo =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageTwo}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            imageUploadTwo =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageTwo}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '100px' }} src={this.state.gambar2} alt="" />
                        </div>
                    )}
                </Dropzone>


        }
        if (this.state.gambar3 === '') {
            imageUploadThree =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageThree}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            imageUploadThree =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageThree}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '100px' }} src={this.state.gambar3} alt="" />
                        </div>
                    )}
                </Dropzone>


        }
        if (this.state.gambar4 === '') {
            imageUploadFour =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageFour}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            imageUploadFour =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageFour}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '100px' }} src={this.state.gambar4} alt="" />
                        </div>
                    )}
                </Dropzone>


        }
        if (this.state.gambar5 === '') {
            imageUploadFive =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageFive}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: 100 }} src="https://image.flaticon.com/icons/png/512/3/3901.png" alt="" srcset="" />
                        </div>
                    )}
                </Dropzone>
        } else {
            imageUploadFive =
                <Dropzone ref={dropzoneRef} onDrop={this.handleUploadImageFive}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img style={{ width: '100px' }} src={this.state.gambar5} alt="" />
                        </div>
                    )}
                </Dropzone>


        }
        console.log(this.state.risiko)
        return (
            <div>
                <AppHeader />
                <Container style={{ width: '750px', marginTop: '40px' }}>
                    <Form >
                        <Row>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="nama">Nama Investasi</Label>
                                    <Input
                                        onChange={this.changeOnNama}
                                        type="text"
                                        name="nama"
                                        minLength="4"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="nilaiInvestasi">Nilai Investasi (IDR)</Label>
                                    <Input
                                        onChange={this.changeOnNilai}
                                        type="number"
                                        name="nilaiInvestasi"
                                        min='1000000'
                                        step='500'
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="jumlahSlot">Jumlah Slot</Label>
                                    <Input
                                        onChange={this.changeOnSlot}

                                        type="number"
                                        min="1"
                                        max="100"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="risiko">Tingkat Risiko</Label>
                                    <Input
                                        onChange={this.changeOnRisiko}
                                        type="select"
                                        name="risiko"
                                        value={this.state.risiko}
                                    >
                                        <option>Sangat Tinggi</option>
                                        <option>Tinggi</option>
                                        <option>Sedang</option>
                                        <option>Rendah</option>
                                        <option>Sangat Rendah</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="returnLow">Ekspektasi Bagi Hasil Rendah (%)</Label>
                                    <Input
                                        onChange={this.changeOnReturnLow}
                                        type="number" min="0" step="0.1"
                                        name="returnLow"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="returnHigh">Ekspektasi Bagi Hasil Tinggi (%)</Label>
                                    <Input
                                        onChange={this.changeOnReturnHigh}
                                        type="number" min="0" step="0.1"
                                        name="returnHigh"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="periodeKontrak">Periode Kontrak (dalam tahun)</Label>
                                    <Input
                                        onChange={this.changeOnPeriodeKontrak}
                                        type="number"
                                        name="periodeKontrak"
                                        type="number" min="1" step="1"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="periodeBagiHasil">Periode Bagi Hasil (dalam tahun)</Label>
                                    <Input
                                        onChange={this.changeOnPeriodeBagiHasil}
                                        type="number"
                                        name="periodeBagihasil"
                                        type="number" min="1" step="1"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col sm='4'>
                            <FormGroup>
                                    <Label for="provinsi">Provinsi</Label>
                                    <Input
                                        onChange={this.changeOnProvinsi}
                                        type="select"
                                        name="provinsi"
                                        value={this.state.alamat.provinsi}
                                    >
                                        <option>Sangat Tinggi</option>
                                        <option>Tinggi</option>
                                        <option>Sedang</option>
                                        <option>Rendah</option>
                                        <option>Sangat Rendah</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm='4'>
                            <FormGroup>
                                    <Label for="kabupaten">Kabupaten</Label>
                                    <Input
                                        onChange={this.changeOnKabupaten}
                                        type="select"
                                        name="kabupaten"
                                        value={this.state.alamat.kabupaten}
                                    >
                                        <option>Sangat Tinggi</option>
                                        <option>Tinggi</option>
                                        <option>Sedang</option>
                                        <option>Rendah</option>
                                        <option>Sangat Rendah</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm='4'>
                            <FormGroup>
                                    <Label for="desa">Desa</Label>
                                    <Input
                                        onChange={this.changeOnDesa}
                                        type="select"
                                        name="alamat"
                                        value={this.state.alamat.desa}
                                    >
                                        <option>Sangat Tinggi</option>
                                        <option>Tinggi</option>
                                        <option>Sedang</option>
                                        <option>Rendah</option>
                                        <option>Sangat Rendah</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row> */}

                        <FormGroup>
                            <Label for="rincian">Rincian</Label>
                            <Input onChange={this.changeOnRincian} type="textarea" name="rincian" />
                        </FormGroup>
                        <Row>
                            <Col sm='2'>
                                <FormGroup>
                                    <Label for='gambar'></Label>
                                    {imageUploadOne}
                                </FormGroup>
                            </Col>
                            <Col sm='2'>
                                <FormGroup>
                                    <Label for='gambar'></Label>
                                    {imageUploadTwo}
                                </FormGroup>
                            </Col>
                            <Col sm='2'>
                                <FormGroup>
                                    <Label for='gambar'></Label>
                                    {imageUploadThree}
                                </FormGroup>
                            </Col>
                            <Col sm='2'>
                                <FormGroup>
                                    <Label for='gambar'></Label>
                                    {imageUploadFour}
                                </FormGroup>
                            </Col>
                            <Col sm='2'>
                                <FormGroup>
                                    <Label for='gambar'></Label>
                                    {imageUploadFive}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button onClick={this.sendData}>Submit</Button>
                    </Form>

                </Container>
                <br />
                <AppFooter />
            </div>
        );
        }



    }
};

export default InvestasiForm;

