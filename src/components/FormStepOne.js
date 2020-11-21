import React from 'react'
import { Form, Input, Button, Select, Radio } from 'antd';

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
                        { required: true, message: 'Please select a property type' },
                    ],
                })(
                    <Radio.Group>
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                    </Radio.Group>,
                )}
            </Form.Item>
            <Form.Item label={'State'}>
                {getFieldDecorator('state', {
                    rules: [
                        { required: true, message: 'Please select a property type' },
                    ],
                })(
                    <Select
                        placeholder="Select property type"
                        className={'form-item select-md'}
                        suffixIcon={<i className={'flaticon-down-arrow'} />}
                    >
                        <Option value="tamilnadu">TamilNadu</Option>
                        <Option value="Mumbai">Mumbai</Option>
                        <Option value="Delhi">Delhi</Option>

                    </Select>,
                )}
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