import React from 'react'
import { Form, Input, Button, Divider } from 'antd';

function buttonGenerator(props) {
    let otpButton = []
    for (let i = 0; i < 5; i++) {
        otpButton.push(<Input className={'otp-box'} autoFocus={i===0 ? true : false} maxLength={1} min={1} max={1} ref={props.that[`field${i}`]} onChange={(v) => props.handleOTPMessage(i, v)} />)
    }
    return otpButton
}

function isOTPAvalilable(otp,props) {
    // we can do better approch here :)
    if (otp.includes(undefined) || otp.includes(null) ||
        otp.includes(' ') || otp.includes('') || otp.length === 0 || otp.length !== 5) {
        return false;
    } else {
        setTimeout(() => props.nextPage(), 2000) // for button loader
        return true;
    }
}
const StepFinal = Form.create({
    name: 'step_final'
})(props => {
    const { validateFields, getFieldsValue } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.handleConfirmButton(values);
            }
        });
    }
    const storeValues = () => {
        const values = getFieldsValue();
        props.submittedValues(values);
        props.handleBackButton();
    }
   const isotpTrue = isOTPAvalilable(props.otp, props);
    
    return (
        <Form onSubmit={validateInput}>
            <label>Enter your code</label>
            <div className={'otp-container'}>
                {buttonGenerator(props)}
            </div>
            <Form.Item>
                <Button type="default" onClick={storeValues} >
                    Back
                </Button>
                <Button type="primary" loading ={isotpTrue ? true : false} disabled={isotpTrue ? false : true} htmlType="submit">
                    Verify
                </Button>
            </Form.Item>
            <Divider />
            <h4>Didn't receive the email? Check your spam filter for an email
                from name@domain.com
            </h4>
        </Form>
    );
});

export default StepFinal;