import React, {Fragment, useEffect, useState} from 'react';
import Container from './Container';
import Footer from './Footer';
import {
  getAllSpa,
  updateSpa,
  deleteSpa,
  searchSpa
} from './client';
import FilterSpaForm from "./forms/FilterSpaForm";
import AddSpaForm from './forms/AddSpaForm';
import EditSpaForm from './forms/EditSpaForm';
import { errorNotification } from './Notification';
import {
  Table,
  Spin,
  Icon,
  Modal,
  Empty,
  PageHeader,
  Button,
  notification,
  Popconfirm
} from 'antd';

const getIndicatorIcon = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Spa = props => {

  const [spaList, setSpaList] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [selectedSpa, setSelectedSpa] = useState({});
  const [isAddSpaModalVisible, setAddSpaModalVisible] = useState(false);
  const [isEditSpaModalVisible, setEditSpaModalVisible] = useState(false);

  useEffect(() => {
    fetchSpaList();
  }, []);

  const openAddSpaModal = () => setAddSpaModalVisible(true)

  const closeAddSpaModal = () => setAddSpaModalVisible(false)

  const closeEditSpaModal = () => setEditSpaModalVisible(false)

  const openEditSpaModal = () => setEditSpaModalVisible(true)

  const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  const fetchSpaList = () => {
    setFetching(true);
    getAllSpa()
        .then(res => res.json()
            .then(spaList => {
                setSpaList(spaList)
                setFetching(false)
            }))
        .catch(error => {
          console.log(error.error)
          const message = error.error.message
          const description = error.error.error
          errorNotification(message, description)
          setFetching(false)
        });
  }

  const searchSpaFormSubmitter = spa => {
    setFetching(true)
    searchSpa(spa)
      .then(res => res.json()
      .then(spaList => {
        setSpaList(spaList)
        setFetching(false)
      })).catch(err => {
      console.error(err.error);
      openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  const editSpa = selectedSpa => {
    setSelectedSpa(selectedSpa);
    openEditSpaModal();
  }

  const updateSpaFormSubmitter = spa => {
    updateSpa(spa.id, spa).then(() => {
      openNotificationWithIcon('success', 'Spa updated', `${spa.id} was updated`);
      closeEditSpaModal();
      fetchSpaList();
    }).catch(err => {
      console.error(err.error);
      openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  const deleteSpaItem = (id) => {
    deleteSpa(id).then(() => {
      openNotificationWithIcon('success', 'Spa deleted', `${id} was deleted`);
      fetchSpaList();
    }).catch(err => {
      openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  const commonElements = () => (
      <div>
        <Modal
            title='Add new spa'
            visible={isAddSpaModalVisible}
            onOk={closeAddSpaModal}
            onCancel={closeAddSpaModal}
            width={1000}>
          <AddSpaForm
              onSuccess={() => {
                openNotificationWithIcon('success', 'Spa created', `Spa was created`);
                closeAddSpaModal();
                fetchSpaList();
              }}
              onFailure={(error) => {
                const message = error.error.message;
                const description = error.error.httpStatus;
                errorNotification(message, description);
              }}
          />
        </Modal>

        <Modal
            title='Edit Spa'
            visible={isEditSpaModalVisible}
            onOk={closeEditSpaModal}
            onCancel={closeEditSpaModal}
            width={1000}>

          <PageHeader title={`${selectedSpa.id}`}/>

          <EditSpaForm
              initialValues={selectedSpa}
              submitter={updateSpaFormSubmitter}/>
        </Modal>

        <Footer
            numberOfSpa={spaList.length}
            handleAddSpaClickEvent={openAddSpaModal}
        />
      </div>
  )

  const renderSpaList = () => {
    const columns = [
      {
        title: 'Spa Id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Spa Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Spa Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Fragment>
              <Popconfirm
                  placement='topRight'
                  title={`Are you sure to delete ${record.id}`}
                  onConfirm={() => deleteSpaItem(record.id)} okText='Yes' cancelText='No'
                  onCancel={e => e.stopPropagation()}>
                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
              <Button style={{marginLeft: '5px'}} type='primary' onClick={() => editSpa(record)}>Edit</Button>
            </Fragment>
        ),
      }
    ];

    return (
        <Container>
          <FilterSpaForm submitter={searchSpaFormSubmitter} />
          <Table
              style={{marginBottom: '100px'}}
              dataSource={spaList}
              columns={columns}
              pagination={false}
              rowKey='id'/>
          {commonElements()}
        </Container>
    );
  }

  const renderEmptySpaList = () => (
    <Container>
      <FilterSpaForm submitter={searchSpaFormSubmitter} />
      <Empty description={
        <h1>No Spa found</h1>
      }/>
      {commonElements()}
    </Container>
  )

  return (
    isFetching ?
      <Container>
        <Spin indicator={getIndicatorIcon()}/>
      </Container> : (
        spaList && spaList.length ?
          renderSpaList() :
          renderEmptySpaList()
      )
  )

};

export default Spa;
