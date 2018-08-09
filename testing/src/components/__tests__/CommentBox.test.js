import React from 'react';
import {mount} from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';    //this is used to give components the provider + redux store information

let wrapped;

beforeEach(() => {
    wrapped = mount(
    <Root>
        <CommentBox/>
    </Root>)
});

afterEach(() => {
    wrapped.unmount();
});

it('has a textarea and two button', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {

    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: {value: 'this is a new comment'}
        });
        wrapped.update()
    });

    it('has a text area that users can type in', () => {

        expect(wrapped.find('textarea').prop('value')).toEqual('this is a new comment')
    });

    it('has a text area that empties on submit', () => {

        wrapped.find('form').simulate('submit');
        wrapped.update();

        expect(wrapped.find('textarea').prop('value')).toEqual('')
    });
});
