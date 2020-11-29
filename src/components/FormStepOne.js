import React from 'react'
import { Form, Input, Button, Radio } from 'antd';
import CountryPhoneCode from "antd-country-phone-input";
import 'react-flags-select/css/react-flags-select.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const StepOne = Form.create({
    name: 'step_one'
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    return (
        <Form onSubmit={validateInput}>
            <Form.Item label="Full Name">
                {getFieldDecorator('full_name', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.full_name
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label={'Gender'}>
                {getFieldDecorator('gender', {
                    rules: [
                        { required: true, message: 'Please select a gender type' },
                    ],
                })(
                    <Radio.Group>
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                    </Radio.Group>,
                )}
            </Form.Item>

            <Form.Item className={'custom-select'} label={'Country'}>
                {getFieldDecorator("country_name", {
                    rules: [
                        { required: true, message: 'Please select a country name'}],
                })(
                    <CountryDropdown
                        value={props.country_name} onChange={(val) => props.selectCountry(val)} />
                )}
            </Form.Item>

            <Form.Item className={'custom-select'} label={'State'}>
                {getFieldDecorator('state', {
                    rules: [
                        { required: true, message: 'Please select a state name'},
                    ],
                })(
                    <RegionDropdown
                        value={props.state} country={props.country_name} onChange={(val) => props.selectRegion(val)} />
                )}
            </Form.Item>
            <Form.Item className={'country-code'} label={'Phone'}>
                {getFieldDecorator("country_phone", {
                    rules: [
                        { required: true, message: 'Please select a phone number' }],
                })(<CountryPhoneCode />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
});

export default StepOne;