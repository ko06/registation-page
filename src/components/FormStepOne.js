import React from 'react'
import { Form, Input, Button, Select, Radio } from 'antd';
import CountryPhoneCode from "antd-country-phone-input";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


const { Option } = Select;

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
            <Form.Item>
            <ReactFlagsSelect
             defaultCountry="US"
             onSelect={props.onSelectFlag} />
            </Form.Item>
            <Form.Item label={'State'}>
                {getFieldDecorator('state', {
                    rules: [
                        { required: true, message: 'Please select a state' },
                    ],
                })(
                    <Select
                        placeholder="Select property type"
                        className={'form-item select-md'}
                        optionFilterProp="children"
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="tamilnadu">TamilNadu</Option>
                        <Option value="Mumbai">Mumbai</Option>
                        <Option value="Delhi">Delhi</Option>
                        <Option value="goa">goa</Option>
                        <Option value="jammu">Jammu</Option>
                        <Option value="karnadaga">Karnadaga</Option>

                    </Select>,
                )}
            </Form.Item>
            <Form.Item className={'country-code'} label={'Phone'}>
                {getFieldDecorator("country_phone", {
                    rules: [
                        { required: true, message: 'Please select a Phone number' }],
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