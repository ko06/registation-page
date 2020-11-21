import React from 'react'
import { Form, Input, Button, Divider } from 'antd';
import { disable } from 'workbox-navigation-preload';

function isOTPAvalilable(otp){
  // we can do better approch here :)
  if (otp.includes(undefined) || otp.includes(null) || 
  otp.includes(' ')|| otp.includes('') || otp.length === 0 || otp.length !== 5 ) {
      return false;
  } else {
      return true;
  }
}
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
        <label>Enter your code</label>
            <div class={'otp-container'}>
              <Input className={'otp-box'} min={1} max={9} onChange ={(v) => props.handleOTPMessage(0,v)}/>
              <Input className={'otp-box'} min={1} max={9} onChange ={(v) => props.handleOTPMessage(1,v)}/>
              <Input className={'otp-box'} min={1} max={9} onChange ={(v) => props.handleOTPMessage(2,v)}/>
              <Input className={'otp-box'} min={1} max={9}onChange ={(v) => props.handleOTPMessage(3,v)}/>
              <Input className={'otp-box'} min={1} max={9}onChange ={(v) => props.handleOTPMessage(4,v)}/>
            </div>
            <Form.Item>
                <Button type="default" onClick={storeValues} >
                    Back
                </Button>
                <Button type="primary" disabled={isOTPAvalilable(props.otp) ? false : true} htmlType="submit">
                    VERIFY
                </Button>
            </Form.Item>
            <Divider/>
            <h4>Didn't receive the email? Check your spam filter for an email
                from name@domain.com
            </h4>
        </Form>
    );
});

export default StepFinal;