import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from "react-toastify";

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Failed to fetch food list");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching food list");
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList(); // Refresh the list after successful removal
            } else {
                toast.error("Failed to remove food item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error removing food item");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        {/* Use Cloudinary image URL */}
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p
                            onClick={() => removeFood(item._id)}
                            className='cursor'
                            style={{ color: "red", fontWeight: "500" }}
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
