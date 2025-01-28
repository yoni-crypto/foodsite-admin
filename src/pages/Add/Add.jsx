import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
// import toast from "react-toastify"

const Add = ({url}) => {

    const [image, setimage] = useState(false);
    const [data, setdata] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad",
    });

    const onChangeHandler = (e) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", Number(data.price));
        formdata.append("category", data.category);
        formdata.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formdata);
        if (response.data.sucess) {
            setdata({
                name: "",
                description: "",
                price: "",
                category: "salad",
            });
            setimage(false);
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => setimage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="write content here"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="addcategory flex-col">
                        <p>Product category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                        >
                            <option value="Burger">Burger</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$"
                        />
                    </div>
                </div>
                <button type="submit" className="add-btn">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
