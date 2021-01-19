import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './Footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfSpa !== undefined ?
                <Avatar
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}}
                    size='large'>{props.numberOfSpa}</Avatar> : null
            }
            <Button onClick={() => props.handleAddSpaClickEvent()} type='primary'>Add new spa +</Button>
        </Container>
    </div>
);

export default Footer;