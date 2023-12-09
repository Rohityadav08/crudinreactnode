import React, { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import DataTable from 'react-data-table-component';
import Layout from "../common/Layout";
        

const UserList = ()=>{
    const [users, setUser] = useState([]);

    const getUsers = ()=>{
        return axios.get("http://localhost:5000/user_list").then((response)=>{
            setUser(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getUsers();
    }, []);

    return(
        <Layout>
            <DisplayList data={users} />
        </Layout>
    );
}

const DisplayList = (props)=>{
    const navigate = useNavigate ();
    const data = props.data;
    const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Mobile',
          selector: 'mobile',
          sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button onClick={() => handleEdit(row)}>Edit</button> &nbsp;
                    <button onClick={() => handleDelete(row)}>Delete</button>
                </>
            ),
        }
    ];

    const handleEdit = (row) => {
        let id = row._id;
        navigate(`/edit_user/${id}`);
    };
    async function handleDelete(row){
        let id = row._id;
        let res = await deleteUser(id);
        if(res.deletedCount > 0){
            alert("Record deleted");
            window.location.reload();
        }
    };

    return (
        <DataTable
          title="User List"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
    );
};

async function deleteUser(id){
    return new Promise((resolve, reject)=>{
        try{
            let formData = "id="+id;
            axios({
                method: "post",
                url: "http://localhost:5000/delete_user",
                data: formData,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then((res)=>{
                return resolve(res.data);
            }).catch((er)=>{
                return reject(er.message);
            });
        }
        catch(e){
            return reject(e.message);
        }
    });
}

export default UserList;