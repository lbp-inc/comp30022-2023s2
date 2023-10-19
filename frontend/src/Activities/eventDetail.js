import React from 'react'
import { Typography } from 'antd';
import {lightBlue} from "@mui/material/colors";

const { Title } = Typography;

const eventDetail = () => (
    <>
        <Title color={lightBlue} >Event Detail</Title>
        <p> Cosplay March Seven! </p>
    </>
);

export default eventDetail;