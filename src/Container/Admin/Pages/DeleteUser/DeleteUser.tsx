import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Lawyers/Lawyers.scss';
import { Card } from 'react-bootstrap';
import Button from "../../../../Components/Button/Button";
import Loader from '../../../../util/loader'
import MuiDataTable from '../../../../Components/MuiDataTable/MuiDataTable'
import AdminApi from "../../../../api/admin";
import {errorNotify, successNotify} from "../../../../util/toast";


const DeleteUser = () => {
    const navigate = useNavigate();
    const [getDeleteUserData, setDeleteUserData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        AdminApi.getAllUsers(page)
            .then((res) => {
                setDeleteUserData(res.data);
                setLoading(false);
            })
            .catch((e) => {
                errorNotify(e.response.data.message);
                setLoading(false);
            });
    }, [page, isFetching])

    const onApproveHandler = async (userId: string) => {
        setLoading(true);
        setIsFetching(true);
        try {
            const res = await AdminApi.toApproveUser(userId);
            successNotify(res.data.message);
            setLoading(false);
            setIsFetching(false);
        } catch (e: any) {
            setIsFetching(false);
            setLoading(false);
            errorNotify(e.response.data.message);
        }
    }

    const onDisApproveHandler = async (userId: string) => {
        setLoading(true);
        setIsFetching(true);
        try {
            const res = await AdminApi.toDisApproveUser(userId);
            successNotify(res.data.message);
            setLoading(false);
            setIsFetching(false);
        } catch (e: any) {
            setIsFetching(false);
            setLoading(false);
            errorNotify(e.response.data.message);
        }
    }

    const columns = [
        "ID", 'Name', 'Email', 'Nic', 'isVerified', {
            name: "View",
            options: {
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    return <Button type='button' onClick={() => navigate(`/admin/detail/${tableMeta.rowData[0]}`)}> View </Button>
                }
            },

        },
        {
            name: "Action",
            options: {
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    return (
                        <div className='action_container'>
                            <button  type='button' onClick={() => onDisApproveHandler(tableMeta.rowData[0])}> Disapprove </button>
                            <button type='button' onClick={() => onApproveHandler(tableMeta.rowData[0])}> Approve </button>
                        </div>
                    )
                }
            },
        }
    ];

    return (
        <div className={'page_responsive'}>
            <h1>Deleted Users</h1>
            <div className={'lawyers_table_container'}>
                {loading ? <Loader /> :
                    <MuiDataTable
                        title={"Lawyers List"}
                        page={page}
                        setPage={setPage}
                        search={false}
                        data={getDeleteUserData}
                        columns={columns}
                    />
                }
            </div>
        </div>
    );
};

export default DeleteUser;
