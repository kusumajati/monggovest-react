import React, { createRef } from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Label, FormGroup, Input, Container, FormText, Button, Form, Col, Row } from 'reactstrap'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import isLoggedIn from '../helper/isLoggedIn'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import Dropzone from 'react-dropzone'
import {BackEndUrl} from '../config/BackEnd'


const dropzoneRef = createRef()
class EditProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tanggalLahir: '',
            namaLengkap: '',
            jenisIdentitas: '',
            noIdentitas: '',
            alamat: '',
            gambar:'',
            email: '',
            telepon: '',
            jumlahPenghasilan: '',
            sumberPenghasilan: '',
            userId:'',

            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com',
            redirect: false

        }
        this.handleChangeTanggalLahir = this.handleChangeTanggalLahir.bind(this);
        this.handleChangeNamaLengkap = this.handleChangeNamaLengkap.bind(this)
        this.handleChangeJenisIdentitas = this.handleChangeJenisIdentitas.bind(this)
        this.handleChangeNoIdentitas = this.handleChangeNoIdentitas.bind(this)
        this.handleChangeAlamat = this.handleChangeAlamat.bind(this)
        this.handleChangeTelepon = this.handleChangeTelepon.bind(this)
        this.handleChangeJumlahPenghasilan = this.handleChangeJumlahPenghasilan.bind(this)
        this.handleChangeSumberPenghasilan = this.handleChangeSumberPenghasilan.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }
    handleUploadImage = images => {
        let image = images[0]

        const formData = new FormData();
        formData.append("file", image);
        formData.append("tags", 'TAGS'); // Add tags for the images - {Array}
        formData.append("upload_preset", "ninopreset"); // Replace the preset name with your own
        formData.append("api_key", 'smgbYZf5aweM7DDrxHde_uormXk'); // Replace API key with your own Cloudinary API key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Replace cloudinary upload URL with yours
        Axios.post(
            "https://api.cloudinary.com/v1_1/ninocloudinary/image/upload",
            formData,
            { headers: { "X-Requested-With": "XMLHttpRequest" } })
            .then(response => {
                    if(response.data.url !== this.state.gambar){
                    this.setState({
                        gambar: response.data.url
                    })

                }
            })

    }
    updateProfile(){
        Axios.put(`${BackEndUrl}/v1/api/user`, {
            tanggalLahir: this.state.tanggalLahir,
            namaLengkap: this.state.namaLengkap,
            jenisIdentitas: this.state.jenisIdentitas,
            noIdentitas: this.state.noIdentitas,
            alamat: this.state.alamat,
            profilePicture: this.state.gambar,
            telepon: this.state.telepon,
            jumlahPenghasilan: this.state.jumlahPenghasilan,
            sumberPenghasilan: this.state.sumberPenghasilan
            
        }, {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}})
        .then(user=>{
            this.setState({
                redirect:true,
                userId: user.data.data._id
            })
            console.log('successfully update user')
        })
    }
    handleChangeSumberPenghasilan(event){
        this.setState({
            sumberPenghasilan: event.target.value
        })
    }
    handleChangeJumlahPenghasilan(event){
        this.setState({
            jumlahPenghasilan: event.target.value
        })
    }
    handleChangeAlamat(event) {
        this.setState({
            alamat: event.target.value
        })
    }
    handleChangeJenisIdentitas(event) {
        this.setState({
            jenisIdentitas: event.target.value
        })
    }
    handleChangeNamaLengkap(event) {
        this.setState({
            namaLengkap: event.target.value
        })
    }

    handleChangeTanggalLahir(event) {
        this.setState({
            tanggalLahir: event.target.value
        });
    }
    handleChangeNoIdentitas(event) {
        this.setState({
            noIdentitas: event.target.value
        })
    }
    handleChangeTelepon(event) {
        this.setState({
            telepon: event.target.value
        })
    }

    componentDidMount(){
        Axios.get(`${BackEndUrl}/v1/api/user/${localStorage.getItem('USER_ID')}`)
        .then(user=>{
            this.setState({
                id: user.data.data._id,
                tanggalLahir:user.data.data.tanggalLahir,
                namaLengkap: user.data.data.namaLengkap,
                jenisIdentitas: user.data.data.jenisIdentitas,
                noIdentitas: user.data.data.noIdentitas,
                alamat: user.data.data.alamat,
                email: user.data.data.email,
                telepon: user.data.data.telepon,
                jumlahPenghasilan: user.data.data.jumlahPenghasilan,
                sumberPenghasilan: user.data.data.sumberPenghasilan,
                gambar:user.data.data.profilePicture

            })
            console.log(user.data.data.namaLengkap, 'ini res user namaLengkap')
        }).catch(err=>{
            console.log(err)
            alert(err)
        })
    }
    render() {
console.log(this.state.userId, 'ini state userId')
console.log(this.state.redirect, 'ini redirect')
        if (!isLoggedIn()) {
            return (
                <Redirect to='/login' />
            )
        }else if(this.state.redirect){
            return(
                <Redirect to={'/user/'+this.state.userId} />
 
            )
        }
        
        else {
           
              let  imageUpload
              
              imageUpload=
                    <Dropzone name='pp' ref={dropzoneRef} onDrop={this.handleUploadImage}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img style={{ width: 100 }} src={this.state.gambar} alt="" srcset="" />
                            </div>
                        )}
                    </Dropzone>

            return (
                <div style={{ height: '100%' }}>
                    <AppHeader />
                    <h1 style={{textAlign:'center', margin:'2em 0 2em 0'}}>Perbarui Profile</h1>
                    <Container style={{ width: '800px' }}>
                        <div style={{ margin: '0 0 10em 0', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', padding: '2em' }}>
                            <Form onSubmit={this.updateProfile}>
                                <h3>Informasi Pribadi</h3>
                                <Row>
                                    <Col sm='8'>
                                        <FormGroup>
                                            <Label for="namaLengkap">Nama Lengkap</Label>
                                            <Input
                                                onChange={this.handleChangeNamaLengkap}
                                                type="text" name="namaLengkap" value={this.state.namaLengkap} />
                                                
                                        </FormGroup>
                                    </Col>
                                    <Col sm='4'>
                                        <FormGroup>
                                            <Label for='tanggal lahir'>Tanggal Lahir</Label>
                                            <Input
                                            type='date'
                                            name='tanggal lahir'
                                            value={this.state.tanggalLahir}
                                            
                                            onChange={this.handleChangeTanggalLahir}
                                            >
                                            
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='8'>
                                        <FormGroup>
                                            <Label for="noIdentitas">Nomor Identitas</Label>
                                            <Input
                                            value={this.state.noIdentitas}
                                                onChange={this.handleChangeNoIdentitas}
                                                type="text" name="noIdentitas" />
                                                
                                        </FormGroup>
                                    </Col>
                                    <Col sm='4'>
                                        <FormGroup>
                                            <Label for='jenisIdentitas'>Jenis Identitas</Label>
                                            <Input
                                                type='select'
                                                name='jenisIdentitas'
                                                onChange={this.handleChangeJenisIdentitas}
                                                value={this.state.jenisIdentitas}
                                            >
                                                <option>KTP</option>
                                                <option>SIM</option>
                                                <option>NPWP</option>
                                                <option>KK</option>
                                                <option>Lainnya</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm='8'>
                                        <FormGroup>
                                            <Label for='alamat'>Alamat</Label>
                                            <Input
                                                onChange={this.handleChangeAlamat}
                                                name='alamat'
                                                value={this.state.alamat}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm='4'>
                                        <FormGroup> 
                                            <Label for='pp'>Profile Picture</Label>
                                        {imageUpload}
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <h3>Informasi Kontak</h3>
                                <Row>
                                    <Col sm='12'>
                                        <FormGroup>
                                            <Label for='email'>Email</Label>
                                            <Input
                                                name='email'
                                                type='text'
                                                value={this.state.email}
                                                readonly
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12'>
                                        <FormGroup>
                                            <Label for='telepon'>Telepon</Label>
                                            <Input
                                                type='text'
                                                name='telepon'
                                                onChange={this.handleChangeTelepon}
                                                value={this.state.telepon}
                                            >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='8'>
                                        <FormGroup>
                                            <Label for='jumlahPenghasilan'>Jumlah penghasilan perbulan</Label>
                                            <Input
                                                name='jumlahPenghasilan'
                                                type='select'
                                                value={this.state.jumlahPenghasilan}
                                                onChange={this.handleChangeJumlahPenghasilan}
                                            >
                                                <option>&#60; Rp 4,000,000 </option>
                                                <option>Rp 4,000,000 - Rp 6,000,000</option>
                                                <option>Rp 4,000,000 - Rp 6,000,000</option>
                                                <option >Rp 6,000,000 - Rp 8,000,000</option>
                                                <option >Rp 8,000,000 - Rp 10,000,000</option>
                                                <option>&#62; Rp 10,000,000</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm='4'>
                                        <FormGroup>
                                            <Label for='sumberPenghasilan'>Sumber Penghasilan</Label>
                                            <Input
                                                name='sumberPenghasilan'
                                                type='select'
                                                value={this.state.sumberPenghasilan}
                                                onChange={this.handleChangeSumberPenghasilan}
                                            >
                                                <option>Gaji</option>
                                                <option>Lainnya</option>
                                            </Input>

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button onClick={this.updateProfile}>Submit</Button>
                            </Form>
                        </div>
                    </Container>
                    <AppFooter />
                </div>
            )
        }
    }
}


export default EditProfile