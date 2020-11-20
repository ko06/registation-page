import React from 'react'
import { Form, Input, Button } from 'antd';

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
            <Form.Item label="Field One">
                {getFieldDecorator('comapany_name', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.comapany_name
                })(<Input placeholder="Input your value here" />)}
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