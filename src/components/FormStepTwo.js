import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const StepTwo = Form.create({
    name: 'step_two'
})(props => {
    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    const storeValues = () => {
        const values = getFieldsValue();
        props.submittedValues(values);
        props.handleBackButton();
    }
    return (
        <Form onSubmit={validateInput}>
            <Form.Item label="Company Name">
                {getFieldDecorator('comapany_name', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.comapany_name
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Email id">
                {getFieldDecorator('email_id', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.email_id
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Job Title">
                {getFieldDecorator('job_title', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.job_title
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Years of Experiance">
                {getFieldDecorator('years_of_experiance', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.job_title
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>

            <Form.Item label={null}>
                {getFieldDecorator('terms', {
                    rules: [
                        { required: true, message: 'Please accept terms and condition' },
                    ],
                })(
                    <Checkbox terms="checked">
                         I accept the <span className={'secondary-color'}>Terms and Conditions</span>
                    </Checkbox>,
                )}
            </Form.Item>

            <Form.Item>
                <Button type="default" onClick={storeValues} >
                    Back
                </Button>
                <Button type="primary" onClick={validateInput}>
                    SEND OTP
                </Button>
            </Form.Item>
        </Form>
    );
});

export default StepTwo;