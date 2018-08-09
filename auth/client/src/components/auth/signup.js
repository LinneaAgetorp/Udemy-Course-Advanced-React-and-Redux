import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
    onSubmitForm = (formProps) => {
        this.props.signup(formProps, () => {  //callback automatically redirects user on successful sign up
            this.props.history.push('/feature')
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
                <button>Sign Up</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage}
}

export default compose(     //compose låter oss skicka med flera high order component till SignUp
    connect(mapStateToProps, actions),
    reduxForm({form: 'signup'})
)(SignUp);

// export default reduxForm({ form: 'signup' })(SignUp);