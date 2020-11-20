import React from 'react'
import { Form, Input, Button } from 'antd';

const StepFinal = Form.create({
    name:'step_final'})( props => {
    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if(!err) {
                props.handleConfirmButton(values);
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
            <Form.Item label="otp">
                {getFieldDecorator('otp', {
                    rules: [{ required: true, message: 'Cannot be empty!'}],
                    initialValue: props.otp
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item>
                <Button type="default" onClick={storeValues} >
                    Back
                </Button>
                <Button type="primary" htmlType="submit">
                    VERIFY
                </Button>
            </Form.Item>
        </Form>
    );
});

export default StepFinal;