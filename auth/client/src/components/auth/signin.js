import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {
    onSubmitForm = (formProps) => {
        this.props.signin(formProps, () => {  //callback automatically redirects user on successful sign in
            this.props.history.push('/feature') //and sends us to /feature
        });
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmitForm)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                    />
                </fieldset>
                <div>
                    {this.props.errorMessage}
                </div>
                <button>Sign In</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage}
}

export default compose(     //compose låter oss skicka med flera high order component till SignIn
    connect(mapStateToProps, actions),
    reduxForm({form: 'signin'})
)(SignIn);

// export default reduxForm({ form: 'signin' })(SignIn);