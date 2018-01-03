import React, { Component } from 'react';
import { persistStore } from 'redux-persist';
import { connect } from 'react-redux';
import Navigation from './navigation';
import Store from '../store/Store';
import { AsyncStorage, View, ActivityIndicator, Image } from 'react-native';
import { Content, Button, Text, Root, Toast, Container } from 'native-base';
import SnackBar from 'react-native-snackbar-component';
import docterMiddleware from '../middlewares/docterMiddleware';

function mapStateToProps(state) {
    return {
        toastMessage: state.DocterInfo.toastMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToastMessage: () => { dispatch(docterMiddleware.clearToastMessage()) }
    }
}

class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            visible: true
        }
    }

    componentWillMount() {
        persistStore(Store, { storage: AsyncStorage }, () => {
            this.setState({
                loading: true,
                visible: false
            })
            this.props.clearToastMessage();
        })
    }

    closeToast = () => {

        setTimeout(() => {
            this.props.clearToastMessage();
        }, 2000)
    }

    showToast = () => {

        if (this.props.toastMessage !== '') {

            return (
                <SnackBar visible={true} textMessage={this.props.toastMessage} actionHandler={this.closeToast()} actionText="OKEY" />
            )
        }
    }

    render() {
        // console.log(this.props.toastMessage)
        if (this.state.loading === true) {
            return (
                <Container>
                    <Navigation />
                    {
                        this.showToast()
                    }
                </Container>
            )
        }
        else {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                    animating={this.state.visible}
                />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

const style = {
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}