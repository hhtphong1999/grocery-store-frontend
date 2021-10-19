import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as CONFIG from '../../../constants/config';

function EditProduct(props) {

    const history = useHistory();
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [productInput, setProduct] = useState({
        name: '',
        category_id: '',
        brand_id: '',

        slug: '',
        original_price: 0,
        selling_price: 0,
        mfg: '',
        exp: '',

        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',
        preservation: '',

        quantity: 0,
        unit: ''
    });

    const [image, setImage] = useState([]);
    const [allCheckbox, setCheckboxes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef();

    const [description, setDescription] = useState('');
    const inputHandler = (event, editor) => {
        setDescription(editor.getData());
    };

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allCheckbox, [e.target.name]: e.target.checked });
    };

    useEffect(() => {
        axios.get('/api/all-category').then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.categories);
            }
        });

        axios.get('/api/all-brand').then(res => {
            if (res.data.status === 200) {
                setBrandList(res.data.brands);
            }
        });

        const product_id = props.match.params.id;
        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setCheckboxes(res.data.product);
                setDescription(res.data.product.description || '');
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-product');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const updateProduct = (e) => {
        e.preventDefault();

        const product_id = props.match.params.id;

        const formData = new FormData();
        formData.append('name', productInput.name);
        formData.append('slug', productInput.slug);
        formData.append('category_id', productInput.category_id);
        formData.append('brand_id', productInput.brand_id);
        formData.append('original_price', productInput.original_price);
        formData.append('selling_price', productInput.selling_price);
        formData.append('mfg', productInput.mfg);
        formData.append('exp', productInput.exp);
        formData.append('quantity', productInput.quantity);
        formData.append('unit', productInput.unit);
        formData.append('description', description);
        formData.append('preservation', productInput.preservation);
        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_description', productInput.meta_description);
        formData.append('image', image.image);
        formData.append('status', allCheckbox.status ? 1 : 0);
        formData.append('featured', allCheckbox.featured ? 1 : 0);
        formData.append('best_seller', allCheckbox.best_seller ? 1 : 0);

        axios.post(`/api/update-product/${product_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('All fields are mandatory', '', 'error');
                setErrors(res.data.errors);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-product');
            } else if (res.data.message === 500) {
                console.log(res.data.message);
            }
        });
    }

    if (loading) {
        return <h4>Edit Product is loading...</h4>;
    }

    return (
        <div>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Sản phẩm</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Sản phẩm</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-xl">Cập nhật sản phẩm</h3>
                        </div>

                        <form onSubmit={updateProduct} encType="multipart/form-data">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" required />
                                            <small className="text-danger">{errors.name}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Loại sản phẩm</label>
                                            <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control" required >
                                                <option>Chọn loại sản phẩm</option>
                                                {
                                                    categoryList.map((item) => {
                                                        return (<option value={item.id} key={item.id} >{item.name}</option>);
                                                    })
                                                }
                                            </select>
                                            <small className="text-danger">{errors.category_id}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Giá gốc</label>
                                            <input type="number" name="original_price" min="0" onChange={handleInput} value={productInput.original_price} className="form-control" required />
                                            <small className="text-danger">{errors.original_price}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Số lượng</label>
                                            <input type="number" name="quantity" min="0" onChange={handleInput} value={productInput.quantity} className="form-control" required />
                                            <small className="text-danger">{errors.quantity}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Ngày sản xuất</label>
                                            <input type="date" name="mfg" onChange={handleInput} value={productInput.mfg} className="form-control" />
                                            <small className="text-danger">{errors.mfg}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Meta title</label>
                                            <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                            <small className="text-danger">{errors.meta_title}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Meta keyword</label>
                                            <input type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
                                            <small className="text-danger">{errors.meta_keyword}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Slug</label>
                                            <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" required />
                                            <small className="text-danger">{errors.name}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Thương hiệu</label>
                                            <select name="brand_id" onChange={handleInput} value={productInput.brand_id} className="form-control" required >
                                                <option>Chọn thương hiệu</option>
                                                {
                                                    brandList.map((item) => {
                                                        return (<option value={item.id} key={item.id} >{item.name}</option>);
                                                    })
                                                }
                                            </select>
                                            <small className="text-danger">{errors.sort_by}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Giá bán</label>
                                            <input type="number" name="selling_price" min="0" onChange={handleInput} value={productInput.selling_price} className="form-control" required />
                                            <small className="text-danger">{errors.selling_price}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Đơn vị</label>
                                            <input type="text" name="unit" onChange={handleInput} value={productInput.unit} className="form-control" required />
                                            <small className="text-danger">{errors.unit}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Hạn sử dụng</label>
                                            <input type="date" name="exp" onChange={handleInput} value={productInput.exp} className="form-control" />
                                            <small className="text-danger">{errors.exp}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Meta description</label>
                                            <input type="text" name="meta_description" onChange={handleInput} value={productInput.meta_description} className="form-control" />
                                            <small className="text-danger">{errors.meta_description}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Bảo quản</label>
                                            <input type="text" name="preservation" onChange={handleInput} value={productInput.preservation} className="form-control" />
                                            <small className="text-danger">{errors.preservation}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Mô tả</label>
                                            <CKEditor
                                                id="description"
                                                data={description}
                                                editor={ClassicEditor}
                                                onChange={inputHandler}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Ảnh sản phẩm</label>
                                            <input type="file" ref={ref} name="image" onChange={handleImage} className="form-control" />
                                            <small className="text-danger">{errors.image}</small>
                                        </div>
                                    </div>

                                    <img src={CONFIG.BASE_URL + `${productInput.image}`} width="100px" alt={productInput.name} />
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-check">
                                            <input type="checkbox" name="status" id="status" onChange={handleCheckbox} checked={allCheckbox.status} className="form-check-input" />
                                            <label className="form-check-label ml-4">Ẩn sản phẩm</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-check">
                                            <input type="checkbox" name="featured" id="featured" onChange={handleCheckbox} checked={allCheckbox.featured} className="form-check-input" />
                                            <label className="form-check-label ml-4">Sản phẩm nổi bật</label>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-check">
                                            <input type="checkbox" name="best_seller" id="best_seller" onChange={handleCheckbox} checked={allCheckbox.best_seller} className="form-check-input" />
                                            <label className="form-check-label ml-4">Sản phẩm bán chạy</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to="/admin/product-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditProduct;